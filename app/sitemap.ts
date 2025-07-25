import { MetadataRoute } from 'next';
import { getConversions } from '@/utils/content';
import { LOCALES } from '@/utils/i18n';
import { siteUrl } from '@/utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.SitemapUrl[] = [];
  const conv = getConversions();

  LOCALES.forEach((locale) => {
    // Home page
    urls.push({
      url: `${siteUrl}/${locale}/`,
      priority: 1,
      changefreq: 'weekly',
    });

    // Tool pages
    conv.forEach((c) => {
      const slug = locale === 'en' ? c.slug_en : c.slug_ar;
      urls.push({
        url: `${siteUrl}/${locale}/tools/${slug}`,
        priority: 0.8,
        changefreq: 'monthly',
      });
    });
  });

  return urls;
}

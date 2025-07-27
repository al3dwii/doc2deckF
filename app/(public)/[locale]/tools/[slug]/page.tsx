// app/(public)/[locale]/tools/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LandingTemplate from '@/components/landing/LandingTemplate';
import { getConversions } from '@/utils/content';
import { getConverter } from '@/lib/routes';
import { LOCALES } from '@/utils/i18n';
import { siteUrl } from '@/utils/seo';
import { routeMeta } from '@/lib/routes';
import { defaultDescription } from '@/utils/seo';
import Breadcrumbs from '@/components/Breadcrumbs';

type PageParams = {
  locale: 'en' | 'ar';
  slug: string;        // always the English slug
};

/* ---------- Static params ---------- */
export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getConversions().map((c) => ({
      locale,
      slug: c.slug_en,              // English slug for every locale
    })),
  );
}

/* ---------- Metadata ---------- */
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale, slug } = params;
  const converter = getConverter(slug);
  if (!converter) return {};

  const isAr = locale === 'ar';

  const baseTitle = isAr ? 'تحويل ملف وورد إلى بوربوينت' : 'Convert Word to PowerPoint';
  const variantTitle = isAr ? 'تحويل وورد إلى شرائح بوربوينت' : 'Word DOCX to PPTX converter';

  const title = `${baseTitle} | Sharayeh`;
  const description = isAr
    ? 'أسرع أداة مجانية لتحويل ملف وورد إلى بوربوينت بالذكاء الاصطناعي، بدون برامج، مع دعم الخطوط والصور واللغة العربية.'
    : 'Free online tool to convert Word documents into PowerPoint slides with AI. Keep fonts, images and formatting—no software needed.';

  const canonical = `${siteUrl}/${locale}/tools/${converter.slug_en}`;

  return {
    title,
    description,
    keywords: isAr
      ? ['تحويل ملف وورد إلى بوربوينت','تحويل وورد إلى بوربوينت','تحويل DOCX إلى PPT']
      : ['Convert Word to PowerPoint','DOCX to PPT converter'],
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/tools/${converter.slug_en}`,
        ar: `${siteUrl}/ar/tools/${converter.slug_ar}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: `${siteUrl}/og/${converter.slug_en}.png`, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og/${converter.slug_en}.png`],
    },
  };
}

/* ---------- Page ---------- */
export default function Page({ params }: { params: PageParams }) {
  const row = getConverter(params.slug);   // same fix here
  if (!row) return notFound();

  return (
    <>
      <Breadcrumbs locale={params.locale} slug={params.slug} />
      <LandingTemplate locale={params.locale} row={row} />
    </>
  );
}


// import { notFound } from 'next/navigation';
// import LandingTemplate from '@/components/landing/LandingTemplate';
// import { getConversions, getConversionBySlug } from '@/utils/content';
// import { LOCALES } from '@/utils/i18n';
// import { siteUrl } from '@/utils/seo';

// type PageParams = {
//   locale: 'en' | 'ar';
//   slug: string;
// };


// // app/(public)/[locale]/tools/[slug]/page.tsx
// export async function generateStaticParams() {
//   return LOCALES.flatMap((locale) =>
//     getConversions().map((c) => ({
//       locale,
//       slug: c.slug_en,    // always use the English slug
//     })),
//   );
// }

// /* ---------- Metadata ---------- */
// export async function generateMetadata({ params }) {
//   const { locale, slug } = params as PageParams;
//   const row = getConversionBySlug(locale, slug);
//   if (!row) return {};

//   const title = locale === 'ar' ? row.label_ar : row.label_en;
//   const description = locale === 'ar' ? row.label_ar : row.label_en;
//   const canonical = `${siteUrl}/${locale}/tools/${slug}`;

//   return {
//     title,
//     description,
//     alternates: {
//       canonical,
//       languages: {
//         en: `${siteUrl}/en/tools/${row.slug_en}`,
//         ar: `${siteUrl}/ar/tools/${row.slug_ar}`,
//       },
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonical,
//       type: 'article',
//       images: [{ url: `${siteUrl}/og/${row.slug_en}.png` }],
//     },
//   };
// }

// /* ---------- Page ---------- */
// export default function Page({ params }: { params: PageParams }) {
//   const row = getConversionBySlug(params.locale, params.slug);
//   if (!row) return notFound();

//   return <LandingTemplate locale={params.locale} row={row} />;
// }

// import { notFound } from "next/navigation";
// import { getConverters } from "@/lib/routes";
// import LandingTemplate from "@/components/landing/LandingTemplate";

// /* ---------- Types ---------- */

// type PageParams = {
//   locale: "en" | "ar";
//   slug_en: string;
// };

// /* ---------- ISR ---------- */

// export const revalidate = 86_400;

// /* ---------- Static params ---------- */

// export async function generateStaticParams(): Promise<PageParams[]> {
//   return getConverters().flatMap((c) =>
//     (["ar", "en"] as const).map((locale) => ({
//       locale,
//       slug_en: c.slug_en,
//     }))
//   );
// }

// /* ---------- Metadata ---------- */

// export async function generateMetadata({
//   params,
// }: {
//   params: PageParams;
// }) {
//   const row = getConverters().find((r) => r.slug_en === params.slug_en);
//   if (!row) return {};

//   const isAr = params.locale === "ar";
//   const title = isAr ? row.label_ar : row.label_en;
//   const description = isAr
//     ? `أداة سريعة لـ${row.label_ar}. بدون برامج.`
//     : `Fast, secure ${row.label_en} – no software needed.`;

//   return {
//     title,
//     description,
//     alternates: {
//       canonical: `https://sharayeh.com/${params.locale}/${row.slug_en}`,
//       languages: {
//         ar: `https://sharayeh.com/ar/${row.slug_en}`,
//         en: `https://sharayeh.com/en/${row.slug_en}`,
//       },
//     },
//     openGraph: { title, description },
//   };
// }

// /* ---------- Page ---------- */

// export default function Page({ params }: { params: PageParams }) {
//   const row = getConverters().find((r) => r.slug_en === params.slug_en);
//   if (!row) return notFound();

//   return <LandingTemplate locale={params.locale} row={row} />;
// }

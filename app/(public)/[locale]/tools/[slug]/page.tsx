// app/(public)/[locale]/tools/[slug]/page.tsx
import { notFound } from 'next/navigation';
import LandingTemplate from '@/components/landing/LandingTemplate';
import { getConversions, getConversionBySlug } from '@/utils/content';
import { LOCALES } from '@/utils/i18n';
import { siteUrl } from '@/utils/seo';

type PageParams = {
  locale: 'en' | 'ar';
  slug: string;
};

// Pre-build pages for every locale using the English slug for all languages.
export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getConversions().map((c) => ({
      locale,
      slug: c.slug_en,
    })),
  );
}

/* ---------- Metadata ---------- */
export async function generateMetadata({ params }) {
  const { locale, slug } = params as PageParams;
  const row = getConversionBySlug('en', slug);
  if (!row) return {};

  // Choose labels based on locale, but keep the slug English for URLs.
  const title = locale === 'ar' ? row.label_ar : row.label_en;
  const description = locale === 'ar' ? row.label_ar : row.label_en;
  const canonical = `${siteUrl}/${locale}/tools/${row.slug_en}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/tools/${row.slug_en}`,
        ar: `${siteUrl}/ar/tools/${row.slug_en}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: `${siteUrl}/og/${row.slug_en}.png` }],
    },
  };
}

/* ---------- Page ---------- */
export default function Page({ params }: { params: PageParams }) {
  // Always look up by the English slug so that the same slug works for all locales.
  const row = getConversionBySlug('en', params.slug);
  if (!row) return notFound();

  // Pass locale and row into your landing template with the correct prop names.
  return <LandingTemplate locale={params.locale} row={row} />;
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

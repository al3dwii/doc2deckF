interface Props {
  data: Record<string, any>;
}

export default function StructuredData({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // stringify *after* prop validation to avoid XSS
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}


// // components/StructuredData.tsx
// 'use client';

// import React from 'react';
// import Head from 'next/head';

// type Json = Record<string, unknown>;

// interface StructuredDataProps {
//   /** Schema‑org type, e.g. "HowTo" | "FAQPage" | "Article" */
//   type: string;
//   /** Raw JS object that will be stringified into JSON‑LD */
//   data: Json;
// }

// /**
//  * Injects <script type="application/ld+json"> into <head>.
//  * Call it once per page.
//  */
// export default function StructuredData({ type, data }: StructuredDataProps) {
//   const full: Json = {
//     '@context': 'https://schema.org',
//     '@type': type,
//     ...data,
//   };

//   return (
//     <Head>
//       <script
//         type="application/ld+json"
//         // stringify with no indentation to keep payload tiny
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(full) }}
//       />
//     </Head>
//   );
// }

// /* ---------- Helper for LandingTemplate ---------- */
// export function buildHowToSchema(row: any, locale: 'en' | 'ar') {
//   // CSV columns are howItWorks_en / howItWorks_ar with semicolon‑separated steps
//   const stepsRaw =
//     row[`howItWorks_${locale}` as const] ??
//     row[`howItWorks_${locale === 'en' ? 'ar' : 'en'}` as const] ??
//     '';
//   const steps = stepsRaw
//     .split(';')
//     .map((t: string) => t.trim())
//     .filter(Boolean);

//   return {
//     name: locale === 'ar' ? row.title_ar : row.title_en,
//     description:
//       locale === 'ar' ? row.description_ar : row.description_en,
//     totalTime: row.avg_time_iso, // e.g. "PT45S"
//     tool: 'Sharayeh Converter',
//     step: steps.map((text: string, i: number) => ({
//       '@type': 'HowToStep',
//       position: i + 1,
//       text,
//     })),
//   };
// }


// /* ------------------------------------------------------------------ *
//    Inject Schema.org JSON‑LD (HowTo + SoftwareApplication)
//    for every converter landing page.
//  * ------------------------------------------------------------------ */

// import Script from "next/script";
// import type { Converter } from "@/lib/routes";

// interface StructuredDataProps {
//   locale: "en" | "ar";
//   row: Converter;
//   faqs?: { question: string; answer: string }[];
// }

// export default function StructuredData({ locale, row, faqs }: StructuredDataProps) {
//   const isAr = locale === "ar";
//   const name = isAr ? row.label_ar : row.label_en;

//   /* ---------- HowTo markup ---------- */
//   const howTo = {
//     "@context": "https://schema.org",
//     "@type": "HowTo",
//     name,
//     inLanguage: locale,
//     totalTime: row.avg_time_iso, // e.g. "PT30S"
//     tool: "Sharayeh Converter",
//     step: (row.steps[locale] ?? []).map((text, i) => ({
//       "@type": "HowToStep",
//       position: i + 1,
//       text,
//     })),
//   };

//   /* ---------- SoftwareApplication markup ---------- */
//   const softwareApp = {
//     "@context": "https://schema.org",
//     "@type": "SoftwareApplication",
//     name: `Sharayeh — ${name}`,
//     applicationCategory: "DocumentConversion",
//     operatingSystem: "Web",
//     offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
//     url: `https://sharayeh.com/${locale}/${row.slug_en}`,
//   };

//   const faqLd = faqs && {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     mainEntity: faqs.map((f) => ({
//       "@type": "Question",
//       name: f.question,
//       acceptedAnswer: { "@type": "Answer", text: f.answer },
//     })),
//   };

//   return (
//     <>
//       <Script
//         id="ld-howto"
//         type="application/ld+json"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
//       />
//       <Script
//         id="ld-app"
//         type="application/ld+json"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
//       />
//       {faqLd && (
//         <Script
//           id="ld-faq"
//           type="application/ld+json"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
//         />
//       )}
//     </>
//   );
// }

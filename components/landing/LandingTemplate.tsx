'use client';

/**
 * Universal landing-page layout for every converter.
 */

///Users/omair/sharayeh/src/components/landing/LandingTemplate.tsx
import StructuredData from "@/components/StructuredData";
import Converter from "@/components/Converter";
import FeatureSectionAr from "@/components/landing/FeatureSectionAr";
import LandingCopyAr from "@/components/landing/LandingCopyAr";
import FaqAr from "@/components/landing/FaqAr";
import { FaqEn, FAQ_EN } from "@/components/FaqEn";
import { FAQ_AR } from "@/components/landing/FaqAr";
import type { Converter as ConverterRow } from "@/lib/routes";
import { PlanBadge } from "@/components/PlanBadge";
import { useUserPlan } from "@/context/UserContext";
import { buildHowToSchema } from '@/components/StructuredData';

import LandingCopyEn   from "@/components/landing/LandingCopyEn";
import FeatureSectionEn from "@/components/landing/FeatureSectionEn";
import Link from 'next/link';


interface LandingTemplateProps {
  locale: "en" | "ar";
  row: ConverterRow;
}



/** Utility: human readable “DOCX → PPT” string localized */
function dirLabel(row: ConverterRow, isAr: boolean): string {
  // row.dir already looks like "DOCX→PPT"; just space it + localize arrow if needed
  const spaced = row.dir.replace("→", " → ");
  if (!isAr) return spaced;
  // Arabic UI: keep Latin extensions; prepend verb
  return `(${spaced})`;
}

export default function LandingTemplate({ locale, row }: LandingTemplateProps) {
  const isAr = locale === "ar";
  const plan = useUserPlan();

  return (
    <main className="container mt-16 pt-16 min-h-screen mx-auto py-12 space-y-12">
      <header className="text-center space-y-3">
        {/* <PlanBadge plan={plan} /> */}
        <h1 className="text-3xl font-bold">
          {isAr ? row.label_ar : row.label_en}
        </h1>
        <p className="text-sm text-muted-foreground">{dirLabel(row, isAr)}</p>
      </header>

      {/* Converter takes no props in current codebase */}
      <Converter 
      locale={locale}
      proxyPath={`/api/ai/${row.slug_en}`}
      templateGalleryPath="/templates"
      
      />

      {isAr ? (
  <>
    <FeatureSectionAr row={row} />
    <LandingCopyAr   row={row} />
    <FaqAr           row={row} />
  </>
) : (
  <>
    <FeatureSectionEn row={row} />
    <LandingCopyEn row={row} />
    <FaqEn         row={row} />
  </>
)}

      {isAr && (
        <section className="mt-12" dir="rtl">
          <h3 className="text-xl font-bold">تم البحث أيضاً عن</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <li><Link href="/ar/tools/word-to-pdf">تحويل ملف وورد إلى PDF</Link></li>
            <li><Link href="/ar/tools/pdf-to-powerpoint">تحويل PDF إلى بوربوينت</Link></li>
            <li><Link href="/ar/tools/powerpoint-to-word">تحويل بوربوينت إلى وورد</Link></li>
            <li><Link href="/ar/tools/ppt-ai-design">تصميم بوربوينت بالذكاء الاصطناعي</Link></li>
          </ul>
        </section>
      )}
{/* 
      {isAr ? (
        <>
          <FeatureSectionAr />
          <LandingCopyAr />
          <FaqAr />
        </>
      ) : (
        <FaqEn />
      )} */}

      <StructuredData
        type="HowTo"
        data={buildHowToSchema(row, locale)}
      />

    </main>
  );
}

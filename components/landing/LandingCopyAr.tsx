// src/components/landing/LandingCopyAr.tsx
import type { ConverterRow } from "@/lib/tools";

type Props = { row: ConverterRow };

export default function LandingCopyAr({ row }: Props) {
  // "DOCX→PPT"  →  "DOCX إلى PPT"
  const dirReadable = row.dir.replace("→", " إلى ");

  return (
    <section dir="rtl" className="prose rtl:max-w-none mx-auto space-y-4">
      <p>
        <strong>تحويل ملف وورد إلى بوربوينت</strong> هي خدمة سحابية سريعة تمكنك من تحويل مستندات DOCX إلى عرض شرائح PowerPoint بنقرة واحدة.
        احتفظ بالصور والخطوط والتنسيق الأصلي – وكل ذلك من متصفحك.
      </p>

      <h2>لماذا تختار أداة {row.label_ar}؟</h2>
      <ul>
        <li>⏱️ معالجة سريعة في ثوانٍ بدون برامج</li>
        <li>🛡️ رفع آمن عبر HTTPS وحذف الملفات تلقائياً</li>
        <li>🤖 الذكاء الاصطناعي يحول النص إلى شرائح منظمة</li>
        <li>🌐 دعم كامل للغة العربية واللغات الأخرى</li>
      </ul>

      <p>
        هل ترغب في أتمتة {dirReadable}? اطلع على
        <a href="/ar/developer-enterprise">‏واجهة البرمجة لدينا</a>.
      </p>
    </section>
  );
}

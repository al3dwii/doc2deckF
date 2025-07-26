// src/components/landing/LandingCopyAr.tsx
import type { ConverterRow } from "@/lib/tools";

type Props = { row: ConverterRow };

export default function LandingCopyAr({ row }: Props) {
  // "DOCX→PPT"  →  "DOCX إلى PPT"
  const dirReadable = row.dir.replace("→", " إلى ");

  return (
    <section dir="rtl" className="prose rtl:max-w-none mx-auto space-y-4">
      <p>
        <strong>{row.label_ar}</strong> هي أسرع خدمة عبر الإنترنت لتحويل&nbsp;
        {dirReadable}. احتفِظ بجميع الخطوط والصور والتنسيقات الأصلية بدون الحاجة
        إلى أي برامج مكتبية.
      </p>

      <h2>لماذا تختار أداة {row.label_ar}؟</h2>
      <ul>
        <li>⏱️ معالجة سحابية فورية – لا حاجة للتنصيب</li>
        <li>🛡️ رفع آمن عبر HTTPS وحذف تلقائي بعد ساعتين</li>
        <li>🎨 دقة عالية في كل شريحة</li>
        <li>🔄 وضع التحويل الجماعي للمستخدمين المحترفين</li>
      </ul>

      <p>
        هل ترغب في أتمتة {dirReadable}? اطلع على
        <a href="/ar/developer-enterprise">‏واجهة البرمجة لدينا</a>.
      </p>
    </section>
  );
}

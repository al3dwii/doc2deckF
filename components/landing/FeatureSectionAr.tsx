// src/components/landing/FeatureSectionAr.tsx
import type { ConverterRow } from "@/lib/tools";

type Props = { row: ConverterRow };

export default function FeatureSectionAr({ row }: Props) {
  return (
    <section dir="rtl" className="grid md:grid-cols-3 gap-4 text-right">
      <div className="p-4 border rounded">
        <h3 className="font-bold mb-1">سحب وإفلات</h3>
        <p>اسحب الملف وأفلته ليبدأ {row.label_ar} فورًا.</p>
      </div>

      <div className="p-4 border rounded">
        <h3 className="font-bold mb-1">يحافظ على التنسيق</h3>
        <p>يحفظ الخطوط والألوان والجداول دون تغيير.</p>
      </div>

      <div className="p-4 border rounded">
        <h3 className="font-bold mb-1">يدعم الملفات الكبيرة</h3>
        <p>حتى 500 ميجابايت لكل عملية تحويل.</p>
      </div>
    </section>
  );
}

// // src/components/landing/FeatureSectionAr.tsx
// //-----------------------------------------------------
// // FINAL state after the 10-day sprint
// //-----------------------------------------------------
// "use client";

// import { Zap, ShieldCheck, Timer } from "lucide-react";
// import FeatureCard from "./FeatureCard";

// /**
//  * Three trust-building cards shown below the converter.
//  * Icons from lucide-react, layout switches from 1-col → 3-col.
//  */
// export default function FeatureSectionAr() {
//   const cards = [
//     {
//       Icon: Zap,
//       title: "سرعة فائقة",
//       desc: "تحويل المستند إلى شرائح كاملة في أقل من ٣٠ ثانية.",
//     },
//     {
//       Icon: ShieldCheck,
//       title: "خصوصية مضمونة",
//       desc: "يُمسح ملفك من الخوادم تلقائياً بعد ٢٤ ساعة أو فور التنزيل.",
//     },
//     {
//       Icon: Timer,
//       title: "دقة تنسيق",
//       desc: "عناوين Word تتحول إلى شرائح مرتبة مع الحفاظ على الجداول والقوائم.",
//     },
//   ] as const;

//   return (
//     <section className="grid gap-6 md:grid-cols-3">
//       {cards.map(({ Icon, title, desc }) => (
//         <FeatureCard key={title} rtl Icon={Icon} title={title} desc={desc} />
//       ))}
//     </section>
//   );
// }

import { notFound } from "next/navigation";
import { getConverters } from "@/lib/routes";
import LandingTemplate from "@/components/landing/LandingTemplate";

/* ---------- Types ---------- */

type PageParams = {
  locale: "en" | "ar";
  slug_en: string;
};

/* ---------- ISR ---------- */

export const revalidate = 86_400;

/* ---------- Static params ---------- */

export async function generateStaticParams(): Promise<PageParams[]> {
  return getConverters().flatMap((c) =>
    (["ar", "en"] as const).map((locale) => ({
      locale,
      slug_en: c.slug_en,
    }))
  );
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}) {
  const row = getConverters().find((r) => r.slug_en === params.slug_en);
  if (!row) return {};

  const isAr = params.locale === "ar";
  const title = isAr ? row.label_ar : row.label_en;
  const description = isAr
    ? `أداة سريعة لـ${row.label_ar}. بدون برامج.`
    : `Fast, secure ${row.label_en} – no software needed.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://sharayeh.com/${params.locale}/${row.slug_en}`,
      languages: {
        ar: `https://sharayeh.com/ar/${row.slug_en}`,
        en: `https://sharayeh.com/en/${row.slug_en}`,
      },
    },
    openGraph: { title, description },
  };
}

/* ---------- Page ---------- */

export default function Page({ params }: { params: PageParams }) {
  const row = getConverters().find((r) => r.slug_en === params.slug_en);
  if (!row) return notFound();

  return <LandingTemplate locale={params.locale} row={row} />;
}

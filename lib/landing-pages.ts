import { landingPages } from "@/data/landing_pages_runtime";
import type { LandingPageRecord } from "@/types";

export function allLandingPages(): LandingPageRecord[] {
  return landingPages;
}

export function findLandingPageBySlug(slug: string): LandingPageRecord | undefined {
  return landingPages.find((r) => r.slug === slug);
}

export function localePhrase(rec: LandingPageRecord, locale: string): string {
  return locale === "ar" ? rec.phrase_ar : rec.phrase_en;
}

export function localeShortHint(rec: LandingPageRecord, locale: string): string {
  return locale === "ar" ? rec.short_hint_ar : rec.short_hint_en;
}

export function localeFaq(rec: LandingPageRecord, locale: string) {
  return locale === "ar" ? rec.faq_ar : rec.faq_en;
}

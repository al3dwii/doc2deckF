import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface ConversionRecord {
  slug_en: string;
  slug_ar: string;
  dir: string;
  label_en: string;
  label_ar: string;
  search_vol?: string;
  icon?: string;
  avg_time_iso?: string;
  steps_id?: string;
}

let cache: ConversionRecord[] | null = null;

/** Cached list of all conversion rows (CSV). */
export function getConversions(): ConversionRecord[] {
  if (cache) return cache;

  const csvPath = path.join(process.cwd(), 'content/conversions.csv');
  const raw = fs.readFileSync(csvPath, 'utf8');
  const { data } = Papa.parse<ConversionRecord>(raw, { header: true });

  cache = data.filter((r) => r.slug_en && r.slug_ar);
  return cache;
}

/** Find a single row by its locale‑specific slug. */
export function getConversionBySlug(locale: 'en' | 'ar', slug: string) {
  return getConversions().find(
    (r) => r[locale === 'en' ? 'slug_en' : 'slug_ar'] === slug,
  );
}

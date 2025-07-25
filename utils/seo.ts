export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const defaultTitle = 'Doc2Deck – AI slide converter';
export const defaultDescription =
  'Convert Word, PDF, or Excel files into beautiful PowerPoint decks in seconds.';

/** Swap one locale segment for another inside a URL. */
export function swapLocale(url: string, from: string, to: string) {
  return url.replace(`/${from}/`, `/${to}/`);
}

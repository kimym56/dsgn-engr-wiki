export const KNOWN_LOCALES = ["en", "ko"] as const;
export const PUBLISHED_LOCALES = ["en"] as const;
export const DEFAULT_LOCALE = "en" satisfies PublishedLocale;

export type KnownLocale = (typeof KNOWN_LOCALES)[number];
export type PublishedLocale = (typeof PUBLISHED_LOCALES)[number];
export type RouteSegment = "explore" | "references" | "about";

export function isKnownLocale(value: string): value is KnownLocale {
  return KNOWN_LOCALES.some((locale) => locale === value);
}

export function isPublishedLocale(value: string): value is PublishedLocale {
  return PUBLISHED_LOCALES.some((locale) => locale === value);
}

export function localePath(
  locale: PublishedLocale,
  segment?: RouteSegment,
): string {
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

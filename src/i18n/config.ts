export const LOCALES = ["en", "ro", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Language names are shown in their own language in the switch, whatever the page language is.
export const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", ro: "Română", de: "Deutsch" };

const INTL_TAGS: Record<Locale, string> = { en: "en-GB", ro: "ro-RO", de: "de-DE" };

// Fares are set in euro. The Romanian page shows lei at a fixed sample rate, with euro as a hint.
export const LEI_PER_EURO = 5;

export function formatEuro(euro: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_TAGS[locale], { style: "currency", currency: "EUR", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(
    euro,
  );
}

export function formatPrice(euro: number, locale: Locale): string {
  if (locale !== "ro") return formatEuro(euro, locale);
  return new Intl.NumberFormat(INTL_TAGS.ro, { style: "currency", currency: "RON", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(
    euro * LEI_PER_EURO,
  );
}

export function formatDate(date: string, locale: Locale): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Intl.DateTimeFormat(INTL_TAGS[locale], { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
}

export function formatDuration(minutes: number, locale: Locale): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (locale === "de") return [h ? `${h} Std.` : "", m ? `${m} Min.` : ""].filter(Boolean).join(" ");
  return [h ? `${h}h` : "", m ? `${String(m).padStart(h ? 2 : 1, "0")}m` : ""].filter(Boolean).join(" ");
}

// Fills "{name}" placeholders in dictionary strings.
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

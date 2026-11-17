export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; ogLocale: string }> = {
  pt: { short: "PT", name: "Português", htmlLang: "pt-PT", ogLocale: "pt_PT" },
  en: { short: "EN", name: "English", htmlLang: "en", ogLocale: "en_GB" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Texto traduzido em todos os idiomas suportados. */
export type Localized<T = string> = Record<Locale, T>;

export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/**
 * Escolhe o idioma a partir do cabeçalho Accept-Language.
 * Português é o idioma por omissão.
 */
export function pickLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

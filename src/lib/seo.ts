import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { defaultLocale, localeLabels, locales, type Locale } from "@/i18n/config";

/** URLs alternativos por idioma para um caminho (sem prefixo de idioma). */
export function languageAlternates(path: string): Record<string, string> {
  const suffix = path === "/" ? "" : path;
  const entries = locales.map((locale) => [localeLabels[locale].htmlLang, `/${locale}${suffix}`] as const);
  return { ...Object.fromEntries(entries), "x-default": `/${defaultLocale}${suffix}` };
}

type PageMetadataInput = {
  locale: Locale;
  /** Caminho sem prefixo de idioma, ex.: "/" ou "/projects/parttime". */
  path: string;
  title?: string;
  description?: string;
};

export function buildMetadata({ locale, path, title, description }: PageMetadataInput): Metadata {
  const dict = getDictionary(locale);
  const fullTitle = title ? `${title} · ${siteConfig.name}` : dict.meta.title;
  const desc = description ?? dict.meta.description;
  const url = `/${locale}${path === "/" ? "" : path}`;

  return {
    title: fullTitle,
    description: desc,
    keywords: dict.meta.keywords,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
  };
}

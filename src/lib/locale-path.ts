import { locales, type Locale } from "@/i18n/config";

/** Devolve o mesmo caminho noutro idioma (ex.: /pt/projects/x → /en/projects/x). */
export function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = target;
    return segments.join("/");
  }
  return `/${target}`;
}

import { lang } from "next/root-params";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";

/** Esqueleto apresentado enquanto a página de projeto carrega. */
export default async function Loading() {
  const value = await lang();
  const dict = getDictionary(isLocale(value) ? value : defaultLocale);
  return (
    <div role="status" aria-busy="true" className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <span className="sr-only">{dict.common.loading}</span>
      <div className="animate-pulse space-y-6" aria-hidden="true">
        <div className="h-4 w-32 rounded bg-surface-2" />
        <div className="h-6 w-48 rounded-full bg-surface-2" />
        <div className="h-14 w-2/3 rounded-lg bg-surface-2" />
        <div className="h-5 w-full max-w-2xl rounded bg-surface-2" />
        <div className="aspect-[16/9] w-full rounded-2xl bg-surface" />
      </div>
    </div>
  );
}

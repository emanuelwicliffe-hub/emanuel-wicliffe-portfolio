import { lang } from "next/root-params";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);
  return (
    <>
      <title>{`404 — ${dict.notFound.title} · ${siteConfig.name}`}</title>
      <NotFoundView locale={locale} dict={dict} />
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { swapLocale } from "@/lib/locale-path";
import { cn } from "@/lib/cn";

export function LocaleSwitch({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  return (
    <div className={cn("flex items-center rounded-lg border border-border p-0.5", className)}>
      {locales.map((code) => {
        const active = code === locale;
        return active ? (
          <span
            key={code}
            aria-current="true"
            className="rounded-md bg-primary-soft px-2 py-1 font-mono text-xs font-semibold text-primary-text"
          >
            <span className="sr-only">{localeLabels[code].name}: </span>
            {localeLabels[code].short}
          </span>
        ) : (
          <Link
            key={code}
            href={swapLocale(pathname, code)}
            hrefLang={localeLabels[code].htmlLang}
            lang={localeLabels[code].htmlLang}
            aria-label={`${label} ${localeLabels[code].name}`}
            className="rounded-md px-2 py-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
          >
            {localeLabels[code].short}
          </Link>
        );
      })}
    </div>
  );
}

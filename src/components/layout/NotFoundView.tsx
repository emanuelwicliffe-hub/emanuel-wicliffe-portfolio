import { ArrowLeft, FolderOpen } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Conteúdo da página 404, partilhado pelo not-found localizado e pelo global. */
export function NotFoundView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.notFound;
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden px-4 pt-24 pb-16">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div className="mx-auto w-full max-w-xl text-center">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(5rem,22vw,9rem)] font-bold leading-none tracking-tighter text-gradient"
        >
          {t.code}
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-lg border border-border bg-surface/70 px-4 py-3 text-left font-mono text-xs sm:text-sm">
          <span className="text-primary-text">❯</span> <span className="text-fg-muted">cd ~/route</span>
          <br />
          <span className="text-accent">{t.terminalLine}</span>
        </div>
        <h1 className="mt-8 font-display text-2xl font-semibold text-fg sm:text-3xl">{t.title}</h1>
        <p className="mt-3 text-fg-muted">{t.message}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={`/${locale}`} variant="primary">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.back}
          </ButtonLink>
          <ButtonLink href={`/${locale}#projects`} variant="secondary">
            <FolderOpen size={16} aria-hidden="true" />
            {t.projects}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

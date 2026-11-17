import { ArrowRight, Download, MapPin, Send } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink, ExternalButton } from "@/components/ui/ButtonLink";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const cv = siteConfig.cv.file;
  const cvLabel = siteConfig.cv.language === locale ? t.ctaCv : t.ctaCvOtherLanguage;
  const { github, linkedin } = siteConfig.social;
  const current = projects.find((p) => p.slug === profile.currentProjectSlug);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Fundo: grelha com máscara e brilho subtil */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:px-8">
        <div>
          <p
            className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted sm:text-xs"
            style={delay(0)}
          >
            <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-success" />
            {t.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="animate-fade-up font-display text-[clamp(2.75rem,9vw,5.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-fg"
            style={delay(80)}
          >
            {profile.firstName}
            <br />
            <span className="text-gradient">{profile.lastName}</span>
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-xl font-display text-xl font-medium leading-snug text-fg text-balance sm:text-2xl"
            style={delay(160)}
          >
            {t.headline}
          </p>
          <p
            className="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg"
            style={delay(220)}
          >
            {t.subtitle}
          </p>

          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(300)}>
            <ButtonLink href={`/${locale}#projects`} variant="primary">
              {t.ctaProjects}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            {cv ? (
              <ExternalButton
                href={cv}
                download
                type="application/pdf"
                hrefLang={siteConfig.cv.language}
                variant="secondary"
              >
                <Download size={16} aria-hidden="true" />
                {cvLabel}
              </ExternalButton>
            ) : null}
            <ButtonLink href={`/${locale}#contact`} variant="secondary">
              <Send size={16} aria-hidden="true" />
              {t.ctaContact}
            </ButtonLink>
          </div>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-muted"
            style={delay(380)}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" className="text-primary-text" />
              {t.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {t.availability}
            </span>
            {github || linkedin ? (
              <span className="flex items-center gap-1">
                {github ? (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub (${dict.a11y.externalLink})`}
                    className="inline-flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    <GithubIcon size={18} />
                  </a>
                ) : null}
                {linkedin ? (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn (${dict.a11y.externalLink})`}
                    className="inline-flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>

        {/* Detalhe visual: editor de código com o "perfil" do programador */}
        <div className="animate-fade-up relative mx-auto w-full max-w-md lg:max-w-none" style={delay(260)}>
          <div
            aria-hidden="true"
            className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-primary/45 via-transparent to-primary-strong/25 opacity-60 blur-sm"
          />
          <div className="overflow-hidden rounded-2xl border border-border-strong bg-bg-elevated/95 shadow-card">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-accent/80" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-fg-subtle/40" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-fg-subtle/40" />
              <span className="ml-3 font-mono text-xs text-fg-subtle">developer.ts</span>
            </div>

            <div className="flex items-center gap-4 border-b border-border px-5 py-5">
              <ProfileAvatar
                alt={dict.a11y.photoAlt}
                monogramAlt={dict.a11y.monogramAlt}
                priority
                className="size-16 shrink-0 sm:size-20"
              />
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-fg">{profile.name}</p>
                <p className="text-sm text-fg-muted">{profile.role[locale]}</p>
              </div>
            </div>

            <pre
              aria-hidden="true"
              className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.75] text-fg-muted sm:text-[13px]"
            >
              <code>
                <span className="text-primary-text">const</span> <span className="text-fg">developer</span> = {"{"}
                {"\n"}
                {"  "}name: <span className="text-success">&quot;{profile.name}&quot;</span>,{"\n"}
                {"  "}location: <span className="text-success">&quot;Leiria, PT&quot;</span>,{"\n"}
                {"  "}focus: [<span className="text-success">&quot;web&quot;</span>,{" "}
                <span className="text-success">&quot;full-stack&quot;</span>,{" "}
                <span className="text-success">&quot;systems&quot;</span>],{"\n"}
                {current ? (
                  <>
                    {"  "}building: <span className="text-accent">&quot;{current.name.en}&quot;</span>,{"\n"}
                  </>
                ) : null}
                {"  "}learning: <span className="text-primary-text">true</span>,{"\n"}
                {"}"};{"\n\n"}
                <span className="text-fg-subtle">{"// "}</span>
                <span className="text-fg-subtle">{t.headline}</span>
                {"\n"}
                <span className="text-primary-text">❯</span> <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-primary" />
              </code>
            </pre>

            {current ? (
              <Link
                href={`/${locale}/projects/${current.slug}`}
                className="group flex items-center justify-between gap-3 border-t border-border bg-surface/50 px-5 py-3.5 text-sm transition-colors hover:bg-surface"
              >
                <span className="flex items-center gap-2 text-fg-muted">
                  <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-accent" />
                  {t.currentlyBuilding}:
                  <span className="font-medium text-fg">{current.name[locale]}</span>
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-primary-text"
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

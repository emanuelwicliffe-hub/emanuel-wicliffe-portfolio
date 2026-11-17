import { ArrowUpRight, FileText, Mail, MapPin, Sparkle } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { CopyButton } from "./CopyButton";

type Channel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external: boolean;
  download?: boolean;
};

/** Remove o protocolo para mostrar um URL de forma limpa. */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contact;
  const { email, github, linkedin } = siteConfig.social;

  const channels: Channel[] = [];
  if (email)
    channels.push({ id: "email", label: t.email, value: email, href: `mailto:${email}`, icon: <Mail size={20} aria-hidden="true" />, external: false });
  if (linkedin)
    channels.push({ id: "linkedin", label: t.linkedin, value: displayUrl(linkedin), href: linkedin, icon: <LinkedinIcon size={20} />, external: true });
  if (github)
    channels.push({ id: "github", label: t.github, value: displayUrl(github), href: github, icon: <GithubIcon size={20} />, external: true });
  if (siteConfig.cv.file)
    channels.push({
      id: "cv",
      label: t.cv,
      value: siteConfig.cv.language === "pt" ? t.cvPortuguese : t.cvEnglish,
      href: siteConfig.cv.file,
      icon: <FileText size={20} aria-hidden="true" />,
      external: false,
      download: true,
    });

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface/70 p-6 shadow-card sm:p-10 lg:p-14">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-32 left-10 size-64 rounded-full bg-primary-deep/15 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
              <div>
                <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">
                  <span className="text-fg-subtle">06</span>
                  <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
                  {t.eyebrow}
                </p>
                <h2
                  id="contact-title"
                  className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl"
                >
                  {t.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg">{t.intro}</p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} aria-hidden="true" className="mt-0.5 text-primary-text" />
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.location}</dt>
                      <dd className="mt-1 text-sm text-fg">{profile.location[locale]}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkle size={18} aria-hidden="true" className="mt-0.5 text-accent" />
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.availability}</dt>
                      <dd className="mt-1 text-sm text-fg">{t.availabilityValue}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col justify-center">
                {channels.length > 0 ? (
                  <ul className="space-y-3">
                    {channels.map((channel) => (
                      <li key={channel.id}>
                        <div className="group flex items-center gap-2 rounded-2xl border border-border bg-bg-elevated/80 p-2 pr-3 transition-colors hover:border-primary/50">
                          <a
                            href={channel.href}
                            {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            {...(channel.download
                              ? { download: true, type: "application/pdf", hrefLang: siteConfig.cv.language }
                              : {})}
                            className="flex min-w-0 flex-1 items-center gap-4 rounded-xl p-2"
                          >
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
                              {channel.icon}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-xs uppercase tracking-wider text-fg-subtle">{channel.label}</span>
                              <span className="block truncate text-sm font-medium text-fg sm:text-base">{channel.value}</span>
                              {channel.external ? <span className="sr-only"> ({dict.a11y.externalLink})</span> : null}
                            </span>
                            <ArrowUpRight
                              size={18}
                              aria-hidden="true"
                              className="ml-auto shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-text"
                            />
                          </a>
                          {channel.id === "email" ? (
                            <CopyButton value={channel.value} label={t.copyEmail} copiedLabel={t.copied} />
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-2xl border border-dashed border-border-strong bg-bg-elevated/60 p-6 text-sm leading-relaxed text-fg-muted">
                    {t.channelsPending}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

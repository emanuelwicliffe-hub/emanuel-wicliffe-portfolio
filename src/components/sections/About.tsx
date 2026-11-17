import { Briefcase, Code2, GraduationCap, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.about;
  const facts = [
    { icon: MapPin, label: t.facts.location, value: profile.location[locale] },
    { icon: GraduationCap, label: t.facts.education, value: profile.education[locale] },
    { icon: Code2, label: t.facts.focus, value: t.focusValue },
    { icon: Briefcase, label: t.facts.looking, value: t.lookingValue },
  ];

  return (
    <Section id="about" index="01" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
        <div className="space-y-5">
          {t.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-base leading-relaxed text-fg-muted text-pretty sm:text-lg first:text-fg">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2} className="pt-4">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{t.interestsTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-fg-muted transition-colors hover:border-primary/40 hover:text-fg"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface/70 p-6 shadow-card sm:p-7">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{t.factsTitle}</h3>
            <dl className="space-y-5">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary-soft text-primary-text">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-fg-subtle">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-fg">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

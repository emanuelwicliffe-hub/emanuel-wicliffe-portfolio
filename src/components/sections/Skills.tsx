import { skillCategories, skillNameTranslations, skillStatuses, type SkillStatus } from "@/data/skills";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const statusChip: Record<SkillStatus, string> = {
  used: "border-primary/30 bg-primary-soft text-fg",
  studied: "border-border bg-surface-2/60 text-fg-muted",
  learning: "border-dashed border-accent/40 bg-transparent text-fg-muted",
};

const statusDot: Record<SkillStatus, string> = {
  used: "bg-primary",
  studied: "border border-fg-subtle bg-transparent",
  learning: "bg-accent",
};

export function Skills({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.skills;
  // A legenda só mostra os estados efetivamente usados nos dados.
  const presentStatuses = skillStatuses.filter((status) =>
    skillCategories.some((category) => category.skills.some((skill) => skill.status === status)),
  );

  return (
    <Section id="skills" index="02" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <Reveal className="mb-10">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface/40 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{t.legendTitle}</span>
          {presentStatuses.map((status) => (
            <span key={status} className="flex items-start gap-2.5 text-sm sm:items-center">
              <span aria-hidden="true" className={cn("mt-1.5 size-2 shrink-0 rounded-full sm:mt-0", statusDot[status])} />
              <span>
                <span className="font-medium text-fg">{t.status[status]}</span>
                <span className="text-fg-subtle"> — {t.statusDescription[status]}</span>
              </span>
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Reveal key={category.id} delay={(index % 3) * 0.06}>
            <article className="group h-full rounded-2xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-primary/35">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-fg">{category.title[locale]}</h3>
                <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
                  {String(category.skills.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mb-5 text-sm text-fg-subtle">{category.description[locale]}</p>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[13px] leading-none",
                      statusChip[skill.status],
                    )}
                  >
                    <span aria-hidden="true" className={cn("size-1.5 rounded-full", statusDot[skill.status])} />
                    {skillNameTranslations[skill.name]?.[locale] ?? skill.name}
                    <span className="sr-only"> ({t.status[skill.status]})</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

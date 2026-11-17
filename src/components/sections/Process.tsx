import { FlaskConical, FolderTree, GitBranch, Sparkles } from "lucide-react";
import { principles, processSteps, type Principle } from "@/data/process";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const principleIcon: Record<Principle["id"], typeof GitBranch> = {
  git: GitBranch,
  tests: FlaskConical,
  organization: FolderTree,
  learning: Sparkles,
};

export function Process({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.process;

  return (
    <Section id="process" index="05" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <Reveal as="li" key={step.id} delay={(index % 3) * 0.06} className="group relative bg-bg-elevated p-6 sm:p-7">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
            />
            <span className="font-mono text-sm text-primary-text">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 font-display text-lg font-semibold text-fg">{step.title[locale]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description[locale]}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12">
        <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{t.principlesTitle}</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principleIcon[principle.id];
            return (
              <li key={principle.id} className="rounded-xl border border-border bg-surface/50 p-5">
                <Icon size={20} aria-hidden="true" className="text-primary-text" />
                <p className="mt-3 font-medium text-fg">{principle.title[locale]}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{principle.description[locale]}</p>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}

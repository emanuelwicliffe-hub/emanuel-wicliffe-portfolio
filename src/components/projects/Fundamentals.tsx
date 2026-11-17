import { fundamentals } from "@/data/fundamentals";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";

type FundamentalsProps = {
  locale: Locale;
  labels: Dictionary["projects"]["fundamentals"];
};

/** Projetos académicos e fundamentos — exercícios apresentados como aquilo que são. */
export function Fundamentals({ locale, labels }: FundamentalsProps) {
  return (
    <section aria-labelledby="fundamentals-title" className="mt-20 border-t border-border pt-14 sm:mt-24">
      <Reveal className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">{labels.eyebrow}</p>
        <h3
          id="fundamentals-title"
          className="font-display text-2xl font-semibold tracking-tight text-fg text-balance sm:text-3xl"
        >
          {labels.title}
        </h3>
        <p className="mt-4 leading-relaxed text-fg-muted text-pretty">{labels.intro}</p>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fundamentals.map((area, index) => (
          <Reveal key={area.id} as="li" delay={(index % 3) * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5 transition-colors hover:border-primary/40">
              <h4 className="font-display text-lg font-semibold text-fg">{area.title[locale]}</h4>
              <p className="mt-1 font-mono text-xs text-fg-subtle">{area.context[locale]}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {area.technologies.map((tech) => (
                  <li key={tech}>
                    <Chip tone="primary">{tech}</Chip>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-2.5">
                {area.points[locale].map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

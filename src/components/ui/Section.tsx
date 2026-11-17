import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

/** Estrutura comum das secções da página inicial. */
export function Section({ id, index, eyebrow, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative py-20 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">
            <span className="text-fg-subtle">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg text-balance sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {intro ? <p className="mt-5 text-base leading-relaxed text-fg-muted text-pretty sm:text-lg">{intro}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

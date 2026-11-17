import { ArrowUpRight, BookOpen, Briefcase, FolderGit2, GraduationCap, Wrench } from "lucide-react";
import Link from "next/link";
import { journey, type JourneyKind } from "@/data/experience";
import { getProject } from "@/lib/projects";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const kindIcon: Record<JourneyKind, typeof BookOpen> = {
  work: Briefcase,
  education: GraduationCap,
  practice: Wrench,
  project: FolderGit2,
};

export function Journey({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.journey;

  return (
    <Section id="journey" index="04" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <ol className="relative max-w-3xl">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-primary/60 via-border-strong to-transparent"
        />
        {journey.map((item, index) => {
          const Icon = kindIcon[item.kind];
          const project = item.projectSlug ? getProject(item.projectSlug) : undefined;
          const hasCaseStudy = Boolean(project?.caseStudy);
          return (
            <Reveal as="li" key={item.id} delay={index * 0.05} className="relative pb-10 pl-14 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 flex size-10 items-center justify-center rounded-xl border bg-bg-elevated",
                  item.current ? "border-accent/50 text-accent" : "border-border-strong text-primary-text",
                )}
              >
                <Icon size={18} />
              </span>
              <div className="rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-primary/30 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                    {t.kinds[item.kind]}
                  </span>
                  <span aria-hidden="true" className="text-fg-subtle">
                    ·
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      item.current ? "bg-accent-soft text-accent" : "bg-surface-2 text-fg-muted",
                    )}
                  >
                    {item.status[locale]}
                  </span>
                  {item.period ? (
                    <span className="font-mono text-xs text-fg-subtle">{item.period[locale]}</span>
                  ) : null}
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-fg sm:text-xl">{item.title[locale]}</h3>
                <p className="mt-1 text-sm text-primary-text">{item.organization[locale]}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description[locale]}</p>
                {project && hasCaseStudy ? (
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-text hover:text-primary-strong"
                  >
                    {dict.projects.viewCaseStudy}
                    <span className="sr-only">: {project.name[locale]}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

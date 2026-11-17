"use client";

import { ArrowUpRight, ChevronDown, Info } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import type { Project } from "@/data/projects";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ProjectCover } from "./ProjectCover";
import { StatusBadge } from "./StatusBadge";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  labels: Dictionary["projects"];
  externalLabel: string;
  wide?: boolean;
};

export function ProjectCard({ project, locale, labels, externalLabel, wide }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const caseStudyHref = project.caseStudy ? `/${locale}/projects/${project.slug}` : null;
  const highlights = project.highlights[locale];

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card motion-reduce:hover:translate-y-0",
        wide && "lg:flex-row",
      )}
    >
      <div className={cn("relative border-b border-border", wide && "lg:w-[52%] lg:border-b-0 lg:border-r")}>
        <ProjectCover
          project={project}
          locale={locale}
          className={cn("transition-transform duration-500 group-hover:scale-[1.02]", wide && "lg:h-full lg:min-h-80 lg:aspect-auto")}
          sizes={wide ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
        />
        <StatusBadge
          status={project.status}
          label={labels.status[project.status]}
          className="absolute left-4 top-4 bg-bg/80 backdrop-blur"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{project.type[locale]}</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
          {caseStudyHref ? (
            <Link href={caseStudyHref} className="after:absolute after:inset-0 focus-visible:outline-none">
              <span className="relative">{project.name[locale]}</span>
            </Link>
          ) : (
            project.name[locale]
          )}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{wide ? project.description[locale] : project.summary[locale]}</p>

        {project.notice ? (
          <p className="mt-4 flex gap-2 rounded-lg border border-accent/25 bg-accent-soft px-3 py-2.5 text-xs leading-relaxed text-fg-muted">
            <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <span>{project.notice[locale]}</span>
          </p>
        ) : null}

        {project.technologies.length > 0 ? (
          <div className="mt-5">
            <span className="sr-only">{labels.technologies}: </span>
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Chip>{tech}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {wide ? (
          <ul className="mt-5 grid gap-x-4 gap-y-1.5 text-sm text-fg-muted sm:grid-cols-2">
            {highlights.slice(0, 6).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-6">
          {caseStudyHref ? (
            <span className="relative inline-flex items-center gap-1.5 text-sm font-medium text-primary-text transition-colors group-hover:text-primary-strong">
              {labels.viewCaseStudy}
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                aria-controls={detailsId}
                className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary-text transition-colors hover:text-primary-strong"
              >
                {expanded ? labels.hideDetails : labels.showDetails}
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={cn("transition-transform duration-300", expanded && "rotate-180")}
                />
              </button>
              <div id={detailsId} hidden={!expanded} className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-fg-subtle">{labels.highlights}</p>
                <ul className="space-y-1.5 text-sm text-fg-muted">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ProjectLinks project={project} labels={labels} externalLabel={externalLabel} />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectLinks({
  project,
  labels,
  externalLabel,
}: {
  project: Project;
  labels: Dictionary["projects"];
  externalLabel: string;
}) {
  const { repository, demo } = project.links;
  if (!repository && !demo) {
    return <p className="mt-4 text-xs text-fg-subtle">{labels.noPublicLinks}</p>;
  }
  return (
    <div className="relative mt-4 flex flex-wrap gap-3 text-sm">
      {repository ? (
        <a
          href={repository}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
        >
          <GithubIcon size={16} />
          {labels.repository}
          <span className="sr-only"> ({externalLabel})</span>
        </a>
      ) : null}
      {demo ? (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
          <ArrowUpRight size={16} aria-hidden="true" />
          {labels.demo}
          <span className="sr-only"> ({externalLabel})</span>
        </a>
      ) : null}
    </div>
  );
}

"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { projects } from "@/data/projects";
import { format, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { filterProjects, projectFilters, type ProjectFilter } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

type ProjectExplorerProps = {
  locale: Locale;
  labels: Dictionary["projects"];
  externalLabel: string;
};

export function ProjectExplorer({ locale, labels, externalLabel }: ProjectExplorerProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const visible = filterProjects(projects, filter);
  const countLabel =
    visible.length === 1 ? labels.resultsCountOne : format(labels.resultsCount, { count: visible.length });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label={labels.filtersLabel}
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {projectFilters.map((id) => {
            const active = id === filter;
            const count = filterProjects(projects, id).length;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                  active
                    ? "border-primary-solid bg-primary-solid text-on-primary"
                    : "border-border bg-surface/60 text-fg-muted hover:border-primary/40 hover:text-fg",
                )}
              >
                {labels.filters[id]}
                <span
                  aria-hidden="true"
                  className={cn("font-mono text-[11px]", active ? "text-on-primary/80" : "text-fg-subtle")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="shrink-0 font-mono text-xs text-fg-subtle">
          {countLabel}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-fg-muted">{labels.empty}</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => {
              const wide = project.featured && filter === "all";
              return (
                <m.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("relative", wide && "sm:col-span-2 lg:col-span-3")}
                >
                  <ProjectCard
                    project={project}
                    locale={locale}
                    labels={labels}
                    externalLabel={externalLabel}
                    wide={wide}
                  />
                </m.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

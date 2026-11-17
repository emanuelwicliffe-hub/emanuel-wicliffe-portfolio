import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArchitectureDiagram,
  CheckList,
  FeatureGroups,
  MetricsStrip,
  ScreenshotGallery,
  SecurityGrid,
  StatusBoard,
} from "@/components/projects/CaseStudySections";
import { ProjectLinks } from "@/components/projects/ProjectCard";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { getCaseStudyProjects, getProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((lang) => getCaseStudyProjects().map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project?.caseStudy) return {};
  return buildMetadata({
    locale: lang,
    path: `/projects/${slug}`,
    title: project.name[lang],
    description: project.summary[lang],
  });
}

function Block({ title, children, index }: { title: string; children: ReactNode; index: number }) {
  return (
    <Reveal>
      <section className="border-t border-border pt-8">
        <h2 className="mb-5 flex items-baseline gap-3 font-display text-xl font-semibold text-fg sm:text-2xl">
          <span aria-hidden="true" className="font-mono text-sm text-primary-text">
            {String(index).padStart(2, "0")}
          </span>
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const dict = getDictionary(lang);
  const t = dict.projects;
  const cs = project.caseStudy;
  const others = getCaseStudyProjects().filter((p) => p.slug !== project.slug);

  // Secções do estudo de caso, por ordem; as opcionais só entram quando existem.
  const sections: { key: string; title: string; content: ReactNode }[] = [
    {
      key: "overview",
      title: t.detail.overview,
      content: (
        <div className="space-y-4">
          {cs.overview[lang].map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-fg-muted text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      ),
    },
    ...(cs.architecture
      ? [
          {
            key: "architecture",
            title: t.detail.architecture,
            content: <ArchitectureDiagram architecture={cs.architecture} locale={lang} labels={t.detail} />,
          },
        ]
      : []),
    cs.featureGroups && cs.featureGroups.length > 0
      ? {
          key: "features",
          title: t.detail.featuresImplemented,
          content: <FeatureGroups groups={cs.featureGroups} locale={lang} />,
        }
      : {
          key: "features",
          title: t.detail.features,
          content: (
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.highlights[lang].map((item) => (
                <li key={item} className="rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-fg">
                  {item}
                </li>
              ))}
            </ul>
          ),
        },
    ...(cs.security
      ? [{ key: "security", title: t.detail.security, content: <SecurityGrid items={cs.security[lang]} /> }]
      : []),
    { key: "challenges", title: t.detail.challenges, content: <BulletList items={cs.challenges[lang]} /> },
    ...(cs.quality ? [{ key: "quality", title: t.detail.quality, content: <CheckList items={cs.quality[lang]} /> }] : []),
    ...(cs.currentStatus
      ? [
          {
            key: "status",
            title: t.detail.currentStatus,
            content: <StatusBoard status={cs.currentStatus} locale={lang} labels={t.detail} />,
          },
        ]
      : []),
    { key: "contribution", title: t.detail.contribution, content: <BulletList items={cs.contribution[lang]} /> },
    { key: "learnings", title: t.detail.learnings, content: <BulletList items={cs.learnings[lang]} /> },
  ];

  return (
    <article className="pt-24 pb-20 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}#projects`}
          className="group mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
          {t.detail.back}
        </Link>

        <header className="animate-fade-up max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} label={t.status[project.status]} />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{project.type[lang]}</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-6xl">{project.name[lang]}</h1>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted text-pretty sm:text-xl">{project.description[lang]}</p>
          {project.notice ? (
            <p className="mt-6 flex gap-3 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm leading-relaxed text-fg">
              <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
              {project.notice[lang]}
            </p>
          ) : null}
        </header>

        <figure className="animate-fade-up mt-12 overflow-hidden rounded-2xl border border-border" style={{ animationDelay: "120ms" }}>
          <ProjectCover project={project} locale={lang} priority sizes="(min-width: 1152px) 1152px, 100vw" />
          {!project.cover ? (
            <figcaption className="border-t border-border bg-surface/60 px-4 py-2.5 text-xs text-fg-subtle">
              {t.detail.coverPlaceholder}
            </figcaption>
          ) : null}
        </figure>

        {cs.screenshots && cs.screenshots.length > 0 ? (
          <ScreenshotGallery screenshots={cs.screenshots} locale={lang} label={t.detail.screenshots} />
        ) : null}

        {cs.metrics && cs.metrics.length > 0 ? (
          <MetricsStrip metrics={cs.metrics} note={cs.metricsNote} locale={lang} label={t.detail.metrics} />
        ) : null}

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <Block key={section.key} title={section.title} index={index + 1}>
                {section.content}
              </Block>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6 rounded-2xl border border-border bg-surface/60 p-6">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.detail.state}</dt>
                  <dd className="mt-2">
                    <StatusBadge status={project.status} label={t.status[project.status]} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.detail.type}</dt>
                  <dd className="mt-1 text-fg">{project.type[lang]}</dd>
                </div>
                {project.categories.length > 0 ? (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.detail.category}</dt>
                    <dd className="mt-1 text-fg">{project.categories.map((c) => t.filters[c]).join(" · ")}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.detail.stack}</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <li key={tech}>
                          <Chip tone="primary">{tech}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.detail.focusAreas}</dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5 text-fg-muted">
                      {cs.focusAreas[lang].map((area) => (
                        <li key={area} className="flex gap-2">
                          <span aria-hidden="true" className="text-accent">
                            ▸
                          </span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-fg-subtle">{t.detail.links}</dt>
                  <dd>
                    <ProjectLinks project={project} labels={t} externalLabel={dict.a11y.externalLink} />
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {others.length > 0 ? (
          <nav aria-label={t.detail.otherProjects} className="mt-20 border-t border-border pt-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{t.detail.otherProjects}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/${lang}/projects/${other.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-primary/40"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold text-fg">{other.name[lang]}</span>
                      <span className="mt-1 block text-sm text-fg-muted">{other.summary[lang]}</span>
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary-text"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${lang}#projects`}
                  className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-dashed border-border-strong p-5 text-fg-muted transition-colors hover:border-primary/40 hover:text-fg"
                >
                  {dict.nav.projects}
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </article>
  );
}

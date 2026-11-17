import {
  ArrowDown,
  ArrowRight,
  Building2,
  ChevronRight,
  CircleCheck,
  CircleDashed,
  Database,
  Globe,
  Monitor,
  Server,
  ShieldCheck,
  ShieldUser,
  User,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type {
  ArchitectureLayer,
  FeatureGroup,
  FeatureGroupIcon,
  ProjectArchitecture,
  ProjectCurrentStatus,
  ProjectMetric,
  ProjectScreenshot,
} from "@/data/projects";
import { format, type Dictionary } from "@/i18n";
import type { Locale, Localized } from "@/i18n/config";
import { Chip } from "@/components/ui/Chip";

type DetailLabels = Dictionary["projects"]["detail"];

/* ------------------------------------------------------------------
   Números em destaque
   ------------------------------------------------------------------ */
export function MetricsStrip({
  metrics,
  note,
  locale,
  label,
}: {
  metrics: ProjectMetric[];
  note?: Localized;
  locale: Locale;
  label: string;
}) {
  return (
    <section aria-label={label} className="mt-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.value + metric.label.en}
            className="flex flex-col rounded-2xl border border-border bg-surface/60 p-5 last:col-span-2 sm:last:col-span-1"
          >
            <dt className="mt-2 text-sm leading-snug text-fg-muted">{metric.label[locale]}</dt>
            <dd className="order-first font-display text-3xl font-bold tracking-tight text-primary-text">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-3 text-xs text-fg-subtle">{note[locale]}</p> : null}
    </section>
  );
}

/* ------------------------------------------------------------------
   Arquitetura
   ------------------------------------------------------------------ */
const tierIcons: Record<ArchitectureLayer["tier"], LucideIcon> = {
  client: Monitor,
  server: Server,
  data: Database,
};
const tiers: ArchitectureLayer["tier"][] = ["client", "server", "data"];

function TierArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-primary/70">
      <ArrowDown size={20} className="md:hidden" />
      <ArrowRight size={20} className="hidden md:block" />
    </div>
  );
}

export function ArchitectureDiagram({
  architecture,
  locale,
  labels,
}: {
  architecture: ProjectArchitecture;
  locale: Locale;
  labels: DetailLabels;
}) {
  const columns = tiers
    .map((tier) => ({ tier, layers: architecture.layers.filter((layer) => layer.tier === tier) }))
    .filter((column) => column.layers.length > 0);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {architecture.summary[locale].map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-fg-muted text-pretty">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-4 sm:p-6">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
          {columns.map((column, index) => {
            const Icon = tierIcons[column.tier];
            return (
              <div key={column.tier} className="contents">
                {index > 0 ? <TierArrow /> : null}
                <div className="space-y-3">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                    <Icon size={14} aria-hidden="true" className="text-accent" />
                    {labels.architectureTiers[column.tier]}
                  </p>
                  {column.layers.map((layer) => (
                    <div
                      key={layer.path}
                      className="rounded-xl border border-primary/25 bg-bg-elevated/80 p-4 shadow-card backdrop-blur-sm"
                    >
                      <p className="font-display font-semibold text-fg">{layer.name[locale]}</p>
                      <p className="mt-0.5 font-mono text-xs text-primary-text">{layer.path}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{layer.role[locale]}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {layer.technologies.map((tech) => (
                          <li key={tech}>
                            <Chip>{tech}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">{labels.requestFlow}</p>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {architecture.requestFlow[locale].map((step, index) => (
            <li key={step} className="flex items-center gap-1.5">
              {index > 0 ? <ChevronRight size={14} aria-hidden="true" className="text-fg-subtle" /> : null}
              <Chip tone={index === 0 ? "accent" : "primary"}>{step}</Chip>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Funcionalidades por perfil
   ------------------------------------------------------------------ */
const groupIcons: LucideIcon[] = [User, Building2, ShieldUser];
const namedGroupIcons: Record<FeatureGroupIcon, LucideIcon> = {
  user: User,
  company: Building2,
  admin: ShieldUser,
  web: Globe,
  check: CircleCheck,
  plan: CircleDashed,
};

export function FeatureGroups({ groups, locale }: { groups: FeatureGroup[]; locale: Locale }) {
  return (
    <div className="space-y-4">
      {groups.map((group, index) => {
        const Icon = group.icon ? namedGroupIcons[group.icon] : groupIcons[index % groupIcons.length];
        return (
          <div key={group.title.en} className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-3 font-display text-lg font-semibold text-fg">
              <span className="grid size-9 place-items-center rounded-lg border border-primary/30 bg-primary-soft text-primary-text">
                <Icon size={18} aria-hidden="true" />
              </span>
              {group.title[locale]}
            </h3>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {group.items[locale].map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------
   Segurança e qualidade
   ------------------------------------------------------------------ */
export function SecurityGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-border bg-surface/50 p-4 text-sm leading-relaxed text-fg-muted transition-colors hover:border-primary/40"
        >
          <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-text" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
          <CircleCheck size={18} aria-hidden="true" className="mt-1 shrink-0 text-success" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------
   Estado atual
   ------------------------------------------------------------------ */
function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function StatusBoard({
  status,
  locale,
  labels,
}: {
  status: ProjectCurrentStatus;
  locale: Locale;
  labels: DetailLabels;
}) {
  const columns = [
    { title: labels.statusDone, items: status.done[locale], Icon: CircleCheck, tone: "text-success" },
    { title: labels.statusNext, items: status.next[locale], Icon: CircleDashed, tone: "text-accent" },
  ];
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {columns.map(({ title, items, Icon, tone }) => (
          <div key={title} className="rounded-2xl border border-border bg-surface/50 p-5">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
              <Icon size={15} aria-hidden="true" className={tone} />
              {title}
            </h3>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                  <Icon size={15} aria-hidden="true" className={`mt-0.5 shrink-0 ${tone}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-fg-subtle">
        {format(labels.statusUpdated, { date: formatDate(status.updated, locale) })}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Capturas de ecrã (só aparecem quando existirem imagens reais)
   ------------------------------------------------------------------ */
export function ScreenshotGallery({
  screenshots,
  locale,
  label,
}: {
  screenshots: ProjectScreenshot[];
  locale: Locale;
  label: string;
}) {
  if (screenshots.length === 0) return null;
  return (
    <section aria-label={label} className="mt-6">
      <ul className="grid gap-4 sm:grid-cols-2">
        {screenshots.map((shot) => (
          <li key={shot.src}>
            <figure className="overflow-hidden rounded-2xl border border-border bg-surface/50">
              <div className="relative aspect-[16/9] bg-surface-2">
                <Image
                  src={shot.src}
                  alt={shot.alt[locale]}
                  fill
                  sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-border px-4 py-2.5 text-xs text-fg-subtle">
                {shot.caption[locale]}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/cn";

const styles: Record<ProjectStatus, { badge: string; dot: string }> = {
  "in-development": { badge: "border-accent/35 bg-accent-soft text-accent", dot: "bg-accent" },
  academic: { badge: "border-primary/30 bg-primary-soft text-primary-text", dot: "bg-primary" },
  collaborative: { badge: "border-primary/40 bg-primary/10 text-fg", dot: "bg-primary-strong" },
  prototype: { badge: "border-border-strong bg-surface-2 text-fg-muted", dot: "bg-accent" },
  delivered: { badge: "border-success/30 bg-success/10 text-success", dot: "bg-success" },
};

export function StatusBadge({ status, label, className }: { status: ProjectStatus; label: string; className?: string }) {
  const style = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        style.badge,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", style.dot)} />
      {label}
    </span>
  );
}

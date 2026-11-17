import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "primary" | "accent";
};

export function Chip({ children, className, tone = "default" }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs leading-none",
        tone === "default" && "border-border bg-surface-2/60 text-fg-muted",
        tone === "primary" && "border-primary/30 bg-primary-soft text-primary-text",
        tone === "accent" && "border-accent/30 bg-accent-soft text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

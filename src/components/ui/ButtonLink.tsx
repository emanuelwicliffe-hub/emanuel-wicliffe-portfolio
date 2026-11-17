import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-solid text-on-primary hover:bg-primary-deep shadow-[0_10px_30px_-12px_var(--glow)] hover:shadow-[0_14px_36px_-12px_var(--glow)]",
  secondary: "border border-border-strong bg-surface/60 text-fg hover:border-primary/60 hover:bg-surface",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface-2",
};

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}

type ExternalButtonProps = ComponentProps<"a"> & { variant?: Variant };

/** Para ficheiros (ex.: CV) e ligações externas, que não devem usar next/link. */
export function ExternalButton({ variant = "secondary", className, children, ...props }: ExternalButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

type ProfileAvatarProps = {
  alt: string;
  monogramAlt: string;
  className?: string;
  priority?: boolean;
};

/** Fotografia profissional (quando configurada) ou monograma. */
export function ProfileAvatar({ alt, monogramAlt, className, priority }: ProfileAvatarProps) {
  if (profile.photo) {
    return (
      <div
        className={cn(
          // Borda violeta subtil e brilho lilás; a fotografia mantém as proporções (object-cover, sem esticar).
          "relative overflow-hidden rounded-2xl border border-primary/40 bg-surface-2 shadow-[0_0_28px_-8px_var(--primary)] ring-1 ring-accent/20 ring-offset-2 ring-offset-bg",
          className,
        )}
      >
        <Image
          src={profile.photo}
          alt={alt}
          fill
          priority={priority}
          sizes="80px"
          quality={85}
          className="object-cover object-[50%_25%]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={monogramAlt}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-surface-2 to-bg",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <span aria-hidden="true" className="relative font-display text-3xl font-semibold tracking-tight text-fg">
        E<span className="text-primary-text">W</span>
      </span>
      <span aria-hidden="true" className="absolute bottom-2 right-2 size-1.5 rounded-full bg-accent" />
    </div>
  );
}

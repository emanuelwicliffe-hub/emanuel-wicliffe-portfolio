import { ArrowUp, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer({ dict }: { dict: Pick<Dictionary, "footer" | "a11y" | "contact"> }) {
  const { github, linkedin, email } = siteConfig.social;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="font-display text-sm font-semibold text-fg">{siteConfig.name}</p>
          <p className="text-xs text-fg-subtle">
            © {siteConfig.copyrightYear} {siteConfig.name}. {dict.footer.rights} {dict.footer.builtWith}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {email ? (
            <a
              href={`mailto:${email}`}
              aria-label={dict.contact.email}
              className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          ) : null}
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub (${dict.a11y.externalLink})`}
              className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <GithubIcon size={18} />
            </a>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn (${dict.a11y.externalLink})`}
              className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <LinkedinIcon size={18} />
            </a>
          ) : null}
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-fg-muted transition-colors hover:border-primary/50 hover:text-fg"
          >
            <ArrowUp size={14} aria-hidden="true" />
            {dict.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}

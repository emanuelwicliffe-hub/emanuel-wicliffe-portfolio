"use client";

import { Menu, SquareTerminal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Terminal } from "@/components/terminal/Terminal";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { sectionIds, type SectionId } from "@/lib/sections";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "a11y" | "terminal">;
};

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const home = `/${locale}`;
  const isHome = pathname === home;
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  // Sombra do cabeçalho após scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Realça a secção visível na navegação.
  useEffect(() => {
    if (!isHome) return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Fecha o menu móvel com Esc.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = sectionIds.map((id) => ({ id, href: `${home}#${id}`, label: dict.nav[id] }));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || menuOpen
            ? "border-border bg-bg/85 shadow-[0_8px_30px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href={home}
            className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex size-8 items-center justify-center rounded-lg border border-primary/40 bg-primary-soft font-mono text-xs text-primary-text transition-colors group-hover:border-primary">
              EW
            </span>
            <span className="hidden sm:inline">Emanuel Wicliffe</span>
            <span className="sr-only sm:hidden">Emanuel Wicliffe — {dict.nav.home}</span>
          </Link>

          <nav aria-label={dict.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    aria-current={isHome && active === link.id ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors hover:text-fg",
                      isHome && active === link.id ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {link.label}
                    {isHome && active === link.id ? (
                      <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-px bg-primary" />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              aria-label={dict.terminal.open}
              title={dict.terminal.open}
              className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-2 hover:text-primary-text"
            >
              <SquareTerminal size={18} aria-hidden="true" />
            </button>
            <ThemeToggle
              labels={{ toggle: dict.a11y.toggleTheme, dark: dict.a11y.themeDark, light: dict.a11y.themeLight }}
            />
            <LocaleSwitch locale={locale} label={dict.a11y.switchLanguage} className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
              className="inline-flex size-10 items-center justify-center rounded-lg text-fg transition-colors hover:bg-surface-2 lg:hidden"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="border-t border-border bg-bg/95 backdrop-blur-md lg:hidden"
        >
          <nav aria-label={dict.a11y.mainNav} className="mx-auto max-w-6xl px-4 pb-6 pt-2 sm:px-6">
            <ul className="divide-y divide-border">
              {links.map((link, index) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-lg text-fg transition-colors hover:text-primary-text"
                  >
                    {link.label}
                    <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
                      0{index + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between sm:hidden">
              <LocaleSwitch locale={locale} label={dict.a11y.switchLanguage} />
            </div>
          </nav>
        </div>
      </header>

      <Terminal
        locale={locale}
        labels={dict.terminal}
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}

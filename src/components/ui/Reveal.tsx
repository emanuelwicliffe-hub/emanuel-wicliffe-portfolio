"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Anima a entrada de um bloco quando este entra no ecrã.
 *
 * Melhoria progressiva: o conteúdo só fica escondido quando o JavaScript
 * está ativo (classe `js` no <html>) e existe uma salvaguarda em CSS que o
 * mostra de qualquer forma. Respeita `prefers-reduced-motion`.
 */
export function Reveal({ children, className, delay = 0, as: Component = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as never}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
}

"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Carrega apenas as funcionalidades de animação necessárias (LazyMotion)
 * e respeita a preferência do sistema por menos movimento.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  // Sinaliza que a aplicação hidratou (desativa a salvaguarda CSS do Reveal).
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

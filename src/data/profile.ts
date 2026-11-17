import type { Localized } from "@/i18n/config";

export type Profile = {
  name: string;
  /** Primeiro e último nome separados, usados na tipografia do hero. */
  firstName: string;
  lastName: string;
  role: Localized;
  location: Localized;
  /**
   * Fotografia profissional dentro de /public. Ex.: "/images/profile.jpg".
   * Enquanto for `null`, é mostrado um monograma.
   */
  photo: string | null;
  education: Localized;
  /** Projeto em que estou a trabalhar neste momento (slug de projects.ts). */
  currentProjectSlug: string | null;
};

export const profile: Profile = {
  name: "Emanuel Wicliffe",
  firstName: "Emanuel",
  lastName: "Wicliffe",
  role: {
    pt: "Desenvolvedor de Software · Full-Stack",
    en: "Software Developer · Full-Stack",
  },
  location: {
    pt: "Leiria, Portugal",
    en: "Leiria, Portugal",
  },
  photo: null,
  education: {
    pt: "Bacharel em Ciência da Computação (FAPAN) · TPSI nível 5 (IEFP Leiria)",
    en: "BSc in Computer Science (FAPAN) · Level 5 TPSI programme (IEFP Leiria)",
  },
  currentProjectSlug: "parttime",
};

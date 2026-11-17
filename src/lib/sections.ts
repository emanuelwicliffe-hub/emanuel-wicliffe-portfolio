/** Secções da página inicial (ids usados nas âncoras e no terminal). */
export const sectionIds = ["about", "skills", "projects", "journey", "process", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

export function isSectionId(value: string): value is SectionId {
  return (sectionIds as readonly string[]).includes(value);
}

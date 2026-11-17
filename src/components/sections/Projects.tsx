import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { Fundamentals } from "@/components/projects/Fundamentals";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { Section } from "@/components/ui/Section";

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.projects;
  return (
    <Section id="projects" index="03" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <ProjectExplorer locale={locale} labels={t} externalLabel={dict.a11y.externalLink} />
      <Fundamentals locale={locale} labels={t.fundamentals} />
    </Section>
  );
}

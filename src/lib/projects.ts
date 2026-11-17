import { projects, type Project } from "@/data/projects";

export const projectFilters = ["all", "web", "backend", "mobile", "inProgress"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "inProgress":
      return project.status === "in-development";
    default:
      return project.categories.includes(filter);
  }
}

export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  return list.filter((project) => matchesFilter(project, filter));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projetos com página individual (estudo de caso). */
export function getCaseStudyProjects(): Project[] {
  return projects.filter((project) => project.caseStudy !== undefined);
}

export function hasPublicLinks(project: Project): boolean {
  return Boolean(project.links.repository || project.links.demo);
}

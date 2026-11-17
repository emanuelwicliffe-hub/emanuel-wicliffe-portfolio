import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { filterProjects, getCaseStudyProjects, getProject, projectFilters } from "@/lib/projects";

const slugs = (filter: Parameters<typeof filterProjects>[1]) => filterProjects(projects, filter).map((p) => p.slug);

describe("filtros de projetos", () => {
  it("inclui apenas filtros com projetos reais", () => {
    expect(projectFilters).toEqual(["all", "web", "backend", "mobile", "inProgress"]);
  });

  it("'Todos' mostra todos os projetos, ordenados por relevância", () => {
    expect(slugs("all")).toEqual(["parttime", "pontal-awards", "partilhalocal", "barberpa", "digidex", "heromatch"]);
  });

  it("filtra por categoria", () => {
    expect(slugs("web")).toEqual(["parttime", "pontal-awards", "partilhalocal", "barberpa", "heromatch"]);
    expect(slugs("backend")).toEqual(["parttime", "pontal-awards"]);
    expect(slugs("mobile")).toEqual(["digidex"]);
  });

  it("'Em desenvolvimento' mostra apenas projetos com esse estado", () => {
    expect(slugs("inProgress")).toEqual(["parttime", "partilhalocal"]);
  });

  it("projetos excluídos não aparecem", () => {
    for (const slug of ["e-commerce", "health-app-concept", "java-applications", "csharp-applications", "python-nlp-ai"]) {
      expect(getProject(slug)).toBeUndefined();
    }
  });

  it("todos os filtros têm pelo menos um projeto", () => {
    for (const filter of projectFilters) expect(slugs(filter).length).toBeGreaterThan(0);
  });

  it("getProject e estudos de caso", () => {
    expect(getProject("parttime")?.name.pt).toBe("Parttime");
    expect(getProject("nao-existe")).toBeUndefined();
    expect(getCaseStudyProjects().map((p) => p.slug)).toContain("parttime");
  });
});

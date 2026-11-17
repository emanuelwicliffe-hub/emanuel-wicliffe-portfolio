import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ArchitectureDiagram,
  FeatureGroups,
  MetricsStrip,
  ScreenshotGallery,
  StatusBoard,
} from "@/components/projects/CaseStudySections";
import { Fundamentals } from "@/components/projects/Fundamentals";
import { fundamentals } from "@/data/fundamentals";
import { projects } from "@/data/projects";
import { getDictionary } from "@/i18n";

const parttime = projects.find((p) => p.slug === "parttime")!;
const cs = parttime.caseStudy!;

describe("projetos académicos e fundamentos", () => {
  it("têm o mesmo conteúdo em pt e en e tecnologias declaradas", () => {
    for (const area of fundamentals) {
      expect(area.points.pt.length).toBeGreaterThan(0);
      expect(area.points.pt.length).toBe(area.points.en.length);
      expect(area.technologies.length).toBeGreaterThan(0);
      expect(area.title.en.trim()).not.toBe("");
    }
  });

  it("mostra todas as áreas com título e tecnologias", () => {
    render(<Fundamentals locale="en" labels={getDictionary("en").projects.fundamentals} />);
    expect(screen.getByRole("heading", { level: 3, name: "Academic projects and fundamentals" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(fundamentals.length);
    expect(screen.getByText("NLTK")).toBeInTheDocument();
  });
});

describe("secções do estudo de caso do Parttime", () => {
  it("mostra todas as camadas da arquitetura e o percurso do pedido", () => {
    render(<ArchitectureDiagram architecture={cs.architecture!} locale="pt" labels={getDictionary("pt").projects.detail} />);
    for (const layer of cs.architecture!.layers) expect(screen.getByText(layer.path)).toBeInTheDocument();
    expect(screen.getByText("Validação Zod")).toBeInTheDocument();
  });

  it("mostra as funcionalidades agrupadas por perfil", () => {
    render(<FeatureGroups groups={cs.featureGroups!} locale="en" />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Candidate",
      "Company",
      "Administration",
    ]);
  });

  it("mostra os números com a respetiva legenda", () => {
    render(<MetricsStrip metrics={cs.metrics!} note={cs.metricsNote} locale="pt" label="Em números" />);
    const region = screen.getByRole("region", { name: "Em números" });
    expect(within(region).getByText("62")).toBeInTheDocument();
    expect(within(region).getByText(cs.metricsNote!.pt)).toBeInTheDocument();
  });

  it("formata a data do estado atual no idioma da página", () => {
    render(<StatusBoard status={cs.currentStatus!} locale="pt" labels={getDictionary("pt").projects.detail} />);
    expect(screen.getByText(/9 de novembro de 2026/)).toBeInTheDocument();
    expect(screen.getByText("Próximos passos")).toBeInTheDocument();
  });

  it("não mostra a galeria enquanto não existirem capturas reais", () => {
    const { container } = render(<ScreenshotGallery screenshots={cs.screenshots ?? []} locale="pt" label="Capturas" />);
    expect(container).toBeEmptyDOMElement();
  });
});

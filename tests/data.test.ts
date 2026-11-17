import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { journey } from "@/data/experience";
import { principles, processSteps } from "@/data/process";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { locales } from "@/i18n/config";

function localizedStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(localizedStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(localizedStrings);
  return [];
}

function isLocalizedComplete(value: Record<string, unknown>): boolean {
  return locales.every((locale) => locale in value);
}

const isHttpsUrl = (value: string) => /^https:\/\/[^\s]+$/.test(value);

describe("projetos", () => {
  it("têm slugs únicos e válidos para URL", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("têm todos os textos em pt e en, sem vazios", () => {
    for (const project of projects) {
      for (const field of [project.name, project.type, project.summary, project.description, project.highlights]) {
        expect(isLocalizedComplete(field)).toBe(true);
      }
      expect(project.highlights.pt.length).toBe(project.highlights.en.length);
      for (const text of localizedStrings(project)) expect(text.trim()).not.toBe("");
    }
  });

  it("não têm links falsos: apenas null ou URLs https", () => {
    for (const { links } of projects) {
      for (const url of [links.repository, links.demo]) {
        if (url !== null) expect(isHttpsUrl(url)).toBe(true);
      }
    }
  });

  it("o Parttime está marcado como em desenvolvimento e com aviso de não estar público", () => {
    const parttime = projects.find((p) => p.slug === "parttime");
    expect(parttime?.status).toBe("in-development");
    expect(parttime?.notice?.pt).toMatch(/ainda não está disponível/);
    expect(parttime?.links.demo).toBeNull();
  });

  it("projetos com limitações importantes têm aviso e estado fiel", () => {
    const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!;
    expect(bySlug("pontal-awards").status).toBe("collaborative");
    expect(bySlug("pontal-awards").notice?.pt).toMatch(/não fui o único programador/);
    expect(bySlug("barberpa").status).toBe("prototype");
    expect(bySlug("barberpa").notice?.pt).toMatch(/não tem backend/);
    expect(bySlug("partilhalocal").notice?.pt).toMatch(/ainda não estão implementadas/);
    expect(bySlug("heromatch").notice?.pt).toMatch(/não criam contas/);
    expect(bySlug("digidex").status).toBe("academic");
  });

  it("o PartilhaLocal avisa que o repositório público não é a versão completa", () => {
    const partilha = projects.find((p) => p.slug === "partilhalocal")!;
    expect(partilha.notice?.pt).toMatch(/não é a versão completa/);
    expect(partilha.notice?.en).toMatch(/not the complete version/);
    expect(partilha.notice?.pt).toMatch(/Flask/);
  });

  it("o Pontal Awards não afirma publicação, entrega nem nomeia o cliente", () => {
    const pontal = projects.find((p) => p.slug === "pontal-awards")!;
    const text = localizedStrings(pontal).join("\n");
    expect(pontal.status).toBe("collaborative");
    expect(pontal.links).toEqual({ repository: null, demo: null });
    expect(text).not.toMatch(/pine hill|publicad|entregue|em produção|published|delivered|live site/i);
    const item = journey.find((j) => j.projectSlug === "pontal-awards")!;
    expect(localizedStrings(item).join(" ")).not.toMatch(/realizado|completed|entregue|delivered/i);
  });

  it("só têm link de repositório projetos com repositório público verificado", () => {
    const withRepo = projects.filter((p) => p.links.repository).map((p) => p.slug);
    expect(withRepo).toEqual(["partilhalocal"]);
  });

  it("nenhum projeto expõe endereços privados, e-mails ou segredos", () => {
    for (const project of projects) {
      const text = localizedStrings({ ...project, links: null }).join("\n");
      expect(text).not.toMatch(/ts\.net|tailscale|localhost|127\.0\.0\.1|@[a-z0-9-]+\.[a-z]{2,}|password=|secret=/i);
    }
  });

  it("não apresenta tecnologias sem evidência", () => {
    const all = JSON.stringify(projects).toLowerCase() + JSON.stringify(skillCategories).toLowerCase();
    expect(all).not.toMatch(/spacy|árvores de decisão|decision tree|shopk/);
  });

  it("estudos de caso têm conteúdo completo nos dois idiomas", () => {
    for (const project of projects.filter((p) => p.caseStudy)) {
      const cs = project.caseStudy!;
      for (const section of [cs.overview, cs.focusAreas, cs.challenges, cs.contribution, cs.learnings]) {
        expect(section.pt.length).toBeGreaterThan(0);
        expect(section.pt.length).toBe(section.en.length);
      }
    }
  });

  it("secções opcionais dos estudos de caso têm o mesmo conteúdo em pt e en", () => {
    for (const project of projects.filter((p) => p.caseStudy)) {
      const cs = project.caseStudy!;
      const lists = [
        cs.security,
        cs.quality,
        cs.architecture?.summary,
        cs.architecture?.requestFlow,
        cs.currentStatus?.done,
        cs.currentStatus?.next,
        ...(cs.featureGroups ?? []).map((group) => group.items),
      ];
      for (const list of lists) {
        if (!list) continue;
        expect(list.pt.length).toBeGreaterThan(0);
        expect(list.pt.length).toBe(list.en.length);
      }
      if (cs.currentStatus) expect(cs.currentStatus.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const shot of cs.screenshots ?? []) {
        expect(shot.src.startsWith(`/images/projects/${project.slug}/`)).toBe(true);
      }
    }
  });

  it("o Parttime não expõe endereços privados nem segredos", () => {
    const parttime = projects.find((p) => p.slug === "parttime")!;
    const text = localizedStrings(parttime).join("\n");
    expect(text).not.toMatch(/ts\.net|tailscale|localhost|127\.0\.0\.1|@[a-z0-9-]+\.[a-z]{2,}|password=|secret=/i);
    expect(parttime.links.repository).toBeNull();
    expect(parttime.caseStudy?.contribution.pt.join(" ")).toMatch(/Claude Code e Codex/);
  });

  it("imagens de capa configuradas apontam para /public", () => {
    for (const project of projects) {
      if (project.cover) expect(project.cover.src.startsWith("/")).toBe(true);
    }
  });
});

describe("perfil, percurso e competências", () => {
  it("o projeto atual do perfil existe", () => {
    if (profile.currentProjectSlug) {
      expect(projects.some((p) => p.slug === profile.currentProjectSlug)).toBe(true);
    }
  });

  it("o percurso referencia apenas projetos existentes e só tem datas no campo do período", () => {
    for (const item of journey) {
      if (item.projectSlug) expect(projects.some((p) => p.slug === item.projectSlug)).toBe(true);
      for (const text of localizedStrings({ ...item, period: undefined })) expect(text).not.toMatch(/\b(19|20)\d{2}\b/);
    }
  });

  it("o estágio reflete o CV sem exagerar o papel nem afirmar publicação", () => {
    const internship = journey.find((j) => j.id === "pine-hill-internship")!;
    expect(internship.kind).toBe("work");
    expect(internship.organization.pt).toMatch(/Pine Hill International/);
    expect(internship.period?.pt).toMatch(/05\/09\/2026/);
    const text = localizedStrings(internship).join(" ");
    expect(text).toMatch(/em equipa/);
    expect(text).not.toMatch(/único|sole|toda a arquitetura|publicad|published|entregue|delivered/i);
  });

  it("a formação tem as datas do CV e o TPSI sem data final", () => {
    const byId = (id: string) => journey.find((j) => j.id === id)!;
    expect(byId("fapan").period?.pt).toBe("30/01/2015 – 30/06/2019");
    expect(byId("tpsi").period?.pt).toBe("Início a 24/11/2025");
    expect(byId("tpsi").status.pt).toBe("Em fase de conclusão");
  });

  it("a formação não afirma equivalências nem reconhecimento do diploma", () => {
    const text = journey
      .filter((j) => j.kind === "education")
      .flatMap((j) => localizedStrings(j))
      .join(" ");
    expect(text).not.toMatch(/reconhecimento|recognition|equivalência|equivalence/i);
  });

  it("competências não têm duplicados dentro da mesma categoria", () => {
    for (const category of skillCategories) {
      const names = category.skills.map((s) => s.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("Postman não aparece enquanto não for confirmado", () => {
    const all = skillCategories.flatMap((c) => c.skills.map((s) => s.name.toLowerCase()));
    expect(all).not.toContain("postman");
  });

  it("processo tem as 6 etapas e princípios traduzidos", () => {
    expect(processSteps).toHaveLength(6);
    for (const item of [...processSteps, ...principles]) {
      expect(isLocalizedComplete(item.title)).toBe(true);
      expect(isLocalizedComplete(item.description)).toBe(true);
    }
  });
});

describe("configuração do site", () => {
  it("links sociais são null ou URLs válidos", () => {
    const { github, linkedin, email } = siteConfig.social;
    if (github) expect(github).toMatch(/^https:\/\/(www\.)?github\.com\/[^/\s]+\/?$/);
    if (linkedin) expect(linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\/[^/\s]+\/?$/);
    if (email) expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("usa os contactos oficiais", () => {
    expect(siteConfig.social).toEqual({
      github: "https://github.com/emanuelwicliffe-hub",
      linkedin: "https://www.linkedin.com/in/emanuel-moura-29818041a/",
      email: "emanuelwicliffe@gmail.com",
    });
    const all = JSON.stringify(siteConfig) + JSON.stringify(profile);
    expect(all).not.toMatch(/emanuelmoura@gmail\.com/);
  });

  it("o CV e a fotografia, quando configurados, existem em /public", () => {
    const publicDir = path.join(process.cwd(), "public");
    if (siteConfig.cv.file) {
      expect(siteConfig.cv.file).toMatch(/^\/cv\/.+\.pdf$/);
      expect(fs.existsSync(path.join(publicDir, siteConfig.cv.file))).toBe(true);
    }
    if (profile.photo) {
      expect(profile.photo).toMatch(/^\/images\/.+\.(jpe?g|png|webp|avif)$/);
      expect(fs.existsSync(path.join(publicDir, profile.photo))).toBe(true);
    }
  });

  it("o perfil público não inclui telefone, morada completa nem data de nascimento", () => {
    const all = JSON.stringify(siteConfig) + JSON.stringify(profile) + JSON.stringify(journey);
    expect(all).not.toMatch(/\+351|\b9\d{2}\s?\d{3}\s?\d{3}\b|rua |avenida|código postal|\b\d{4}-\d{3}\b|nascimento|birth/i);
  });
});

import { describe, expect, it } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";
import { format, getDictionary, isLocale, pickLocale } from "@/i18n";
import { swapLocale } from "@/lib/locale-path";

/** Lista todos os caminhos de chaves de um objeto (inclui o tamanho dos arrays). */
function shape(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => shape(child, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("dicionários", () => {
  it("pt e en têm exatamente a mesma estrutura", () => {
    expect(shape(en)).toEqual(shape(pt));
  });

  it("não têm textos vazios", () => {
    for (const dict of [pt, en]) {
      for (const text of strings(dict)) expect(text.trim()).not.toBe("");
    }
  });

  it("os textos em inglês são traduzidos (não iguais ao português)", () => {
    expect(en.hero.headline).not.toBe(pt.hero.headline);
    expect(en.about.paragraphs).not.toEqual(pt.about.paragraphs);
    expect(en.contact.intro).not.toBe(pt.contact.intro);
  });

  it("getDictionary devolve o idioma pedido", () => {
    expect(getDictionary("pt").nav.projects).toBe("Projetos");
    expect(getDictionary("en").nav.projects).toBe("Projects");
  });
});

describe("utilitários de idioma", () => {
  it("isLocale valida idiomas suportados", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("pickLocale usa o Accept-Language com português por omissão", () => {
    expect(pickLocale(null)).toBe("pt");
    expect(pickLocale("fr-FR,fr;q=0.9")).toBe("pt");
    expect(pickLocale("en-GB,en;q=0.9,pt;q=0.8")).toBe("en");
    expect(pickLocale("pt-PT,pt;q=0.9,en;q=0.8")).toBe("pt");
    expect(pickLocale("de;q=0.9,en;q=0.5")).toBe("en");
  });

  it("format substitui marcadores", () => {
    expect(format("{count} projetos", { count: 3 })).toBe("3 projetos");
    expect(format("sem {x}", {})).toBe("sem {x}");
  });

  it("swapLocale mantém o caminho ao trocar de idioma", () => {
    expect(swapLocale("/pt", "en")).toBe("/en");
    expect(swapLocale("/pt/projects/parttime", "en")).toBe("/en/projects/parttime");
    expect(swapLocale("/en/projects/barberpa", "pt")).toBe("/pt/projects/barberpa");
    expect(swapLocale("/", "en")).toBe("/en");
  });
});

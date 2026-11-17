import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { runCommand, terminalCommands } from "@/lib/terminal";

const noSocial = { github: null, linkedin: null, email: null };

describe("terminal", () => {
  it("help lista todos os comandos", () => {
    const { lines, action } = runCommand("help", "pt");
    expect(action.type).toBe("none");
    expect(lines).toHaveLength(terminalCommands.length);
    for (const command of terminalCommands) {
      expect(lines.some((line) => line.text.startsWith(command))).toBe(true);
    }
  });

  it("é insensível a maiúsculas e espaços", () => {
    expect(runCommand("  HELP  ", "en").lines.length).toBe(terminalCommands.length);
  });

  it("about mostra nome e localização", () => {
    const text = runCommand("about", "pt").lines.map((l) => l.text).join("\n");
    expect(text).toContain("Emanuel Wicliffe");
    expect(text).toContain("Leiria");
  });

  it("projects lista todos os projetos com estado traduzido", () => {
    const pt = runCommand("projects", "pt").lines;
    const en = runCommand("projects", "en").lines;
    expect(pt).toHaveLength(projects.length);
    expect(pt[0].text).toContain("Em desenvolvimento");
    expect(en[0].text).toContain("In development");
  });

  it("skills lista categorias", () => {
    const text = runCommand("skills", "en").lines.map((l) => l.text).join("\n");
    expect(text).toContain("Languages");
    expect(text).toContain("TypeScript");
  });

  it("contact indica canais em configuração quando não existem", () => {
    const lines = runCommand("contact", "pt", noSocial).lines;
    expect(lines.some((l) => l.kind === "muted")).toBe(true);
  });

  it("contact mostra os canais configurados", () => {
    const text = runCommand("contact", "en", {
      github: "https://github.com/exemplo",
      linkedin: null,
      email: "nome@exemplo.pt",
    })
      .lines.map((l) => l.text)
      .join("\n");
    expect(text).toContain("nome@exemplo.pt");
    expect(text).toContain("https://github.com/exemplo");
    expect(text).not.toContain("LinkedIn");
  });

  it("goto navega apenas para secções válidas", () => {
    expect(runCommand("goto projects", "pt").action).toEqual({ type: "goto", section: "projects" });
    expect(runCommand("cd #contact", "pt").action).toEqual({ type: "goto", section: "contact" });
    const invalid = runCommand("goto nowhere", "pt");
    expect(invalid.action.type).toBe("none");
    expect(invalid.lines[0].kind).toBe("error");
  });

  it("clear e exit devolvem as ações certas", () => {
    expect(runCommand("clear", "pt").action.type).toBe("clear");
    expect(runCommand("exit", "pt").action.type).toBe("close");
  });

  it("comandos desconhecidos devolvem erro", () => {
    const result = runCommand("sudo rm -rf", "pt");
    expect(result.lines[0].kind).toBe("error");
    expect(result.lines[0].text).toContain("sudo");
  });

  it("entrada vazia não produz output", () => {
    expect(runCommand("   ", "pt").lines).toHaveLength(0);
  });
});

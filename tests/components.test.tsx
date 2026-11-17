import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { Contact } from "@/components/sections/Contact";
import { Terminal } from "@/components/terminal/Terminal";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { getDictionary } from "@/i18n";

const pt = getDictionary("pt");
const en = getDictionary("en");

describe("ProjectExplorer", () => {
  it("mostra todos os projetos e filtra ao clicar", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer locale="pt" labels={pt.projects} externalLabel={pt.a11y.externalLink} />);

    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    const allButton = screen.getByRole("button", { name: /Todos/ });
    expect(allButton).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /Em desenvolvimento/ }));
    expect(screen.getByRole("button", { name: /Em desenvolvimento/ })).toHaveAttribute("aria-pressed", "true");
    expect(await screen.findByRole("status")).toHaveTextContent("2 projetos");
  });

  it("liga os projetos com estudo de caso à respetiva página", () => {
    render(<ProjectExplorer locale="en" labels={en.projects} externalLabel={en.a11y.externalLink} />);
    expect(screen.getByRole("link", { name: "Parttime" })).toHaveAttribute("href", "/en/projects/parttime");
  });

  it("todos os projetos atuais ligam ao respetivo estudo de caso", () => {
    render(<ProjectExplorer locale="pt" labels={pt.projects} externalLabel={pt.a11y.externalLink} />);
    for (const project of projects) {
      expect(screen.getByRole("link", { name: project.name.pt })).toHaveAttribute("href", `/pt/projects/${project.slug}`);
    }
  });

  it("expande os detalhes de um projeto sem estudo de caso", async () => {
    const user = userEvent.setup();
    const base = projects.find((p) => p.slug === "heromatch")!;
    const project = { ...base, caseStudy: undefined };
    render(<ProjectCard project={project} locale="pt" labels={pt.projects} externalLabel={pt.a11y.externalLink} />);
    const card = screen.getByRole("article");
    const toggle = within(card).getByRole("button", { name: pt.projects.showDetails });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(within(card).getAllByText(base.highlights.pt[0])[0]).toBeVisible();
    expect(within(card).getByText(pt.projects.noPublicLinks)).toBeVisible();
  });
});

describe("Terminal", () => {
  it("executa comandos e mostra o resultado", async () => {
    const user = userEvent.setup();
    render(<Terminal locale="pt" labels={pt.terminal} open onClose={() => {}} />);
    const input = screen.getByLabelText(pt.terminal.inputLabel);
    await user.type(input, "about{Enter}");
    const log = screen.getByRole("log");
    expect(within(log).getByText("$ about")).toBeInTheDocument();
    expect(within(log).getByText(/Emanuel Wicliffe —/)).toBeInTheDocument();
  });

  it("fecha com o comando exit", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Terminal locale="en" labels={en.terminal} open onClose={onClose} />);
    await user.type(screen.getByLabelText(en.terminal.inputLabel), "exit{Enter}");
    expect(onClose).toHaveBeenCalled();
  });
});

describe("Contact", () => {
  it("mostra os contactos oficiais com links corretos e sem formulários", () => {
    const { container } = render(<Contact locale="pt" dict={pt} />);
    expect(container.querySelector("form")).toBeNull();
    expect(screen.queryByText(pt.contact.channelsPending)).toBeNull();
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("mailto:emanuelwicliffe@gmail.com");
    expect(hrefs).toContain("https://github.com/emanuelwicliffe-hub");
    expect(hrefs).toContain("https://www.linkedin.com/in/emanuel-moura-29818041a/");
    expect(hrefs).not.toContain("#");
    for (const link of screen.getAllByRole("link")) {
      if (link.getAttribute("href")?.startsWith("https://")) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
    // O CV só aparece depois de ser ativado em site.ts.
    if (!siteConfig.cv.file) expect(screen.queryByText(pt.contact.cv)).toBeNull();
  });
});

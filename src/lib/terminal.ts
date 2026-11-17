import { siteConfig, type SocialLinks } from "@/config/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories, skillNameTranslations } from "@/data/skills";
import { format, getDictionary, type Locale } from "@/i18n";
import { isSectionId, sectionIds, type SectionId } from "./sections";

export type TerminalLineKind = "input" | "output" | "accent" | "muted" | "error";
export type TerminalLine = { kind: TerminalLineKind; text: string };

export type TerminalAction =
  | { type: "none" }
  | { type: "clear" }
  | { type: "close" }
  | { type: "goto"; section: SectionId };

export type TerminalResult = { lines: TerminalLine[]; action: TerminalAction };

export const terminalCommands = ["help", "about", "skills", "projects", "contact", "goto", "clear", "exit"] as const;
export type TerminalCommand = (typeof terminalCommands)[number];

const aliases: Record<string, TerminalCommand> = {
  ls: "projects",
  whoami: "about",
  cls: "clear",
  quit: "exit",
  cd: "goto",
};

const out = (text: string): TerminalLine => ({ kind: "output", text });
const accent = (text: string): TerminalLine => ({ kind: "accent", text });
const muted = (text: string): TerminalLine => ({ kind: "muted", text });

function skillLabel(name: string, locale: Locale): string {
  return skillNameTranslations[name]?.[locale] ?? name;
}

export function runCommand(
  rawInput: string,
  locale: Locale,
  social: SocialLinks = siteConfig.social,
): TerminalResult {
  const dict = getDictionary(locale);
  const t = dict.terminal;
  const [rawCommand = "", ...args] = rawInput.trim().split(/\s+/);
  const lowered = rawCommand.toLowerCase();
  const command = (aliases[lowered] ?? lowered) as TerminalCommand | string;
  const none: TerminalAction = { type: "none" };

  if (command === "") return { lines: [], action: none };

  switch (command) {
    case "help":
      return {
        lines: terminalCommands.map((name) => out(`${name.padEnd(10, " ")}${t.help[name]}`)),
        action: none,
      };

    case "about":
      return {
        lines: [
          accent(`${profile.name} — ${profile.role[locale]}`),
          out(profile.location[locale]),
          out(profile.education[locale]),
          muted(dict.hero.availability),
        ],
        action: none,
      };

    case "skills":
      return {
        lines: skillCategories.map((category) =>
          out(`${category.title[locale]}: ${category.skills.map((s) => skillLabel(s.name, locale)).join(", ")}`),
        ),
        action: none,
      };

    case "projects":
      return {
        lines: projects.map((project) =>
          out(`• ${project.name[locale]} — ${dict.projects.status[project.status]}`),
        ),
        action: none,
      };

    case "contact": {
      const lines: TerminalLine[] = [out(`${dict.contact.location}: ${profile.location[locale]}`)];
      if (social.email) lines.push(out(`${dict.contact.email}: ${social.email}`));
      if (social.github) lines.push(out(`GitHub: ${social.github}`));
      if (social.linkedin) lines.push(out(`LinkedIn: ${social.linkedin}`));
      if (!social.email && !social.github && !social.linkedin) lines.push(muted(t.contactPending));
      return { lines, action: none };
    }

    case "goto": {
      const target = (args[0] ?? "").toLowerCase().replace(/^#/, "");
      if (!isSectionId(target)) {
        return {
          lines: [
            { kind: "error", text: format(t.gotoUnknown, { section: target || "—" }) },
            muted(`${t.sections}: ${sectionIds.join(", ")}`),
          ],
          action: none,
        };
      }
      return { lines: [muted(format(t.gotoOk, { section: target }))], action: { type: "goto", section: target } };
    }

    case "clear":
      return { lines: [], action: { type: "clear" } };

    case "exit":
      return { lines: [], action: { type: "close" } };

    default:
      return { lines: [{ kind: "error", text: format(t.notFound, { command: rawCommand }) }], action: none };
  }
}

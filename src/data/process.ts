import type { Localized } from "@/i18n/config";

export type ProcessStep = {
  id: string;
  title: Localized;
  description: Localized;
};

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    title: { pt: "Compreender o problema", en: "Understand the problem" },
    description: {
      pt: "Antes do código, perceber quem vai usar, o que precisa e o que define o sucesso.",
      en: "Before any code, understand who will use it, what they need and what success looks like.",
    },
  },
  {
    id: "plan",
    title: { pt: "Planear a solução", en: "Plan the solution" },
    description: {
      pt: "Dividir o trabalho em partes pequenas, definir prioridades e identificar riscos.",
      en: "Break the work into small pieces, set priorities and identify risks.",
    },
  },
  {
    id: "architecture",
    title: { pt: "Desenhar a arquitetura", en: "Design the architecture" },
    description: {
      pt: "Escolher a stack, modelar os dados e separar responsabilidades entre frontend e backend.",
      en: "Choose the stack, model the data and separate responsibilities between frontend and backend.",
    },
  },
  {
    id: "build",
    title: { pt: "Desenvolver", en: "Build" },
    description: {
      pt: "Implementar em incrementos, com commits pequenos e código legível e organizado.",
      en: "Implement in increments, with small commits and readable, well-organised code.",
    },
  },
  {
    id: "test",
    title: { pt: "Testar e corrigir", en: "Test and fix" },
    description: {
      pt: "Validar com testes automatizados e verificações manuais, corrigindo a causa e não só o sintoma.",
      en: "Validate with automated tests and manual checks, fixing the root cause rather than the symptom.",
    },
  },
  {
    id: "improve",
    title: { pt: "Melhorar continuamente", en: "Keep improving" },
    description: {
      pt: "Rever, refatorar e aprender com cada iteração para que o projeto evolua com qualidade.",
      en: "Review, refactor and learn from every iteration so the project evolves with quality.",
    },
  },
];

export type Principle = {
  id: "git" | "tests" | "organization" | "learning";
  title: Localized;
  description: Localized;
};

export const principles: Principle[] = [
  {
    id: "git",
    title: { pt: "Git como rotina", en: "Git as a habit" },
    description: {
      pt: "Histórico claro, branches e commits com significado.",
      en: "Clear history, branches and meaningful commits.",
    },
  },
  {
    id: "tests",
    title: { pt: "Testes desde cedo", en: "Testing early" },
    description: {
      pt: "Testes automatizados e integração contínua para evoluir com confiança.",
      en: "Automated tests and continuous integration to evolve with confidence.",
    },
  },
  {
    id: "organization",
    title: { pt: "Código organizado", en: "Organised code" },
    description: {
      pt: "Estrutura previsível, tipagem forte e componentes reutilizáveis.",
      en: "Predictable structure, strong typing and reusable components.",
    },
  },
  {
    id: "learning",
    title: { pt: "Aprendizagem contínua", en: "Continuous learning" },
    description: {
      pt: "Ferramentas novas — incluindo IA — ao serviço do raciocínio, não em vez dele.",
      en: "New tools — AI included — in service of reasoning, not instead of it.",
    },
  },
];

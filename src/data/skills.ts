import type { Localized } from "@/i18n/config";

/**
 * Como foi utilizada cada tecnologia:
 * - used: aplicada em projetos práticos (pessoais ou académicos);
 * - studied: trabalhada no contexto da formação;
 * - learning: a explorar atualmente.
 *
 * Revê esta classificação sempre que necessário — só deve refletir factos.
 */
export type SkillStatus = "used" | "studied" | "learning";

export type Skill = {
  name: string;
  status: SkillStatus;
};

export type SkillCategory = {
  id: string;
  title: Localized;
  description: Localized;
  skills: Skill[];
};

export const skillStatuses: SkillStatus[] = ["used", "studied", "learning"];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: { pt: "Linguagens", en: "Languages" },
    description: {
      pt: "Linguagens de programação e de marcação.",
      en: "Programming and markup languages.",
    },
    skills: [
      { name: "TypeScript", status: "used" },
      { name: "JavaScript", status: "used" },
      { name: "Python", status: "used" },
      { name: "Java", status: "used" },
      { name: "C#", status: "used" },
      { name: "Kotlin", status: "used" },
      { name: "SQL", status: "used" },
      { name: "HTML", status: "used" },
      { name: "CSS", status: "used" },
      { name: "C++", status: "studied" },
      { name: "PHP", status: "used" },
    ],
  },
  {
    id: "frontend",
    title: { pt: "Frontend e interfaces", en: "Frontend & interfaces" },
    description: {
      pt: "Construção de interfaces web e experiência de utilização.",
      en: "Building web interfaces and user experience.",
    },
    skills: [
      { name: "React", status: "used" },
      { name: "Next.js", status: "used" },
      { name: "HTML5", status: "used" },
      { name: "CSS3", status: "used" },
      { name: "Responsive Design", status: "used" },
      { name: "Tailwind CSS", status: "studied" },
    ],
  },
  {
    id: "backend",
    title: { pt: "Backend e APIs", en: "Backend & APIs" },
    description: {
      pt: "Lógica de servidor, APIs e organização do código.",
      en: "Server-side logic, APIs and code organisation.",
    },
    skills: [
      { name: "Node.js", status: "used" },
      { name: "NestJS", status: "used" },
      { name: "APIs REST", status: "used" },
      { name: "Programação Orientada a Objetos", status: "used" },
      { name: "Express.js", status: "studied" },
    ],
  },
  {
    id: "databases",
    title: { pt: "Bases de dados", en: "Databases" },
    description: {
      pt: "Modelação, consulta e acesso a dados.",
      en: "Data modelling, querying and access.",
    },
    skills: [
      { name: "PostgreSQL", status: "used" },
      { name: "SQL", status: "used" },
      { name: "Prisma ORM", status: "used" },
      { name: "PostGIS", status: "used" },
      { name: "MySQL", status: "studied" },
      { name: "MongoDB", status: "studied" },
    ],
  },
  {
    id: "mobile-ai",
    title: { pt: "Mobile e processamento de texto", en: "Mobile & text processing" },
    description: {
      pt: "Aplicações Android e exercícios de processamento de linguagem natural.",
      en: "Android apps and natural language processing exercises.",
    },
    skills: [
      { name: "Jetpack Compose", status: "used" },
      { name: "Retrofit", status: "used" },
      { name: "NLTK", status: "studied" },
    ],
  },
  {
    id: "tools",
    title: { pt: "Ferramentas", en: "Tools" },
    description: {
      pt: "Ferramentas do dia a dia de desenvolvimento.",
      en: "Everyday development tools.",
    },
    skills: [
      { name: "Git", status: "used" },
      { name: "GitHub", status: "used" },
      { name: "VS Code", status: "used" },
      { name: "Docker", status: "used" },
      { name: "Android Studio", status: "used" },
      { name: "Desenvolvimento assistido por IA", status: "used" },
    ],
  },
];

/** Nomes de competências que têm tradução própria em inglês. */
export const skillNameTranslations: Record<string, Localized> = {
  "APIs REST": { pt: "APIs REST", en: "REST APIs" },
  "Programação Orientada a Objetos": { pt: "Programação Orientada a Objetos", en: "Object-Oriented Programming" },
  "Desenvolvimento assistido por IA": { pt: "Desenvolvimento assistido por IA", en: "AI-assisted development tools" },
  "Responsive Design": { pt: "Design responsivo", en: "Responsive design" },
};

import type { Localized } from "@/i18n/config";

export type JourneyKind = "work" | "education" | "practice" | "project";

export type JourneyItem = {
  id: string;
  kind: JourneyKind;
  title: Localized;
  organization: Localized;
  /** Estado factual, sem datas inventadas. */
  status: Localized;
  /** Período, apenas com datas que constem do CV. */
  period?: Localized;
  description: Localized;
  /** Slug de um projeto relacionado (opcional). */
  projectSlug?: string;
  current?: boolean;
};

/**
 * Percurso de formação e prática. Ordenado do mais atual para o mais antigo.
 * Não incluir datas, empresas ou vínculos que não possam ser comprovados
 * (as datas só entram no campo `period` e têm de constar do CV).
 */
export const journey: JourneyItem[] = [
  {
    id: "pine-hill-internship",
    kind: "work",
    title: { pt: "Estagiário de Desenvolvimento Web", en: "Web Development Intern" },
    organization: { pt: "Pine Hill International · Projeto Pontal Awards", en: "Pine Hill International · Pontal Awards project" },
    status: { pt: "Estágio", en: "Internship" },
    period: { pt: "Início a 05/09/2026", en: "Started 05/09/2026" },
    description: {
      pt: "Participação, em equipa e com supervisão, no desenvolvimento e na atualização do website Pontal Awards: funcionalidades do painel administrativo em PHP, autenticação e gestão de sessões, e interface em HTML, CSS e JavaScript.",
      en: "Took part, as part of a team and under supervision, in developing and updating the Pontal Awards website: features for the PHP admin panel, authentication and session management, and the interface in HTML, CSS and JavaScript.",
    },
    projectSlug: "pontal-awards",
  },
  {
    id: "parttime",
    kind: "project",
    title: { pt: "Desenvolvimento contínuo do Parttime", en: "Ongoing development of Parttime" },
    organization: { pt: "Projeto próprio", en: "Personal project" },
    status: { pt: "Em curso", en: "Ongoing" },
    description: {
      pt: "Plataforma full-stack de oportunidades part-time em Portugal, com Next.js, NestJS, PostgreSQL/PostGIS, Prisma e Docker. Foco em segurança, privacidade, testes e integração contínua.",
      en: "Full-stack platform for part-time opportunities in Portugal, built with Next.js, NestJS, PostgreSQL/PostGIS, Prisma and Docker. Focus on security, privacy, testing and continuous integration.",
    },
    projectSlug: "parttime",
    current: true,
  },
  {
    id: "tpsi",
    kind: "education",
    title: {
      pt: "Técnico Especialista em Programação de Sistemas de Informação (TPSI) — Nível 5",
      en: "Information Systems Programming Specialist (TPSI) — Level 5",
    },
    organization: { pt: "IEFP de Leiria, Portugal", en: "IEFP Leiria, Portugal" },
    status: { pt: "Em fase de conclusão", en: "Nearing completion" },
    period: { pt: "Início a 24/11/2025", en: "Started 24/11/2025" },
    description: {
      pt: "Formação especializada em programação, com trabalho prático em Java, C#, Kotlin, Python, bases de dados e desenvolvimento web.",
      en: "Specialised programming training with hands-on work in Java, C#, Kotlin, Python, databases and web development.",
    },
    current: true,
  },
  {
    id: "academic-work",
    kind: "practice",
    title: { pt: "Trabalhos práticos de programação", en: "Hands-on programming work" },
    organization: { pt: "Contexto académico", en: "Academic context" },
    status: { pt: "Contínuo", en: "Ongoing" },
    description: {
      pt: "A app Android DigiDex em Kotlin e Jetpack Compose, exercícios de programação orientada a objetos em Kotlin e Java, uma calculadora em C# com Windows Forms, modelação de dados em MongoDB e processamento de texto em Python com NLTK.",
      en: "The DigiDex Android app in Kotlin and Jetpack Compose, object-oriented programming exercises in Kotlin and Java, a C# Windows Forms calculator, MongoDB data modelling and text processing in Python with NLTK.",
    },
    projectSlug: "digidex",
  },
  {
    id: "fapan",
    kind: "education",
    title: { pt: "Bacharelato em Ciência da Computação", en: "Bachelor's degree in Computer Science" },
    organization: { pt: "FAPAN — Belém, Brasil", en: "FAPAN — Belém, Brazil" },
    status: { pt: "Concluído", en: "Completed" },
    period: { pt: "30/01/2015 – 30/06/2019", en: "30/01/2015 – 30/06/2019" },
    description: {
      pt: "Formação superior em Ciência da Computação, base do meu percurso em desenvolvimento de software.",
      en: "Higher education in Computer Science, the foundation of my path in software development.",
    },
  },
];

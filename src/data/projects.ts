import type { Localized } from "@/i18n/config";

/** Categorias usadas pelos filtros da secção de projetos. */
export type ProjectCategory = "web" | "backend" | "mobile";

/**
 * Estado real do projeto — nunca apresentar como lançado o que não está.
 * - collaborative: projeto de equipa, sem atribuição de componentes específicos;
 * - prototype: protótipo experimental, sem backend nem dados reais.
 */
export type ProjectStatus = "in-development" | "collaborative" | "prototype" | "academic" | "delivered";

/** Motivo visual da capa ilustrativa (usado quando não existe imagem real). */
export type CoverMotif = "platform" | "awards" | "sharing" | "booking" | "mobile" | "pages";

export type ProjectLinks = {
  /** URL de um repositório público. `null` se não for público. */
  repository: string | null;
  /** URL de uma demonstração online. `null` se não existir. */
  demo: string | null;
};

/** Número verificável apresentado em destaque (ex.: contagens a partir do código). */
export type ProjectMetric = { value: string; label: Localized };

/** Camada da arquitetura, agrupada por nível no diagrama. */
export type ArchitectureLayer = {
  tier: "client" | "server" | "data";
  name: Localized;
  /** Pasta no repositório original (apenas indicativa). */
  path: string;
  role: Localized;
  technologies: string[];
};

export type ProjectArchitecture = {
  summary: Localized<string[]>;
  layers: ArchitectureLayer[];
  /** Percurso de um pedido, passo a passo. */
  requestFlow: Localized<string[]>;
};

export type FeatureGroupIcon = "user" | "company" | "admin" | "web" | "check" | "plan";

export type FeatureGroup = { title: Localized; items: Localized<string[]>; icon?: FeatureGroupIcon };

export type ProjectCurrentStatus = {
  /** Data (AAAA-MM-DD) da documentação usada como fonte. */
  updated: string;
  done: Localized<string[]>;
  next: Localized<string[]>;
};

/**
 * Captura de ecrã real, dentro de /public/images/projects/<slug>/.
 * Só adicionar imagens sem dados pessoais, credenciais ou endereços privados.
 */
export type ProjectScreenshot = { src: string; alt: Localized; caption: Localized };

export type ProjectCaseStudy = {
  overview: Localized<string[]>;
  focusAreas: Localized<string[]>;
  challenges: Localized<string[]>;
  contribution: Localized<string[]>;
  learnings: Localized<string[]>;
  /** Secções opcionais — cada uma só é mostrada quando existe. */
  metrics?: ProjectMetric[];
  metricsNote?: Localized;
  architecture?: ProjectArchitecture;
  featureGroups?: FeatureGroup[];
  security?: Localized<string[]>;
  quality?: Localized<string[]>;
  currentStatus?: ProjectCurrentStatus;
  screenshots?: ProjectScreenshot[];
};

export type Project = {
  slug: string;
  name: Localized;
  type: Localized;
  status: ProjectStatus;
  categories: ProjectCategory[];
  summary: Localized;
  description: Localized;
  technologies: string[];
  /** Funcionalidades ou conteúdos trabalhados. */
  highlights: Localized<string[]>;
  /** Nota importante sobre o estado do projeto (ex.: ainda não público). */
  notice?: Localized;
  /**
   * Imagem de capa real, dentro de /public (ex.: "/images/projects/parttime.png").
   * Enquanto for `null`, é usada uma ilustração gerada com o motivo indicado.
   */
  cover: { src: string; alt: Localized } | null;
  coverMotif: CoverMotif;
  links: ProjectLinks;
  featured: boolean;
  /** Quando existe, é gerada uma página individual /[lang]/projects/[slug]. */
  caseStudy?: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    slug: "parttime",
    name: { pt: "Parttime", en: "Parttime" },
    type: {
      pt: "Plataforma web · Marketplace de recrutamento part-time",
      en: "Web platform · Part-time recruitment marketplace",
    },
    status: "in-development",
    categories: ["web", "backend"],
    summary: {
      pt: "Marketplace de recrutamento part-time para Portugal, com privacidade por defeito, moderação de empresas e vagas e uma API testada contra uma base de dados real.",
      en: "A part-time recruitment marketplace for Portugal, with privacy by default, moderation of companies and jobs, and an API tested against a real database.",
    },
    description: {
      pt: "Marketplace que liga candidatos maiores de 18 anos a empresas com vagas part-time, pontuais, sazonais e de fim de semana em Portugal. Monorepo TypeScript com site e consola de administração em Next.js, API em NestJS e PostgreSQL/PostGIS através do Prisma. Os contactos ficam ocultos até haver consentimento registado, as permissões são sempre verificadas na API e cada alteração é validada por testes de integração contra uma base real descartável e por integração contínua.",
      en: "A marketplace that connects candidates aged 18+ with companies offering part-time, one-off, seasonal and weekend jobs in Portugal. A TypeScript monorepo with a Next.js website and admin console, a NestJS API and PostgreSQL/PostGIS through Prisma. Contact details stay hidden until consent is recorded, permissions are always enforced by the API, and every change is validated by integration tests against a disposable real database and by continuous integration.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
      "PostGIS",
      "Prisma",
      "Zod",
      "Playwright",
      "Docker",
      "GitHub Actions",
    ],
    highlights: {
      pt: [
        "Pesquisa de vagas com compatibilidade de horário",
        "Candidaturas com histórico de estados",
        "Consentimento de contacto registado e revogável",
        "Consola de moderação com auditoria",
        "MFA (TOTP) na administração",
        "Exportação e eliminação de dados",
        "Convites com limites antispam",
        "CSP com nonce e limites de tentativas de entrada",
        "Acessibilidade AA a partir de 320 px",
        "160+ testes, integração com PostGIS e CI",
      ],
      en: [
        "Job search with schedule compatibility",
        "Applications with status history",
        "Recorded, revocable contact consent",
        "Moderation console with audit log",
        "TOTP MFA for administrators",
        "Data export and deletion",
        "Invitations with anti-spam limits",
        "Nonce-based CSP and login attempt limits",
        "AA accessibility from 320 px",
        "160+ tests, PostGIS integration and CI",
      ],
    },
    notice: {
      pt: "Beta privada: em testes com dados fictícios e um pequeno grupo de testadores de confiança. A plataforma ainda não está disponível ao público e o código-fonte é privado.",
      en: "Private beta: being tested with fictitious data and a small group of trusted testers. The platform is not yet available to the public and the source code is private.",
    },
    cover: null,
    coverMotif: "platform",
    links: { repository: null, demo: null },
    featured: true,
    caseStudy: {
      overview: {
        pt: [
          "O Parttime é um marketplace de recrutamento para Portugal que liga candidatos maiores de 18 anos a empresas com vagas part-time, pontuais, sazonais e de fim de semana. A contratação é feita diretamente entre empresa e candidato: a plataforma não trata pagamentos, contratos nem cedência de trabalhadores.",
          "Foi construído como um produto real e não como protótipo: um site para candidatos e empresas, uma consola de administração separada e uma API que concentra as regras, as permissões e o acesso aos dados, tudo em TypeScript num único monorepo.",
          "A privacidade é uma regra do sistema: perfis invisíveis e contactos ocultos por defeito, consentimentos registados, e empresas e vagas sujeitas a moderação antes de aparecerem ao público.",
          "O projeto está em beta privada, com dados fictícios e um pequeno grupo de testadores de confiança, e ainda não está aberto ao público.",
        ],
        en: [
          "Parttime is a recruitment marketplace for Portugal that connects candidates aged 18+ with companies offering part-time, one-off, seasonal and weekend jobs. Hiring happens directly between company and candidate: the platform does not handle payments, contracts or staffing agency work.",
          "It was built as a real product rather than a prototype: a website for candidates and companies, a separate admin console and an API that holds the rules, permissions and data access, all in TypeScript within a single monorepo.",
          "Privacy is a system rule: profiles are invisible and contact details hidden by default, consent is recorded, and companies and jobs are moderated before they reach the public.",
          "The project is in a private beta, with fictitious data and a small group of trusted testers, and is not yet open to the public.",
        ],
      },
      focusAreas: {
        pt: [
          "Arquitetura web, consola e API separadas",
          "Privacidade e consentimento por defeito",
          "Segurança de contas, sessões e administração",
          "Testes contra uma base de dados real",
          "Acessibilidade e responsividade",
        ],
        en: [
          "Separate website, console and API",
          "Privacy and consent by default",
          "Account, session and admin security",
          "Testing against a real database",
          "Accessibility and responsiveness",
        ],
      },
      metrics: [
        { value: "3", label: { pt: "aplicações: site, consola e API", en: "applications: website, console and API" } },
        { value: "62", label: { pt: "rotas na API REST", en: "REST API routes" } },
        { value: "16", label: { pt: "modelos de dados · 10 migrações", en: "data models · 10 migrations" } },
        { value: "160+", label: { pt: "testes unitários e HTTP + 9 suites de browser", en: "unit and HTTP tests + 9 browser suites" } },
        { value: "≤ 55 ms", label: { pt: "p95 de pesquisa com 20 000 vagas", en: "search p95 with 20,000 jobs" } },
      ],
      metricsNote: {
        pt: "Contagens obtidas a partir do código-fonte; desempenho medido numa base local de testes.",
        en: "Counts taken from the source code; performance measured on a local test database.",
      },
      architecture: {
        summary: {
          pt: [
            "Monorepo com npm workspaces: três aplicações e um design system partilhado. O navegador comunica apenas com o próprio domínio, através de um proxy /api, e é a API que decide sempre o que cada pessoa pode ver ou alterar — esconder um botão na interface não é considerado controlo de acesso.",
            "O modelo de dados inclui utilizadores, sessões, perfis, empresas, vagas, candidaturas, convites, eventos de estado e de consentimento, notificações e auditoria. As vagas têm uma coluna geográfica PostGIS com índice GiST, preparada para a futura pesquisa por raio.",
          ],
          en: [
            "An npm workspaces monorepo: three applications and a shared design system. The browser only talks to its own domain through an /api proxy, and the API always decides what each person can see or change — hiding a button in the interface is not treated as access control.",
            "The data model covers users, sessions, profiles, companies, jobs, applications, invitations, status and consent events, notifications and auditing. Jobs have a PostGIS geography column with a GiST index, ready for the future radius search.",
          ],
        },
        layers: [
          {
            tier: "client",
            name: { pt: "Site", en: "Website" },
            path: "apps/web",
            role: {
              pt: "Páginas públicas, pesquisa de vagas e áreas de candidato e empresa.",
              en: "Public pages, job search and candidate and company areas.",
            },
            technologies: ["Next.js", "React", "Tailwind CSS"],
          },
          {
            tier: "client",
            name: { pt: "Consola de administração", en: "Admin console" },
            path: "apps/admin",
            role: {
              pt: "Verificação de empresas, moderação, contas e auditoria, com sessão própria.",
              en: "Company verification, moderation, accounts and auditing, with its own session.",
            },
            technologies: ["Next.js", "React"],
          },
          {
            tier: "server",
            name: { pt: "API", en: "API" },
            path: "apps/api",
            role: {
              pt: "Autenticação, permissões, regras de negócio e validação de todas as entradas.",
              en: "Authentication, permissions, business rules and validation of every input.",
            },
            technologies: ["NestJS", "Zod", "Helmet"],
          },
          {
            tier: "data",
            name: { pt: "Base de dados", en: "Database" },
            path: "database",
            role: {
              pt: "Esquema, migrações aditivas, transações e pesquisa sem acentos mantida por triggers.",
              en: "Schema, additive migrations, transactions and accent-insensitive search kept by triggers.",
            },
            technologies: ["PostgreSQL", "PostGIS", "Prisma"],
          },
        ],
        requestFlow: {
          pt: ["Navegador", "Proxy /api", "Sessão e permissões", "Validação Zod", "Prisma", "PostgreSQL + PostGIS"],
          en: ["Browser", "/api proxy", "Session and permissions", "Zod validation", "Prisma", "PostgreSQL + PostGIS"],
        },
      },
      featureGroups: [
        {
          title: { pt: "Candidato", en: "Candidate" },
          items: {
            pt: [
              "Registo, verificação de e-mail e recuperação de palavra-passe",
              "Perfil com competências e visibilidade opcional",
              "Disponibilidade semanal por dias e períodos",
              "Pesquisa por cidade, palavras-chave, tipo, remuneração e compatibilidade de horário",
              "Candidatura com histórico de estados e retirada",
              "Convites: aceitar, recusar ou bloquear a empresa",
              "Notificações internas",
              "Exportação de dados e pedido de eliminação",
            ],
            en: [
              "Sign-up, email verification and password recovery",
              "Profile with skills and optional visibility",
              "Weekly availability by day and time period",
              "Search by city, keywords, type, pay and schedule compatibility",
              "Applications with status history and withdrawal",
              "Invitations: accept, decline or block the company",
              "In-app notifications",
              "Data export and deletion request",
            ],
          },
        },
        {
          title: { pt: "Empresa", en: "Company" },
          items: {
            pt: [
              "Perfil de empresa com verificação manual",
              "Vagas com dias e períodos estruturados, sujeitas a moderação",
              "Edição, reenvio e encerramento com aviso aos candidatos",
              "Gestão de candidaturas por vaga",
              "Pesquisa de candidatos que autorizaram ser encontrados",
              "Convites a candidatos com limites antispam",
            ],
            en: [
              "Company profile with manual verification",
              "Jobs with structured days and periods, subject to moderation",
              "Editing, resubmission and closing with notice to candidates",
              "Application management per job",
              "Search for candidates who chose to be discoverable",
              "Invitations to candidates with anti-spam limits",
            ],
          },
        },
        {
          title: { pt: "Administração", en: "Administration" },
          items: {
            pt: [
              "Consola separada, com sessão própria",
              "Verificação de empresas e moderação de vagas",
              "Pesquisa de contas e suspensão reversível com motivo",
              "Fila de eliminação e anonimização de dados",
              "Registo de auditoria das decisões",
              "Autenticação de dois fatores (TOTP) com códigos de recuperação",
            ],
            en: [
              "Separate console with its own session",
              "Company verification and job moderation",
              "Account search and reversible suspension with a reason",
              "Data deletion and anonymisation queue",
              "Audit log of decisions",
              "Two-factor authentication (TOTP) with recovery codes",
            ],
          },
        },
      ],
      security: {
        pt: [
          "Palavras-passe com scrypt; sessões com token aleatório em cookie HttpOnly e SameSite, guardado na base apenas como hash SHA-256, revogáveis e com expiração.",
          "Controlo de acesso sempre na API: o utilizador e o papel são lidos da base em cada pedido protegido e a origem é verificada nos pedidos de escrita.",
          "Contactos ocultos por defeito: o e-mail só é partilhado por candidatura, com consentimento revogável a qualquer momento e histórico de consentimentos.",
          "Perfis invisíveis por defeito; só empresas verificadas pesquisam candidatos que optaram por ser visíveis, e as respostas usam uma lista fechada de campos. Não é recolhida morada nem localização exata do candidato.",
          "Limites de tentativas de entrada por conta e por cliente, iguais para e-mails inexistentes, e limites antispam nos convites.",
          "Consola de administração separada, com autenticação de dois fatores (TOTP), códigos de recuperação de uso único e decisões auditadas.",
          "Content Security Policy com nonce por pedido, sem unsafe-inline nem unsafe-eval, cabeçalhos Helmet e verificação de segredos no histórico git na CI.",
          "Exportação de dados, pedido de eliminação e anonimização auditada; cópias de segurança cifradas com AES-256-GCM e retenção de 30 dias.",
        ],
        en: [
          "Passwords hashed with scrypt; sessions use a random token in an HttpOnly, SameSite cookie, stored in the database only as a SHA-256 hash, revocable and expiring.",
          "Access control always lives in the API: the user and role are read from the database on every protected request, and the origin is checked on write requests.",
          "Contact details hidden by default: the email is only shared per application, with consent that can be revoked at any time and a consent history.",
          "Profiles invisible by default; only verified companies can search candidates who opted in, and responses use a closed list of fields. No home address or exact location is collected from candidates.",
          "Login attempt limits per account and per client, identical for non-existent emails, and anti-spam limits on invitations.",
          "Separate admin console with two-factor authentication (TOTP), single-use recovery codes and audited decisions.",
          "Content Security Policy with a per-request nonce, without unsafe-inline or unsafe-eval, Helmet headers and secret scanning of the git history in CI.",
          "Data export, deletion requests and audited anonymisation; backups encrypted with AES-256-GCM and kept for 30 days.",
        ],
      },
      challenges: {
        pt: [
          "Tornar o consentimento fiável: a partilha ou revogação do contacto e o respetivo registo acontecem na mesma transação, com atualizações condicionais que evitam eventos duplicados; alterações simultâneas de visibilidade devolvem um conflito (409).",
          "Garantir o isolamento entre empresas: cada candidatura só é visível à empresa dona da vaga e ao candidato, e as respostas nunca devolvem o objeto completo do utilizador.",
          "Lidar com concorrência: candidatura única por vaga com transação serializável e restrição na base, mudanças de estado simultâneas e contadores de entrada atómicos, todos cobertos por testes.",
          "Pesquisa sem acentos (Évora/evora) mantida por triggers PostgreSQL, com entradas como %, _ e aspas tratadas de forma segura.",
          "Aplicar uma CSP estrita com nonce no Next.js e confirmar zero violações num servidor de produção.",
          "Testar com fidelidade: uma base PostGIS descartável por execução, deteção de diferenças entre esquema e migrações e ensaio de cópia de segurança e restauro.",
        ],
        en: [
          "Making consent reliable: sharing or revoking contact details and recording it happen in the same transaction, with conditional updates that prevent duplicate events; concurrent visibility changes return a conflict (409).",
          "Guaranteeing isolation between companies: each application is visible only to the company that owns the job and to the candidate, and responses never return the full user object.",
          "Handling concurrency: one application per job enforced with a serializable transaction and a database constraint, plus concurrent status changes and atomic login counters, all covered by tests.",
          "Accent-insensitive search (Évora/evora) maintained by PostgreSQL triggers, with inputs such as %, _ and quotes handled safely.",
          "Enforcing a strict nonce-based CSP in Next.js and confirming zero violations on a production server.",
          "Testing faithfully: a disposable PostGIS database per run, detection of drift between schema and migrations, and a backup and restore rehearsal.",
        ],
      },
      quality: {
        pt: [
          "Critério de conclusão: só conta como concluído o que passa contra a API NestJS e a base PostgreSQL/PostGIS reais.",
          "Mais de 160 casos de teste unitários e HTTP sobre regras, permissões, consentimentos e segurança.",
          "Testes de integração numa base PostGIS descartável, com verificação de que as migrações correspondem ao esquema.",
          "9 suites de browser com Playwright (candidato, empresa, administração, recuperação, convites, horários e telemóvel) e um percurso E2E real do MVP.",
          "Desempenho e concorrência: p95 até 55 ms nas pesquisas com 20 000 vagas (medição local) e testes de pedidos simultâneos.",
          "Acessibilidade: ecrãs a partir de 320 px, alvos de toque e contraste AA auditados em páginas de telemóvel e desktop.",
          "Integração contínua no GitHub Actions: typecheck, testes, verificação de segredos, integração, ensaio de backup, desempenho, build, browser e npm audit.",
        ],
        en: [
          "Definition of done: only what passes against the real NestJS API and PostgreSQL/PostGIS database counts as done.",
          "More than 160 unit and HTTP test cases covering rules, permissions, consent and security.",
          "Integration tests on a disposable PostGIS database, checking that migrations match the schema.",
          "9 Playwright browser suites (candidate, company, administration, recovery, invitations, schedules and mobile) and a real end-to-end MVP journey.",
          "Performance and concurrency: search p95 up to 55 ms with 20,000 jobs (local measurement) and tests for simultaneous requests.",
          "Accessibility: screens from 320 px, touch targets and AA contrast audited on mobile and desktop pages.",
          "Continuous integration on GitHub Actions: typecheck, tests, secret scanning, integration, backup rehearsal, performance, build, browser suites and npm audit.",
        ],
      },
      currentStatus: {
        updated: "2026-11-09",
        done: {
          pt: [
            "MVP funcional para candidatos, empresas e administração, validado por testes de integração e E2E",
            "Demonstração privada com dados fictícios para um pequeno grupo de testadores de confiança",
            "Aviso de privacidade e termos de utilização para a fase de testes (ainda sem revisão jurídica)",
            "Imagem Docker de staging construída e verificada localmente",
            "Cópias de segurança cifradas e procedimento de restauro ensaiado",
          ],
          en: [
            "Working MVP for candidates, companies and administration, validated by integration and E2E tests",
            "Private demo with fictitious data for a small group of trusted testers",
            "Privacy notice and terms of use for the testing phase (not yet legally reviewed)",
            "Staging Docker image built and verified locally",
            "Encrypted backups and a rehearsed restore procedure",
          ],
        },
        next: {
          pt: [
            "Validar a demonstração nos dispositivos dos testadores",
            "Fornecedor de e-mail e notificações fora da plataforma",
            "Alojamento, domínio, HTTPS e monitorização",
            "Mapa e pesquisa por raio sobre PostGIS",
            "Denúncias e moderação de texto livre",
            "Revisão jurídica, prazos de conservação e avaliação de impacto",
            "Testes manuais com leitor de ecrã e telemóvel físico",
          ],
          en: [
            "Validate the demo on testers' own devices",
            "Email provider and notifications outside the platform",
            "Hosting, domain, HTTPS and monitoring",
            "Map and radius search on PostGIS",
            "Reporting and moderation of free text",
            "Legal review, retention periods and impact assessment",
            "Manual testing with screen readers and a physical phone",
          ],
        },
      },
      contribution: {
        pt: [
          "Definição do produto e do âmbito: público-alvo, modalidades de trabalho e o que fica deliberadamente de fora, como pagamentos e contratos.",
          "Decisões de arquitetura e de stack: monorepo com site, consola e API separados, PostgreSQL/PostGIS e Prisma.",
          "Definição das regras de privacidade e consentimento e das prioridades de cada fase, incluindo o que só avança com autorização explícita.",
          "Desenvolvimento assistido por IA, com Claude Code e Codex como ferramentas: orientação das sessões de trabalho e revisão dos resultados.",
          "Validação: critérios de conclusão baseados em testes contra a base real, revisão das demonstrações e autorização de operações sensíveis, como migrações na base existente.",
        ],
        en: [
          "Defining the product and its scope: target users, job types and what is deliberately left out, such as payments and contracts.",
          "Architecture and stack decisions: a monorepo with a separate website, console and API, PostgreSQL/PostGIS and Prisma.",
          "Defining the privacy and consent rules and the priorities of each phase, including what only moves forward with explicit authorisation.",
          "AI-assisted development, using Claude Code and Codex as tools: steering the work sessions and reviewing the results.",
          "Validation: definition-of-done criteria based on tests against the real database, review of the demos and authorisation of sensitive operations, such as migrations on the existing database.",
        ],
      },
      learnings: {
        pt: [
          "Definir com rigor o que significa «concluído» evita confundir uma interface com uma funcionalidade real.",
          "O controlo de acesso pertence à API; esconder um botão na interface não protege nada.",
          "Privacidade por defeito é uma decisão de modelo de dados e de transações, não apenas de interface.",
          "Trabalhar com assistentes de IA exige critérios claros, revisão constante e testes que confirmem cada alteração.",
        ],
        en: [
          "Defining precisely what “done” means avoids mistaking an interface for a real feature.",
          "Access control belongs in the API; hiding a button in the interface protects nothing.",
          "Privacy by default is a data model and transaction decision, not just an interface one.",
          "Working with AI assistants requires clear criteria, constant review and tests that confirm every change.",
        ],
      },
      // Capturas reais (dados fictícios da demonstração) a adicionar em /public/images/projects/parttime/.
      screenshots: [],
    },
  },
  {
    slug: "pontal-awards",
    name: { pt: "Pontal Awards", en: "Pontal Awards" },
    type: {
      pt: "Estágio · Desenvolvimento web colaborativo",
      en: "Internship · Collaborative web development",
    },
    status: "collaborative",
    categories: ["web", "backend"],
    summary: {
      pt: "Site de uma distinção internacional de arquitetura residencial, com conteúdos servidos por uma API em PHP e um painel de administração protegido.",
      en: "Website for an international residential architecture award, with content served by a PHP API and a protected admin panel.",
    },
    description: {
      pt: "Projeto em que participei como estagiário de desenvolvimento web, em equipa e com supervisão: um site público com várias secções, páginas de detalhe de cada casa distinguida e um painel de administração em PHP para gerir casas, imagens e utilizadores.",
      en: "A project I took part in as a web development intern, as part of a team and under supervision: a public website with several sections, detail pages for each awarded home and a PHP admin panel to manage homes, images and users.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "PDO", "SQL"],
    highlights: {
      pt: [
        "Site público com navegação por secções",
        "Conteúdos carregados de uma API JSON em PHP",
        "Páginas de detalhe com galeria de imagens",
        "Painel de administração com login",
        "Gestão de casas e de várias imagens por casa",
        "Gestão de utilizadores com diferentes papéis",
        "Proteção CSRF e consultas preparadas",
        "Validação do tipo real das imagens carregadas",
      ],
      en: [
        "Public website with section-based navigation",
        "Content loaded from a PHP JSON API",
        "Detail pages with image gallery",
        "Admin panel with login",
        "Management of homes and multiple images per home",
        "User management with different roles",
        "CSRF protection and prepared statements",
        "Validation of the real type of uploaded images",
      ],
    },
    notice: {
      pt: "Projeto desenvolvido em equipa, durante um estágio: não fui o único programador nem o responsável pela arquitetura. Esta página não indica o estado de lançamento do site nem divulga detalhes internos.",
      en: "Team project, built during an internship: I was not the only developer nor responsible for the architecture. This page does not state the site's release status or share internal details.",
    },
    cover: null,
    coverMotif: "awards",
    links: { repository: null, demo: null },
    featured: false,
    caseStudy: {
      overview: {
        pt: [
          "O Pontal Awards é o site de uma distinção internacional dedicada a casas de arquitetura residencial. Reúne a apresentação da iniciativa, as categorias, as casas distinguidas, a revista e as candidaturas, além das páginas legais.",
          "Por trás do site existe um painel de administração em PHP onde são geridas as casas, as respetivas imagens e os utilizadores. Os conteúdos chegam às páginas públicas através de uma API que devolve JSON.",
          "Participei no projeto como estagiário de desenvolvimento web, em equipa e com o acompanhamento de um supervisor.",
        ],
        en: [
          "Pontal Awards is the website of an international distinction dedicated to residential architecture. It brings together the initiative, its categories, the awarded homes, the magazine and submissions, plus the legal pages.",
          "Behind the website there is a PHP admin panel where homes, their images and users are managed. Content reaches the public pages through an API that returns JSON.",
          "I took part in the project as a web development intern, as part of a team and with a supervisor's guidance.",
        ],
      },
      focusAreas: {
        pt: ["Site público em várias secções", "API JSON em PHP", "Painel de administração", "Segurança de formulários e sessões"],
        en: ["Multi-section public website", "PHP JSON API", "Admin panel", "Form and session security"],
      },
      featureGroups: [
        {
          title: { pt: "Site público", en: "Public website" },
          icon: "web",
          items: {
            pt: [
              "Navegação por secções: início, vencedores, categorias, revista e candidaturas",
              "Casas em destaque e vencedoras carregadas da API",
              "Página de detalhe com ficha técnica, texto editorial, comentário do júri e galeria",
              "Páginas de privacidade, cookies, termos e estatuto editorial",
            ],
            en: [
              "Section navigation: home, winners, categories, magazine and submissions",
              "Featured and winning homes loaded from the API",
              "Detail page with technical sheet, editorial text, jury comment and gallery",
              "Privacy, cookies, terms and editorial statute pages",
            ],
          },
        },
        {
          title: { pt: "Painel de administração", en: "Admin panel" },
          icon: "admin",
          items: {
            pt: [
              "Entrada com palavra-passe e sessão",
              "Criação, edição e remoção de casas",
              "Várias imagens por casa, com remoção dos ficheiros apagados",
              "Gestão de utilizadores com diferentes papéis",
              "Alteração da palavra-passe",
            ],
            en: [
              "Sign-in with password and session",
              "Creating, editing and deleting homes",
              "Multiple images per home, with deleted files removed",
              "User management with different roles",
              "Password change",
            ],
          },
        },
      ],
      security: {
        pt: [
          "Palavras-passe guardadas com hash e sessões protegidas no painel.",
          "Proteção contra pedidos forjados (CSRF) nos formulários que alteram dados.",
          "Acesso à base de dados com instruções preparadas.",
          "Validação das imagens carregadas e escape do conteúdo apresentado.",
          "Permissões diferentes consoante o papel do utilizador.",
        ],
        en: [
          "Hashed passwords and protected sessions in the panel.",
          "Protection against forged requests (CSRF) on forms that change data.",
          "Database access through prepared statements.",
          "Validation of uploaded images and escaping of displayed content.",
          "Different permissions depending on the user's role.",
        ],
      },
      challenges: {
        pt: [
          "Separar conteúdo e apresentação: o site obtém as casas de uma API JSON em vez de ter os dados escritos no HTML.",
          "Gerir várias imagens por casa, incluindo a remoção dos ficheiros quando uma casa ou imagem é apagada.",
          "Proteger um painel de gestão com as práticas essenciais: hash de palavras-passe, sessões, CSRF, consultas preparadas e validação de ficheiros.",
        ],
        en: [
          "Separating content from presentation: the website gets the homes from a JSON API instead of hard-coding them in HTML.",
          "Managing multiple images per home, including removing files when a home or image is deleted.",
          "Protecting a management panel with the essentials: password hashing, sessions, CSRF, prepared statements and file validation.",
        ],
      },
      contribution: {
        pt: [
          "Estágio em desenvolvimento web, em equipa e com supervisão.",
          "Participação no desenvolvimento e na atualização do website.",
          "Desenvolvimento de funcionalidades para o painel administrativo em PHP.",
          "Implementação de autenticação e gestão de sessões.",
          "Trabalho na interface com HTML, CSS e JavaScript.",
          "Colaboração com o supervisor na implementação de alterações.",
        ],
        en: [
          "Web development internship, as part of a team and under supervision.",
          "Took part in developing and updating the website.",
          "Developed features for the PHP admin panel.",
          "Implemented authentication and session management.",
          "Worked on the interface with HTML, CSS and JavaScript.",
          "Worked with the supervisor to implement changes.",
        ],
      },
      learnings: {
        pt: [
          "Num projeto colaborativo, é essencial perceber o código dos outros antes de o alterar.",
          "Mesmo um painel interno precisa de proteções básicas: CSRF, consultas preparadas e validação de ficheiros.",
          "Separar dados e apresentação permite atualizar o site sem tocar no HTML.",
        ],
        en: [
          "In a collaborative project, understanding other people's code before changing it is essential.",
          "Even an internal panel needs basic protections: CSRF, prepared statements and file validation.",
          "Separating data from presentation makes it possible to update the website without touching the HTML.",
        ],
      },
    },
  },
  {
    slug: "partilhalocal",
    name: { pt: "PartilhaLocal", en: "PartilhaLocal" },
    type: {
      pt: "Plataforma web · Projeto próprio",
      en: "Web platform · Personal project",
    },
    status: "in-development",
    categories: ["web"],
    summary: {
      pt: "Plataforma para emprestar e partilhar materiais entre pessoas da mesma comunidade. A interface já funciona no navegador; a base de dados e as contas estão em desenvolvimento.",
      en: "A platform for lending and sharing items between people in the same community. The interface already works in the browser; the database and accounts are in development.",
    },
    description: {
      pt: "Projeto próprio que pretende aproximar quem tem materiais disponíveis de quem precisa de os usar durante pouco tempo. A interface em HTML, CSS e JavaScript já permite explorar, pesquisar e consultar materiais e preencher um formulário de publicação com validação. O servidor Flask, a ligação à base de dados MySQL e as contas de utilizador ainda estão em desenvolvimento.",
      en: "A personal project that aims to connect people who have items available with those who need them for a short time. The HTML, CSS and JavaScript interface already lets users browse, search and view items and fill in a validated publishing form. The Flask server, the MySQL database connection and user accounts are still in development.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "MySQL"],
    highlights: {
      pt: [
        "Seis páginas com estilo próprio",
        "Listagem de materiais gerada com JavaScript",
        "Pesquisa sem acentos e filtro por localidade",
        "Página de detalhe a partir do endereço",
        "Publicação com validação e pré-visualização da fotografia",
        "Servidor Flask inicial (local, ainda não publicado)",
      ],
      en: [
        "Six pages with their own styling",
        "Item listing generated with JavaScript",
        "Accent-insensitive search and location filter",
        "Detail page driven by the URL",
        "Publishing form with validation and photo preview",
        "Initial Flask server (local, not yet published)",
      ],
    },
    notice: {
      pt: "Em desenvolvimento: os materiais são exemplos definidos no código, nada é guardado e a ligação ao MySQL e as contas de utilizador ainda não estão implementadas. O repositório público não é a versão completa: contém apenas parte da interface e ainda não inclui o servidor Flask nem as alterações mais recentes.",
      en: "In development: items are examples defined in the code, nothing is saved, and the MySQL connection and user accounts are not implemented yet. The public repository is not the complete version: it only contains part of the interface and does not yet include the Flask server or the latest changes.",
    },
    cover: null,
    coverMotif: "sharing",
    links: { repository: "https://github.com/emanuelwicliffe-hub/PartilhaLocal", demo: null },
    featured: false,
    caseStudy: {
      overview: {
        pt: [
          "O PartilhaLocal parte da ideia de reutilizar em vez de comprar: aproximar pessoas que têm materiais disponíveis de quem precisa deles durante pouco tempo, dentro da mesma comunidade.",
          "O desenvolvimento começou pela interface, para definir todas as páginas antes do backend. O repositório público contém apenas parte dessa interface: as páginas de entrada e registo, o servidor Flask, o teste de ligação à base de dados e as últimas alterações ao formulário de publicação ainda só existem localmente.",
        ],
        en: [
          "PartilhaLocal starts from the idea of reusing instead of buying: connecting people who have items available with those who need them for a short time, within the same community.",
          "Development started with the interface, to define every page before the backend. The public repository only contains part of that interface: the sign-in and sign-up pages, the Flask server, the database connection test and the latest changes to the publishing form still exist only locally.",
        ],
      },
      focusAreas: {
        pt: ["Interface antes do backend", "JavaScript sem frameworks", "Validação de formulários", "Implementado vs. planeado"],
        en: ["Interface before backend", "Framework-free JavaScript", "Form validation", "Built vs. planned"],
      },
      currentStatus: {
        updated: "2026-11-12",
        done: {
          pt: [
            "Páginas de início, explorar, detalhe do material, publicar, entrar e criar conta",
            "Lista de materiais gerada com JavaScript a partir de dados de exemplo",
            "Pesquisa sem acentos e filtro por localidade, com mensagem quando não há resultados",
            "Página de detalhe escolhida pelo parâmetro do endereço",
            "Formulário de publicação com validação e pré-visualização da fotografia (JPG, PNG ou WebP, até 5 MB), sem guardar dados",
            "Validação do formulário de registo no navegador",
            "Servidor Flask que serve as páginas, ainda sem lógica de dados",
          ],
          en: [
            "Home, browse, item detail, publish, sign-in and sign-up pages",
            "Item list generated with JavaScript from sample data",
            "Accent-insensitive search and location filter, with a message when there are no results",
            "Detail page selected by the URL parameter",
            "Publishing form with validation and photo preview (JPG, PNG or WebP, up to 5 MB), without saving data",
            "Sign-up form validation in the browser",
            "Flask server that serves the pages, still without data logic",
          ],
        },
        next: {
          pt: [
            "Ligação do Flask à base de dados MySQL",
            "Registo e entrada com contas reais",
            "Guardar e listar os materiais publicados",
            "Pedidos de empréstimo",
            "Revisão da adaptação a ecrãs pequenos",
          ],
          en: [
            "Connecting Flask to the MySQL database",
            "Sign-up and sign-in with real accounts",
            "Saving and listing published items",
            "Borrowing requests",
            "Reviewing the small-screen layout",
          ],
        },
      },
      challenges: {
        pt: [
          "Construir a listagem, a pesquisa e a página de detalhe só com JavaScript, sem frameworks, a partir de uma única fonte de dados.",
          "Normalizar o texto para que a pesquisa encontre resultados com ou sem acentos.",
          "Validar o formulário e a fotografia no navegador, com mensagens claras, sem dar a entender que os dados foram guardados.",
        ],
        en: [
          "Building the listing, search and detail page with plain JavaScript, without frameworks, from a single data source.",
          "Normalising text so that search finds results with or without accents.",
          "Validating the form and photo in the browser with clear messages, without implying that data was saved.",
        ],
      },
      contribution: {
        pt: [
          "Projeto próprio: conceção da ideia, das páginas e do percurso de utilização.",
          "Desenvolvimento da interface em HTML, CSS e JavaScript.",
          "Início do servidor em Flask e preparação da base de dados MySQL.",
          "Documentação do estado real do projeto no README.",
        ],
        en: [
          "Personal project: designing the idea, the pages and the user journey.",
          "Building the interface in HTML, CSS and JavaScript.",
          "Starting the Flask server and preparing the MySQL database.",
          "Documenting the real state of the project in the README.",
        ],
      },
      learnings: {
        pt: [
          "Definir as páginas antes do backend ajuda a perceber que dados são realmente necessários.",
          "Uma interface deve dizer a verdade: se nada foi guardado, a mensagem tem de o indicar.",
          "Manter os segredos fora do repositório desde o início, com variáveis de ambiente e .gitignore.",
        ],
        en: [
          "Defining the pages before the backend helps clarify which data is really needed.",
          "An interface should tell the truth: if nothing was saved, the message must say so.",
          "Keeping secrets out of the repository from the start, with environment variables and .gitignore.",
        ],
      },
    },
  },
  {
    slug: "barberpa",
    name: { pt: "BarberPA", en: "BarberPA" },
    type: {
      pt: "Protótipo de interface · Desenvolvido com apoio de IA",
      en: "Interface prototype · Built with AI assistance",
    },
    status: "prototype",
    categories: ["web"],
    summary: {
      pt: "Protótipo navegável de uma plataforma de marcações para barbearias, com áreas de cliente, barbearia e administração, construído em React com apoio de inteligência artificial.",
      en: "A clickable prototype of a booking platform for barbershops, with customer, barbershop and admin areas, built in React with the help of artificial intelligence.",
    },
    description: {
      pt: "Protótipo experimental que simula uma plataforma de marcações para barbearias: explorar barbearias, consultar o perfil de cada uma, percorrer o fluxo de marcação, a área do cliente, o painel da barbearia e a administração. Foi desenvolvido com apoio de IA, em React com Tailwind CSS, e funciona inteiramente no navegador, com dados fictícios e sem backend.",
      en: "An experimental prototype that simulates a booking platform for barbershops: browsing barbershops, viewing each profile, walking through the booking flow, the customer area, the barbershop panel and administration. It was built with AI assistance in React with Tailwind CSS and runs entirely in the browser, with fictitious data and no backend.",
    },
    technologies: ["React", "Tailwind CSS", "Lucide", "TypeScript"],
    highlights: {
      pt: [
        "Exploração com filtros e ordenação",
        "Perfil da barbearia com serviços e equipa",
        "Fluxo de marcação simulado",
        "Área do cliente com favoritos",
        "Painel da barbearia: agenda, serviços, equipa e horários",
        "Visão geral de administração",
        "Gráficos e mapa ilustrativo em SVG",
        "Estado global com useReducer e rotas por hash",
      ],
      en: [
        "Browsing with filters and sorting",
        "Barbershop profile with services and team",
        "Simulated booking flow",
        "Customer area with favourites",
        "Barbershop panel: schedule, services, team and opening hours",
        "Admin overview",
        "SVG charts and illustrative map",
        "Global state with useReducer and hash routing",
      ],
    },
    notice: {
      pt: "Protótipo experimental com dados fictícios: não tem backend, autenticação real nem marcações reais.",
      en: "Experimental prototype with fictitious data: no backend, no real authentication and no real bookings.",
    },
    cover: null,
    coverMotif: "booking",
    links: { repository: null, demo: null },
    featured: false,
    caseStudy: {
      overview: {
        pt: [
          "O BarberPA é um protótipo para explorar como seria uma plataforma de marcações para barbearias, vista por três tipos de utilizador: o cliente, a barbearia e a administração.",
          "Foi desenvolvido com apoio de inteligência artificial e serve para validar ecrãs, percursos e a organização da interface. Todos os dados são fictícios e tudo acontece no navegador: não há servidor, contas reais nem marcações reais.",
        ],
        en: [
          "BarberPA is a prototype for exploring what a barbershop booking platform could look like from three points of view: the customer, the barbershop and the administration.",
          "It was built with the help of artificial intelligence and is used to validate screens, journeys and interface structure. All data is fictitious and everything happens in the browser: there is no server, no real accounts and no real bookings.",
        ],
      },
      focusAreas: {
        pt: ["Prototipagem assistida por IA", "Organização de componentes", "Percursos de três perfis", "Visualização de dados em SVG"],
        en: ["AI-assisted prototyping", "Component organisation", "Three user journeys", "SVG data visualisation"],
      },
      featureGroups: [
        {
          title: { pt: "Cliente (simulado)", en: "Customer (simulated)" },
          icon: "user",
          items: {
            pt: [
              "Exploração de barbearias com filtros por bairro, preço e avaliação, e ordenação",
              "Perfil da barbearia com serviços, barbeiros e avaliações",
              "Fluxo de marcação com regras de disponibilidade fictícias",
              "Área do cliente com marcações simuladas, reagendamento e favoritos",
            ],
            en: [
              "Barbershop browsing with filters by neighbourhood, price and rating, and sorting",
              "Barbershop profile with services, barbers and ratings",
              "Booking flow with fictitious availability rules",
              "Customer area with simulated bookings, rescheduling and favourites",
            ],
          },
        },
        {
          title: { pt: "Barbearia e administração (simulado)", en: "Barbershop and admin (simulated)" },
          icon: "company",
          items: {
            pt: [
              "Painel da barbearia: agenda, serviços, barbeiros, horários e bloqueios de agenda",
              "Gráficos de barras, linhas e barras horizontais em SVG",
              "Visão geral da administração da plataforma",
              "Página de apresentação do conceito",
            ],
            en: [
              "Barbershop panel: schedule, services, barbers, opening hours and blocked slots",
              "Bar, line and horizontal bar charts in SVG",
              "Platform administration overview",
              "Concept presentation page",
            ],
          },
        },
      ],
      challenges: {
        pt: [
          "Organizar cerca de 3 400 linhas em módulos claros: configuração, dados, regras, componentes de interface, gráficos, mapa, estado global, layout e um ecrã por ficheiro.",
          "Gerir o estado de toda a aplicação com useReducer e ações explícitas: marcar, reagendar, favoritos, serviços, barbeiros, horários e bloqueios.",
          "Criar gráficos e um mapa ilustrativo com SVG, sem bibliotecas de gráficos.",
          "Gerar um único ficheiro HTML com um script de build próprio que compila o JSX com o TypeScript.",
        ],
        en: [
          "Organising around 3,400 lines into clear modules: configuration, data, rules, UI components, charts, map, global state, layout and one screen per file.",
          "Managing the whole application state with useReducer and explicit actions: book, reschedule, favourites, services, barbers, opening hours and blocked slots.",
          "Creating charts and an illustrative map with SVG, without a charting library.",
          "Producing a single HTML file with a custom build script that compiles JSX with TypeScript.",
        ],
      },
      contribution: {
        pt: [
          "Projeto próprio: conceito, ecrãs e percursos dos três perfis.",
          "Desenvolvimento com apoio de inteligência artificial, usada como ferramenta para gerar e iterar o código.",
          "Direção do protótipo: o que mostrar, para que perfil e como deixar claro o que é simulado.",
        ],
        en: [
          "Personal project: concept, screens and journeys for the three user types.",
          "Built with the help of artificial intelligence, used as a tool to generate and iterate on the code.",
          "Directing the prototype: what to show, for which user and how to make clear what is simulated.",
        ],
      },
      learnings: {
        pt: [
          "Um protótipo navegável é uma forma rápida de testar uma ideia antes de investir num backend.",
          "A IA acelera a construção de interfaces, mas a estrutura e os limites do protótipo têm de ser definidos e verificados.",
          "Deixar claro o que é simulado evita confundir um protótipo com um produto.",
        ],
        en: [
          "A clickable prototype is a quick way to test an idea before investing in a backend.",
          "AI speeds up interface building, but the prototype's structure and limits still have to be defined and checked.",
          "Being clear about what is simulated avoids mistaking a prototype for a product.",
        ],
      },
    },
  },
  {
    slug: "digidex",
    name: { pt: "DigiDex", en: "DigiDex" },
    type: {
      pt: "Projeto académico · Aplicação Android",
      en: "Academic project · Android app",
    },
    status: "academic",
    categories: ["mobile"],
    summary: {
      pt: "Aplicação Android em Kotlin e Jetpack Compose que pesquisa Digimons numa API pública, mostra os seus dados e permite guardar favoritos.",
      en: "An Android app in Kotlin and Jetpack Compose that searches Digimon in a public API, shows their data and lets users keep favourites.",
    },
    description: {
      pt: "Trabalho final da unidade de desenvolvimento Android do curso TPSI. A aplicação consome a Digi-API com Retrofit, apresenta a imagem e os dados de cada Digimon e organiza-se em três ecrãs com navegação, estado de carregamento, mensagens de erro e uma lista de favoritos.",
      en: "Final assignment for the Android development unit of the TPSI course. The app consumes the Digi-API with Retrofit, shows each Digimon's image and data, and is organised into three screens with navigation, a loading state, error messages and a favourites list.",
    },
    technologies: ["Kotlin", "Jetpack Compose", "Material 3", "Navigation Compose", "ViewModel", "Retrofit", "Gson", "Coil"],
    highlights: {
      pt: [
        "Pesquisa por nome ou ID",
        "Validação do campo de pesquisa",
        "Consumo de uma API REST externa",
        "Imagem e dados de cada Digimon",
        "Navegação entre três ecrãs",
        "Favoritos: adicionar e remover",
        "Estado de carregamento e tratamento de erros",
      ],
      en: [
        "Search by name or ID",
        "Search field validation",
        "Consuming an external REST API",
        "Image and data for each Digimon",
        "Navigation between three screens",
        "Favourites: add and remove",
        "Loading state and error handling",
      ],
    },
    notice: {
      pt: "Projeto académico: não está publicado em nenhuma loja de aplicações e o repositório da entrega é privado.",
      en: "Academic project: it is not published on any app store and the submission repository is private.",
    },
    cover: null,
    coverMotif: "mobile",
    links: { repository: null, demo: null },
    featured: false,
    caseStudy: {
      overview: {
        pt: [
          "O DigiDex foi o trabalho final da unidade de desenvolvimento Android do curso TPSI, com tema livre. Os requisitos pediam vários ecrãs com navegação, interação com o utilizador, validação, consumo de uma API externa e tratamento de carregamento e erros.",
          "A aplicação permite pesquisar um Digimon pelo nome ou pelo ID, ver a sua imagem e os seus dados e guardá-lo numa lista de favoritos. A entrega incluiu um README e um vídeo de demonstração.",
        ],
        en: [
          "DigiDex was the final assignment for the Android development unit of the TPSI course, with a free theme. The requirements asked for several screens with navigation, user interaction, validation, an external API, and loading and error handling.",
          "The app lets users search for a Digimon by name or ID, see its image and data, and save it to a favourites list. The submission included a README and a demo video.",
        ],
      },
      focusAreas: {
        pt: ["Interfaces declarativas com Compose", "Consumo de APIs REST", "Estado com ViewModel", "Carregamento e erros"],
        en: ["Declarative UI with Compose", "Consuming REST APIs", "State with ViewModel", "Loading and errors"],
      },
      challenges: {
        pt: [
          "Ligar a interface a um pedido assíncrono: o ViewModel guarda o estado (carregamento, erro, Digimon atual e favoritos) e o Compose atualiza o ecrã automaticamente.",
          "Tratar os casos de falha: campo vazio, Digimon não encontrado (com o código HTTP) e erro de comunicação.",
          "Partilhar o mesmo estado entre três ecrãs com Navigation Compose.",
        ],
        en: [
          "Connecting the UI to an asynchronous request: the ViewModel holds the state (loading, error, current Digimon and favourites) and Compose updates the screen automatically.",
          "Handling failures: empty field, Digimon not found (with the HTTP status code) and communication errors.",
          "Sharing the same state across three screens with Navigation Compose.",
        ],
      },
      contribution: {
        pt: [
          "Trabalho individual, desenvolvido de acordo com os requisitos da unidade de formação.",
          "Organização do código em modelo, rede, navegação, ecrãs e ViewModel.",
          "Integração da Digi-API com Retrofit e Gson e carregamento de imagens com Coil.",
          "README com a descrição da aplicação e da API, e vídeo de demonstração.",
        ],
        en: [
          "Individual work, built to the requirements of the training unit.",
          "Code organised into model, network, navigation, screens and ViewModel.",
          "Digi-API integration with Retrofit and Gson, and image loading with Coil.",
          "README describing the app and the API, plus a demo video.",
        ],
      },
      learnings: {
        pt: [
          "Separar a lógica (ViewModel) da interface (Compose) torna os ecrãs mais simples.",
          "Uma app que depende de uma API tem de prever sempre o carregamento e as falhas.",
          "Os favoritos ficam em memória; guardá-los de forma persistente seria o passo seguinte.",
        ],
        en: [
          "Separating logic (ViewModel) from the UI (Compose) keeps screens simpler.",
          "An app that depends on an API must always plan for loading and failures.",
          "Favourites are kept in memory; persisting them would be the next step.",
        ],
      },
    },
  },
  {
    slug: "heromatch",
    name: { pt: "HeroMatch", en: "HeroMatch" },
    type: {
      pt: "Projeto individual · Desenvolvimento frontend",
      en: "Individual project · Frontend development",
    },
    status: "delivered",
    categories: ["web"],
    summary: {
      pt: "Site estático de seis páginas, em HTML e CSS, para uma plataforma fictícia que liga pessoas a heróis de bairro.",
      en: "A six-page static website in HTML and CSS for a fictional platform that matches people with neighbourhood heroes.",
    },
    description: {
      pt: "Projeto individual de frontend com seis páginas — início com vídeo, galeria de heróis, sobre, entrada, registo e painel — que partilham uma única folha de estilos. Inclui pequenos scripts para ampliar imagens e validar formulários no navegador; não tem backend nem autenticação real.",
      en: "An individual frontend project with six pages — home with video, hero gallery, about, sign-in, sign-up and dashboard — sharing a single stylesheet. It includes small scripts to enlarge images and validate forms in the browser; there is no backend and no real authentication.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    highlights: {
      pt: [
        "Seis páginas com navegação comum",
        "Galeria de oito heróis",
        "Ampliação de imagens numa janela modal",
        "Vídeo de apresentação na página inicial",
        "Formulários de entrada e registo com validação básica",
        "Folha de estilos única com Flexbox e Grid",
      ],
      en: [
        "Six pages with shared navigation",
        "Gallery of eight heroes",
        "Image enlargement in a modal window",
        "Intro video on the home page",
        "Sign-in and sign-up forms with basic validation",
        "Single stylesheet with Flexbox and Grid",
      ],
    },
    notice: {
      pt: "Projeto estático: os formulários não criam contas nem autenticam utilizadores.",
      en: "Static project: the forms do not create accounts or authenticate users.",
    },
    cover: null,
    coverMotif: "pages",
    links: { repository: null, demo: null },
    featured: false,
    caseStudy: {
      overview: {
        pt: [
          "O HeroMatch é um site fictício e bem-humorado para «encontrar o herói certo»: uma galeria de heróis de bairro, cada um com a sua especialidade.",
          "Foi um projeto individual de frontend, focado na estrutura das páginas e na organização visual, acompanhado de uma apresentação em PDF.",
        ],
        en: [
          "HeroMatch is a fictional, light-hearted website for “finding the right hero”: a gallery of neighbourhood heroes, each with their own speciality.",
          "It was an individual frontend project, focused on page structure and visual organisation, accompanied by a PDF presentation.",
        ],
      },
      focusAreas: {
        pt: ["Estrutura das páginas", "CSS partilhado", "Organização visual", "Formulários"],
        en: ["Page structure", "Shared CSS", "Visual organisation", "Forms"],
      },
      challenges: {
        pt: [
          "Manter cabeçalho, navegação e rodapé coerentes em seis páginas, com uma única folha de estilos.",
          "Organizar a galeria de heróis com Flexbox e Grid e destacar elementos com efeitos de hover e transições.",
          "Usar campos com tipos adequados (email e palavra-passe) e validações simples no navegador: campos vazios e palavras-passe diferentes.",
        ],
        en: [
          "Keeping the header, navigation and footer consistent across six pages with a single stylesheet.",
          "Laying out the hero gallery with Flexbox and Grid and highlighting elements with hover effects and transitions.",
          "Using appropriate field types (email and password) and simple browser validation: empty fields and mismatched passwords.",
        ],
      },
      contribution: {
        pt: [
          "Projeto individual: estrutura das páginas, estilos e conteúdos.",
          "Pequenos scripts para a ampliação de imagens e a validação dos formulários.",
          "Apresentação do projeto em PDF.",
        ],
        en: [
          "Individual project: page structure, styling and content.",
          "Small scripts for image enlargement and form validation.",
          "PDF presentation of the project.",
        ],
      },
      learnings: {
        pt: [
          "Uma folha de estilos partilhada mantém várias páginas coerentes.",
          "A estrutura e a hierarquia visual vêm antes dos efeitos.",
          "Validar no navegador melhora a experiência, mas não substitui a validação num servidor.",
        ],
        en: [
          "A shared stylesheet keeps several pages consistent.",
          "Structure and visual hierarchy come before effects.",
          "Browser validation improves the experience but does not replace server-side validation.",
        ],
      },
    },
  },
];

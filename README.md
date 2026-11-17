# Emanuel Wicliffe — Portfólio

Portfólio profissional de **Emanuel Wicliffe**, desenvolvedor de software em Leiria, Portugal.

Site bilingue (português de Portugal e inglês) com tema escuro por omissão, tema claro opcional,
filtros de projetos, páginas de estudo de caso e um terminal interativo opcional.

> *Professional portfolio of Emanuel Wicliffe, software developer based in Leiria, Portugal.
> Bilingual (PT-PT / EN) Next.js site with project case studies.*

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) |
| UI | React 19, TypeScript (strict), Tailwind CSS 4 |
| Animação | Motion (LazyMotion) e animações CSS, com suporte a `prefers-reduced-motion` |
| Ícones | Lucide e SVG próprios para GitHub/LinkedIn |
| Qualidade | ESLint, Vitest e Testing Library |
| Alojamento | Vercel |

Não tem backend, base de dados nem serviços pagos. As páginas são geradas no build.

## Funcionalidades

- Página inicial com Hero, Sobre mim, Competências, Projetos, Fundamentos, Percurso, Como trabalho e Contacto.
- Rotas por idioma: `/pt` e `/en`. O `/` redireciona conforme o idioma do browser (português por omissão).
- Projetos: Parttime, Pontal Awards, PartilhaLocal, BarberPA, DigiDex e HeroMatch, cada um com página de estudo de caso
  (`/pt/projects/<slug>`).
- Filtros de projetos: Todos, Web, Backend, Mobile e Em desenvolvimento.
- Estados honestos por projeto: em desenvolvimento, colaborativo, protótipo, académico ou entregue.
- Competências classificadas como *usado em projetos*, *estudado em formação* ou *em aprendizagem*, sem barras de percentagem.
- Terminal interativo opcional (`help`, `about`, `skills`, `projects`, `contact`, `goto <secção>`, `clear`, `exit`) com `<dialog>` nativo.
- SEO: metadados por idioma, `hreflang`, canonical, Open Graph, imagem OG gerada, `sitemap.xml`, `robots.txt` e JSON-LD (`Person`).
- Página 404 localizada e cabeçalhos de segurança (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- Sem conteúdo inventado: links, CV e fotografia só aparecem quando existem e estão configurados.

## Requisitos

- Node.js 20.9 ou superior (testado com Node 22)
- npm

## Executar localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

```bash
npm run lint         # ESLint
npm run typecheck    # gera os tipos das rotas e corre tsc --noEmit
npm test             # testes (Vitest)
npm run build        # build de produção
npm run start        # servir o build localmente
npm run check        # lint + typecheck + testes + build
```

## Estrutura

```
src/
  app/
    [lang]/                 # layout raiz, página inicial, 404, imagem OG
      projects/[slug]/      # estudos de caso
    global-not-found.tsx    # 404 para URLs fora de qualquer rota
    sitemap.ts, robots.ts, icon.svg, globals.css
  components/
    layout/                 # Header, Footer, tema, seletor de idioma
    sections/               # secções da página inicial
    projects/               # filtros, cartões, capas, estudos de caso, fundamentos
    terminal/               # terminal interativo
    seo/                    # JSON-LD
    ui/                     # componentes base
  config/site.ts            # nome, URL, contactos, CV
  data/                     # conteúdo editável (perfil, projetos, competências, percurso, processo)
  i18n/                     # idiomas e dicionários pt/en
  lib/                      # lógica pura (filtros, terminal, SEO, tema)
  proxy.ts                  # redirecionamento de idioma e 404 de projetos
tests/                      # testes de dados, componentes, i18n e terminal
```

## Atualizar conteúdo

O conteúdo está em `src/data/` e `src/config/site.ts`. Os textos traduzíveis usam o formato
`{ pt: "...", en: "..." }`; o TypeScript e os testes avisam quando falta uma tradução.

- **Projetos:** `src/data/projects.ts`. Um projeto com `caseStudy` ganha página própria, entrada no sitemap e rota permitida no proxy.
- **Competências:** `src/data/skills.ts` (`"used"`, `"studied"` ou `"learning"`).
- **Percurso:** `src/data/experience.ts`. As datas só entram no campo `period`.
- **Textos da interface:** `src/i18n/dictionaries/pt.ts` e `en.ts` (mesma estrutura, verificada em `tests/i18n.test.ts`).
- **Cores:** tokens no início de `src/app/globals.css`.

### Fotografia

1. Coloca a fotografia em `public/images/profile.jpg` (quadrada ou vertical, mínimo 400×400).
2. Em `src/data/profile.ts`, altera `photo: null` para `photo: "/images/profile.jpg"`.

Enquanto `photo` for `null`, aparece o monograma "EW".

### CV

1. Usa **apenas uma versão pública** do CV, sem morada completa, telefone nem data de nascimento.
2. Coloca-a em `public/cv/emanuel-wicliffe-cv.pdf`. Tudo o que está em `public/` fica acessível a qualquer pessoa.
3. Em `src/config/site.ts`, altera `cv.file` para `"/cv/emanuel-wicliffe-cv.pdf"`.

O botão "Descarregar CV" só aparece quando `cv.file` está definido, e um teste falha se o ficheiro não existir.

## Publicar na Vercel

1. Na Vercel, **Add New → Project** e importa o repositório do GitHub.
2. Mantém as predefinições (Framework: Next.js, Build: `npm run build`).
3. Cada push para a branch de produção (`main`) faz um novo deploy; outras branches geram pré-visualizações.

### URL do site

O URL usado no SEO, sitemap e canonical é resolvido por esta ordem (`src/config/site.ts`):

1. `NEXT_PUBLIC_SITE_URL`, se estiver definida;
2. o domínio de produção da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`, definido automaticamente);
3. `http://localhost:3000` em desenvolvimento.

Enquanto o site usar o endereço `.vercel.app`, não é preciso definir nada. Com domínio próprio,
adiciona-o em **Settings → Domains**, define `NEXT_PUBLIC_SITE_URL=https://o-teu-dominio.pt`
em **Settings → Environment Variables** e volta a fazer deploy.

O projeto usa `proxy.ts` e Cache Components, por isso precisa de um runtime Node.js.
Não é compatível com um export estático (por exemplo, GitHub Pages).

## Contacto

- E-mail: [emanuelwicliffe@gmail.com](mailto:emanuelwicliffe@gmail.com)
- GitHub: [emanuelwicliffe-hub](https://github.com/emanuelwicliffe-hub)
- LinkedIn: [Emanuel Wicliffe](https://www.linkedin.com/in/emanuel-moura-29818041a/)

© 2026 Emanuel Wicliffe. Todos os direitos reservados.

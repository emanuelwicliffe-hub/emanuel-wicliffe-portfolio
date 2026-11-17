import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { isLocale, pickLocale } from "@/i18n/config";

const caseStudySlugs = new Set(projects.filter((p) => p.caseStudy).map((p) => p.slug));

/**
 * - Redireciona caminhos sem idioma (ex.: "/" → "/pt"), escolhendo o idioma
 *   a partir do browser (português por omissão).
 * - "/pt/projects" → secção de projetos da página inicial.
 * - Projetos sem página própria devolvem 404 real (e não apenas a interface de 404).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first = "", second, third, ...rest] = pathname.split("/");

  if (!isLocale(first)) {
    const locale = pickLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  if (second === "projects") {
    if (!third) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}`;
      url.hash = "projects";
      return NextResponse.redirect(url);
    }
    if (!caseStudySlugs.has(third) || rest.length > 0) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}/404`;
      return NextResponse.rewrite(url);
    }
  }
}

export const config = {
  // Ignora ficheiros internos, ficheiros estáticos e rotas de metadados.
  matcher: ["/((?!_next|api|.*\\..*|sitemap.xml|robots.txt|icon.svg).*)"],
};

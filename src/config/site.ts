/**
 * Configuração global do site.
 *
 * Todos os links são opcionais: quando um valor é `null`, o respetivo botão
 * ou ligação simplesmente não aparece no site (nunca são mostrados links
 * falsos ou botões sem funcionalidade).
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export type SocialLinks = {
  /** Ex.: "https://github.com/o-teu-utilizador" */
  github: string | null;
  /** Ex.: "https://www.linkedin.com/in/o-teu-perfil" */
  linkedin: string | null;
  /** Ex.: "nome@dominio.pt" (sem "mailto:") */
  email: string | null;
};

export const siteConfig = {
  name: "Emanuel Wicliffe",
  shortName: "EW",
  url: resolveSiteUrl(),
  /** Ano apresentado no rodapé. */
  copyrightYear: 2026,
  /** Cor usada na barra do browser em dispositivos móveis. */
  themeColor: "#0B0812",

  social: {
    github: "https://github.com/emanuelwicliffe-hub",
    linkedin: "https://www.linkedin.com/in/emanuel-moura-29818041a/",
    email: "emanuelwicliffe@gmail.com",
  } as SocialLinks,

  /**
   * CV para descarregar, dentro de /public. Ex.: "/cv/emanuel-wicliffe-cv.pdf".
   * Enquanto `file` for `null`, o botão "Descarregar CV" não é apresentado.
   * Só existe versão em português: na versão inglesa do site, o botão indica
   * claramente que o documento está em português.
   *
   * ATENÇÃO: antes de ativar, confirmar que o PDF público não contém morada,
   * telefone, data de nascimento ou outros dados pessoais.
   */
  cv: {
    file: null,
    language: "pt",
  } as { file: string | null; language: "pt" | "en" },
} as const;

export type SiteConfig = typeof siteConfig;

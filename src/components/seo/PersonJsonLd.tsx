import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";

/** Dados estruturados (schema.org/Person) apenas com informação real. */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const { github, linkedin, email } = siteConfig.social;
  const sameAs = [github, linkedin].filter((value): value is string => Boolean(value));

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${siteConfig.url}/${locale}`,
    jobTitle: profile.role[locale],
    address: { "@type": "PostalAddress", addressLocality: "Leiria", addressCountry: "PT" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "FAPAN" },
      { "@type": "EducationalOrganization", name: "IEFP Leiria" },
    ],
    knowsAbout: ["Software development", "Web development", "TypeScript", "Next.js", "NestJS", "PostgreSQL"],
    ...(email ? { email: `mailto:${email}` } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // JSON gerado a partir de dados estáticos; "<" é escapado por segurança.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

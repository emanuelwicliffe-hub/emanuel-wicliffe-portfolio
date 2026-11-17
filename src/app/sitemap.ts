import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { localeLabels, locales } from "@/i18n/config";
import { getCaseStudyProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...getCaseStudyProjects().map((project) => `/projects/${project.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [localeLabels[alt].htmlLang, `${siteConfig.url}/${alt}${path}`]),
        ),
      },
    })),
  );
}

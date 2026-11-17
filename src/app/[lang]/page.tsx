import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <PersonJsonLd locale={lang} />
      <Hero locale={lang} dict={dict} />
      <About locale={lang} dict={dict} />
      <Skills locale={lang} dict={dict} />
      <Projects locale={lang} dict={dict} />
      <Journey locale={lang} dict={dict} />
      <Process locale={lang} dict={dict} />
      <Contact locale={lang} dict={dict} />
    </>
  );
}

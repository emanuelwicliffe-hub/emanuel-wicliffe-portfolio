import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { getDictionary } from "@/i18n";
import { defaultLocale, localeLabels } from "@/i18n/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: `404 — ${dict.notFound.title}`,
  description: dict.notFound.message,
};

/** 404 para URLs que não correspondem a nenhuma rota (fora de /pt e /en). */
export default function GlobalNotFound() {
  return (
    <html lang={localeLabels[defaultLocale].htmlLang} data-theme="dark" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-dvh antialiased">
        <main>
          <NotFoundView locale={defaultLocale} dict={dict} />
        </main>
      </body>
    </html>
  );
}

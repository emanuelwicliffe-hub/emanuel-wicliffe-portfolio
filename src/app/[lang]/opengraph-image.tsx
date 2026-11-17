import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

export const alt = "Emanuel Wicliffe — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Imagem Open Graph gerada no build (sem fotografias nem capturas falsas). */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0B0812 0%, #151020 60%, #1E1033 100%)",
          color: "#F8F7FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "2px solid rgba(139,92,246,0.6)",
              background: "rgba(139,92,246,0.14)",
              color: "#C4B5FD",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            EW
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#A8A0B8" }}>Leiria, Portugal</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
            EMANUEL WICLIFFE
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 38, color: "#DDD6FE", maxWidth: 980 }}>
            {dict.hero.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#C4B5FD" }}>{dict.hero.eyebrow}</div>
          <div style={{ display: "flex", width: 120, height: 6, borderRadius: 3, background: "#F97316" }} />
        </div>
      </div>
    ),
    size,
  );
}

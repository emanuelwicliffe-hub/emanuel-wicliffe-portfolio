import Image from "next/image";
import type { CoverMotif, Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type ProjectCoverProps = {
  project: Project;
  locale: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Capa do projeto. Usa a imagem real quando configurada em projects.ts;
 * caso contrário mostra uma ilustração vetorial (sem capturas de ecrã falsas).
 */
export function ProjectCover({ project, locale, className, priority, sizes }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <div className={cn("relative aspect-[16/9] overflow-hidden bg-surface-2", className)}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt[locale]}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-surface-2 via-surface to-bg",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-16 size-56 rounded-full bg-primary/15 blur-3xl"
      />
      <svg
        viewBox="0 0 400 225"
        className="absolute inset-0 size-full"
        role="img"
        aria-label={project.name[locale]}
        preserveAspectRatio="xMidYMid meet"
      >
        <Motif motif={project.coverMotif} />
      </svg>
    </div>
  );
}

const line = "stroke-primary fill-none";
const soft = "fill-primary/10 stroke-primary/50";
const muted = "fill-fg-subtle/30";

function Motif({ motif }: { motif: CoverMotif }) {
  switch (motif) {
    case "platform":
      return (
        <g strokeWidth={1.5}>
          {/* Frontend */}
          <rect x="60" y="55" width="120" height="115" rx="10" className={soft} />
          <rect x="72" y="70" width="60" height="8" rx="4" className="fill-primary/70" />
          <rect x="72" y="88" width="96" height="6" rx="3" className={muted} />
          <rect x="72" y="100" width="80" height="6" rx="3" className={muted} />
          <rect x="72" y="120" width="44" height="34" rx="6" className="fill-primary/15" />
          <rect x="124" y="120" width="44" height="34" rx="6" className="fill-primary/15" />
          {/* Ligação */}
          <path d="M180 112 H220" className={line} strokeDasharray="4 5" />
          <circle cx="200" cy="112" r="4" className="fill-accent" />
          {/* Backend + dados */}
          <rect x="220" y="55" width="120" height="115" rx="10" className={soft} />
          <ellipse cx="280" cy="88" rx="34" ry="10" className={line} />
          <path d="M246 88 V128 A34 10 0 0 0 314 128 V88" className={line} />
          <path d="M246 108 A34 10 0 0 0 314 108" className={line} />
          <path
            d="M296 140 c0-8 6-13 12-13 s12 5 12 13 c0 9-12 20-12 20 s-12-11-12-20 Z"
            className="fill-accent/90"
          />
          <circle cx="308" cy="140" r="4" className="fill-bg" />
        </g>
      );
    case "awards":
      return (
        <g strokeWidth={1.5}>
          {/* Casas distinguidas */}
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${50 + i * 108} 50)`}>
              <rect width="96" height="124" rx="8" className={soft} />
              <rect x="8" y="8" width="80" height="58" rx="5" className="fill-primary/15" />
              <path d="M24 56 L48 34 L72 56" className={line} strokeLinejoin="round" />
              <rect x="34" y="46" width="28" height="18" rx="2" className="fill-primary/30" />
              <rect x="8" y="76" width="60" height="6" rx="3" className={muted} />
              <rect x="8" y="90" width="40" height="5" rx="2.5" className={muted} />
              <rect x="8" y="104" width="30" height="8" rx="4" className={i === 0 ? "fill-accent/90" : "fill-primary/60"} />
            </g>
          ))}
          {/* Selo */}
          <circle cx="146" cy="50" r="16" className="fill-accent/90" />
          <polygon
            points="0,-9 2.6,-3 9,-2.8 4,1.6 5.6,8 0,4.6 -5.6,8 -4,1.6 -9,-2.8 -2.6,-3"
            transform="translate(146 50)"
            className="fill-bg"
          />
          {/* API → painel de gestão */}
          <path d="M254 112 H288" className={line} strokeDasharray="4 5" />
          <text x="271" y="102" textAnchor="middle" className="fill-fg-subtle font-mono" fontSize="10">
            {"{ }"}
          </text>
          <rect x="288" y="58" width="72" height="110" rx="8" className={soft} />
          <rect x="288" y="58" width="72" height="16" rx="8" className="fill-primary/30" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x="298"
              y={84 + i * 20}
              width={i === 0 ? 52 : 40}
              height="9"
              rx="3"
              className={i === 0 ? "fill-primary/60" : muted}
            />
          ))}
        </g>
      );
    case "sharing":
      return (
        <g strokeWidth={1.5}>
          {/* Pesquisa */}
          <rect x="110" y="24" width="180" height="26" rx="13" className={soft} />
          <circle cx="128" cy="37" r="6" className={line} />
          <path d="M132.5 41.5 L137 46" className={line} strokeLinecap="round" />
          <rect x="146" y="34" width="90" height="6" rx="3" className={muted} />
          {/* Duas casas da mesma comunidade */}
          {[0, 180].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <path d="M70 128 L110 96 L150 128" className={line} strokeLinejoin="round" />
              <rect x="80" y="126" width="60" height="52" rx="4" className={soft} />
              <rect x="102" y="150" width="16" height="28" rx="2" className="fill-primary/40" />
            </g>
          ))}
          {/* Empréstimo e devolução */}
          <path d="M156 118 Q200 86 244 118" className={line} strokeDasharray="4 5" />
          <path d="M236 113 L244 118 L235 121" className={line} strokeLinejoin="round" />
          <path d="M244 172 Q200 204 156 172" className={line} strokeDasharray="4 5" />
          <path d="M164 177 L156 172 L165 169" className={line} strokeLinejoin="round" />
          <rect x="186" y="132" width="28" height="22" rx="3" className="fill-accent/85" />
          <path d="M186 140 H214 M200 132 V140" className="stroke-bg fill-none" />
        </g>
      );
    case "booking":
      return (
        <g strokeWidth={1.5}>
          {/* Agenda */}
          <rect x="60" y="40" width="170" height="150" rx="10" className={soft} />
          <rect x="60" y="40" width="170" height="24" rx="10" className="fill-primary/30" />
          <rect x="88" y="32" width="6" height="16" rx="3" className="fill-primary" />
          <rect x="196" y="32" width="6" height="16" rx="3" className="fill-primary" />
          {Array.from({ length: 20 }).map((_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const selected = row === 1 && col === 2;
            return (
              <rect
                key={i}
                x={72 + col * 30}
                y={74 + row * 28}
                width="24"
                height="20"
                rx="4"
                className={selected ? "fill-accent/90" : (i * 7) % 3 === 0 ? "fill-primary/35" : "fill-primary/10"}
              />
            );
          })}
          {/* Gráfico com dados fictícios */}
          <rect x="250" y="40" width="96" height="150" rx="10" className={soft} />
          <text x="336" y="58" textAnchor="end" className="fill-fg-subtle font-mono" fontSize="10">
            demo
          </text>
          {[40, 64, 30, 82].map((h, i) => (
            <rect
              key={i}
              x={264 + i * 19}
              y={176 - h}
              width="12"
              height={h}
              rx="3"
              className={i === 3 ? "fill-accent/85" : "fill-primary/55"}
            />
          ))}
          <path d="M258 178 H338" className={line} />
        </g>
      );
    case "pages":
      return (
        <g strokeWidth={1.5}>
          {/* Páginas empilhadas */}
          <rect x="130" y="30" width="170" height="130" rx="8" className="fill-primary/5 stroke-primary/25" />
          <rect x="112" y="44" width="170" height="130" rx="8" className="fill-primary/10 stroke-primary/35" />
          <rect x="94" y="58" width="190" height="140" rx="8" className={soft} />
          <rect x="94" y="58" width="190" height="18" rx="8" className="fill-primary/30" />
          <circle cx="106" cy="67" r="3" className="fill-accent" />
          <circle cx="116" cy="67" r="3" className={muted} />
          <circle cx="126" cy="67" r="3" className={muted} />
          <rect x="106" y="86" width="166" height="28" rx="5" className="fill-primary/15" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${106 + i * 42} 122)`}>
              <rect width="34" height="44" rx="4" className="fill-primary/10 stroke-primary/30" />
              <circle cx="17" cy="16" r="8" className={i === 1 ? "fill-accent/90" : "fill-primary/45"} />
              <rect x="6" y="31" width="22" height="4" rx="2" className={muted} />
            </g>
          ))}
          <rect x="106" y="176" width="166" height="6" rx="3" className={muted} />
          <text x="318" y="124" textAnchor="middle" className="fill-primary font-mono" fontSize="20">
            {"</>"}
          </text>
        </g>
      );
    case "mobile":
      return (
        <g strokeWidth={1.5}>
          <rect x="150" y="18" width="100" height="190" rx="18" className={soft} />
          <rect x="185" y="26" width="30" height="5" rx="2.5" className={muted} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(162 ${46 + i * 38})`}>
              <rect width="76" height="30" rx="6" className="fill-primary/12 stroke-primary/30" />
              <circle cx="15" cy="15" r="8" className={i === 0 ? "fill-accent/90" : "fill-primary/50"} />
              <rect x="30" y="9" width="36" height="5" rx="2.5" className={muted} />
              <rect x="30" y="18" width="24" height="4" rx="2" className={muted} />
            </g>
          ))}
          <path d="M70 70 Q110 40 140 70" className={line} strokeDasharray="3 5" />
          <path d="M260 160 Q300 190 330 150" className={line} strokeDasharray="3 5" />
        </g>
      );
  }
}

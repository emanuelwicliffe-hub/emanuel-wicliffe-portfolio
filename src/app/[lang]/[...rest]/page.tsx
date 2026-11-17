import { notFound } from "next/navigation";

/** Qualquer caminho desconhecido dentro de um idioma mostra a 404 localizada. */
export default function CatchAll() {
  notFound();
}

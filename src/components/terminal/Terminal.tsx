"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import type { SectionId } from "@/lib/sections";
import { runCommand, type TerminalLine } from "@/lib/terminal";

type TerminalProps = {
  locale: Locale;
  labels: Dictionary["terminal"];
  open: boolean;
  onClose: () => void;
};

const lineStyles: Record<TerminalLine["kind"], string> = {
  input: "text-fg",
  output: "text-fg-muted",
  accent: "text-primary-text",
  muted: "text-fg-subtle",
  error: "text-accent",
};

/**
 * Terminal interativo opcional. Usa o elemento nativo <dialog>, que garante
 * foco preso no diálogo, fecho com Esc e conteúdo de fundo inerte.
 */
export function Terminal({ locale, labels, open, onClose }: TerminalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [lines, setLines] = useState<TerminalLine[]>(() => [
    { kind: "accent", text: labels.welcome },
    { kind: "muted", text: labels.hint },
  ]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [lines]);

  function navigateTo(section: SectionId) {
    onClose();
    const home = `/${locale}`;
    if (pathname === home) {
      document.getElementById(section)?.scrollIntoView({ block: "start" });
      window.history.replaceState(null, "", `#${section}`);
    } else {
      router.push(`${home}#${section}`);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = value.trim();
    setValue("");
    setHistoryIndex(null);
    if (!input) return;

    setCommandHistory((previous) => [...previous, input]);
    const result = runCommand(input, locale);
    const echoed: TerminalLine = { kind: "input", text: `$ ${input}` };

    switch (result.action.type) {
      case "clear":
        setLines([]);
        return;
      case "close":
        setLines((previous) => [...previous, echoed]);
        onClose();
        return;
      case "goto": {
        const section = result.action.section;
        setLines((previous) => [...previous, echoed, ...result.lines]);
        navigateTo(section);
        return;
      }
      default:
        setLines((previous) => [...previous, echoed, ...result.lines]);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (commandHistory.length === 0) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const index = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(commandHistory[index]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const index = historyIndex + 1;
      if (index >= commandHistory.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(index);
        setValue(commandHistory[index]);
      }
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="terminal-title"
      onClose={onClose}
      onClick={(event) => {
        // Fecha ao clicar no fundo (fora da janela do terminal).
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[min(100%-2rem,44rem)] overflow-hidden rounded-xl border border-border-strong bg-bg-elevated p-0 text-fg shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-accent/80" />
          <span className="size-2.5 rounded-full bg-fg-subtle/40" />
          <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        </div>
        <h2 id="terminal-title" className="font-mono text-xs text-fg-muted">
          {labels.title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted hover:bg-surface-2 hover:text-fg"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        className="h-[min(55vh,22rem)] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((line, index) => (
          <p key={index} className={cn("whitespace-pre-wrap break-words", lineStyles[line.kind])}>
            {line.text}
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-border px-4 py-3 font-mono text-sm focus-within:bg-surface/60">
        <span aria-hidden="true" className="text-primary-text">
          ❯
        </span>
        <label htmlFor="terminal-input" className="sr-only">
          {labels.inputLabel}
        </label>
        <input
          ref={inputRef}
          id="terminal-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={labels.placeholder}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-fg placeholder:text-fg-subtle focus:outline-none"
        />
      </form>
    </dialog>
  );
}

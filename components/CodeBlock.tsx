"use client";

import type { ReactElement, ReactNode } from "react";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  ["data-language"]?: string;
}

function extractText(node: ReactNode): string {
  if (node === null || node === undefined) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (typeof node === "object" && "props" in node) {
    const element = node as ReactElement<{
      children?: ReactNode;
    }>;

    return extractText(element.props.children);
  }

  return "";
}

function formatLanguage(language?: string): string {
  if (!language) {
    return "code";
  }

  const normalized = language.toLowerCase();

  switch (normalized) {
    case "bash":
    case "sh":
    case "shell":
    case "zsh":
    case "powershell":
    case "ps":
      return "terminal";

    case "javascript":
      return "js";

    case "typescript":
      return "ts";

    case "plaintext":
      return "text";

    default:
      return normalized;
  }
}

/** A small colour cue so block types are distinguishable at a glance. */
function dotColor(language: string): string {
  switch (language) {
    case "terminal":
      return "bg-orange-500";

    case "json":
      return "bg-amber-400";

    case "go":
      return "bg-sky-400";

    case "yaml":
    case "yml":
      return "bg-violet-400";

    case "text":
      return "bg-zinc-400";

    default:
      return "bg-emerald-400";
  }
}

export default function CodeBlock({
  children,
  className,
  "data-language": dataLanguage,
}: CodeBlockProps) {
  const code = extractText(children);
  const language = formatLanguage(dataLanguage);
  const isTerminal = language === "terminal";

  return (
    <figure className="group my-7 w-full overflow-hidden rounded-xl border border-code-border bg-code-background shadow-sm transition-colors duration-300 hover:border-border-strong">
      <figcaption className="flex h-10 items-center justify-between gap-3 border-b border-code-border bg-code-header px-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${dotColor(language)}`}
            aria-hidden="true"
          />

          <span className="truncate font-mono text-[11px] font-medium uppercase tracking-wider text-subtle-foreground">
            {language}
          </span>
        </div>

        <div className="opacity-80 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <CopyButton text={code} />
        </div>
      </figcaption>

      <div className="relative w-full overflow-hidden">
        {isTerminal && (
          <span
            className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-orange-500/50 to-transparent"
            aria-hidden="true"
          />
        )}

        <pre className={`${className ?? ""} whitespace-pre-wrap break-words`}>
          {children}
        </pre>
      </div>
    </figure>
  );
}

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

export default function CodeBlock({
  children,
  className,
  "data-language": dataLanguage,
}: CodeBlockProps) {
  const code = extractText(children);
  const language = formatLanguage(dataLanguage);

  return (
    <div className="my-7 w-full overflow-hidden rounded-xl border border-zinc-200 bg-[#0d1117] shadow-sm dark:border-zinc-800">
      <div className="flex h-11 items-center justify-between border-b border-zinc-800 bg-[#161b22] px-4">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-orange-500"
            aria-hidden="true"
          />

          <span className="font-mono text-xs font-medium text-zinc-400">
            {language}
          </span>
        </div>

        <CopyButton text={code} />
      </div>

      <div className="w-full overflow-hidden">
        <pre
          className={`${className ?? ""} whitespace-pre-wrap break-words`}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
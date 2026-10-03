"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error("Copy command failed");
        }
      }

      setCopied(true);

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
        copied
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
          : "border-border bg-transparent text-subtle-foreground hover:border-border-strong hover:bg-muted hover:text-foreground"
      }`}
      aria-label={copied ? "Code copied" : "Copy code"}
    >
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <CopyIcon
          className={`absolute h-3.5 w-3.5 transition-all duration-200 ${
            copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
          }`}
          aria-hidden="true"
        />

        <CheckIcon
          className={`absolute h-3.5 w-3.5 transition-all duration-200 ${
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          aria-hidden="true"
        />
      </span>

      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

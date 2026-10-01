"use client";

import type { ReactNode, ReactElement } from "react";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
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

  if (
    typeof node === "object" &&
    "props" in node
  ) {
    const element = node as ReactElement<{
      children?: ReactNode;
    }>;

    return extractText(element.props.children);
  }

  return "";
}

export default function CodeBlock({
  children,
  className,
}: CodeBlockProps) {
  const code = extractText(children);

  return (
    <div className="relative my-6 overflow-hidden rounded-xl border border-border bg-[#0d1117] shadow-sm">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton text={code} />
      </div>

      <pre className={className}>
        {children}
      </pre>
    </div>
  );
}
import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/CodeBlock";

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    ...components,

    h1: ({ children }) => (
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        className="mb-4 mt-14 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3
        className="mb-3 mt-10 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
      >
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-5 text-[16px] leading-7 text-muted-foreground">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-[16px] leading-7 text-muted-foreground">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-[16px] leading-7 text-muted-foreground">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="pl-1">
        {children}
      </li>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-blue-500 underline decoration-blue-500/30 underline-offset-4 transition hover:decoration-blue-500"
      >
        {children}
      </a>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-border pl-5 text-muted-foreground">
        {children}
      </blockquote>
    ),

    code: ({ children }) => (
      <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    ),

    pre: ({ children, className }) => (
      <CodeBlock className={className}>
        {children}
      </CodeBlock>
    ),
  };
}
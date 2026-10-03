import type { MDXComponents } from "mdx/types";
import type { ReactElement, ReactNode } from "react";
import CodeBlock from "@/components/CodeBlock";
import { LinkIcon } from "@/components/icons";

function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(toText).join("");
  }

  if (typeof node === "object" && "props" in node) {
    const element = node as ReactElement<{ children?: ReactNode }>;

    return toText(element.props.children);
  }

  return "";
}

/**
 * Builds the anchor id for a heading. MDX does not add heading ids on its
 * own, so the "On this page" links depend on these being generated here.
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Matches step headings such as "3. Start MySQL". */
const STEP_PATTERN = /^(\d+)\.\s+(.*)$/;

function HeadingAnchor({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="heading-anchor"
      aria-label={`Link to section: ${label}`}
    >
      <LinkIcon className="h-[0.8em] w-[0.8em]" aria-hidden="true" />
    </a>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: ({ children }) => (
      <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-[2.75rem]">
        {children}
      </h1>
    ),

    h2: ({ children }) => {
      const text = toText(children);
      const id = slugify(text);

      return (
        <h2
          id={id}
          className="group mb-4 mt-16 scroll-mt-28 text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]"
        >
          {children}
          <HeadingAnchor id={id} label={text} />
        </h2>
      );
    },

    h3: ({ children }) => {
      const raw = toText(children);
      const step = typeof children === "string" ? children.match(STEP_PATTERN) : null;
      const id = slugify(step ? step[2] : raw);

      if (step) {
        return (
          <h3
            id={id}
            className="group mb-3 mt-12 flex scroll-mt-28 items-center gap-3 text-xl font-semibold tracking-tight text-foreground"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent-soft font-mono text-[13px] font-semibold text-accent"
              aria-hidden="true"
            >
              {step[1]}
            </span>

            <span className="min-w-0">
              {step[2]}
              <HeadingAnchor id={id} label={step[2]} />
            </span>
          </h3>
        );
      }

      return (
        <h3
          id={id}
          className="group mb-3 mt-11 scroll-mt-28 text-xl font-semibold tracking-tight text-foreground"
        >
          {children}
          <HeadingAnchor id={id} label={raw} />
        </h3>
      );
    },

    h4: ({ children }) => (
      <h4 className="mb-2 mt-8 text-base font-semibold tracking-tight text-foreground">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-foreground">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 pl-1 text-[16.5px] leading-[1.8] text-muted-foreground marker:text-accent/60">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 pl-1 text-[16.5px] leading-[1.8] text-muted-foreground marker:font-medium marker:text-accent/70">
        {children}
      </ol>
    ),

    li: ({ children }) => <li className="pl-1.5">{children}</li>,

    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    em: ({ children }) => <em className="italic">{children}</em>,

    a: ({ href, children }) => {
      const external = typeof href === "string" && /^https?:/.test(href);

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px] transition-colors hover:decoration-accent"
        >
          {children}
        </a>
      );
    },

    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-r-lg border-l-[3px] border-accent bg-accent-soft/50 py-1 pl-5 pr-4 text-muted-foreground [&>*:last-child]:mb-0">
        {children}
      </blockquote>
    ),

    hr: () => <hr className="my-12 border-t border-border" />,

    /*
     * Styled through the `:not(pre) > code` rule in globals.css rather than
     * a className, so the classes cannot leak onto the <code> that Shiki
     * renders inside a code block.
     */
    code: (props) => <code {...props} />,

    pre: ({ children, className, ...props }) => (
      <CodeBlock
        className={className}
        data-language={
          (props as { "data-language"?: string })["data-language"]
        }
      >
        {children}
      </CodeBlock>
    ),

    table: ({ children }) => (
      <div className="my-7 w-full overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-sm">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th className="border-b border-border bg-muted px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border-b border-border px-4 py-2.5 text-muted-foreground">
        {children}
      </td>
    ),
  };
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon, ListIcon } from "./icons";

interface TocItem {
  href: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const ACTIVE_OFFSET = 140;

function useActiveSection(items: TocItem[]) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");

  const hrefKey = items.map((item) => item.href).join("|");

  useEffect(() => {
    const hrefs = hrefKey.split("|").filter(Boolean);

    if (hrefs.length === 0) {
      return;
    }

    let frame = 0;

    function update() {
      frame = 0;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveHref(hrefs[hrefs.length - 1]);
        return;
      }

      let current = hrefs[0];

      for (const href of hrefs) {
        const element = document.getElementById(href.slice(1));

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = href;
        }
      }

      setActiveHref(current);
    }

    function onScroll() {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hrefKey]);

  return activeHref;
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const activeHref = useActiveSection(items);
  const [open, setOpen] = useState(false);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.href === activeHref)
  );

  const activeLabel = items[activeIndex]?.label ?? "";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/*
        Mobile: a collapsible section picker above the article. It is not
        sticky because its grid cell is only as tall as the bar itself,
        which would leave sticky nothing to travel through.
      */}
      <div className="-mx-6 border-b border-border bg-background-subtle px-6 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-left transition-colors hover:border-border-strong hover:bg-card-hover"
        >
          <ListIcon
            className="h-4 w-4 shrink-0 text-accent"
            aria-hidden="true"
          />

          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-subtle-foreground">
              On this page
            </span>

            <span className="block truncate text-sm font-medium text-foreground">
              {activeLabel}
            </span>
          </span>

          <ChevronDownIcon
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {open && (
          <nav className="animate-fade-in mt-2 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg">
            {items.map((item) => {
              const isActive = item.href === activeHref;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-accent-soft font-medium text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop: sticky rail with a sliding indicator */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 py-10">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-subtle-foreground">
            <ListIcon className="h-3.5 w-3.5" aria-hidden="true" />
            On this page
          </div>

          <nav className="relative">
            <div
              className="absolute inset-y-0 left-0 w-px bg-border"
              aria-hidden="true"
            />

            <div
              className="absolute left-0 w-px bg-accent transition-transform duration-300 ease-out"
              style={{
                height: `${100 / Math.max(items.length, 1)}%`,
                transform: `translateY(${activeIndex * 100}%)`,
              }}
              aria-hidden="true"
            />

            <ul className="space-y-0.5 text-sm">
              {items.map((item) => {
                const isActive = item.href === activeHref;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`block py-1.5 pl-4 transition-colors duration-200 ${
                        isActive
                          ? "font-medium text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { CheckIcon } from "./icons";

interface TestResultsProps {
  testSet: string;
  tests: string[];
  passed: number;
  failed: number;
}

export default function TestResults({
  testSet,
  tests,
  passed,
  failed,
}: TestResultsProps) {
  const total = passed + failed;
  const passRate = total === 0 ? 0 : Math.round((passed / total) * 100);

  const cardRef = useRef<HTMLDivElement | null>(null);

  /*
   * The card animates in the first time it is scrolled into view. State
   * lives on a data attribute rather than in React state: the card is
   * rendered in its final form, and the "pending" step is only applied
   * once we know the browser can animate out of it.
   */
  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduced || !("IntersectionObserver" in window)) {
      return;
    }

    node.dataset.run = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.dataset.run = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors duration-300 hover:border-border-strong"
    >
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-subtle-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Keploy test run
          </div>

          <div className="mt-1.5 font-mono text-lg font-semibold text-foreground">
            {testSet}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="min-w-[72px] rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center">
            <div className="text-xl font-bold leading-none text-emerald-500">
              {passed}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Passed
            </div>
          </div>

          <div className="min-w-[72px] rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-center">
            <div className="text-xl font-bold leading-none text-red-500">
              {failed}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Failed
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5 pt-5">
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Pass rate</span>

            <span className="font-mono font-semibold text-emerald-500">
              {passRate}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              data-bar
              className="h-full origin-left rounded-full bg-emerald-500 transition-transform duration-[1100ms] ease-out"
              style={{ transform: `scaleX(${passRate / 100})` }}
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Recorded test cases
          </span>

          <span className="text-xs text-subtle-foreground">{total} total</span>
        </div>

        <div className="space-y-2">
          {tests.map((test, index) => (
            <div
              key={test}
              data-row
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5 transition-[opacity,transform,background-color,border-color] duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06]"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>

              <code className="min-w-0 break-all font-mono text-sm text-foreground">
                {test}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-500">
            {passed} passed
          </span>

          <span className="rounded-full bg-red-500/10 px-3 py-1 font-medium text-red-500">
            {failed} failed
          </span>

          <span className="rounded-full bg-muted px-3 py-1 font-mono font-medium text-muted-foreground">
            verified_green
          </span>
        </div>
      </div>
    </div>
  );
}

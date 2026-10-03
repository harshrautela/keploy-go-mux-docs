"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";

const emptySubscribe = () => () => {};

const shell =
  "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:bg-muted hover:text-foreground";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <button className={shell} type="button" aria-label="Toggle theme">
        <SunIcon className="h-[18px] w-[18px] opacity-40" aria-hidden="true" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={shell}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <SunIcon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
        aria-hidden="true"
      />

      <MoonIcon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";
import { GitHubIcon } from "./icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="group flex items-center gap-3 font-semibold tracking-tight"
        >
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 text-sm font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            K
          </span>

          <span className="transition-colors group-hover:text-accent">
            Keploy Go Guide
          </span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/harshrautela/keploy-go-mux-docs"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <GitHubIcon className="h-4 w-4" />
            Keploy GitHub
          </a>

          <a
            href="https://github.com/harshrautela/keploy-go-mux-docs"
            target="_blank"
            rel="noreferrer"
            aria-label="Keploy GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-border-strong hover:bg-muted hover:text-foreground sm:hidden"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>

          <ThemeToggle />
        </div>
      </div>

      <ScrollProgress />
    </header>
  );
}

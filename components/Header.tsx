import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
            K
          </span>

          <span>Keploy Go Guide</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/keploy"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:block"
          >
            Keploy GitHub
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
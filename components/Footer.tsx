import { GitHubIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-background-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-orange-700 text-xs font-bold text-white">
            K
          </span>

          <div className="text-sm">
            <div className="font-medium text-foreground">
              Keploy Go Quickstart
            </div>

            <div className="text-muted-foreground">
              Written by Harsh Singh Rautela
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <a
            href="https://keploy.io"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            keploy.io
          </a>

          <a
            href="https://github.com/keploy/samples-go"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            samples-go
          </a>
        </div>
      </div>
    </footer>
  );
}

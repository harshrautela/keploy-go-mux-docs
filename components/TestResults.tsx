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

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Keploy test run
          </div>

          <div className="mt-1 text-lg font-semibold text-foreground">
            {testSet}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center">
            <div className="text-lg font-bold text-emerald-500">
              {passed}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Passed
            </div>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center">
            <div className="text-lg font-bold text-red-500">
              {failed}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Failed
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Recorded test cases
          </span>

          <span className="text-xs text-muted-foreground">
            {total} total
          </span>
        </div>

        <div className="space-y-2">
          {tests.map((test) => (
            <div
              key={test}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-500"
                aria-hidden="true"
              >
                ✓
              </span>

              <code className="font-mono text-sm text-foreground">
                {test}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-500">
            {passed} passed
          </span>

          <span className="rounded-full bg-red-500/10 px-3 py-1 font-medium text-red-500">
            {failed} failed
          </span>

          <span className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
            verified_green
          </span>
        </div>
      </div>
    </div>
  );
}
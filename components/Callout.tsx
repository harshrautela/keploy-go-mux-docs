type CalloutType = "info" | "tip" | "warning" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<
  CalloutType,
  {
    border: string;
    background: string;
    icon: string;
  }
> = {
  info: {
    border: "border-blue-500/30",
    background: "bg-blue-500/10",
    icon: "💡",
  },
  tip: {
    border: "border-emerald-500/30",
    background: "bg-emerald-500/10",
    icon: "✨",
  },
  warning: {
    border: "border-amber-500/30",
    background: "bg-amber-500/10",
    icon: "⚠️",
  },
  success: {
    border: "border-green-500/30",
    background: "bg-green-500/10",
    icon: "✅",
  },
};

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const style = styles[type];

  return (
    <div
      className={`my-6 rounded-xl border ${style.border} ${style.background} p-5`}
    >
      <div className="flex gap-3">
        <span className="text-lg" aria-hidden="true">
          {style.icon}
        </span>

        <div className="min-w-0">
          {title && (
            <div className="mb-1 font-semibold text-foreground">
              {title}
            </div>
          )}

          <div className="text-sm leading-6 text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
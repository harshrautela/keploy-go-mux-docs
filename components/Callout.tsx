import type { ComponentType, SVGProps } from "react";
import {
  CheckCircleIcon,
  InfoIcon,
  SparkleIcon,
  WarningIcon,
} from "./icons";

type CalloutType = "info" | "tip" | "warning" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<
  CalloutType,
  {
    container: string;
    bar: string;
    iconWrap: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }
> = {
  info: {
    container: "border-blue-500/25 bg-blue-500/[0.06]",
    bar: "bg-blue-500",
    iconWrap: "bg-blue-500/10 text-blue-500",
    Icon: InfoIcon,
  },
  tip: {
    container: "border-violet-500/25 bg-violet-500/[0.06]",
    bar: "bg-violet-500",
    iconWrap: "bg-violet-500/10 text-violet-500",
    Icon: SparkleIcon,
  },
  warning: {
    container: "border-amber-500/25 bg-amber-500/[0.06]",
    bar: "bg-amber-500",
    iconWrap: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Icon: WarningIcon,
  },
  success: {
    container: "border-emerald-500/25 bg-emerald-500/[0.06]",
    bar: "bg-emerald-500",
    iconWrap: "bg-emerald-500/10 text-emerald-500",
    Icon: CheckCircleIcon,
  },
};

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const style = styles[type];
  const { Icon } = style;

  return (
    <div
      className={`relative my-6 overflow-hidden rounded-xl border pl-5 pr-5 py-4 transition-colors duration-300 ${style.container}`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-[3px] ${style.bar}`}
        aria-hidden="true"
      />

      <div className="flex gap-3.5">
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.iconWrap}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          {title && (
            <div className="mb-1 text-[15px] font-semibold leading-6 text-foreground">
              {title}
            </div>
          )}

          <div className="text-sm leading-6 text-muted-foreground [&>*:last-child]:mb-0 [&>p]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

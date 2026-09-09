import * as React from "react";
import {
  CheckCircle2,
  PauseCircle,
  XCircle,
  Clock,
  Circle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

const toneStyles: Record<StatusTone, string> = {
  success: "bg-success-surface text-success-text",
  warning: "bg-warning-surface text-warning-text",
  error: "bg-error-surface text-error-text",
  info: "bg-info-surface text-info-text",
  neutral: "bg-border/40 text-text-muted",
};

const toneIcons: Record<StatusTone, LucideIcon> = {
  success: CheckCircle2,
  warning: PauseCircle,
  error: XCircle,
  info: Clock,
  neutral: Circle,
};

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: StatusTone;
  label: string;
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
}

const sizeStyles: Record<NonNullable<StatusBadgeProps["size"]>, string> = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const iconSizeStyles: Record<NonNullable<StatusBadgeProps["size"]>, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

/**
 * Status is always colour + icon + label per Phase 4/7 — never colour alone.
 */
function StatusBadge({
  tone,
  label,
  size = "md",
  icon,
  className,
  ...props
}: StatusBadgeProps) {
  const Icon = icon ?? toneIcons[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-sans font-medium",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      <Icon className={iconSizeStyles[size]} strokeWidth={1.75} />
      {label}
    </span>
  );
}

/** Verification statuses per Phase 7 — exact tone/label mapping. */
export const VERIFICATION_STATUS: Record<
  "ACTIVE" | "SUSPENDED" | "WITHDRAWN" | "EXPIRED",
  { tone: StatusTone; label: string }
> = {
  ACTIVE: { tone: "success", label: "Active" },
  SUSPENDED: { tone: "warning", label: "Suspended" },
  WITHDRAWN: { tone: "error", label: "Withdrawn" },
  EXPIRED: { tone: "info", label: "Expired" },
};

export { StatusBadge };

import { TransactionStatus, statusLabels, statusColors } from "../../data/transactions";
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  status: TransactionStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function StatusBadge({ status, size = "md", showIcon = true }: StatusBadgeProps) {
  const colors = statusColors[status];
  const label = statusLabels[status];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size]
      )}
    >
      {showIcon && <StatusIcon status={status} />}
      {label}
    </span>
  );
}

function StatusIcon({ status }: { status: TransactionStatus }) {
  const iconClass = "w-2 h-2 rounded-full";
  
  const iconColors: Record<TransactionStatus, string> = {
    draft: "bg-muted-foreground",
    submitted: "bg-blue-500",
    awaiting_technician: "bg-amber-500 animate-pulse",
    assigned: "bg-indigo-500",
    on_the_way: "bg-purple-500 animate-pulse",
    in_progress: "bg-cyan-500 animate-pulse",
    completed: "bg-emerald-500",
    paid: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return <span className={cn(iconClass, iconColors[status])} />;
}

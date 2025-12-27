import { User, Wrench, Shield } from "lucide-react";
import { cn } from "../../lib/utils";

type Role = "customer" | "technician" | "admin";

interface RoleBadgeProps {
  role: Role;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const roleConfig: Record<Role, { label: string; icon: typeof User; colors: string }> = {
  customer: {
    label: "Customer",
    icon: User,
    colors: "bg-blue-50 text-blue-700 border-blue-200",
  },
  technician: {
    label: "Technician",
    icon: Wrench,
    colors: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  admin: {
    label: "Admin",
    icon: Shield,
    colors: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

export function RoleBadge({ role, showLabel = true, size = "md" }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        config.colors,
        sizeClasses[size]
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && config.label}
    </span>
  );
}

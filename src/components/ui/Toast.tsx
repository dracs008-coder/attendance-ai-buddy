import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  title: string;
  description?: string;
  onClose?: () => void;
}

const toastConfig: Record<ToastType, { icon: typeof CheckCircle; colors: string }> = {
  success: {
    icon: CheckCircle,
    colors: "bg-emerald-50 border-emerald-200 text-emerald-800",
  },
  error: {
    icon: XCircle,
    colors: "bg-red-50 border-red-200 text-red-800",
  },
  warning: {
    icon: AlertCircle,
    colors: "bg-amber-50 border-amber-200 text-amber-800",
  },
  info: {
    icon: Info,
    colors: "bg-blue-50 border-blue-200 text-blue-800",
  },
};

export function Toast({ type, title, description, onClose }: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-fade-in",
        config.colors
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">{title}</p>
        {description && (
          <p className="text-sm opacity-80 mt-1">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

import { Check, Clock, User, Shield, Zap } from "lucide-react";
import { TimelineEvent, TransactionStatus, statusLabels } from "../../data/transactions";
import { cn } from "../../lib/utils";

interface TimelineProps {
  events: TimelineEvent[];
  currentStatus: TransactionStatus;
}

export function Timeline({ events, currentStatus }: TimelineProps) {
  const allSteps: TransactionStatus[] = [
    "submitted",
    "assigned",
    "on_the_way",
    "in_progress",
    "completed",
    "paid"
  ];

  const currentIndex = allSteps.indexOf(currentStatus);

  return (
    <div className="relative">
      {allSteps.map((step, index) => {
        const event = events.find(e => e.status === step);
        const isCompleted = index < currentIndex || (index === currentIndex && (step === "completed" || step === "paid"));
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;
        const isLast = index === allSteps.length - 1;

        return (
          <div key={step} className="flex gap-4 pb-6 last:pb-0">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                  isCurrent && "border-primary-600 bg-primary-50 text-primary-600 ring-4 ring-primary-100 animate-pulse",
                  isPending && "border-muted bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <TimelineIcon status={step} />
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[2rem] mt-2 transition-colors duration-300",
                    isCompleted ? "bg-emerald-500" : "bg-muted"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between">
                <p
                  className={cn(
                    "font-medium transition-colors",
                    isCompleted && "text-emerald-700",
                    isCurrent && "text-primary-700",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {statusLabels[step]}
                </p>
                {event && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString("en-PH", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                )}
              </div>
              {event && (
                <p className="text-sm text-muted-foreground mt-1">
                  {event.description}
                </p>
              )}
              {isPending && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  Pending
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TimelineIcon({ status }: { status: TransactionStatus }) {
  const iconClass = "h-5 w-5";

  switch (status) {
    case "submitted":
      return <Clock className={iconClass} />;
    case "assigned":
      return <User className={iconClass} />;
    case "on_the_way":
      return <Zap className={iconClass} />;
    case "in_progress":
      return <Zap className={iconClass} />;
    case "completed":
      return <Check className={iconClass} />;
    case "paid":
      return <Shield className={iconClass} />;
    default:
      return <Clock className={iconClass} />;
  }
}

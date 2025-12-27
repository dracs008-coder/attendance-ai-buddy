import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

export function StepIndicator({ steps, currentStep, orientation = "horizontal" }: StepIndicatorProps) {
  if (orientation === "vertical") {
    return (
      <div className="flex flex-col gap-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Line and circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300",
                    isCompleted && "border-primary-600 bg-primary-600 text-white",
                    isCurrent && "border-primary-600 bg-primary-50 text-primary-600",
                    !isCompleted && !isCurrent && "border-muted bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 min-h-[3rem] transition-colors duration-300",
                      isCompleted ? "bg-primary-600" : "bg-muted"
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300",
                  isCompleted && "border-primary-600 bg-primary-600 text-white",
                  isCurrent && "border-primary-600 bg-primary-50 text-primary-600 ring-4 ring-primary-100",
                  !isCompleted && !isCurrent && "border-muted bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-300",
                  isCompleted ? "bg-primary-600" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

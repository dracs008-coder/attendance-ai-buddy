import { ReactNode, useState } from "react";
import StepIndicator from "./StepIndicator";

interface WizardProps {
  steps: ReactNode[];
  onComplete?: () => void;
}

/**
 * Very lightweight multi-step wizard wrapper for auth flows.
 * Handles local step state and renders provided nodes sequentially.
 */
export default function AuthWizard({ steps, onComplete }: WizardProps) {
  const [current, setCurrent] = useState(0);
  const total = steps.length;
  const isLast = current === total - 1;

  const next = () => {
    if (isLast) {
      onComplete?.();
    } else {
      setCurrent(s => Math.min(s + 1, total - 1));
    }
  };

  const prev = () => setCurrent(s => Math.max(s - 1, 0));

  return (
    <div>
      <StepIndicator current={current + 1} total={total} />
      <div className="mb-6">{steps[current]}</div>
      <div className="flex items-center justify-between gap-4">
        {current > 0 && (
          <button type="button" onClick={prev} className="btn-secondary">
            Back
          </button>
        )}
        <button type="button" onClick={next} className="btn-primary ml-auto">
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

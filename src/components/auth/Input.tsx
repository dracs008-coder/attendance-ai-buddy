import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

/**
 * Reusable input element with error display underneath.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full">
        <input
          ref={ref}
          className={["input", error ? "border-destructive ring-destructive" : "", className].filter(Boolean).join(" ")}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

export default Input;

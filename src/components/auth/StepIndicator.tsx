interface StepIndicatorProps {
  current: number; // 1-based step index
  total: number;
  labels?: string[];
}

export default function StepIndicator({ current, total, labels }: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const active = step <= current;
        return (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full ${active ? "bg-primary-600" : "bg-gray-200"}`}
          />
        );
        })}
      </div>
      {labels && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          {labels.map((label, idx) => (
            <span
              key={label}
              className={`${idx + 1 === current ? "text-primary font-medium" : ""}`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

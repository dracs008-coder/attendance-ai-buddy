interface PasswordMeterProps {
  value: string;
}

function strengthScore(pwd: string): number {
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/\d/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  return score;
}

export default function PasswordMeter({ value }: PasswordMeterProps) {
  const score = strengthScore(value);
  const percent = (score / 5) * 100;
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-600"];
  const label = ["Weak", "Weak", "Fair", "Strong", "Very strong"][score - 1] || "";

  return (
    <div className="space-y-1">
      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colors[score - 1] || "bg-gray-300"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {value && <p className="text-xs text-gray-500">{label}</p>}
    </div>
  );
}

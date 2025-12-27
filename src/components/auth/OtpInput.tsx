import { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
}

/**
 * Renders `length` numeric input boxes for OTP entry.
 * Moves focus automatically and restricts to digits.
 */
export default function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputs = Array.from({ length });
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Backspace" && !value[idx]) {
      const prev = refs.current[idx - 1];
      prev?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!text) return;
    onChange(text);
    const lastIndex = Math.min(text.length, length) - 1;
    refs.current[lastIndex]?.focus();
  };

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "");
    const nextOtp = value.split("");
    nextOtp[idx] = digit;
    onChange(nextOtp.join("").slice(0, length));
    if (digit && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {inputs.map((_, i) => (
        <input
          key={i}
          ref={el => (refs.current[i] = el)}
          inputMode="numeric"
          maxLength={1}
          className="h-12 w-10 rounded-md border border-gray-300 text-center text-xl font-medium focus:border-primary-500 focus:outline-none"
          value={value[i] || ""}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

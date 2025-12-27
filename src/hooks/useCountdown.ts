import { useEffect, useState, useCallback } from "react";

export default function useCountdown(initial: number) {
  const [seconds, setSeconds] = useState(0);

  const start = useCallback(() => setSeconds(initial), [initial]);

  useEffect(() => {
    if (seconds === 0) return;
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return { seconds, start };
}

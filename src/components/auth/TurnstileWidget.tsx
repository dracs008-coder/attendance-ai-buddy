import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile captcha wrapper (UI-only stub).
 * Loads the Turnstile script and emits a dummy token via onVerify.
 *
 * In production, replace the stubbed callback with the real one
 * provided by the Turnstile API.
 */
interface TurnstileWidgetProps {
  siteKey?: string; // Defaults to CF test key
  onVerify: (token: string) => void;
}

const TEST_SITE_KEY = "1x00000000000000000000AA"; // Cloudflare test site-key

export default function TurnstileWidget({ siteKey = TEST_SITE_KEY, onVerify }: TurnstileWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically inject script once per page
    if (!document.querySelector("script[data-turnstile]") && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-turnstile", "true");
      document.body.appendChild(script);
    }

    // For UI-only demo, we auto-verify after 500 ms
    const id = setTimeout(() => {
      onVerify("dummy-turnstile-token");
    }, 500);

    return () => clearTimeout(id);
  }, [onVerify, siteKey]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        ref={widgetRef}
        className="cf-turnstile w-full rounded-lg border border-gray-300 p-6 text-center text-sm text-gray-600"
      >
        Turnstile captcha placeholder (UI-only)
      </div>
      <p className="text-xs text-gray-400">Automatically passes after demo delay.</p>
    </div>
  );
}

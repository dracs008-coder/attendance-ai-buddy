import React from 'react';

interface SocialButtonProps {
  provider: 'google' | 'github' | 'apple';
  disabled?: boolean;
  full?: boolean;
}

/**
 * Generic social sign-in button. UI-only; no OAuth implementation.
 */
export default function SocialButton({ provider, disabled, full = false }: SocialButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const labelMap = {
    google: 'Google',
    github: 'GitHub',
    apple: 'Apple',
  } as const;

  const Icon = () => {
    if (provider === 'google') {
      return (
        <svg className="h-5 w-5" viewBox="0 0 533.5 544.3" aria-hidden="true">
          <path fill="#4285F4" d="M533.5 278.4c0-17.7-1.6-35-4.7-51.7H272v97.9h147.2c-6.4 34.6-25.2 63.9-53.8 83.5v69.1h86.9c51-47 80.2-116.3 80.2-198.8z"/>
          <path fill="#34A853" d="M272 544.3c72.6 0 133.6-24 178.1-65.1l-86.9-69.1c-24.1 16.2-55 25.7-91.2 25.7-70 0-129.3-47.2-150.4-110.5H32.2v69.6C76.8 480.8 168.6 544.3 272 544.3z"/>
          <path fill="#FBBC04" d="M121.6 324.7c-10.5-31.1-10.5-64.8 0-95.9V159.2H32.2c-38.8 77.5-38.8 168.4 0 245.9l89.4-80.4z"/>
          <path fill="#EA4335" d="M272 107.9c38.7-.6 75.9 13.7 104.3 39.9l78.1-78.1C414.8 21 344.2-3.1 272 0 168.6 0 76.8 63.5 32.2 159.2l89.4 69.6C142.7 155.1 202 107.9 272 107.9z"/>
        </svg>
      );
    }
    if (provider === 'apple') {
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.365 1.43c0 1.14-.415 2.263-1.173 3.118-.746.835-1.97 1.47-3.068 1.39-.05-1.077.399-2.185 1.148-3.013.736-.815 2.047-1.374 3.095-1.495.003 0-.002 0-.002 0zM19.432 17.647c-.53 1.224-.78 1.76-1.456 2.824-1.01 1.617-2.43 3.613-4.184 3.636-1.588.024-2.01-1.056-4.168-1.056-2.157 0-2.62 1.06-4.212 1.08-1.756.02-3.095-1.88-4.105-3.49C-1.08 14.246.63 8.9 3.01 6.048 4.06 4.77 5.533 3.947 7.1 3.924c1.608-.023 3.126 1.096 4.168 1.096 1.04 0 2.87-1.355 4.852-1.157.827.035 3.153.335 4.644 2.547-.12.074-2.782 1.614-2.332 4.814.28 2.024 2.033 2.696 2.113 2.734-.018.048- .331 1.15-1.113 2.69z"/></svg>
      );
    }
    // GitHub icon placeholder
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.013c0 4.428 2.865 8.191 6.839 9.525.5.091.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.159-1.11-1.468-1.11-1.468-.908-.62.069-.608.069-.608 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.832.092-.647.349-1.088.635-1.338-2.221-.253-4.555-1.114-4.555-4.956 0-1.096.39-1.993 1.03-2.696-.103-.254-.447-1.275.098-2.658 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.54 9.54 0 0 1 2.506.337c1.909-1.296 2.748-1.026 2.748-1.026.548 1.383.204 2.404.1 2.658.64.703 1.028 1.6 1.028 2.696 0 3.852-2.337 4.699-4.565 4.949.359.308.678.917.678 1.845 0 1.333-.012 2.404-.012 2.732 0 .268.18.578.688.48 3.97-1.336 6.832-5.097 6.832-9.523C22 6.484 17.522 2 12 2Z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${full ? 'w-full' : 'flex-1'} inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50`}
    >
      <Icon />
      <span>{labelMap[provider]}</span>
    </button>
  );
}

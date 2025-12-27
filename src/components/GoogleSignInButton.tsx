import React from 'react'

interface GoogleSignInButtonProps {
  disabled?: boolean
}

// UI-only Google sign-in button: keeps the same visual style but
// does not perform any real OAuth flow.

export default function GoogleSignInButton({ disabled }: GoogleSignInButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white">
        <span className="text-lg">G</span>
      </span>
      <span>Continue with Google (UI only)</span>
    </button>
  )
}

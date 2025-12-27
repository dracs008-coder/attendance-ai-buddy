import { PropsWithChildren } from 'react';

interface AuthCardProps {
  className?: string;
}

export default function AuthCard({ children, className = '' }: PropsWithChildren<AuthCardProps>) {
  return (
    <div
      className={`w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

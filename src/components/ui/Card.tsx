import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
      {title ? (
        <h3 className="mb-2 text-sm font-medium text-foreground">{title}</h3>
      ) : null}
      {children}
    </section>
  );
};

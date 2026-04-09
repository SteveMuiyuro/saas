import type { PropsWithChildren, ReactNode } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700/80 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">{title}</h2>
      {description && <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{description}</p>}
    </div>
  );
}

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
      {children}
    </span>
  );
}

export function Stat({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

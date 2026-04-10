import Link from 'next/link';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { UserButton } from '@clerk/nextjs';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', emoji: '🏠' },
  { href: '/pricing', label: 'Pricing', emoji: '💳' },
  { href: '/subscription', label: 'Subscription', emoji: '⚙️' },
];

export function AppShell({ children, title, subtitle }: PropsWithChildren<{ title: string; subtitle?: string }>) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-2xl border border-gray-200/80 bg-white/90 p-5 shadow-sm backdrop-blur lg:block dark:border-gray-800 dark:bg-gray-900/90">
          <Link href="/" className="mb-8 block text-xl font-bold text-gray-900 dark:text-white">
            MediNotes Pro
          </Link>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-6 rounded-2xl border border-gray-200/80 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">Healthcare AI Workspace</p>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Home
                </Link>
                <UserButton showName />
              </div>
            </div>
          </header>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

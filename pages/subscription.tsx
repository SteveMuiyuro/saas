"use client";

import { AppShell } from '../components/app-shell';
import { Card, Stat } from '../components/ui';

export default function SubscriptionPage() {
  return (
    <AppShell title="Subscription Management" subtitle="View current plan usage and manage upgrade or downgrade actions.">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Plan</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">You are currently on the Professional plan.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Stat label="Consultations This Month" value="286 / Unlimited" />
              <Stat label="Team Seats Used" value="12 / 20" />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Plan Limits</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <div>
                <div className="mb-1 flex justify-between"><span>Voice dictation minutes</span><span>740 / 1,000</span></div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800"><div className="h-2 w-[74%] rounded-full bg-blue-600" /></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between"><span>Shared template storage</span><span>18 GB / 25 GB</span></div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800"><div className="h-2 w-[72%] rounded-full bg-indigo-600" /></div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upgrade / Downgrade</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Change your tier as your practice evolves.</p>
            <div className="mt-4 space-y-3">
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Upgrade to Enterprise</button>
              <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">Downgrade to Starter</button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Renewal</h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">Next billing date: <strong>April 30, 2026</strong></p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">Estimated charge: <strong>$948.00</strong></p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

"use client";

import Link from 'next/link';
import { AppShell } from '../components/app-shell';
import { Card, Stat } from '../components/ui';
import { FREE_TRIAL_LIMITS } from '../lib/plans';
import { useProPlanStatus } from '../lib/use-pro-plan';

export default function SubscriptionPage() {
  const hasProPlan = useProPlanStatus();

  return (
    <AppShell title="Subscription Management" subtitle="Plan access is synchronized from Clerk Billing.">
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Plan</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {hasProPlan ? 'You are currently on the Pro plan.' : 'You are currently on the Free Trial plan.'}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Stat label="Consultations" value={hasProPlan ? 'Unlimited' : `Up to ${FREE_TRIAL_LIMITS.consultations}`} />
            <Stat label="Voice Recordings" value={hasProPlan ? 'Unlimited' : `Up to ${FREE_TRIAL_LIMITS.voiceRecordings}`} />
          </div>
          {hasProPlan && (
            <div className="mt-5">
              <Link
                href="/pricing"
                className="inline-flex rounded-lg border border-red-600 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-950/40"
              >
                Cancel Pro subscription
              </Link>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                This opens Clerk Billing where you can manage or cancel your active Pro subscription. After cancellation, Pro access stays active for 24 hours before switching to Free Trial limits.
              </p>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Plan Limits</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <li>• Free Trial: up to {FREE_TRIAL_LIMITS.consultations} consultations</li>
            <li>• Free Trial: up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings</li>
            <li>• Pro: unlimited consultations</li>
            <li>• Pro: unlimited voice recordings</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}

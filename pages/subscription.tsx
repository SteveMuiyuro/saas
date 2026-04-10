"use client";

import { PricingTable, useAuth } from '@clerk/nextjs';
import { AppShell } from '../components/app-shell';
import { Card, Stat } from '../components/ui';
import { clerkPricingTableAppearance } from '../lib/clerk-appearance';
import { FREE_TRIAL_LIMITS, PLAN_KEYS } from '../lib/plans';

export default function SubscriptionPage() {
  const { has } = useAuth();
  const hasProPlan = Boolean(has?.({ plan: PLAN_KEYS.pro }) || has?.({ plan: PLAN_KEYS.legacyPro }));

  return (
    <AppShell title="Subscription Management" subtitle="Plan access is synchronized from Clerk Billing.">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Plan</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {hasProPlan ? 'You are currently on the Pro plan.' : 'You are currently on the Free Trial plan.'}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Stat label="Consultations" value={hasProPlan ? 'Unlimited' : `Up to ${FREE_TRIAL_LIMITS.consultations}`} />
              <Stat label="Voice Recordings" value={hasProPlan ? 'Unlimited' : `Up to ${FREE_TRIAL_LIMITS.voiceRecordings}`} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Plan Limits</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
              <li>• Free Trial: {FREE_TRIAL_LIMITS.trialDays} days access</li>
              <li>• Free Trial: up to {FREE_TRIAL_LIMITS.consultations} consultations</li>
              <li>• Free Trial: up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings</li>
              <li>• Pro: unlimited consultations</li>
              <li>• Pro: unlimited voice recordings</li>
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <div id="billing">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Pro pricing: $10/month or $108/year (10% discount from $120). Use the controls below to switch plans or cancel.</p>
              <div className="mt-4">
                <PricingTable appearance={clerkPricingTableAppearance} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

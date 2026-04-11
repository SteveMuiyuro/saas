"use client";

import { PricingTable, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';
import { clerkPricingTableAppearance } from '../lib/clerk-appearance';
import { FREE_TRIAL_LIMITS } from '../lib/plans';
import { useProPlanStatus } from '../lib/use-pro-plan';

export default function PricingPage() {
  const hasProPlan = useProPlanStatus();

  return (
    <AppShell title="Pricing" subtitle="Billing and access are synchronized with Clerk subscriptions.">
      <div className="space-y-6">
        <Card>
          <div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Simple, transparent pricing</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Use Clerk Billing to start a Pro plan at $10/month or $108/year (10% off from $120/year).</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-5">
          <SignedIn>
            <Card className="border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout with Clerk Billing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Choose either the Free or Pro plan directly in Clerk Checkout. The subscription you choose becomes your active plan immediately.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Free</h4>
                    {!hasProPlan && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-200">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">$0/month</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• {FREE_TRIAL_LIMITS.trialDays} day trial access</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.consultations} consultations</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings</li>
                  </ul>
                  {!hasProPlan && (
                    <button className="mt-4 rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950/40">
                      Try Pro
                    </button>
                  )}
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950/40">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Pro</h4>
                    {hasProPlan && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-200">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">$10/month or $108/year</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• Unlimited consultations</li>
                    <li>• Unlimited voice recordings</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <PricingTable appearance={clerkPricingTableAppearance} />
              </div>
            </Card>
          </SignedIn>
          <SignedOut>
            <Card className="border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout with Clerk Billing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Sign in to view Free and Pro options in Clerk Checkout and subscribe to the plan you want to activate.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Free</h4>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-200">
                      Active
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">$0/month</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• {FREE_TRIAL_LIMITS.trialDays} day trial access</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.consultations} consultations</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings</li>
                  </ul>
                  <div className="mt-4">
                    <SignInButton mode="modal">
                      <button className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-950/40">
                        Try Pro
                      </button>
                    </SignInButton>
                  </div>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950/40">
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">Pro</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">$10/month or $108/year</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• Unlimited consultations</li>
                    <li>• Unlimited voice recordings</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <SignInButton mode="modal">
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Sign in to subscribe
                  </button>
                </SignInButton>
              </div>
            </Card>
          </SignedOut>
        </div>
      </div>
    </AppShell>
  );
}

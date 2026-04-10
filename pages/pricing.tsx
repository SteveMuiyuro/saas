"use client";

import { PricingTable, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';
import { clerkPricingTableAppearance } from '../lib/clerk-appearance';
import { FREE_TRIAL_LIMITS } from '../lib/plans';

export default function PricingPage() {
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
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">Free</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">$0/month</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• {FREE_TRIAL_LIMITS.trialDays} day trial access</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.consultations} consultations</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings</li>
                  </ul>
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
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">Free</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">$0/month</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>• {FREE_TRIAL_LIMITS.trialDays} day trial access</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.consultations} consultations</li>
                    <li>• Up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings</li>
                  </ul>
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

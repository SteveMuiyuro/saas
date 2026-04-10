"use client";

import { useState } from 'react';
import { PricingTable, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';
import { clerkPricingTableAppearance } from '../lib/clerk-appearance';
import { FREE_TRIAL_LIMITS } from '../lib/plans';

const tiers = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'Great for getting started with core workflow limits.',
    features: [
      `${FREE_TRIAL_LIMITS.trialDays} day trial access`,
      `Up to ${FREE_TRIAL_LIMITS.consultations} consultations`,
      `Up to ${FREE_TRIAL_LIMITS.voiceRecordings} voice recordings`,
    ],
  },
  {
    name: 'Pro',
    monthly: 10,
    yearly: 108,
    description: 'For clinics that need unlimited usage and priority access.',
    features: [
      'Unlimited consultations',
      'Unlimited voice recordings',
      'Priority support',
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <AppShell title="Pricing" subtitle="Billing and access are synchronized with Clerk subscriptions.">
      <div className="space-y-6">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Simple, transparent pricing</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Use Clerk Billing to start a Pro plan at $10/month or $108/year (10% off from $120/year).</p>
            </div>
            <button
              type="button"
              onClick={() => setAnnual((prev) => !prev)}
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {annual ? 'Yearly billing (save 10%)' : 'Monthly billing'}
            </button>
          </div>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className=""
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{tier.description}</p>
              <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                ${annual ? tier.yearly : tier.monthly}
                <span className="text-base font-medium text-gray-500">{annual && tier.yearly > 0 ? ' /year' : ' /month'}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </Card>
          ))}
          <SignedIn>
            <Card className="border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout with Clerk Billing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Choose either the Free or Pro plan directly in Clerk Checkout. The subscription you choose becomes your active plan immediately.
              </p>
              <div className="mt-4">
                <PricingTable appearance={clerkPricingTableAppearance} />
              </div>
            </Card>
          </SignedIn>
          <SignedOut>
            <Card className="border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout with Clerk Billing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Sign in to view Free and Pro options in Clerk Checkout and subscribe to the plan you want to activate.</p>
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

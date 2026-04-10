"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PricingTable, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';
import { clerkPricingTableAppearance } from '../lib/clerk-appearance';
import { FREE_TRIAL_LIMITS } from '../lib/plans';

const tiers = [
  {
    name: 'Free Trial',
    monthly: 0,
    yearly: 0,
    description: 'Start free and test the core workflow with strict plan limits.',
    features: [
      `${FREE_TRIAL_LIMITS.trialDays} days free trial`,
      `Up to ${FREE_TRIAL_LIMITS.consultations} consultations`,
      `Up to ${FREE_TRIAL_LIMITS.voiceRecordings} voice recordings`,
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
                ${tier.monthly}
                <span className="text-base font-medium text-gray-500" />
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-6">
                <SignedIn>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/subscription#billing" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Manage Subscription
                    </Link>
                    {tier.name === 'Free Trial' && (
                      <Link href="/subscription#billing" className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                        Try Free Version
                      </Link>
                    )}
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Start Free Trial
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </Card>
          ))}
          <SignedIn>
            <Card className="border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout with Clerk Billing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">For clinics that need unlimited consultation and dictation usage.</p>
              <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                ${annual ? 108 : 10}
                <span className="text-base font-medium text-gray-500">{annual ? ' /year' : ' /month'}</span>
              </p>
              {annual && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-1 line-through">$120</span>
                  <span className="font-semibold text-green-600">$108</span> yearly (10% discount)
                </p>
              )}
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>• Unlimited consultations</li>
                <li>• Unlimited voice recordings</li>
                <li>• Subscription management in Clerk Billing</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Your active Clerk subscription determines which plan features are available in the app. Use this section to upgrade, downgrade to free, or cancel billing.</p>
              <div className="mt-4">
                <PricingTable appearance={clerkPricingTableAppearance} />
              </div>
              <div className="mt-6">
                <Link href="/subscription#billing" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Manage Subscription
                </Link>
              </div>
            </Card>
          </SignedIn>
          <SignedOut>
            <Card className="border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout with Clerk Billing</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Sign in to view available subscriptions and manage billing through Clerk.</p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>• Unlimited consultations</li>
                <li>• Unlimited voice recordings</li>
                <li>• Subscription management in Clerk Billing</li>
              </ul>
              <div className="mt-6">
                <SignInButton mode="modal">
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Sign in to view plans
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

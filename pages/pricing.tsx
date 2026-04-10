"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';

const tiers = [
  {
    name: 'Starter',
    monthly: 10,
    yearly: 108,
    description: 'For solo doctors starting with AI-assisted notes.',
    features: ['100 consultations/mo', 'Basic specialty templates', 'Email summaries'],
  },
  {
    name: 'Professional',
    monthly: 10,
    yearly: 108,
    description: 'For growing practices that need automation + analytics.',
    features: ['Unlimited consultations', 'Voice dictation', 'Analytics dashboard', 'Shared templates'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthly: null,
    yearly: null,
    description: 'For multi-clinic teams with compliance and admin controls.',
    features: ['Advanced permissions', 'Dedicated onboarding', 'Custom integrations', 'Priority support'],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <AppShell title="Pricing" subtitle="Choose the plan that matches your clinic workflow.">
      <div className="space-y-6">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Simple, transparent pricing</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Switch between monthly and yearly billing at any time.</p>
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

        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlighted ? 'border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900' : ''}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{tier.description}</p>
              <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                {tier.monthly ? `$${annual ? tier.yearly : tier.monthly}` : 'Custom'}
                {tier.monthly && (
                  <span className="text-base font-medium text-gray-500">{annual ? ' /year (10% off upfront)' : ' /month'}</span>
                )}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link
                href="/product"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
              </Link>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Feature comparison</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Feature</th>
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Starter</th>
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Professional</th>
                  <th className="py-3 font-semibold text-gray-600 dark:text-gray-300">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-200">
                {[
                  ['Specialty templates', '✓', '✓', '✓'],
                  ['Voice dictation', '—', '✓', '✓'],
                  ['Collaboration', '—', '✓', '✓'],
                  ['Advanced permissions', '—', '—', '✓'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gray-100 dark:border-gray-800">
                    {row.map((col) => (
                      <td key={`${row[0]}-${col}`} className="py-3 pr-4">{col}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';

const tiers = [
  {
    name: 'Free Trial',
    monthly: 0,
    yearly: 0,
    description: 'Try MediNotes Pro with core features before subscribing.',
    features: ['14-day trial', '50 consultations', 'Specialty templates', 'Email summaries'],
  },
  {
    name: 'Pro',
    monthly: 29,
    yearly: 290,
    description: 'For practices that need full automation, collaboration, and analytics.',
    features: ['Unlimited consultations', 'Voice dictation', 'Analytics dashboard', 'Shared templates'],
    highlighted: true,
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
              <p className="text-sm text-gray-600 dark:text-gray-300">Switch between monthly and yearly billing for Pro at any time.</p>
            </div>
            <button
              type="button"
              onClick={() => setAnnual((prev) => !prev)}
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {annual ? 'Yearly billing (save 16%)' : 'Monthly billing'}
            </button>
          </div>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlighted ? 'border-blue-300 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-900' : ''}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{tier.description}</p>
              <p className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                ${tier.name === 'Pro' ? (annual ? tier.yearly : tier.monthly) : tier.monthly}
                <span className="text-base font-medium text-gray-500">{tier.name === 'Pro' ? (annual ? ' /year' : ' /month') : ''}</span>
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
                {tier.name === 'Free Trial' ? 'Start Free Trial' : 'Choose Pro'}
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
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Free Trial</th>
                  <th className="py-3 font-semibold text-gray-600 dark:text-gray-300">Pro</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-200">
                {[
                  ['Specialty templates', '✓', '✓'],
                  ['Voice dictation', '—', '✓'],
                  ['Collaboration', '—', '✓'],
                  ['Analytics dashboard', '—', '✓'],
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

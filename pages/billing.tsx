"use client";

import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';

const invoices = [
  { id: 'INV-2026-0301', date: 'Mar 30, 2026', amount: '$948.00', status: 'Paid' },
  { id: 'INV-2026-0201', date: 'Feb 28, 2026', amount: '$948.00', status: 'Paid' },
  { id: 'INV-2026-0101', date: 'Jan 31, 2026', amount: '$948.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <AppShell title="Billing" subtitle="Manage payment methods and download invoice history.">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Method</h2>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Expires 11/2028 • Default method</p>
              </div>
              <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
                Update
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice History</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Invoice</th>
                    <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                    <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                    <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="py-3 font-semibold text-gray-600 dark:text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 pr-4">{invoice.id}</td>
                      <td className="py-3 pr-4">{invoice.date}</td>
                      <td className="py-3 pr-4">{invoice.amount}</td>
                      <td className="py-3 pr-4">{invoice.status}</td>
                      <td className="py-3">
                        <button className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-900/70">
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Contact</h3>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">finance@medinotespro.com</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">Tax ID: US-HEALTH-392810</p>
        </Card>
      </div>
    </AppShell>
  );
}

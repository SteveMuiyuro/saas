"use client";

import { AppShell } from '../components/app-shell';
import { Card, Stat } from '../components/ui';

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics Dashboard" subtitle="Track consultation trends, template usage, and productivity gains.">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Stat label="Consultation Frequency" value="124 / week" />
          <Stat label="Most Used Template" value="Interventional Cardiology" />
          <Stat label="Estimated Time Saved" value="42 hours / month" />
          <Stat label="Usage Trend" value="+18% this month" />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usage Trends Over Time</h3>
            <div className="mt-4 h-64 rounded-xl border border-dashed border-gray-300 bg-gradient-to-b from-blue-50 to-indigo-50 p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
              <div className="flex h-full items-end justify-between gap-2">
                {[32, 40, 36, 45, 50, 58, 61, 54, 66, 70, 73, 78].map((value, idx) => (
                  <div key={idx} className="flex-1 rounded-t bg-blue-600/80" style={{ height: `${value}%` }} />
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Template Usage Share</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <li className="flex justify-between"><span>Interventional Cardiology</span><strong>34%</strong></li>
              <li className="flex justify-between"><span>Pediatric Cardiology</span><strong>22%</strong></li>
              <li className="flex justify-between"><span>Clinical Neurology</span><strong>18%</strong></li>
              <li className="flex justify-between"><span>General Pediatrics</span><strong>16%</strong></li>
              <li className="flex justify-between"><span>Other</span><strong>10%</strong></li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

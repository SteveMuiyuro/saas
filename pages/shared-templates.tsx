"use client";

import { useState } from 'react';
import { AppShell } from '../components/app-shell';
import { Card } from '../components/ui';

const templates = [
  {
    name: 'Interventional Cardiology Follow-up',
    owner: 'Dr. Rivera',
    collaborators: 4,
    lastEdited: '2 hours ago',
  },
  {
    name: 'Pediatric Cardiology Intake',
    owner: 'Dr. Chen',
    collaborators: 3,
    lastEdited: 'Yesterday',
  },
  {
    name: 'Neurology Progress Notes',
    owner: 'Dr. Ahmed',
    collaborators: 5,
    lastEdited: '3 days ago',
  },
];

export default function SharedTemplatesPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppShell title="Shared Templates" subtitle="Collaborate with doctors on reusable template libraries.">
      <div className="space-y-6">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Template Library</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Assign collaborators and control editing permissions.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Invite Collaborator
            </button>
          </div>
        </Card>

        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Template</th>
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Owner</th>
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Collaborators</th>
                  <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Last Edited</th>
                  <th className="py-3 font-semibold text-gray-600 dark:text-gray-300">Permissions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-200">
                {templates.map((template) => (
                  <tr key={template.name} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 pr-4">{template.name}</td>
                    <td className="py-3 pr-4">{template.owner}</td>
                    <td className="py-3 pr-4">{template.collaborators}</td>
                    <td className="py-3 pr-4">{template.lastEdited}</td>
                    <td className="py-3">
                      <select className="rounded-lg border border-gray-300 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-800">
                        <option>Can edit</option>
                        <option>Can comment</option>
                        <option>View only</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-950/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invite collaborator</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Grant access to a doctor for shared template editing.</p>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-xl border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Email address" />
              <select className="w-full rounded-xl border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                <option>Can edit</option>
                <option>Can comment</option>
                <option>View only</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

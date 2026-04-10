"use client";

import { useMemo, useState, FormEvent, useRef } from 'react';
import { useAuth, Protect, PricingTable, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import DatePicker from 'react-datepicker';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { AppShell } from './app-shell';
import { Badge, Card, Stat } from './ui';

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
  }

  interface SpeechRecognitionEvent {
    results: {
      [key: number]: {
        [key: number]: {
          transcript: string;
        };
      };
      length: number;
    };
  }
}

const specialties = {
  Cardiology: ['Interventional Cardiology', 'Pediatric Cardiology'],
  Neurology: ['Clinical Neurology', 'Neurocritical Care'],
  Pediatrics: ['General Pediatrics', 'Pediatric Pulmonology'],
};

const emailTranslations: Record<string, string> = {
  English: 'Thank you for attending your consultation today. Please follow your medication plan and schedule your follow-up in 2 weeks.',
  Spanish: 'Gracias por asistir a su consulta hoy. Por favor siga su plan de medicación y programe su seguimiento en 2 semanas.',
  French: "Merci d'avoir assisté à votre consultation aujourd'hui. Veuillez suivre votre plan de traitement et planifier un suivi dans 2 semaines.",
};

const fieldClassName = 'mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900/60';

function ConsultationForm() {
  const { getToken } = useAuth();
  const [patientName, setPatientName] = useState('');
  const [visitDate, setVisitDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(specialties)[0]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties.Cardiology[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speechSupported = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

  function toggleRecording() {
    if (!speechSupported) return;

    if (!recognitionRef.current) {
      const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Speech) return;

      const recognition = new Speech();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i += 1) {
          transcript += `${event.results[i][0].transcript} `;
        }
        setNotes(transcript.trim());
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  }

  const specialtyOptions = useMemo(() => specialties[selectedCategory as keyof typeof specialties], [selectedCategory]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setOutput('');
    setLoading(true);

    const jwt = await getToken();
    if (!jwt) {
      setOutput('Authentication required');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let buffer = '';

    await fetchEventSource('/api/consultation', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        patient_name: patientName,
        date_of_visit: visitDate?.toISOString().slice(0, 10),
        notes,
      }),
      onmessage(ev) {
        buffer += ev.data;
        setOutput(buffer);
      },
      onclose() {
        setLoading(false);
      },
      onerror(err) {
        console.error('SSE error:', err);
        controller.abort();
        setLoading(false);
      },
    });
  }

  return (
    <AppShell title="Consultation Dashboard" subtitle="Capture notes, generate patient communication, and monitor plan usage.">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Consultation</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Use specialty templates and dictation for faster documentation.</p>
              </div>
              <Badge>Live AI Summary</Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Patient Name</span>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className={fieldClassName}
                    placeholder="Enter patient's full name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Date of Visit</span>
                  <DatePicker
                    selected={visitDate}
                    onChange={(d: Date | null) => setVisitDate(d)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    required
                    className={fieldClassName}
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Specialty Category</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      const category = e.target.value;
                      setSelectedCategory(category);
                      setSelectedSpecialty(specialties[category as keyof typeof specialties][0]);
                    }}
                    className={fieldClassName}
                  >
                    {Object.keys(specialties).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Sub-specialty Template</span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className={fieldClassName}
                  >
                    {specialtyOptions.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Consultation Notes</span>
                  <button
                    type="button"
                    onClick={toggleRecording}
                    disabled={!speechSupported}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      isRecording
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-900/70'
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {isRecording ? '⏹ Stop Recording' : '🎙 Start Dictation'}
                  </button>
                </div>
                <textarea
                  required
                  rows={8}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={fieldClassName}
                  placeholder="Dictate or type detailed consultation notes..."
                />
                {!speechSupported && <p className="text-xs text-amber-600">Speech recognition is not available in this browser.</p>}
                {isRecording && <p className="text-xs font-medium text-red-600">Recording in progress… your note is updating live.</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? 'Generating Summary…' : 'Generate Summary'}
              </button>
            </form>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Output</h3>
            {!output && (
              <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                Your AI summary and patient communication will appear here after generation.
              </div>
            )}
            {output && (
              <div className="markdown-content prose prose-blue mt-4 max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{output}</ReactMarkdown>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today&apos;s Snapshot</h3>
            <div className="mt-4 grid gap-3">
              <Stat label="Consultations" value="18" />
              <Stat label="Templates Used" value={selectedSpecialty} />
              <Stat label="Estimated Time Saved" value="2h 20m" />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">UI Language</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Switch language context for patient emails.</p>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={fieldClassName}
            >
              {Object.keys(emailTranslations).map((language) => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <p className="mb-2 font-semibold">Patient email preview ({selectedLanguage})</p>
              <p>{emailTranslations[selectedLanguage]}</p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function SubscriptionFallback() {
  return (
    <AppShell title="Professional Plan Required" subtitle="Keep your testing payment simulation and unlock full consultation generation.">
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Upgrade to Healthcare Professional Plan</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Access AI-generated summaries, collaboration, analytics, and multilingual follow-up communication.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <li>• Consultation and chart automation</li>
            <li>• Team collaboration workspace</li>
            <li>• Usage analytics and productivity insights</li>
            <li>• Maintains existing Clerk testing payment flow</li>
          </ul>
        </Card>
        <Card>
          <PricingTable />
        </Card>
      </div>
    </AppShell>
  );
}

export default function ProductPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Protect plan="premium_subscription" fallback={<SubscriptionFallback />}>
          <ConsultationForm />
        </Protect>
      </SignedIn>
    </>
  );
}

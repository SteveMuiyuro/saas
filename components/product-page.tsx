"use client";

import { useMemo, useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth, PricingTable, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import DatePicker from 'react-datepicker';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { AppShell } from './app-shell';
import { Badge, Card, Stat } from './ui';
import { clerkPricingTableAppearance } from '../lib/clerk-appearance';
import { FREE_TRIAL_LIMITS } from '../lib/plans';
import { useProPlanStatus } from '../lib/use-pro-plan';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

type UsageState = {
  consultationCount: number;
  voiceRecordingCount: number;
  trialStartedAt: string;
};

function ConsultationForm() {
  const { getToken, userId } = useAuth();
  const [patientName, setPatientName] = useState('');
  const [visitDate, setVisitDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(specialties)[0]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties.Cardiology[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const patientNameInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [usageVersion, setUsageVersion] = useState(0);

  useEffect(() => {
    patientNameInputRef.current?.focus();
  }, []);

  const usage = useMemo<UsageState>(() => {
    void usageVersion;
    if (!userId || typeof window === 'undefined') {
      return {
        consultationCount: 0,
        voiceRecordingCount: 0,
        trialStartedAt: new Date().toISOString(),
      };
    }
    const storageKey = `medinotes-plan-usage:${userId}`;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      const initial: UsageState = {
        consultationCount: 0,
        voiceRecordingCount: 0,
        trialStartedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(storageKey, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw) as UsageState;
    } catch {
      window.localStorage.removeItem(storageKey);
      return {
        consultationCount: 0,
        voiceRecordingCount: 0,
        trialStartedAt: new Date().toISOString(),
      };
    }
  }, [userId, usageVersion]);

  const speechSupported = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const hasProPlan = useProPlanStatus();
  const consultationsRemaining = Math.max(FREE_TRIAL_LIMITS.consultations - usage.consultationCount, 0);
  const voiceRecordingsRemaining = Math.max(FREE_TRIAL_LIMITS.voiceRecordings - usage.voiceRecordingCount, 0);
  const canCreateConsultation = hasProPlan || consultationsRemaining > 0;
  const canUseVoiceRecording = hasProPlan || voiceRecordingsRemaining > 0;
  const reachedFreeConsultationLimit = !hasProPlan && consultationsRemaining === 0;

  const specialtyOptions = useMemo(() => specialties[selectedCategory as keyof typeof specialties], [selectedCategory]);

  function persistUsage(next: UsageState) {
    if (!userId || typeof window === 'undefined') return;
    window.localStorage.setItem(`medinotes-plan-usage:${userId}`, JSON.stringify(next));
    setUsageVersion((v) => v + 1);
  }

  function formatSnapshotCount(count: number, singularLabel: string, pluralLabel: string) {
    if (count === 0) {
      return `No ${pluralLabel} yet`;
    }

    if (count === 1) {
      return `1 ${singularLabel}`;
    }

    return `${count} ${pluralLabel}`;
  }

  function toggleRecording() {
    if (!speechSupported || !canUseVoiceRecording) return;

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
      return;
    }

    persistUsage({
      consultationCount: usage.consultationCount,
      voiceRecordingCount: usage.voiceRecordingCount + 1,
      trialStartedAt: usage.trialStartedAt,
    });
    recognitionRef.current?.start();
    setIsRecording(true);

  }

  function clearConsultationFields() {
    setPatientName('');
    setNotes('');
    patientNameInputRef.current?.focus();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!canCreateConsultation) {
      setOutput('You have reached your Free plan consultation limit. Try Pro for unlimited consultations.');
      return;
    }

    setOutput('');
    setLoading(true);

    const jwt = await getToken();

    console.log("JWT TOKEN:", jwt);
    if (!jwt) {
      setOutput('Authentication required');
      setLoading(false);
      return;
    }
  console.log("Sending Authorization header:", `Bearer ${jwt}`);
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
        language: selectedLanguage,
      }),
      onmessage(ev) {
        buffer += ev.data;
        setOutput(buffer);
      },
      onclose() {
        const nextConsultationCount = usage.consultationCount + 1;
        persistUsage({
          consultationCount: nextConsultationCount,
          voiceRecordingCount: usage.voiceRecordingCount,
          trialStartedAt: usage.trialStartedAt,
        });
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
      <div className="grid items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Consultation</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Use specialty templates and dictation for faster documentation.</p>
              </div>
              <Badge>{hasProPlan ? 'Pro Plan' : 'Free'}</Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Patient Name</span>
                  <input
                    ref={patientNameInputRef}
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
                <Select
  value={selectedCategory}
  onValueChange={(value) => {
    setSelectedCategory(value);
    setSelectedSpecialty(
      specialties[value as keyof typeof specialties][0]
    );
  }}
>
  <SelectTrigger className={fieldClassName}>
    <SelectValue placeholder="Select specialty" />
  </SelectTrigger>

  <SelectContent className="z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
    <SelectGroup>
      {Object.keys(specialties).map((category) => (
        <SelectItem key={category} value={category}>
          {category}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
                </label>
                <label className="block text-sm">
                  <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Sub-specialty Template</span>
            <Select
  value={selectedSpecialty}
  onValueChange={(value) => setSelectedSpecialty(value)}
>
  <SelectTrigger className={fieldClassName}>
    <SelectValue placeholder="Select template" />
  </SelectTrigger>

  <SelectContent className="z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
    <SelectGroup>
      {specialtyOptions.map((specialty) => (
        <SelectItem key={specialty} value={specialty}>
          {specialty}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
                </label>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium leading-none text-gray-700 dark:text-gray-200">Consultation Notes</span>
                    {reachedFreeConsultationLimit && (
                      <button
                        type="button"
                        className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:hover:bg-amber-900/60"
                      >
                        Try Pro
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={clearConsultationFields}
                      className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={toggleRecording}
                      disabled={!speechSupported || !canUseVoiceRecording}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        isRecording
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-900/70'
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {isRecording ? '⏹ Stop Recording' : '🎙 Start Dictation'}
                    </button>
                  </div>
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
                {!hasProPlan && <p className="text-xs text-red-600">Free includes up to {FREE_TRIAL_LIMITS.voiceRecordings} voice recordings.</p>}
                {isRecording && <p className="text-xs font-medium text-red-600">Recording in progress… your note is updating live.</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !canCreateConsultation}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? (
                  <>
                    <span>Generating Summary</span>
                    <span
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                  </>
                ) : 'Generate Summary'}
              </button>
              {!canCreateConsultation && (
                <p className="text-xs text-red-600">Free includes up to {FREE_TRIAL_LIMITS.consultations} consultations. Try Pro for unlimited consultations.</p>
              )}
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

        <div className="space-y-6 xl:self-start">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today&apos;s Snapshot</h3>
            <div className="mt-4 grid gap-3">
              <Stat label="Consultations" value={formatSnapshotCount(usage.consultationCount, 'consultation', 'consultations')} />
              <Stat label="Voice Recordings" value={formatSnapshotCount(usage.voiceRecordingCount, 'voice recording', 'voice recordings')} />
              <Stat label="Templates Used" value={selectedSpecialty} />
            </div>
          </Card>

          {hasProPlan && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Summary Language</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Generate the full summary, next steps, and patient email in the selected language.</p>
         <Select
  value={selectedLanguage}
  onValueChange={(value) => setSelectedLanguage(value)}
>
  <SelectTrigger className={fieldClassName}>
    <SelectValue placeholder="Select language" />
  </SelectTrigger>

  <SelectContent className="z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
    <SelectGroup>
      {Object.keys(emailTranslations).map((language) => (
        <SelectItem key={language} value={language}>
          {language}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
              <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <p className="mb-2 font-semibold">Patient email preview ({selectedLanguage})</p>
                <p>{emailTranslations[selectedLanguage]}</p>
              </div>
            </Card>
          )}
          {!hasProPlan && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upgrade to Pro</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Unlock unlimited consultations and unlimited voice recordings.</p>
              <div className="mt-4">
                <PricingTable appearance={clerkPricingTableAppearance} />
              </div>
            </Card>
          )}
        </div>
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
        <ConsultationForm />
      </SignedIn>
    </>
  );
}

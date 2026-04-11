"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Badge, Card, SectionHeading } from '../components/ui';

const features = [
  { title: 'Specialty templates', description: 'Tailored templates for cardiology, pediatrics, orthopedics, and more.' },
  { title: 'Voice dictation', description: 'Capture notes naturally with browser speech-to-text right in your workflow.' },
  { title: 'Multi-language communication', description: 'Generate patient-friendly follow-ups in multiple languages.' },
  { title: 'Analytics dashboard', description: 'Track consultation trends, template usage, and estimated time saved.' },
  { title: 'Doctor collaboration', description: 'Share templates, assign permissions, and collaborate with your team.' },
];

const steps = [
  'Choose a specialty template',
  'Dictate or write consultation notes',
  'Generate patient email and action plan',
  'Track insights and team usage over time',
];

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  if (isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Card className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Redirecting to your dashboard…</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">We&apos;re taking you to your consultation workspace.</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MedNotes Pro</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
              Pricing
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                  Open App
                </Link>
                <UserButton showName appearance={{ elements: { userButtonOuterIdentifier: 'text-gray-900 dark:text-white' } }} />
              </div>
            </SignedIn>
          </div>
        </nav>

        <section className="grid items-center gap-10 pb-20 lg:grid-cols-2">
          <div>
            <Badge>Built for modern clinics</Badge>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Automate consultations! Get clear and actionable next steps .
            </h2>
            <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
              MedNotes Pro helps doctors document faster, communicate clearly, and stay aligned with teams using AI-powered summaries and follow-ups.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Sign Up Free</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Go to Dashboard
                </Link>
              </SignedIn>
              <Link href="#how-it-works" className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800">
                Learn More
              </Link>
            </div>
          </div>
          <Card className="relative overflow-hidden p-0">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
           
              <h3 className="mt-3 text-2xl font-semibold">Your Ideal Medical Consultation App</h3>
              <p className="mt-2 text-blue-100">Document visits, generate patient correspondence from one workspace.</p>
            </div>
            <div className="grid gap-3 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-500 text-center">Notes generated today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white text-center">156</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-500 text-center">Recordings generated today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white text-center">132</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-16">
          <SectionHeading eyebrow="Features" title="Everything your care team needs" description="Purpose-built tools for faster documentation and better patient communication." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card  key={feature.title}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-16">
          <SectionHeading eyebrow="How it works" title="From consultation to follow-up in minutes" />
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-200">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{step}</p>
              </Card>
            ))}
          </div>
        </section>


        <section className="py-16">
          <SectionHeading eyebrow="Trusted by clinicians" title="Built to reduce admin burden and improve continuity of care" />
          <div className="grid gap-5 md:grid-cols-3">
            <Card><p className="text-sm text-gray-700 dark:text-gray-200">“Our doctors save hours weekly and patient emails are finally consistent.”</p><p className="mt-3 text-xs font-semibold text-gray-500">Clinic Operations Lead</p></Card>
            <Card><p className="text-sm text-gray-700 dark:text-gray-200">“The specialty templates dramatically improved our chart quality.”</p><p className="mt-3 text-xs font-semibold text-gray-500">Cardiology Team Manager</p></Card>
            <Card><p className="text-sm text-gray-700 dark:text-gray-200">“Simple to adopt. Huge impact on documentation speed.”</p><p className="mt-3 text-xs font-semibold text-gray-500">Medical Director</p></Card>
          </div>
        </section>

        <section className="py-20">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-center text-white">
            <h3 className="text-3xl font-bold">Ready to modernize your consultation workflow?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-blue-100">Join teams using MedNotes Pro to deliver faster documentation and better patient communication.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">Start Free</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">
                  Go to App
                </Link>
              </SignedIn>
              <Link href="/pricing" className="rounded-xl border border-blue-200 px-6 py-3 font-semibold text-white transition hover:bg-blue-500">
                Compare Plans
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

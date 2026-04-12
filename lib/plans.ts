export const PLAN_KEYS = {
  pro: [
    'user:pro',
    'user:pro_monthly',
    'user:pro_annual',
    'user:pro-monthly',
    'user:pro-annual',
  ],
} as const;

export const FEATURE_KEYS = {
  recording: [
    'user:recording',
    'user:voice_recording',
    'user:voice-recording',
  ],
} as const;

export const FREE_TRIAL_LIMITS = {
  trialDays: 7,
  consultations: 20,
  voiceRecordings: 5,
} as const;

export function isWithinFreeTrial(trialStartedAt: string) {
  const started = new Date(trialStartedAt);
  const expiresAt = new Date(started);
  expiresAt.setDate(expiresAt.getDate() + FREE_TRIAL_LIMITS.trialDays);
  return new Date() <= expiresAt;
}

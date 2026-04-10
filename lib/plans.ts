export const PLAN_KEYS = {
  pro: 'user:pro',
  legacyPro: 'premium_subscription',
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

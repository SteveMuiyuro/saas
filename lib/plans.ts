const PRO_PLAN_BASE_KEYS = ['pro', 'pro_monthly', 'pro_annual', 'pro-monthly', 'pro-annual'] as const;
const RECORDING_FEATURE_BASE_KEYS = ['recording', 'voice_recording', 'voice-recording'] as const;

function buildClerkKeys(baseKeys: readonly string[]) {
  return baseKeys.flatMap((key) => [key, `user:${key}`]);
}

export const PLAN_KEYS = {
  pro: buildClerkKeys(PRO_PLAN_BASE_KEYS),
} as const;

export const FEATURE_KEYS = {
  recording: buildClerkKeys(RECORDING_FEATURE_BASE_KEYS),
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

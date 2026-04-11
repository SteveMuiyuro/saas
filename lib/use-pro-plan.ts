"use client";

import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import { PLAN_KEYS } from './plans';

const PRO_CANCELLATION_KEY = 'medinotes-pro-cancelled-at';
const PRO_GRACE_PERIOD_MS = 24 * 60 * 60 * 1000;

export function useProPlanStatus() {
  const { has, getToken } = useAuth();

  const resolveHasProPlan = useCallback(() => Boolean(has?.({ plan: PLAN_KEYS.pro })), [has]);
  const [hasProPlan, setHasProPlan] = useState(resolveHasProPlan);

  const isWithinProGracePeriod = useCallback(() => {
    if (typeof window === 'undefined') return false;

    const cancelledAtRaw = window.localStorage.getItem(PRO_CANCELLATION_KEY);
    if (!cancelledAtRaw) return false;

    const cancelledAt = Number(cancelledAtRaw);
    if (Number.isNaN(cancelledAt)) {
      window.localStorage.removeItem(PRO_CANCELLATION_KEY);
      return false;
    }

    const withinGrace = Date.now() - cancelledAt < PRO_GRACE_PERIOD_MS;
    if (!withinGrace) {
      window.localStorage.removeItem(PRO_CANCELLATION_KEY);
    }

    return withinGrace;
  }, []);

  const resolvePlanStatus = useCallback((nextHasProPlan: boolean) => {
    if (typeof window === 'undefined') {
      return nextHasProPlan;
    }

    if (nextHasProPlan) {
      window.localStorage.removeItem(PRO_CANCELLATION_KEY);
      return true;
    }

    if (hasProPlan) {
      window.localStorage.setItem(PRO_CANCELLATION_KEY, String(Date.now()));
      return true;
    }

    return isWithinProGracePeriod();
  }, [hasProPlan, isWithinProGracePeriod]);

  useEffect(() => {
    setHasProPlan(resolvePlanStatus(resolveHasProPlan()));
  }, [resolveHasProPlan, resolvePlanStatus]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let active = true;

    const refreshPlanStatus = async () => {
      try {
        await getToken({ skipCache: true });
      } finally {
        if (active) {
          setHasProPlan(resolvePlanStatus(resolveHasProPlan()));
        }
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void refreshPlanStatus();
      }
    };

    void refreshPlanStatus();
    window.addEventListener('focus', refreshPlanStatus);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      active = false;
      window.removeEventListener('focus', refreshPlanStatus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [getToken, resolveHasProPlan, resolvePlanStatus]);

  return hasProPlan;
}

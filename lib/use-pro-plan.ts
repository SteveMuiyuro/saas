"use client";

import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import { PLAN_KEYS } from './plans';

export function useProPlanStatus() {
  const { has, getToken } = useAuth();

  const resolveHasProPlan = useCallback(() => Boolean(has?.({ plan: PLAN_KEYS.pro })), [has]);
  const [hasProPlan, setHasProPlan] = useState(resolveHasProPlan);

  useEffect(() => {
    setHasProPlan(resolveHasProPlan());
  }, [resolveHasProPlan]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let active = true;

    const refreshPlanStatus = async () => {
      try {
        await getToken({ skipCache: true });
      } finally {
        if (active) {
          setHasProPlan(resolveHasProPlan());
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
  }, [getToken, resolveHasProPlan]);

  return hasProPlan;
}

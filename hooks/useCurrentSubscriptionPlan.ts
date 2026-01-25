'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchCurrentSubscriptionPlan } from '@/services/subscription';
import { SubscriptionPlan } from '@/types';

/**
 * Fetches the subscription plan associated with the current user.
 *
 * @returns The current plan data, loading state, error, and mutate function.
 */
export function useCurrentSubscriptionPlan() {
  const { data, error, mutate, isLoading } = useSWR<SubscriptionPlan | null>(
    SWRKey.CurrentSubscriptionPlan,
    fetchCurrentSubscriptionPlan,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    currentPlan: data,
    error,
    isLoading,
    mutate,
  };
}

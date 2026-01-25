'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchSubscriptionPlans } from '@/services/subscription';
import { SubscriptionPlan } from '@/types';

/**
 * Fetches all available subscription plans.
 *
 * @returns A list of subscription plans, loading state, error, and mutate function.
 */
export const useSubscriptionPlans = () => {
  const { data, error, mutate, isLoading } = useSWR<SubscriptionPlan[]>(
    SWRKey.SubscriptionPlans,
    fetchSubscriptionPlans,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  return {
    subscriptionPlans: data || [],
    error,
    mutate,
    isLoading,
  };
};

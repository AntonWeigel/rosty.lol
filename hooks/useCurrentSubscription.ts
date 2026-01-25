'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchCurrentSubscription } from '@/services/subscription';
import { Subscription } from '@/types';

/**
 * Fetches the current user's active subscription.
 *
 * @returns The subscription data, loading state, error, and mutate function.
 */
export const useCurrentSubscription = () => {
  const { data, error, mutate, isLoading } = useSWR<Subscription | null>(
    SWRKey.CurrentSubscription,
    fetchCurrentSubscription,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return { subscription: data, error, isLoading, mutate };
};

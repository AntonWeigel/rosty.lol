'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchFeature } from '@/services/subscription';
import { SubscriptionPlanFeatures } from '@/types';

/**
 * Fetches a specific feature from the current user's subscription plan.
 *
 * @param featureKey - The key of the feature to retrieve.
 * @returns The feature value, loading state, and any error.
 */
export function useFeature<T extends keyof SubscriptionPlanFeatures>(
  featureKey: T,
) {
  const { data, error, isValidating } = useSWR(
    `${SWRKey.Feature}-${featureKey}`,
    () => fetchFeature(featureKey),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    data,
    error,
    isLoading: isValidating,
  };
}

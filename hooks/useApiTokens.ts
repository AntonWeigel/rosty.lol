'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchApiTokens } from '@/services/token';
import { ApiToken } from '@/types';

/**
 * Fetches the list of API tokens for the current user.
 *
 * @returns A list of API tokens, loading state, error, and mutate function.
 */
export const useApiTokens = () => {
  const { data, error, mutate, isLoading } = useSWR<ApiToken[]>(
    SWRKey.ApiTokens,
    fetchApiTokens,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return { tokens: data || [], error, mutate, isLoading };
};

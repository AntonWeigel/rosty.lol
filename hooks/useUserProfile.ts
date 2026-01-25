'use client';

import useSWR, { mutate } from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchUserProfile } from '@/services/user';
import { UserProfile } from '@/types';

/**
 * Fetches the current user's profile and provides a refetch function.
 *
 * @param initUserProfile - Optional initial profile data for fallback.
 * @returns The user profile, loading state, error, and a refetch method.
 */
export const useUserProfile = (initUserProfile?: UserProfile | null) => {
  const {
    data: userProfile,
    isLoading,
    error,
  } = useSWR<UserProfile | null>(SWRKey.User, fetchUserProfile, {
    fallbackData: initUserProfile ?? undefined,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
  });

  const refetch = async () => {
    await mutate(SWRKey.User);
  };

  return {
    userProfile,
    isLoading,
    error,
    refetch,
  };
};

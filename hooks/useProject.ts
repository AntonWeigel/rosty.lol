'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchProjectById } from '@/services/project';
import { Project } from '@/types';

/**
 * Fetches a project by its ID.
 *
 * @param id - The project ID.
 * @returns The project data, loading state, error, and mutate function.
 */
export const useProject = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR<Project | null>(
    `${SWRKey.Projects}/${id}`,
    () => fetchProjectById(id),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    project: data,
    error,
    mutate,
    isLoading,
  };
};

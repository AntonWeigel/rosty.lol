'use client';

import useSWR from 'swr';

import { SWRKey } from '@/constants/swr';
import { fetchProjects } from '@/services/project';
import { Project } from '@/types';

/**
 * Fetches the list of all projects for the current user.
 *
 * @returns An array of projects, loading state, error, and mutate function.
 */
export const useProjects = () => {
  const { data, error, mutate, isLoading } = useSWR<Project[]>(
    SWRKey.Projects,
    fetchProjects,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    projects: data ?? [],
    error,
    mutate,
    isLoading,
  };
};

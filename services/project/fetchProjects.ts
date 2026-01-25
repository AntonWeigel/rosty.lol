'use server';

import { createClient } from '@/config/supabase/server';
import { DatabaseTable } from '@/constants/enums';
import { getCurrentUser } from '@/services/user';
import { Project } from '@/types';
import { mapToCamelCase } from '@/utils';

/**
 * Fetches all projects belonging to the current authenticated user.
 *
 * @returns A list of projects or an empty array if the user is not authenticated or an error occurs.
 */
export async function fetchProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from(DatabaseTable.Projects)
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching projects', error);
    return [];
  }

  return mapToCamelCase(data);
}

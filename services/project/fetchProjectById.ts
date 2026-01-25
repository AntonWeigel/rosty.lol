'use server';

import { createClient } from '@/config/supabase/server';
import { DatabaseTable } from '@/constants/enums';
import { getCurrentUser } from '@/services/user';
import { Project } from '@/types';
import { convertToCamelCase } from '@/utils';

/**
 * Fetches a single project by ID, scoped to the current authenticated user.
 *
 * @param id - The ID of the project to fetch.
 * @returns The project if found, or null if not found, not authorized, or an error occurs.
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from(DatabaseTable.Projects)
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error(`Error fetching project with id ${id}`, error);
    return null;
  }

  return convertToCamelCase(data);
}

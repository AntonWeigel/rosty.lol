'use server';

import { createClient } from '@/config/supabase/server';
import { DatabaseTable } from '@/constants/enums';
import { getCurrentUser } from '@/services/user';
import { ApiToken } from '@/types';
import { mapToCamelCase } from '@/utils';

/**
 * Fetches the list of API tokens for the current authenticated user.
 *
 * @returns A list of API tokens (most recent first), or an empty array if not authenticated or an error occurs.
 */
export async function fetchApiTokens(): Promise<ApiToken[]> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    console.error('User not found');
    return [];
  }

  const { data, error } = await supabase
    .from(DatabaseTable.ApiTokens)
    .select('id, name, public_token, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching API tokens', error);
  }

  return mapToCamelCase(data);
}

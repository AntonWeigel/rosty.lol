'use server';

import { createClient } from '@/config/supabase/server';
import { DatabaseTable } from '@/constants/enums';
import { getCurrentUser } from '@/services/user';

/**
 * Fetches the total number of API tokens created by the current authenticated user.
 *
 * @returns The number of tokens, or 0 if unauthenticated or an error occurs.
 */
export async function fetchApiTokenCount(): Promise<number> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) return 0;

  const { count, error } = await supabase
    .from(DatabaseTable.ApiTokens)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (error) {
    console.error('Error counting API tokens:', error);
    return 0;
  }

  return count ?? 0;
}

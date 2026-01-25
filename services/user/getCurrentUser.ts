'use server';

import { createClient } from '@/config/supabase/server';

/**
 * Returns the currently authenticated Supabase user.
 *
 * @returns The authenticated user or null if not logged in.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return error || !data?.user ? null : data.user;
}

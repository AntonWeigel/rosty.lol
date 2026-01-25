'use server';

import { createClient } from '@/config/supabase/server';
import { getCurrentUser } from '@/services/user';
import { UserProfile } from '@/types';

/**
 * Fetches the profile of the currently authenticated user.
 *
 * @returns The user profile including email, name, and avatar URL, or null if not found.
 */
export async function fetchUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient();

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Fetch the user's profile
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }

  return {
    email: user.email,
    name: profileData?.full_name,
    avatar: profileData?.avatar_url,
  } as UserProfile;
}

import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { features } from '@/config/features';
import { createDisabledClient } from '@/config/supabase/disabledClient';
import { requireEnv } from '@/utils';

/**
 * Updates the user session and returns the user ID (if logged in).
 * Ensures session is refreshed for Server Components.
 */
export async function updateSession(request: NextRequest) {
  if (!features.supabase) {
    const supabase = createDisabledClient() as unknown as SupabaseClient;
    return { supabase, userId: null };
  }

  requireEnv(
    ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    'Supabase',
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
        },
      },
    },
  );

  // Ensure session is refreshed and get user
  const { data: user } = await supabase.auth.getUser();

  return { supabase, userId: user.user?.id ?? null };
}

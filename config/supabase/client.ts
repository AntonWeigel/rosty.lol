import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

import { features } from '@/config/features';
import { createDisabledClient } from '@/config/supabase/disabledClient';
import { requireEnv } from '@/utils';

export const createClient = () => {
  if (!features.supabase) {
    return createDisabledClient() as unknown as SupabaseClient;
  }

  requireEnv(
    ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
    'Supabase',
  );

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};

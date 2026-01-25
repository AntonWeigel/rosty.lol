import { NextResponse } from 'next/server';

import { createClient } from '@/config/supabase/server';
import { DashboardRoute } from '@/constants/routes';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();
  const productId = requestUrl.searchParams.get('product_id')?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  let target = `${origin}${DashboardRoute.OverviewPage}`;
  if (redirectTo) {
    target = `${origin}${redirectTo}`;
  }

  if (productId) {
    const url = new URL(target);
    url.searchParams.set('product_id', productId);
    target = url.toString();
  }

  return NextResponse.redirect(target);
}

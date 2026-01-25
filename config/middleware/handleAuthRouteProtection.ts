import { type NextRequest, NextResponse } from 'next/server';

import { AuthRoutesMap } from '@/constants/maps';

const isAuthRoute = (p: string) =>
  Object.values(AuthRoutesMap).some((r) => p.startsWith(r));

/**
 * Middleware for blocking public auth routes when authentication is disabled.
 */
export function handleAuthRouteProtection(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

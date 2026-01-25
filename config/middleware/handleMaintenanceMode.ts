import { type NextRequest, NextResponse } from 'next/server';

import { AppRoute } from '@/constants/routes';

const ALLOWED_PATH_PREFIXES = [
  '/maintenance',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/manifest.json',
  '/images/',
];

/**
 * Middleware for redirecting all traffic during maintenance mode.
 */
export function handleMaintenanceMode(
  request: NextRequest,
): NextResponse | null {
  const { pathname } = request.nextUrl;

  const isAllowed = ALLOWED_PATH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isAllowed) {
    return NextResponse.redirect(
      new URL(AppRoute.MaintenancePage, request.url),
    );
  }

  return NextResponse.next();
}

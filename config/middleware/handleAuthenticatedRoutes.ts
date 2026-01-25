import { type NextRequest } from 'next/server';

import { handleRouteProtection, updateSession } from '@/config/middleware';

/**
 * Middleware for authentication & feature-based route protection.
 */
export async function handleAuthenticatedRoutes(request: NextRequest) {
  const { userId } = await updateSession(request);
  return await handleRouteProtection(request, userId);
}

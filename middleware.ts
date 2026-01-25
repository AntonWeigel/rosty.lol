import { type NextRequest } from 'next/server';

import { features } from '@/config/features';
import {
  handleAuthenticatedRoutes,
  handleAuthRouteProtection,
  handleMaintenanceMode,
} from '@/config/middleware';

/**
 * Main entry point for app middleware.
 */
export async function middleware(request: NextRequest) {
  if (features.maintenance) {
    return handleMaintenanceMode(request);
  }

  if (!features.auth) {
    return handleAuthRouteProtection(request);
  }

  return await handleAuthenticatedRoutes(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

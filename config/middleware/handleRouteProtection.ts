import { type NextRequest, NextResponse } from 'next/server';

import {
  FeatureProtectedRoutesMap,
  ProtectedRoutesMap,
} from '@/constants/maps';
import {
  AppRoute,
  DashboardRoute,
  DashboardRouteValue,
} from '@/constants/routes';
import { fetchFeatureForUser } from '@/services/subscription';

/**
 * Handles authentication & feature-based access control.
 */
export async function handleRouteProtection(
  request: NextRequest,
  userId: string | null,
): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = Object.values(ProtectedRoutesMap).some((route) =>
    pathname.startsWith(route),
  );

  // Redirect if the route is authentication-protected but the user is not authenticated
  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL(AppRoute.SignInPage, request.url));
  }

  // Redirect if the route requires a specific feature but the user lacks access
  const featureKey = FeatureProtectedRoutesMap[pathname as DashboardRouteValue];
  if (featureKey && userId) {
    const hasAccess = await fetchFeatureForUser(userId, featureKey);
    if (!hasAccess) {
      return NextResponse.redirect(
        new URL(DashboardRoute.BillingPage, request.url),
      );
    }
  }

  return NextResponse.next();
}

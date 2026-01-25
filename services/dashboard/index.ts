import * as React from 'react';

import { fetchProjects } from '@/services/project';
import {
  fetchCurrentSubscriptionPlan,
  fetchSubscriptionPlans,
} from '@/services/subscription';
import { fetchUserProfile } from '@/services/user';

/**
 * Fetches all required data in parallel for rendering the dashboard layout.
 *
 * This includes the user profile, available subscription plans, user projects,
 * and the current subscription plan. Results are cached using React's `cache()`.
 *
 * @returns An object containing all fetched dashboard layout data.
 */
export const fetchDashboardLayoutData = React.cache(async () => {
  const [userProfile, subscriptionPlans, projects, currentPlan] =
    await Promise.all([
      fetchUserProfile(),
      fetchSubscriptionPlans(),
      fetchProjects(),
      fetchCurrentSubscriptionPlan(),
    ]);

  return {
    userProfile,
    subscriptionPlans,
    projects,
    currentPlan,
  };
});

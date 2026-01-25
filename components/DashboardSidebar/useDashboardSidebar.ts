import dashboard from '@/config/dashboard';
import { BillingCycle } from '@/constants/enums';
import {
  useCurrentSubscriptionPlan,
  useSubscriptionPlans,
  useUserProfile,
} from '@/hooks';
import { useProjects } from '@/hooks/useProjects';
import { DashboardSidebarData } from '@/types';

/**
 * Combines user, project, and subscription data to generate dynamic dashboard sidebar content.
 *
 * @param initialData Fallback data for user profile, projects, and subscription plans.
 * @returns Sidebar data including user info, current plan, sidebar items, and loading/error states.
 */
export const useDashboardSidebar = (initialData: DashboardSidebarData) => {
  const { userProfile: fetchedUserProfile } = useUserProfile();
  const {
    projects: fetchedProjects,
    isLoading: isLoadingProjects,
    error: projectsError,
  } = useProjects();
  const {
    subscriptionPlans: fetchedSubscriptionPlans,
    isLoading: isLoadingPlans,
    error: plansError,
  } = useSubscriptionPlans();
  const {
    currentPlan: fetchedCurrentPlan,
    isLoading: isLoadingPlan,
    error: currentPlanError,
  } = useCurrentSubscriptionPlan();

  const userProfile = fetchedUserProfile ?? initialData.userProfile;
  const projects = fetchedProjects.length
    ? fetchedProjects
    : initialData.projects;
  const subscriptionPlans = fetchedSubscriptionPlans.length
    ? fetchedSubscriptionPlans
    : initialData.subscriptionPlans;
  const currentPlan = fetchedCurrentPlan ?? initialData.currentPlan;

  // Inject dynamic projects into sidebar
  const platformItems = dashboard.platform.map((item) => {
    if (item.title === 'Projects') {
      return {
        ...item,
        items: isLoadingProjects
          ? []
          : (projects?.map((project) => ({
              title: project.name,
              url: `${item.url}/${project.id}`,
            })) ?? []),
      };
    }
    return item;
  });

  return {
    userProfile,
    subscriptionPlans: subscriptionPlans.filter(
      (plan) => plan.billingCycle === BillingCycle.Monthly,
    ),
    currentPlan,
    platform: platformItems,
    resources: dashboard.resources,
    error: projectsError || plansError || currentPlanError,
    isLoading: isLoadingProjects || isLoadingPlans || isLoadingPlan,
  };
};

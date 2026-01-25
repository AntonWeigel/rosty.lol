import { SubscriptionPlanName } from '@/constants/enums';
import { PlanIconMap } from '@/constants/maps';
import { FreePlanIcon } from '@/icons/plans';

/**
 * Retrieves the corresponding icon component for a given subscription plan name.
 *
 * @param planName - The name of the subscription plan.
 * @returns A React component representing the plan icon.
 *          Defaults to FreePlanIcon if the plan is unknown or not provided.
 */
export function getPlanIcon(planName?: string) {
  if (!planName) return FreePlanIcon;

  const lowerCaseName = planName.toLowerCase();
  return PlanIconMap[lowerCaseName as SubscriptionPlanName] ?? FreePlanIcon;
}

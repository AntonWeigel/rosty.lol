import * as React from 'react';

import { BillingCycle } from '@/constants/enums';
import { SubscriptionPlan } from '@/types';

export function useBillingCyclePlans(subscriptionPlans: SubscriptionPlan[]) {
  const [billingCycle, setBillingCycle] = React.useState<BillingCycle>(
    BillingCycle.Monthly,
  );

  const plansByCycle: Record<BillingCycle, SubscriptionPlan[]> =
    React.useMemo(() => {
      return {
        [BillingCycle.Monthly]: subscriptionPlans.filter(
          (plan) => plan.billingCycle === BillingCycle.Monthly,
        ),
        [BillingCycle.Yearly]: subscriptionPlans.filter(
          (plan) => plan.billingCycle === BillingCycle.Yearly,
        ),
      };
    }, [subscriptionPlans]);

  return {
    billingCycle,
    setBillingCycle,
    plansByCycle,
  };
}

import Link from 'next/link';
import * as React from 'react';

import { DashboardCard } from '@/components/DashboardCard';
import { Button } from '@/components/ui/Button';
import { SubscriptionPlanName } from '@/constants/enums';
import { BillingCycleMap, PlanNameMap } from '@/constants/maps';
import { DashboardRoute } from '@/constants/routes';
import { SubscriptionPlan } from '@/types';
import { getPlanIcon } from '@/utils';

type BillingCardProps = {
  currentPlan: SubscriptionPlan | null;
};

export const BillingCard: React.FC<BillingCardProps> = ({ currentPlan }) => {
  const PlanIcon = getPlanIcon(currentPlan?.name);

  return (
    <DashboardCard>
      <DashboardCard.Header>Billing</DashboardCard.Header>
      <DashboardCard.Content className="flex flex-col items-center gap-4">
        <div>
          <PlanIcon className="size-[160px]" />
        </div>
        <span className="text-secondary-dark dark:text-neutral text-sm">
          {currentPlan
            ? `${PlanNameMap[currentPlan.name as SubscriptionPlanName]} / ${BillingCycleMap[currentPlan.billingCycle]}`
            : 'No active plan'}
        </span>
      </DashboardCard.Content>
      <DashboardCard.Footer>
        <Link href={DashboardRoute.BillingPage} passHref>
          <Button variant="outline">Go to Billing</Button>
        </Link>
      </DashboardCard.Footer>
    </DashboardCard>
  );
};

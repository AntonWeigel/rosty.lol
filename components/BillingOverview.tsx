'use client';

import * as React from 'react';

import {
  manageSubscriptionAction,
  updateSubscriptionAction,
} from '@/app/actions';
import { BillingCycleToggle } from '@/components/BillingCycleToggle';
import { PlanCard } from '@/components/PlanCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { SubscriptionPlanName } from '@/constants/enums';
import {
  useBillingCyclePlans,
  useCurrentSubscriptionPlan,
  useToast,
} from '@/hooks';
import { LogoIcon } from '@/icons/logo';
import { SubscriptionPlan } from '@/types';
import { capitalizeFirst } from '@/utils';

type BillingOverviewProps = {
  subscriptionPlans: SubscriptionPlan[];
};

export const BillingOverview: React.FC<BillingOverviewProps> = ({
  subscriptionPlans,
}) => {
  const { currentPlan, isLoading } = useCurrentSubscriptionPlan();
  const { billingCycle, setBillingCycle, plansByCycle } =
    useBillingCyclePlans(subscriptionPlans);
  const [pendingPlanId, setPendingPlanId] = React.useState<string | null>(null);
  const { toast } = useToast();

  const currentPlanId = currentPlan?.id;

  const handleUpdateSubscription = async (plan: SubscriptionPlan) => {
    setPendingPlanId(plan.id);

    const formData = new FormData();
    formData.set('name', plan.name);
    formData.set('billing_cycle', plan.billingCycle);

    const result = await updateSubscriptionAction(formData);

    if (!result.success) {
      toast({
        title: 'Error updating subscription',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setPendingPlanId(null);
      return;
    }

    if (result.data?.redirectUrl) {
      window.location.href = result.data.redirectUrl;
    }
  };

  const handleManageSubscription = async () => {
    if (!currentPlanId) return;

    setPendingPlanId(currentPlanId);

    const result = await manageSubscriptionAction();

    if (!result.success) {
      toast({
        title: 'Error managing subscription',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setPendingPlanId(null);
      return;
    }

    if (result.data?.redirectUrl) {
      window.location.href = result.data.redirectUrl;
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-center text-2xl font-medium">
            Upgrade your plan
          </h1>
          <Skeleton className="h-[36px] w-[156px] rounded-full" />
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[450px] w-[360px] rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-2xl font-medium">Upgrade your plan</h1>
        <BillingCycleToggle value={billingCycle} onChange={setBillingCycle} />
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {plansByCycle[billingCycle].map((plan) => {
          const isCurrent =
            currentPlan?.name === SubscriptionPlanName.Free
              ? plan.name === SubscriptionPlanName.Free
              : plan.id === currentPlan?.id;
          const isPending = plan.id === pendingPlanId;

          return (
            <PlanCard
              key={plan.id}
              name={plan.name}
              price={plan.price}
              billingCycle={plan.billingCycle}
              benefits={plan.benefits ?? []}
              badgeLabel={plan.badge}
            >
              <PlanCard.PrimaryButton
                onClick={() => handleUpdateSubscription(plan)}
                isPending={isPending}
                disabled={isCurrent || Boolean(pendingPlanId)}
                pendingText="Processing…"
                icon={!isCurrent && <LogoIcon />}
              >
                {isCurrent
                  ? 'Your current plan'
                  : `Get ${capitalizeFirst(plan.name)}`}
              </PlanCard.PrimaryButton>

              {isCurrent ? (
                <PlanCard.SecondaryButton onClick={handleManageSubscription}>
                  Manage my subscription
                </PlanCard.SecondaryButton>
              ) : plan.checkoutNote ? (
                <PlanCard.CheckoutNote>
                  {plan.checkoutNote}
                </PlanCard.CheckoutNote>
              ) : null}
            </PlanCard>
          );
        })}
      </div>
    </div>
  );
};

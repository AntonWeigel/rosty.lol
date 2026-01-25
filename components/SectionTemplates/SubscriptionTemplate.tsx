'use client';

import * as React from 'react';

import { createSubscriptionAction } from '@/app/actions';
import { BillingCycleToggle } from '@/components/BillingCycleToggle';
import { PlanCard } from '@/components/PlanCard';
import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { AppRoute } from '@/constants/routes';
import { useBillingCyclePlans, useToast, useUserProfile } from '@/hooks';
import { GiftIcon } from '@/icons/GiftIcon';
import { LogoIcon } from '@/icons/logo';
import { LandingSectionsSubscription } from '@/tina/__generated__/types';
import { SubscriptionPlan } from '@/types';
import { capitalizeFirst } from '@/utils';

type SubscriptionTemplateProps = LandingSectionsSubscription & {
  subscriptionPlans: SubscriptionPlan[];
};

export const SubscriptionTemplate: React.FC<SubscriptionTemplateProps> = ({
  id,
  header,
  subscriptionPlans,
}) => {
  const { billingCycle, setBillingCycle, plansByCycle } =
    useBillingCyclePlans(subscriptionPlans);
  const [pendingPlanId, setPendingPlanId] = React.useState<string | null>(null);
  const { toast } = useToast();
  const { userProfile } = useUserProfile();

  const handleSubscription = async (plan: SubscriptionPlan) => {
    const { id, productId, current } = plan;

    if (current) return;

    if (!productId && !userProfile) {
      window.location.href = AppRoute.SignUpPage;
      return;
    }

    if (!productId) return;

    setPendingPlanId(id);

    if (!userProfile) {
      window.location.href = `${AppRoute.SignUpPage}?product_id=${productId}`;
      return;
    }

    const formData = new FormData();
    formData.set('product_id', productId);

    const result = await createSubscriptionAction(formData);

    if (!result.success) {
      toast({
        title: 'Error starting subscription',
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

  return (
    <TemplateSection id={id} className="gap-14" highlighted>
      {header && (
        <SectionHeader className="container">
          {header.label && (
            <SectionHeader.Label>{header.label}</SectionHeader.Label>
          )}
          <SectionHeader.Title>{header.title}</SectionHeader.Title>
          {header.subtitleBlock && (
            <SectionHeader.Subtitle>
              <span className="inline-flex flex-wrap items-center justify-center gap-1 text-center">
                {header.subtitleBlock.discount && (
                  <span className="text-accent inline-flex shrink-0 items-center gap-1">
                    <GiftIcon />
                    {header.subtitleBlock.discount}
                  </span>
                )}
                <span className="text-current">
                  {header.subtitleBlock.text}
                </span>
              </span>
            </SectionHeader.Subtitle>
          )}
        </SectionHeader>
      )}

      <BillingCycleToggle
        value={billingCycle}
        onChange={setBillingCycle}
        variant="secondary"
      />

      <div className="container flex flex-wrap justify-center gap-10">
        {plansByCycle[billingCycle].map((plan) => (
          <PlanCard
            key={`${plan.name}-${plan.billingCycle}`}
            name={plan.name}
            price={plan.price}
            billingCycle={plan.billingCycle}
            benefits={plan.benefits ?? []}
            badgeLabel={plan.badge}
            variant="secondary"
          >
            <PlanCard.PrimaryButton
              onClick={() => handleSubscription(plan)}
              isPending={pendingPlanId === plan.id}
              disabled={Boolean(pendingPlanId) || plan.current}
              pendingText="Processing…"
              icon={<LogoIcon />}
            >
              Get {capitalizeFirst(plan.name)}
            </PlanCard.PrimaryButton>

            <PlanCard.CheckoutNote>
              {plan.current ? 'Your current plan' : plan.checkoutNote}
            </PlanCard.CheckoutNote>
          </PlanCard>
        ))}
      </div>
    </TemplateSection>
  );
};

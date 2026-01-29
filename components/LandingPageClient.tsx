'use client';

import * as React from 'react';
import { useTina } from 'tinacms/dist/react';

import { LandingPageSections } from '@/components/LandingPageSections';
import { LandingQuery } from '@/tina/__generated__/types';
import { SubscriptionPlan } from '@/types';

type LandingPageClientProps = {
  query: string;
  variables: { relativePath: string };
  data: LandingQuery;
  subscriptionPlans: SubscriptionPlan[];
};

export const LandingPageClient: React.FC<LandingPageClientProps> = ({
  query,
  variables,
  data,
  subscriptionPlans,
}) => {
  const { data: liveData } = useTina({
    query,
    variables,
    data,
  });

  const sections = liveData?.landing?.sections || [];

  return (
    <LandingPageSections
      sections={sections}
      subscriptionPlans={subscriptionPlans}
    />
  );
};

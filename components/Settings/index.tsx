'use client';

import * as React from 'react';

import { AccountCard } from '@/components/Settings/AccountCard';
import { ApiTokensCard } from '@/components/Settings/ApiTokensCard';
import { BillingCard } from '@/components/Settings/BillingCard';
import { SubscriptionPlan, UserProfile } from '@/types';

type SettingsOverviewProps = {
  userProfile: UserProfile | null;
  currentPlan: SubscriptionPlan | null;
  currentTokenCount: number;
  maxApiTokens?: number | null;
};

export const SettingsOverview: React.FC<SettingsOverviewProps> = ({
  userProfile,
  currentPlan,
  currentTokenCount,
  maxApiTokens,
}) => (
  <div className="flex flex-wrap justify-center gap-10 md:justify-start">
    <AccountCard userProfile={userProfile} />
    <BillingCard currentPlan={currentPlan} />
    <ApiTokensCard
      currentTokenCount={currentTokenCount}
      maxApiTokens={maxApiTokens}
    />
  </div>
);

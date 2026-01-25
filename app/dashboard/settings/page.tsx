import { Metadata } from 'next';

import { SettingsOverview } from '@/components/Settings';
import {
  fetchCurrentSubscriptionPlan,
  fetchFeature,
} from '@/services/subscription';
import { fetchApiTokenCount } from '@/services/token';
import { fetchUserProfile } from '@/services/user';

export const metadata: Metadata = {
  title: 'Settings',
  description:
    'Manage your account preferences, profile, and configuration options in the demo dashboard.',
};

export default async function Page() {
  const [userProfile, currentPlan, maxApiTokens, currentTokenCount] =
    await Promise.all([
      fetchUserProfile(),
      fetchCurrentSubscriptionPlan(),
      fetchFeature('maxApiTokens'),
      fetchApiTokenCount(),
    ]);

  return (
    <SettingsOverview
      userProfile={userProfile}
      currentPlan={currentPlan}
      maxApiTokens={maxApiTokens}
      currentTokenCount={currentTokenCount}
    />
  );
}

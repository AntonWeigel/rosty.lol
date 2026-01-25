import { Metadata } from 'next';

import { BillingOverview } from '@/components/BillingOverview';
import { fetchSubscriptionPlans } from '@/services/subscription';

export const metadata: Metadata = {
  title: 'Billing Settings',
  description: 'View your plan and subscription details in the demo dashboard.',
};

export default async function Page() {
  const subscriptionPlans = await fetchSubscriptionPlans();

  return <BillingOverview subscriptionPlans={subscriptionPlans} />;
}

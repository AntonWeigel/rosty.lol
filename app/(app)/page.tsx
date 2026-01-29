import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LandingPageClient } from '@/components/LandingPageClient';
import { fetchLandingPage } from '@/services/landing';
import { fetchSubscriptionPlansWithCurrent } from '@/services/subscription';
import { generateSeoMetadata } from '@/utils';

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchLandingPage();

  if (!result?.data?.landing) {
    return {
      title: 'Page not found',
    };
  }

  return generateSeoMetadata({
    seo: result.data.landing.seo,
  });
}

export default async function Page() {
  const result = await fetchLandingPage();

  if (!result?.data?.landing) {
    return notFound();
  }

  const subscriptionPlans = await fetchSubscriptionPlansWithCurrent();

  return (
    <LandingPageClient
      query={result.query}
      variables={result.variables}
      data={result.data}
      subscriptionPlans={subscriptionPlans}
    />
  );
}

import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { LandingPageSections } from '@/components/LandingPageSections';
import { fetchLandingPage } from '@/services/landing';
import { fetchSubscriptionPlansWithCurrent } from '@/services/subscription';
import { generateSeoMetadata } from '@/utils';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLandingPage();

  if (!page) {
    return {
      title: 'Page not found',
    };
  }

  return generateSeoMetadata({
    seo: page.seo,
  });
}

export default async function Page() {
  const page = await fetchLandingPage();

  if (!page) {
    return notFound();
  }

  const { isEnabled: isPreview } = await draftMode();

  if (isPreview) {
    return <h1>Preview Mode</h1>;
  }

  const subscriptionPlans = await fetchSubscriptionPlansWithCurrent();
  const sections = page.sections || [];

  return (
    <LandingPageSections
      sections={sections}
      subscriptionPlans={subscriptionPlans}
    />
  );
}

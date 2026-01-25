import { Metadata } from 'next';

import { ChangelogOverview } from '@/components/Changelog';
import { SITE } from '@/config';
import { AppRoute } from '@/constants/routes';
import { fetchChangelog } from '@/services/changelog';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'View the demo changelog with placeholder feature updates, improvements, and sample release notes.',
  keywords: ['changelog', 'updates', 'releases', 'demo', 'starter template'],
  openGraph: {
    title: `Changelog | ${SITE.name}`,
    description:
      'View the demo changelog with placeholder feature updates, improvements, and sample release notes.',
    url: AppRoute.ChangelogPage,
    siteName: SITE.name,
    type: 'website',
    images: [
      {
        url: '/1280x640.webp',
        width: 1280,
        height: 640,
        alt: 'Demo changelog and updates',
        type: 'image/webp',
      },
    ],
  },
};

export default async function Page() {
  const changelog = await fetchChangelog();

  return <ChangelogOverview entries={changelog} />;
}

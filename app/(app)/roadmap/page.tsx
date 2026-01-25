import { Metadata } from 'next';

import { RoadmapOverview } from '@/components/Roadmap';
import { SITE } from '@/config';
import { AppRoute } from '@/constants/routes';
import { fetchRoadmap } from '@/services/roadmap';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Preview the demo roadmap with placeholder features that are planned, in progress, or released.',
  keywords: [
    'roadmap',
    'features',
    'release plan',
    'product planning',
    'demo',
    'starter template',
  ],
  openGraph: {
    title: `Roadmap | ${SITE.name}`,
    description:
      'Preview the demo roadmap with placeholder features that are planned, in progress, or released.',
    url: AppRoute.RoadmapPage,
    siteName: SITE.name,
    type: 'website',
    images: [
      {
        url: '/1280x640.webp',
        width: 1280,
        height: 640,
        alt: 'Demo roadmap and feature planning',
        type: 'image/webp',
      },
    ],
  },
};

export default async function Page() {
  const roadmap = await fetchRoadmap();

  return <RoadmapOverview groupedEntries={roadmap} />;
}

export const dynamic = 'force-dynamic';

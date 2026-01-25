import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';

import { DashboardCard } from '@/components/DashboardCard';
import { Button } from '@/components/ui/Button';
import { DashboardRoute } from '@/constants/routes';
import { FlowCanvasIcon } from '@/icons';

export const metadata: Metadata = {
  title: 'Playground',
  description:
    'Explore the playground tools including Flow Canvas and Branding Generator to prototype your SaaS ideas.',
};

export default function Page() {
  return (
    <div className="flex flex-wrap justify-center gap-10 md:justify-start">
      <DashboardCard>
        <DashboardCard.Header>Flow Canvas</DashboardCard.Header>
        <DashboardCard.Content className="flex flex-col items-center gap-4">
          <div>
            <FlowCanvasIcon className="size-40" />
          </div>
          <span className="text-secondary-dark dark:text-neutral text-center text-sm">
            Build visual logic flows with smart, drag-and-drop components
          </span>
        </DashboardCard.Content>
        <DashboardCard.Footer>
          <Link href={DashboardRoute.FlowCanvasPage} passHref>
            <Button variant="outline">Go to Flow Canvas</Button>
          </Link>
        </DashboardCard.Footer>
      </DashboardCard>
    </div>
  );
}

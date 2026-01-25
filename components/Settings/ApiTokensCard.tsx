import Link from 'next/link';
import * as React from 'react';

import { DashboardCard } from '@/components/DashboardCard';
import { Button } from '@/components/ui/Button';
import { DashboardRoute } from '@/constants/routes';
import { ApiTokenIcon } from '@/icons';

type ApiTokensCardProps = {
  currentTokenCount: number;
  maxApiTokens?: number | null;
};

export const ApiTokensCard: React.FC<ApiTokensCardProps> = ({
  currentTokenCount,
  maxApiTokens,
}) => (
  <DashboardCard>
    <DashboardCard.Header>API Tokens</DashboardCard.Header>
    <DashboardCard.Content className="flex flex-col items-center gap-4">
      <div>
        <ApiTokenIcon className="size-[160px]" />
      </div>
      <span className="text-secondary-dark dark:text-neutral text-sm">
        {`${currentTokenCount} / ${maxApiTokens ?? '∞'}`}
      </span>
    </DashboardCard.Content>
    <DashboardCard.Footer>
      <Link href={DashboardRoute.APIPage} passHref>
        <Button variant="outline">Go to API</Button>
      </Link>
    </DashboardCard.Footer>
  </DashboardCard>
);

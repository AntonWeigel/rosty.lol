import Link from 'next/link';
import * as React from 'react';

import { DashboardCard } from '@/components/DashboardCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { DashboardRoute } from '@/constants/routes';
import { UserProfile } from '@/types';
import { generateAvatarFallback } from '@/utils';

type AccountCardProps = {
  userProfile: UserProfile | null;
};

export const AccountCard: React.FC<AccountCardProps> = ({ userProfile }) => (
  <DashboardCard>
    <DashboardCard.Header>Account</DashboardCard.Header>
    <DashboardCard.Content className="flex flex-col items-center gap-4">
      <Avatar className="size-[160px] rounded-full">
        <AvatarImage
          src={userProfile?.avatar}
          alt={userProfile?.name || 'User avatar'}
        />
        <AvatarFallback className="text-4xl">
          {generateAvatarFallback(userProfile?.name)}
        </AvatarFallback>
      </Avatar>
      <span className="text-secondary-dark dark:text-neutral text-sm">
        {userProfile?.name || 'Your Name'}
      </span>
    </DashboardCard.Content>
    <DashboardCard.Footer>
      <Link href={DashboardRoute.AccountPage} passHref>
        <Button variant="outline">Go to Account</Button>
      </Link>
    </DashboardCard.Footer>
  </DashboardCard>
);

'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/Sidebar';
import { DashboardSidebarData } from '@/types';

import { NavPlatform } from './NavPlatform';
import { NavResources } from './NavResources';
import { NavUser } from './NavUser';
import { PlanSwitcher } from './PlanSwitcher';
import { useDashboardSidebar } from './useDashboardSidebar';

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  initialData: DashboardSidebarData;
};

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  initialData,
  ...props
}) => {
  const { userProfile, subscriptionPlans, currentPlan, platform, resources } =
    useDashboardSidebar(initialData);

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        {currentPlan && (
          <PlanSwitcher plans={subscriptionPlans} currentPlan={currentPlan} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavPlatform items={platform} />
        <NavResources items={resources} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userProfile={userProfile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

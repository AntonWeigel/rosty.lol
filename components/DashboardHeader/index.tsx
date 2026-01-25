'use client';

import { Bell, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import * as React from 'react';

import { DashboardBreadcrumbs } from '@/components/DashboardBreadcrumbs';
import { useBreadcrumbs } from '@/components/DashboardHeader/useBreadcrumbs';
import { Separator } from '@/components/ui/Separator';
import { SidebarTrigger, useSidebar } from '@/components/ui/Sidebar';
import { Project } from '@/types';

type DashboardHeaderProps = {
  projects: Project[];
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  projects,
}) => {
  const breadcrumbs = useBreadcrumbs({ projects });
  const { state } = useSidebar();

  return (
    <header className="bg-secondary-light dark:bg-primary-dark sticky top-2 z-50 flex shrink-0 items-center rounded-xl shadow-md transition-[width,height] ease-linear">
      <div className="flex w-full justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1">
            {state === 'expanded' ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeftOpen className="size-4" />
            )}
          </SidebarTrigger>
          <Separator orientation="vertical" className="mr-2 -ml-1 h-4" />
          <DashboardBreadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="h-4" />
          <button className="hover:bg-highlight/10 hover:text-highlight dark:hover:bg-highlight/10 dark:hover:text-highlight rounded-md p-2">
            <Bell className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

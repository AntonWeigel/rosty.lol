import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import * as React from 'react';

import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar';
import { SITE } from '@/config';
import { SidebarId } from '@/constants/enums';
import { fetchDashboardLayoutData } from '@/services/dashboard';
import { getSidebarCookieNameById } from '@/utils';

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description:
    'Access your personalized settings, manage data, and view insights all in one place.',
  robots: { index: false, follow: false },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const { userProfile, subscriptionPlans, projects, currentPlan } =
    await fetchDashboardLayoutData();
  const defaultOpen =
    cookieStore.get(getSidebarCookieNameById(SidebarId.Dashboard))?.value ===
    'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen} id={SidebarId.Dashboard}>
      <DashboardSidebar
        initialData={{
          userProfile,
          subscriptionPlans,
          projects,
          currentPlan,
        }}
      />
      <SidebarInset className="px-4 pt-2 pb-8 md:p-0">
        <DashboardHeader projects={projects} />
        <div className="mt-8 flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

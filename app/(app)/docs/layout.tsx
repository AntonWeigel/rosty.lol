import { cookies } from 'next/headers';
import * as React from 'react';

import { DocsSidebar } from '@/components/DocsSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { SidebarId } from '@/constants/enums';
import { DocsIcon } from '@/icons';
import { DocsSearchProvider } from '@/layout';
import { fetchAndStructureDocs, fetchDocSearchIndex } from '@/services/doc';
import { cn, getSidebarCookieNameById } from '@/utils';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const navItems = await fetchAndStructureDocs();
  const indexData = await fetchDocSearchIndex();
  const defaultOpen =
    cookieStore.get(getSidebarCookieNameById(SidebarId.Docs))?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen} id={SidebarId.Docs}>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-screen-md flex-col items-center">
          {children}
        </div>

        <DocsSearchProvider indexData={indexData}>
          <DocsSidebar items={navItems} />
        </DocsSearchProvider>

        <SidebarTrigger
          className={cn(
            'fixed right-4 bottom-4 z-50 rounded-2xl p-3 shadow-md md:right-8 md:bottom-8 md:shadow-none md:peer-data-[state=collapsed]:shadow-md',
            'hover:bg-secondary-light hover:text-primary-dark dark:bg-primary-dark dark:text-neutral dark:hover:bg-primary-dark dark:hover:text-primary-light',
          )}
        >
          <DocsIcon className="size-8" />
        </SidebarTrigger>
      </div>
    </SidebarProvider>
  );
}

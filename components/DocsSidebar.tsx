'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { DocsSearchDialog } from '@/components/DocsSearchDialog';
import { SidebarCollapsibleItem } from '@/components/SidebarCollapsibleItem';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from '@/components/ui/Sidebar';
import { NavItem } from '@/types';

type DocSidebarProps = Omit<
  React.ComponentProps<typeof Sidebar>,
  'side' | 'variant'
> & { items: NavItem[] };

export function DocsSidebar({ items, ...props }: DocSidebarProps) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  const rootNavItems = React.useMemo(
    () => items.filter((item) => item.root),
    [items],
  );

  return (
    <Sidebar side="right" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarGroup className="pt-4 pb-0">
          <SidebarGroupContent>
            <DocsSearchDialog links={rootNavItems} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="mb-4 p-4 sm:mb-8">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarCollapsibleItem
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  activePath={pathname}
                  icon={item.icon}
                  items={item.items}
                  onLinkClick={handleLinkClick}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

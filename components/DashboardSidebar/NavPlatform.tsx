'use client';

import { Gem } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ProFeaturesDialog } from '@/components/ProFeaturesDialog';
import { SidebarCollapsibleItem } from '@/components/SidebarCollapsibleItem';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/Sidebar';
import { SidebarItem } from '@/types';

export const NavPlatform: React.FC<{ items: SidebarItem[] }> = ({ items }) => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarCollapsibleItem
            key={item.title}
            title={item.title}
            activePath={pathname}
            url={item.url}
            icon={item.icon}
            items={item.items}
            onLinkClick={handleLinkClick}
          />
        ))}

        <ProFeaturesDialog>
          <SidebarMenuButton tooltip="Pro Features" isActive={false} asChild>
            <button type="button">
              <Gem className="shrink-0" />
              <span>Pro features</span>
            </button>
          </SidebarMenuButton>
        </ProFeaturesDialog>
      </SidebarMenu>
    </SidebarGroup>
  );
};

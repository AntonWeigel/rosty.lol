'use client';

import Link from 'next/link';
import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { SidebarItem } from '@/types';

export const NavResources: React.FC<{ items: SidebarItem[] }> = ({ items }) => (
  <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Resources</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <LucideIconRenderer icon={item.icon} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroup>
);

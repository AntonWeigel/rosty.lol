'use client';

import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Computer,
  Languages,
  MoonStar,
  Palette,
  SunMedium,
  UserRoundCog,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { SignOutButton } from '@/components/SignOutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { DashboardRoute } from '@/constants/routes';
import { GermanyIcon, UnitedStatesIcon } from '@/icons/countries';
import { UserProfile } from '@/types';
import { generateAvatarFallback } from '@/utils';

export const NavUser: React.FC<{
  userProfile: UserProfile | null | undefined;
}> = ({ userProfile }) => {
  const { setTheme } = useTheme();
  const fallbackAvatar = generateAvatarFallback(userProfile?.name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-highlight/10 data-[state=open]:text-highlight dark:data-[state=open]:text-highlight"
            >
              <Avatar className="border-secondary-dark/50 hover:border-highlight/30 dark:border-neutral/50 size-8 rounded-full border">
                <AvatarImage
                  src={userProfile?.avatar}
                  alt={userProfile?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {fallbackAvatar}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left">
                <span className="truncate text-sm leading-tight font-semibold">
                  {userProfile?.name}
                </span>
                <span className="truncate text-xs leading-tight">
                  {userProfile?.email}
                </span>
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-primary-light/50 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl backdrop-blur-md"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="border-secondary-dark/50 dark:border-neutral/50 size-8 rounded-full border">
                  <AvatarImage
                    src={userProfile?.avatar}
                    alt={userProfile?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {fallbackAvatar}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left">
                  <span className="truncate text-sm leading-tight font-semibold">
                    {userProfile?.name}
                  </span>
                  <span className="truncate text-xs leading-tight">
                    {userProfile?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={DashboardRoute.AccountPage}>
                  <UserRoundCog />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Palette />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-primary-light/50 backdrop-blur-md">
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      <SunMedium />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      <MoonStar />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      <Computer />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Languages />
                  Language
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-primary-light/50 backdrop-blur-md">
                    <DropdownMenuItem>
                      <UnitedStatesIcon />
                      <span>English</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GermanyIcon />
                      <span>German</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

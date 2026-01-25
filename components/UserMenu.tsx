import { Airplay, UserIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { SignOutButton } from '@/components/SignOutButton';
import { ToggleButton } from '@/components/ToggleButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { AppRoute, DashboardRoute } from '@/constants/routes';
import { UserProfile } from '@/types';
import { cn, generateAvatarFallback } from '@/utils';

import { Button } from './ui/Button';

type UserMenuProps = {
  userProfile: UserProfile | null | undefined;
};

export const UserMenu: React.FC<UserMenuProps> = ({ userProfile }) => {
  if (!userProfile) {
    return (
      <>
        {/* Desktop */}
        <div className="hidden gap-4 md:flex">
          <Button asChild variant="outline">
            <Link href={AppRoute.SignInPage}>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href={AppRoute.SignUpPage}>Sign up</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ToggleButton icon={<UserIcon />} srText={'Open user menu'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="dark:bg-primary-dark/50 backdrop-blur-md"
              side="bottom"
            >
              <DropdownMenuItem asChild>
                <Link href={AppRoute.SignInPage}>Sign in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={AppRoute.SignUpPage}>Sign up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }

  const fallbackAvatar = generateAvatarFallback(userProfile.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'group dark:hover:text-highlight hover:text-highlight text-secondary-dark hover:bg-highlight/10 dark:text-primary-light rounded-lg p-1.5 transition-all',
            'dark:focus:ring-highlight/30',
          )}
        >
          <Avatar className="border-secondary-dark/50 group-hover:border-highlight/30 dark:border-neutral/50 size-8 rounded-full border">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback className="bg-secondary-light/50 dark:bg-primary-dark/50 rounded-lg">
              {fallbackAvatar}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="dark:bg-primary-dark/50 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl backdrop-blur-md"
        side="bottom"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="border-secondary-dark/50 dark:border-neutral/50 size-8 rounded-full border">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="rounded-lg">
                {fallbackAvatar}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left">
              <span className="truncate text-sm leading-tight font-semibold">
                {userProfile.name}
              </span>
              <span className="truncate text-xs leading-tight">
                {userProfile.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={DashboardRoute.OverviewPage}>
              <Airplay />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

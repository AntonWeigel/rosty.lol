'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { UserMenu } from '@/components/UserMenu';
import { AppRoute } from '@/constants/routes';
import { useClickOutside, useUserProfile } from '@/hooks';
import { Logo, ThemeToggle } from '@/layout';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/Button';
import { CoalIcon } from '@/icons';

type NavbarProps = {
  isAuthEnabled: boolean;
  initUserProfile: UserProfile | null;
};

export const Navbar: React.FC<NavbarProps> = ({
  isAuthEnabled,
  initUserProfile,
}) => {
  const activeRoute = usePathname();
  const { userProfile } = useUserProfile(initUserProfile);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement | null>(null);

  useClickOutside(navRef, () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 container flex flex-wrap items-center justify-between py-3">
      <nav
        aria-label="Main navigation"
        className="dark:bg-primary-dark/80 bg-secondary-light/80 relative flex items-center rounded-full px-3 py-1 shadow backdrop-blur-md"
      >
        <Link
          href={AppRoute.HomePage}
          aria-label="Go to the homepage"
          onClick={closeMobileMenu}
          className="rounded-full p-2"
        >
          <Logo />
        </Link>
        <ThemeToggle />
      </nav>

      <nav
        aria-label="User navigation"
        className="dark:bg-primary-dark/80 bg-secondary-light/80 relative flex items-center gap-1 rounded-full px-3 py-1 shadow backdrop-blur-md"
      >
        {isAuthEnabled ? (
          <>
            <UserMenu userProfile={userProfile} />
            <div className="flex p-1">
              <div className="bg-fire relative flex size-8 items-center justify-center rounded-full">
                <CoalIcon className="size-6" />
                <span className="text-primary-light absolute text-xs font-medium">
                  0
                </span>
              </div>
            </div>
          </>
        ) : (
          <Button size="icon">+</Button>
        )}
      </nav>
    </header>
  );
};

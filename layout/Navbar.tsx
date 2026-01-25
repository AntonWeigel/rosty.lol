'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { UserMenu } from '@/components/UserMenu';
import { AppRoute } from '@/constants/routes';
import { useClickOutside, useUserProfile } from '@/hooks';
import {
  Logo,
  LogoText,
  MenuButton,
  NavigationMenu,
  ThemeToggle,
} from '@/layout';
import { UserProfile } from '@/types';

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
    <header className="bg-primary-light/80 dark:bg-secondary-dark/80 fixed inset-x-0 top-0 z-40 flex w-full flex-wrap py-3 shadow-sm backdrop-blur-md sm:flex-nowrap sm:justify-start">
      <nav
        ref={navRef}
        className="relative mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between"
      >
        <div className="flex w-full items-center justify-between sm:w-auto">
          <Link
            href={AppRoute.HomePage}
            aria-label="Go to the homepage"
            onClick={closeMobileMenu}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-hidden"
          >
            <div className="sm:hidden">
              <Logo />
            </div>

            <div className="hidden sm:block">
              <LogoText />
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:hidden">
            {isAuthEnabled && <UserMenu userProfile={userProfile} />}
            <ThemeToggle />
            <MenuButton
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              aria-controls="navbar"
            />
          </div>
        </div>

        <NavigationMenu
          isOpen={isMobileMenuOpen}
          onLinkClickAction={closeMobileMenu}
          activeRoute={activeRoute}
        />

        <div className="hidden gap-4 sm:ml-auto sm:flex sm:items-center">
          {isAuthEnabled && <UserMenu userProfile={userProfile} />}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

'use client';

import Link from 'next/link';
import * as React from 'react';

import { SITE } from '@/config';
import { cn, isActive } from '@/utils';

type MobileNavigationMenuProps = {
  isOpen: boolean;
  onLinkClickAction: () => void;
  activeRoute: string;
};

export const NavigationMenu: React.FC<MobileNavigationMenuProps> = ({
  isOpen,
  onLinkClickAction,
  activeRoute,
}) => {
  return (
    <div
      id="navbar"
      className={cn(
        'hs-collapse static grow basis-full overflow-hidden transition-[height] duration-300 sm:block',
        'lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2',
        isOpen ? 'h-[156px]' : 'h-[0px]',
        'sm:h-auto sm:overflow-visible',
      )}
    >
      <div className="mt-5 flex flex-col items-center gap-2 font-medium sm:mt-0 sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:px-8">
        {SITE.navigation.map(({ label, href }) => {
          const active = isActive(href, activeRoute);

          return (
            <Link
              key={label}
              href={href}
              onClick={onLinkClickAction}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'w-[96%] rounded-xl px-8 py-2 text-center sm:w-fit sm:px-6',
                'text-secondary-dark hover:bg-highlight/10 hover:text-highlight',
                'dark:text-primary-light dark:hover:bg-highlight/10 dark:hover:text-highlight',
                'dark:hover:bg-highlight/10 transition-all',
                active
                  ? 'text-highlight dark:text-highlight'
                  : 'text-secondary-dark hover:text-highlight/60 dark:text-primary-light hover:bg-highlight/10 dark:hover:bg-highlight/10',
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

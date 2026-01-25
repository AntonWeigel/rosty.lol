import Link from 'next/link';
import * as React from 'react';

import { AppRouteValue } from '@/constants/routes';
import { cn, isActive } from '@/utils';

type FooterMenuProps = {
  title: string;
  activeRoute: string;
  items: readonly { label: string; href: AppRouteValue }[];
};

export const FooterMenu: React.FC<FooterMenuProps> = ({
  title,
  activeRoute,
  items,
}) => (
  <div className="flex flex-col gap-4">
    <h5 className="text-secondary-dark dark:text-neutral text-sm font-bold tracking-widest uppercase">
      {title}
    </h5>
    <ul className="space-y-1">
      {items.map(({ label, href }) => {
        const active = isActive(href, activeRoute);

        return (
          <li key={label}>
            <Link
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'hover:text-highlight dark:hover:text-highlight text-sm font-medium focus:outline-hidden',
                active
                  ? 'text-highlight dark:text-highlight'
                  : 'text-secondary-dark dark:text-secondary-light',
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

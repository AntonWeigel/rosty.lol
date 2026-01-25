import Link from 'next/link';
import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import {
  LandingSectionsFeatureTabsTabsContentLinks,
  Maybe,
} from '@/tina/__generated__/types';

type Props = {
  links: Maybe<LandingSectionsFeatureTabsTabsContentLinks>[];
};

export const FooterLinks: React.FC<Props> = ({ links }) => {
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-normal">
      {links
        .filter(
          (link): link is LandingSectionsFeatureTabsTabsContentLinks => !!link,
        )
        .map((link, idx) => (
          <Link
            key={idx}
            href={link.url}
            className="text-secondary-dark hover:text-highlight dark:text-neutral dark:hover:text-highlight flex items-center gap-1 text-sm underline transition-colors"
          >
            <LucideIconRenderer icon={link.icon} className="size-3.5" />
            {link.label}
          </Link>
        ))}
    </div>
  );
};

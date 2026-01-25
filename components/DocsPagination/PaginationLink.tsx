import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { FlatNavItem } from '@/types';
import { cn } from '@/utils';

type PaginationLinkProps = {
  item: FlatNavItem;
  direction: 'prev' | 'next';
};

export const PaginationLink: React.FC<PaginationLinkProps> = ({
  item,
  direction,
}) => {
  const isPrev = direction === 'prev';
  const alignment = isPrev ? 'items-start text-left' : 'items-end text-right';
  const icon = isPrev ? (
    <ChevronLeft className="size-3" />
  ) : (
    <ChevronRight className="size-3" />
  );
  const label = isPrev ? 'Previous' : 'Next';

  return (
    <Link
      href={item.url}
      className={cn(
        'flex w-1/2 flex-col gap-1.5 rounded-xl px-4 py-3 shadow-xs transition',
        'hover:bg-secondary-light/70 dark:bg-primary-dark dark:hover:bg-primary-dark/70 bg-secondary-light',
        alignment,
      )}
    >
      <span className="text-secondary-dark dark:text-neutral flex items-center gap-1 text-[10px] font-semibold uppercase">
        {isPrev && icon}
        {label}
        {!isPrev && icon}
      </span>
      <span className="text-primary-dark dark:text-primary-light text-sm font-medium">
        {item.title}
      </span>
    </Link>
  );
};

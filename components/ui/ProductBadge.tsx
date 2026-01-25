import * as React from 'react';

import { cn } from '@/utils';

interface ProductBadgeProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'bg-primary-light/50 hover:bg-primary-light/70 dark:bg-secondary-dark/50 dark:hover:bg-secondary-dark/80 flex w-fit items-center justify-center gap-1 rounded-3xl px-6 py-3 transition-colors',
        className,
      )}
    >
      {children}
    </a>
  );
};

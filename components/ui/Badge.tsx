import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-light transition-colors focus:outline-hidden focus:ring-2 focus:ring-highlight/30 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-neutral px-3 text-primary-dark',
        version:
          'border border-secondary-dark/50 bg-secondary-light text-primary-dark shadow-sm dark:border-neutral/50 dark:bg-primary-dark dark:text-primary-light',
        tag: 'bg-accent px-3 text-primary-light',
        highlight: 'bg-highlight text-xs font-semibold text-primary-dark',
        status: 'px-4 font-bold text-primary-light dark:text-primary-dark',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, badgeVariants };

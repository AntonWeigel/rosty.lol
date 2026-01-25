import * as React from 'react';

import { cn } from '@/utils';

const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'dark:bg-primary-dark/50 bg-secondary-light/50 animate-pulse rounded-lg',
      className,
    )}
    {...props}
  />
);

export { Skeleton };

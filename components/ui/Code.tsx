import * as React from 'react';

import { cn } from '@/utils';

export const Code: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => (
  <code
    {...props}
    className={cn(
      'bg-secondary-light text-accent dark:bg-primary-dark max-w-fit rounded-md px-2 py-1 text-sm',
      className,
    )}
  >
    {children}
  </code>
);

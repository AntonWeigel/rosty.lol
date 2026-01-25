import * as React from 'react';

import { cn } from '@/utils';

export const BaseNode = ({
  className,
  selected,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }) => (
  <div
    className={cn(
      'border-secondary-dark/20 dark:border-secondary-light/20 dark:bg-primary-dark bg-secondary-light relative flex w-32 flex-col gap-2 rounded-md border p-2 font-mono shadow-md',
      className,
      selected ? 'border-highlight shadow-lg' : '',
      'ring-highlight/50 hover:ring-1',
    )}
    tabIndex={0}
    {...props}
  />
);

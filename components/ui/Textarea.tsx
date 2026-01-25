import * as React from 'react';

import { cn } from '@/utils';

const Textarea = ({
  className,
  ...props
}: React.ComponentProps<'textarea'>) => (
  <textarea
    className={cn(
      'flex min-h-[60px] w-full rounded-xl border px-4 py-2 text-sm focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      'border-secondary-dark/20 dark:border-secondary-light/20 bg-primary-light/50 dark:bg-secondary-dark/50 dark:placeholder:text-neutral placeholder:text-primary-dark/50',
      'focus:ring-highlight/30 dark:focus:ring-highlight/30 focus:ring-2 focus:outline-hidden',
      className,
    )}
    {...props}
  />
);

export { Textarea };

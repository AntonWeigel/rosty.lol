'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/utils';

const Switch = ({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer focus-visible:ring-highlight/30 focus-visible:ring-offset-primary-light dark:focus-visible:ring-offset-secondary-dark data-[state=checked]:bg-primary-dark data-[state=unchecked]:bg-primary-dark/50 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'bg-primary-light pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
);

export { Switch };

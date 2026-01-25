'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-highlight/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'hover:bg-highlight/10 hover:text-highlight data-[state=on]:text-highlight',
        outline:
          'rounded-xl border border-secondary-dark/20 bg-primary-light/50 text-secondary-dark/70 hover:bg-secondary-dark/20 data-[state=on]:bg-secondary-dark/20 data-[state=on]:text-primary-dark dark:border-secondary-light/20 dark:bg-secondary-dark/50 dark:text-neutral dark:hover:bg-secondary-light/20 dark:data-[state=on]:bg-secondary-light/20 dark:data-[state=on]:text-primary-light',
        menu: cn(
          'flex min-w-0 w-full text-sm justify-start rounded-none -translate-x-px rounded-r-md overflow-hidden text-left outline-hidden',
          'border-l border-secondary-dark/50 dark:border-neutral/50',
          'text-secondary-dark/50 dark:text-neutral',
          'hover:bg-highlight/10 hover:text-highlight dark:hover:text-highlight',
          'hover:border-highlight dark:hover:border-highlight',
          'data-[state=on]:border-primary-dark data-[state=on]:text-primary-dark data-[state=on]:font-medium',
          'dark:data-[state=on]:border-primary-light dark:data-[state=on]:text-primary-light',
          '[&>span:last-child]:truncate',
        ),
      },
      size: {
        default: 'h-10 min-w-10 px-2',
        sm: 'h-7 p-4',
        md: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) => (
  <TogglePrimitive.Root
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
);

export { Toggle, toggleVariants };

'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/utils';

const Slider = ({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) => (
  <SliderPrimitive.Root
    className={cn(
      'relative flex w-full touch-none items-center select-none',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-secondary-dark/20 dark:bg-neutral/50 relative h-1.5 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-highlight absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        'block size-4 rounded-full border shadow-sm transition-colors disabled:pointer-events-none disabled:opacity-50',
        'border-highlight bg-primary-light focus-visible:ring-highlight/30 dark:bg-primary-light focus-visible:ring-1 focus-visible:outline-hidden',
      )}
    />
  </SliderPrimitive.Root>
);

export { Slider };

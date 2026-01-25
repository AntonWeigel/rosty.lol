import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { BillingCycle } from '@/constants/enums';
import { cn } from '@/utils';

const toggleItemVariants = cva(
  'rounded-full px-3 py-1 text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'text-secondary-dark dark:text-neutral',
        secondary: 'text-secondary-dark dark:text-neutral',
      },
      selected: {
        true: 'shadow-xs',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        selected: true,
        className:
          'bg-primary-light text-primary-dark dark:bg-secondary-dark dark:text-primary-light',
      },
      {
        variant: 'primary',
        selected: false,
        className: 'hover:bg-primary-light/20 dark:hover:bg-secondary-dark/30',
      },
      {
        variant: 'secondary',
        selected: true,
        className:
          'bg-secondary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light',
      },
      {
        variant: 'secondary',
        selected: false,
        className:
          'hover:bg-secondary-light/20 dark:hover:bg-secondary-dark/30',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      selected: false,
    },
  },
);

type BillingCycleToggleItemProps = {
  value: BillingCycle;
  children: React.ReactNode;
} & VariantProps<typeof toggleItemVariants>;

export const BillingCycleToggleItem: React.FC<BillingCycleToggleItemProps> = ({
  value,
  selected,
  variant,
  children,
}) => (
  <ToggleGroupPrimitive.Item
    value={value}
    className={cn(toggleItemVariants({ selected, variant }))}
  >
    {children}
  </ToggleGroupPrimitive.Item>
);

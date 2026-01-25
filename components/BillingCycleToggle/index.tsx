import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { BillingCycle } from '@/constants/enums';
import { cn } from '@/utils';

import { BillingCycleToggleItem } from './BillingCycleToggleItem';

const toggleVariants = cva(
  'inline-flex w-fit items-center justify-center rounded-full p-1 shadow-xs',
  {
    variants: {
      variant: {
        primary: 'bg-secondary-light dark:bg-primary-dark',
        secondary: 'bg-primary-light dark:bg-secondary-dark',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type BillingCycleToggleProps = {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
} & VariantProps<typeof toggleVariants>;

export const BillingCycleToggle: React.FC<BillingCycleToggleProps> = ({
  value,
  onChange,
  variant,
}) => (
  <ToggleGroupPrimitive.Root
    type="single"
    value={value}
    onValueChange={(value) => {
      if (!value) return;
      onChange(value as BillingCycle);
    }}
    className={cn(toggleVariants({ variant }))}
  >
    <BillingCycleToggleItem
      value={BillingCycle.Monthly}
      selected={value === BillingCycle.Monthly}
      variant={variant}
    >
      Monthly
    </BillingCycleToggleItem>
    <BillingCycleToggleItem
      value={BillingCycle.Yearly}
      selected={value === BillingCycle.Yearly}
      variant={variant}
    >
      Annual
    </BillingCycleToggleItem>
  </ToggleGroupPrimitive.Root>
);

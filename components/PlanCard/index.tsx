import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { List } from '@/components/List';
import { Badge } from '@/components/ui/Badge';
import { SubscriptionPlanBenefit } from '@/types';
import { cn, getSlot } from '@/utils';

import { PlanCardCheckoutNote } from './PlanCardCheckoutNote';
import { PlanCardPrimaryButton } from './PlanCardPrimaryButton';
import { PlanCardSecondaryButton } from './PlanCardSecondaryButton';

const planCardVariants = cva(
  'relative flex max-w-[360px] flex-col items-center justify-between gap-8 rounded-2xl p-8 shadow-lg',
  {
    variants: {
      variant: {
        primary: 'bg-secondary-light dark:bg-primary-dark',
        secondary: 'bg-primary-light dark:bg-secondary-dark',
      },
      highlighted: {
        true: 'border-2 border-highlight',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      highlighted: false,
    },
  },
);

type PlanCardProps = {
  name: string;
  price: number;
  billingCycle: string;
  benefits: SubscriptionPlanBenefit[];
  badgeLabel?: string;
  children?: React.ReactNode;
} & VariantProps<typeof planCardVariants>;

export const PlanCard: React.FC<PlanCardProps> & {
  PrimaryButton: typeof PlanCardPrimaryButton;
  SecondaryButton: typeof PlanCardSecondaryButton;
  CheckoutNote: typeof PlanCardCheckoutNote;
} = ({
  name,
  price,
  billingCycle,
  benefits,
  badgeLabel,
  children,
  variant,
}) => {
  const PrimaryButtonSlot = getSlot(children, PlanCard.PrimaryButton);
  const SecondaryButtonSlot = getSlot(children, PlanCard.SecondaryButton);
  const CheckoutNoteSlot = getSlot(children, PlanCard.CheckoutNote);

  return (
    <div
      className={cn(
        planCardVariants({
          variant,
          highlighted: Boolean(badgeLabel),
        }),
      )}
    >
      {badgeLabel && (
        <Badge
          variant="highlight"
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          {badgeLabel}
        </Badge>
      )}

      <div className="flex w-full flex-col gap-4">
        <h3 className="text-primary-dark dark:text-primary-light w-full text-xl font-bold tracking-wide capitalize">
          {name}
        </h3>
        <div className="flex w-full items-center gap-2">
          <div className="flex gap-1">
            <span className="text-secondary-dark dark:text-neutral mt-1 text-3xl font-semibold">
              $
            </span>
            <span className="text-primary-dark dark:text-primary-light text-5xl font-bold">
              {price}
            </span>
          </div>

          <div className="text-secondary-dark dark:text-neutral mt-2 flex flex-col">
            <span className="leading-none font-medium uppercase">usd/</span>
            <span className="leading-none font-medium">{billingCycle}</span>
          </div>
        </div>
      </div>

      <List>
        {benefits.map((benefit, index) => (
          <List.Item key={index} type={benefit.type}>
            {benefit.text}
          </List.Item>
        ))}
      </List>

      <div className="flex w-full flex-col items-center justify-center gap-3">
        {PrimaryButtonSlot}
        <div className="flex h-7 items-center justify-center">
          {SecondaryButtonSlot ?? CheckoutNoteSlot}
        </div>
      </div>
    </div>
  );
};

PlanCard.PrimaryButton = PlanCardPrimaryButton;
PlanCard.SecondaryButton = PlanCardSecondaryButton;
PlanCard.CheckoutNote = PlanCardCheckoutNote;

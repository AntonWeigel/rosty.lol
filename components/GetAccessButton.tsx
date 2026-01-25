import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import {
  TransitionButton,
  TransitionButtonProps,
} from '@/components/TransitionButton';
import { LogoIcon } from '@/icons/logo';
import {
  LandingSectionsCtaCtaButtonBuyLabel,
  LandingSectionsCtaCtaButtonSubscriptionLabel,
  LandingSectionsCtaCtaButtonWaitlistLabel,
  LandingSectionsHeroCtaButtonBuyLabel,
  LandingSectionsHeroCtaButtonSubscriptionLabel,
  LandingSectionsHeroCtaButtonWaitlistLabel,
  LandingSectionsProductProductsCheckoutButtonBuyLabel,
  LandingSectionsProductProductsCheckoutButtonSubscriptionLabel,
  LandingSectionsProductProductsCheckoutButtonWaitlistLabel,
} from '@/tina/__generated__/types';

type ButtonLabel =
  | LandingSectionsHeroCtaButtonSubscriptionLabel
  | LandingSectionsCtaCtaButtonSubscriptionLabel
  | LandingSectionsProductProductsCheckoutButtonSubscriptionLabel
  | LandingSectionsHeroCtaButtonBuyLabel
  | LandingSectionsCtaCtaButtonBuyLabel
  | LandingSectionsProductProductsCheckoutButtonBuyLabel
  | LandingSectionsHeroCtaButtonWaitlistLabel
  | LandingSectionsCtaCtaButtonWaitlistLabel
  | LandingSectionsProductProductsCheckoutButtonWaitlistLabel;

type GetAccessButtonProps = Omit<
  TransitionButtonProps,
  'icon' | 'pendingText' | 'children'
> & {
  label: ButtonLabel;
};

export const GetAccessButton: React.FC<GetAccessButtonProps> = ({
  label,
  ...props
}) => (
  <TransitionButton
    size="lg"
    {...props}
    pendingText="Checking out…"
    icon={
      label.icon ? (
        <LucideIconRenderer icon={label.icon} className="size-4" />
      ) : (
        <LogoIcon />
      )
    }
  >
    {label.text}
  </TransitionButton>
);

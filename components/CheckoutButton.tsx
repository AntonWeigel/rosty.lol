'use client';

import * as React from 'react';

import {
  BuyButtonTemplate,
  SubscriptionButtonTemplate,
  WaitlistButtonTemplate,
} from '@/components/ButtonTemplates';
import { LandingSectionsProductProductsCheckoutButton } from '@/tina/__generated__/types';

type CheckoutButtonProps = {
  data?: (LandingSectionsProductProductsCheckoutButton | null)[] | null;
};

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ data }) => {
  const first = Array.isArray(data) ? data[0] : data;

  if (!first?.__typename) return null;

  switch (first.__typename) {
    case 'LandingSectionsProductProductsCheckoutButtonBuy':
      return <BuyButtonTemplate {...first} />;
    case 'LandingSectionsProductProductsCheckoutButtonSubscription':
      return <SubscriptionButtonTemplate {...first} />;
    case 'LandingSectionsProductProductsCheckoutButtonWaitlist':
      return <WaitlistButtonTemplate {...first} />;
    default:
      return null;
  }
};

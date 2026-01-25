'use client';

import * as React from 'react';

import { createSubscriptionAction } from '@/app/actions';
import { GetAccessButton } from '@/components/GetAccessButton';
import { useToast } from '@/hooks';
import {
  LandingSectionsCtaCtaButtonSubscription,
  LandingSectionsHeroCtaButtonSubscription,
  LandingSectionsProductProductsCheckoutButtonSubscription,
} from '@/tina/__generated__/types';

type SubscriptionButtonTemplateProps =
  | LandingSectionsHeroCtaButtonSubscription
  | LandingSectionsCtaCtaButtonSubscription
  | LandingSectionsProductProductsCheckoutButtonSubscription;

export const SubscriptionButtonTemplate: React.FC<
  SubscriptionButtonTemplateProps
> = ({ label, productId }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.set('product_id', productId);

    const result = await createSubscriptionAction(formData);

    if (!result.success) {
      toast({
        title: 'Checkout Failed',
        description: result.error || 'Unable to start checkout session.',
        variant: 'destructive',
      });
      return;
    }

    if (result.data?.redirectUrl) {
      window.location.href = result.data.redirectUrl;
    } else {
      setIsLoading(false);
    }
  };

  return (
    <GetAccessButton
      onClick={handleCheckout}
      isPending={isLoading}
      label={label}
    />
  );
};

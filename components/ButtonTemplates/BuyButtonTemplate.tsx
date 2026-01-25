'use client';

import * as React from 'react';

import { startCheckoutAction } from '@/app/actions';
import { GetAccessButton } from '@/components/GetAccessButton';
import { useToast } from '@/hooks';
import {
  LandingSectionsCtaCtaButtonBuy,
  LandingSectionsHeroCtaButtonBuy,
  LandingSectionsProductProductsCheckoutButtonBuy,
} from '@/tina/__generated__/types';

type BuyButtonProps =
  | LandingSectionsHeroCtaButtonBuy
  | LandingSectionsCtaCtaButtonBuy
  | LandingSectionsProductProductsCheckoutButtonBuy;

export const BuyButtonTemplate: React.FC<BuyButtonProps> = ({
  label,
  productId,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.set('product_id', productId);

    const result = await startCheckoutAction(formData);

    if (!result.success) {
      toast({
        title: 'Checkout Failed',
        description: result.error || 'Unable to start checkout session.',
        variant: 'destructive',
      });
      setIsLoading(false);
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

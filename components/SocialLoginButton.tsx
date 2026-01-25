'use client';

import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { OAuthProvider } from '@/constants/enums';
import { SocialProvidersMap } from '@/constants/maps';

type SocialLoginButtonProps = {
  provider: OAuthProvider;
  action: (formData: FormData) => void | Promise<void>;
  productId?: string;
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  action,
  productId,
}) => {
  return (
    <form action={action}>
      <input type="hidden" name="provider" value={provider} />
      {productId && <input type="hidden" name="product_id" value={productId} />}

      <Button variant="icon" size="icon" type="submit">
        {SocialProvidersMap[provider]}
      </Button>
    </form>
  );
};

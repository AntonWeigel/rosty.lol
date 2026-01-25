'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { createSubscriptionAction } from '@/app/actions';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useToast } from '@/hooks';

export const SubscribeRedirector = () => {
  const searchParams = useSearchParams();
  const [hasRun, setHasRun] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const productId = searchParams.get('product_id');

    if (!productId || hasRun) return;
    setHasRun(true);
    setIsLoading(true);

    const formData = new FormData();
    formData.set('product_id', productId);

    const subscribe = async () => {
      const result = await createSubscriptionAction(formData);

      if (!result.success) {
        toast({
          title: 'Subscription failed',
          description: result.error || 'Could not start checkout session.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      if (result.data?.redirectUrl) {
        window.location.href = result.data.redirectUrl;
      }
    };

    subscribe();
  }, [searchParams, hasRun, toast]);

  return isLoading ? <LoadingOverlay text="Starting checkout…" /> : null;
};

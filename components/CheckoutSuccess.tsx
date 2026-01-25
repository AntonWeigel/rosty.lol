'use client';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { AppRoute } from '@/constants/routes';
import { CheckoutSuccessData } from '@/types';
import { cn } from '@/utils';

type CheckoutSuccessProps = {
  data: CheckoutSuccessData;
};

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ data }) => (
  <div
    className={cn(
      'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 px-4 backdrop-blur-xs',
    )}
  >
    <Fireworks autorun={{ speed: 3, duration: 1500 }} />

    <div className="bg-secondary-light dark:bg-primary-dark mx-auto flex max-w-md flex-col items-center justify-center gap-6 rounded-2xl p-6 shadow-md">
      <div className="bg-success/10 mx-auto flex size-12 items-center justify-center rounded-full">
        <CheckIcon className="text-success size-6" />
      </div>

      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="text-primary-dark dark:text-primary-light m-0 text-xl font-semibold">
          Payment Successful 🎉
        </h1>

        <p className="m-0 font-medium">
          Thank you for your purchase, {data.customerName}!
        </p>
      </div>

      <Separator />

      <div className="text-secondary-dark dark:text-neutral flex w-full flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Order ID:</span>
          <span className="text-right font-mono text-xs font-medium">
            {data.id}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Amount:</span>
          <span>
            {(data.totalAmount / 100).toFixed(2)} {data.currency.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Email:</span>
          <span>{data.customerEmail}</span>
        </div>
      </div>

      <div className="space-y-4">
        {data.products.map((product, index) => (
          <div
            key={index}
            className="bg-primary-light/50 dark:bg-secondary-dark/50 flex flex-col items-center justify-center gap-2 rounded-xl p-4"
          >
            <h3 className="text-base font-medium">{product.name}</h3>
            {product.description && (
              <p className="text-sm">{product.description}</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-secondary-dark dark:text-neutral text-center text-sm">
        A confirmation email has been sent to {data.customerEmail}
      </p>

      <Separator />

      <Button asChild>
        <Link href={AppRoute.HomePage}>Continue</Link>
      </Button>
    </div>
  </div>
);

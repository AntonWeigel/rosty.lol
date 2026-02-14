import * as React from 'react';

import { BuiltWithAsaasin } from '@/components/BuiltWithAsaasin';
import {
  ApplePayIcon,
  MastercardIcon,
  PayPalIcon,
  VisaIcon,
} from '@/icons/payments';
import { Logo } from '@/layout';

export const FooterBrand: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 sm:items-start">
        <Logo />
        <span className="text-secondary-dark dark:text-neutral">
          Build your idea, not boilerplate
        </span>
        <div className="flex gap-2">
          <VisaIcon />
          <PayPalIcon />
          <MastercardIcon />
          <ApplePayIcon />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 text-xs sm:items-start">
        <span className="text-secondary-dark dark:text-neutral">
          Copyright © {currentYear} - All rights reserved
        </span>
        <div className="flex gap-2.5">
          <BuiltWithAsaasin />
        </div>
      </div>
    </div>
  );
};

'use client';

import * as React from 'react';

import { JoinWaitlistDialog } from '@/components/JoinWaitlistDialog';
import {
  LandingSectionsCtaCtaButtonWaitlist,
  LandingSectionsHeroCtaButtonWaitlist,
  LandingSectionsProductProductsCheckoutButtonWaitlist,
} from '@/tina/__generated__/types';

type CtaWaitlistButtonProps =
  | LandingSectionsHeroCtaButtonWaitlist
  | LandingSectionsCtaCtaButtonWaitlist
  | LandingSectionsProductProductsCheckoutButtonWaitlist;

export const WaitlistButtonTemplate: React.FC<CtaWaitlistButtonProps> = ({
  label,
}) => {
  return <JoinWaitlistDialog label={label} />;
};

'use client';

import * as React from 'react';

import {
  BuyButtonTemplate,
  LinkButtonTemplate,
  SubscriptionButtonTemplate,
  WaitlistButtonTemplate,
} from '@/components/ButtonTemplates';
import {
  LandingSectionsCtaCtaButton,
  LandingSectionsHeroCtaButton,
} from '@/tina/__generated__/types';

type CtaButtonProps = {
  data?:
    | (LandingSectionsHeroCtaButton | LandingSectionsCtaCtaButton | null)[]
    | null;
};

type ButtonVariant = LandingSectionsHeroCtaButton | LandingSectionsCtaCtaButton;

const renderCta = (btn: ButtonVariant) => {
  switch (btn.__typename) {
    case 'LandingSectionsHeroCtaButtonBuy':
    case 'LandingSectionsCtaCtaButtonBuy':
      return <BuyButtonTemplate {...btn} />;
    case 'LandingSectionsHeroCtaButtonSubscription':
    case 'LandingSectionsCtaCtaButtonSubscription':
      return <SubscriptionButtonTemplate {...btn} />;
    case 'LandingSectionsHeroCtaButtonWaitlist':
    case 'LandingSectionsCtaCtaButtonWaitlist':
      return <WaitlistButtonTemplate {...btn} />;
    case 'LandingSectionsHeroCtaButtonLink':
    case 'LandingSectionsCtaCtaButtonLink':
      return <LinkButtonTemplate {...btn} />;
    default:
      return null;
  }
};

export const CtaButton: React.FC<CtaButtonProps> = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {data.map((btn, idx) =>
        btn?.__typename ? (
          <React.Fragment key={btn.__typename + '-' + idx}>
            {renderCta(btn)}
          </React.Fragment>
        ) : null,
      )}
    </div>
  );
};

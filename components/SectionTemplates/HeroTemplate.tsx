import * as React from 'react';

import { ActiveUsers } from '@/components/ActiveUsers';
import { CtaButton } from '@/components/CtaButton';
import { Media } from '@/components/Media';
import { TemplateSection } from '@/components/TemplateSection';
import { Code } from '@/components/ui/Code';
import { LandingSectionsHero } from '@/tina/__generated__/types';

export const HeroTemplate: React.FC<LandingSectionsHero> = ({
  id,
  motto,
  headlineIntro,
  headlineValue,
  headlineContrast,
  subheadline,
  media,
  ctaButton,
  socialProof,
}) => (
  <TemplateSection
    id={id}
    className="h-[calc(100vh-124px)] max-w-3xl flex-col-reverse gap-14 lg:max-w-5xl lg:flex-row"
  >
    <div className="flex flex-col items-center gap-10 md:items-start lg:w-1/2">
      <div className="flex flex-1 flex-col gap-4">
        {motto && <Code>{motto}</Code>}

        <h1 className="text-primary-dark dark:text-primary-light text-center text-4xl leading-relaxed font-bold md:text-left md:text-6xl md:leading-snug">
          <span className="block">{headlineIntro}</span>
          <span className="block">{headlineValue}</span>
          <span className="relative inline-block">
            <span className="bg-primary-dark dark:bg-primary-light absolute inset-x-3 inset-y-0 -mx-5 -rotate-1" />
            <span className="text-primary-light dark:text-primary-dark relative">
              {headlineContrast}
            </span>
          </span>
        </h1>
      </div>

      {subheadline && (
        <p className="text-secondary-dark dark:text-neutral text-center text-xl font-medium md:text-left">
          {subheadline}
        </p>
      )}

      <CtaButton data={ctaButton} />

      {socialProof && <ActiveUsers {...socialProof} />}
    </div>

    <div className="relative hidden w-full flex-1 overflow-hidden rounded-xl lg:block">
      <Media data={media} />
    </div>
  </TemplateSection>
);

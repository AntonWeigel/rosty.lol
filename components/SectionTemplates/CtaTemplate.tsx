import * as React from 'react';

import { CtaButton } from '@/components/CtaButton';
import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { LandingSectionsCta } from '@/tina/__generated__/types';

export const CtaTemplate: React.FC<LandingSectionsCta> = ({
  id,
  animation,
  header,
  ctaButton,
}) => (
  <TemplateSection id={id} animation={animation} className="gap-8">
    {header && (
      <SectionHeader>
        {header.label && (
          <SectionHeader.Label>{header.label}</SectionHeader.Label>
        )}
        <SectionHeader.Title>{header.title}</SectionHeader.Title>
        {header.subtitle && (
          <SectionHeader.Subtitle>{header.subtitle}</SectionHeader.Subtitle>
        )}
      </SectionHeader>
    )}

    <CtaButton data={ctaButton} />
  </TemplateSection>
);

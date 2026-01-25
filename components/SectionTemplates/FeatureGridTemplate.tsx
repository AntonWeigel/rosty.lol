import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { LandingSectionsFeatureGrid } from '@/tina/__generated__/types';

export const FeatureGridTemplate: React.FC<LandingSectionsFeatureGrid> = ({
  id,
  header,
  features,
}) => (
  <TemplateSection id={id}>
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

    <div className="flex flex-wrap justify-center gap-12">
      {features.map(({ icon, title, description }) => (
        <div key={title} className="flex max-w-md gap-4">
          <div className="bg-accent/30 flex size-12 shrink-0 items-center justify-center rounded-xl p-2 shadow-xs">
            <LucideIconRenderer icon={icon} />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">{title}</h4>
            <p className="text-secondary-dark dark:text-neutral text-sm">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </TemplateSection>
);

'use client';

import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { LandingSectionsKeyMetrics } from '@/tina/__generated__/types';

import { MetricCard } from './MetricCard';

export const KeyMetricsTemplate: React.FC<LandingSectionsKeyMetrics> = ({
  id,
  header,
  metrics,
}) => {
  return (
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
        {metrics.map((item, index) => (
          <MetricCard key={index} {...item} />
        ))}
      </div>
    </TemplateSection>
  );
};

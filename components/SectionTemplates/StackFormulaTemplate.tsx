import * as React from 'react';

import { SectionLabel } from '@/components/SectionHeader/SectionLabel';
import { TemplateSection } from '@/components/TemplateSection';
import { LibraryMap } from '@/constants/maps';
import { LandingSectionsStackFormula } from '@/tina/__generated__/types';

type StackFormulaTemplateProps = LandingSectionsStackFormula;

export const StackFormulaTemplate: React.FC<StackFormulaTemplateProps> = ({
  id,
  label,
  stack,
}) => {
  const techIcons = stack
    .map(({ library }) => {
      const entry = LibraryMap[library as keyof typeof LibraryMap];
      if (!entry) return null;
      const Icon = entry.icon;
      return (
        <a
          key={library}
          href={entry.url}
          title={entry.text}
          aria-label={entry.text}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="size-8 opacity-90 transition-transform hover:scale-105 hover:opacity-100" />
        </a>
      );
    })
    .filter(Boolean);

  return (
    <TemplateSection id={id} className="gap-4">
      <SectionLabel>{label}</SectionLabel>

      <div className="bg-secondary-light dark:bg-primary-dark flex flex-wrap items-center justify-center gap-4 rounded-3xl p-4 shadow-md sm:gap-6 sm:px-6">
        {techIcons}
      </div>
    </TemplateSection>
  );
};

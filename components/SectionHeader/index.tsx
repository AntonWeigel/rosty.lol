import * as React from 'react';

import { cn, extractComponent } from '@/utils';

import { SectionLabel } from './SectionLabel';
import { SectionSubtitle } from './SectionSubtitle';
import { SectionTitle } from './SectionTitle';

export const SectionHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> & {
  Label: typeof SectionLabel;
  Title: typeof SectionTitle;
  Subtitle: typeof SectionSubtitle;
} = ({ children, className, ...props }) => {
  const { found: label, others: otherChildren } = extractComponent(
    children,
    SectionLabel,
  );

  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col items-center gap-2 py-4 text-sm sm:text-base',
        className,
      )}
      {...props}
    >
      {label}
      <div className="space-y-6">{otherChildren}</div>
    </div>
  );
};

SectionHeader.Label = SectionLabel;
SectionHeader.Title = SectionTitle;
SectionHeader.Subtitle = SectionSubtitle;

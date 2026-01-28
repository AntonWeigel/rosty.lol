import * as React from 'react';

import { List } from '@/components/List';
import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { ListItemType } from '@/constants/enums';
import { LandingSectionsContrast } from '@/tina/__generated__/types';

export const ContrastTemplate: React.FC<LandingSectionsContrast> = ({
  id,
  animation,
  header,
  negativeColumn,
  positiveColumn,
}) => (
  <TemplateSection id={id} animation={animation}>
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

    <div className="flex w-full flex-wrap justify-center gap-12">
      {/* Negative Column */}
      <div className="bg-destructive/10 max-w-md min-w-72 flex-1 rounded-2xl p-6 md:p-8">
        <h3 className="text-destructive mb-6 text-center text-xl font-semibold">
          {negativeColumn.title}
        </h3>
        <List>
          {negativeColumn.listItems?.map((item, i) => (
            <List.Item key={i} type={item.type as ListItemType}>
              {item.text}
            </List.Item>
          ))}
        </List>
      </div>

      {/* Positive Column */}
      <div className="bg-success/10 max-w-md min-w-72 flex-1 rounded-2xl p-6 md:p-8">
        <h3 className="text-success mb-6 text-center text-xl font-semibold">
          {positiveColumn.title}
        </h3>
        <List>
          {positiveColumn.listItems?.map((item, i) => (
            <List.Item key={i} type={item.type as ListItemType}>
              {item.text}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  </TemplateSection>
);

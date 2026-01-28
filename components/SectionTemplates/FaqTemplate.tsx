import * as React from 'react';

import { RichText } from '@/components/RichText';
import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { LandingSectionsFaq } from '@/tina/__generated__/types';

export const FaqTemplate: React.FC<LandingSectionsFaq> = ({
  id,
  animation,
  header,
  items,
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

    <Accordion
      className="flex w-full max-w-3xl flex-col gap-4"
      type="single"
      collapsible
    >
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <RichText content={item.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </TemplateSection>
);

'use client';

import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { LandingSectionsTestimonialsGrid } from '@/tina/__generated__/types';

import { TextTestimonial } from './TextTestimonial';
import { VideoTestimonial } from './VideoTestimonial';

export const TestimonialsGridTemplate: React.FC<
  LandingSectionsTestimonialsGrid
> = ({ id, animation, header, testimonials }) => {
  return (
    <TemplateSection id={id} animation={animation} className="mx-auto max-w-screen-xl gap-16">
      {header?.title && (
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

      <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {testimonials?.map((item, index) => {
          if (!item || !item.__typename) return null;

          const key = `${item.__typename}-${index}`;

          switch (item.__typename) {
            case 'LandingSectionsTestimonialsGridTestimonialsTextTestimonial':
              return <TextTestimonial key={key} {...item} />;
            case 'LandingSectionsTestimonialsGridTestimonialsVideoTestimonial':
              return <VideoTestimonial key={key} {...item} />;
            default:
              console.warn(`Unknown testimonial type: ${item.__typename}`);
              return null;
          }
        })}
      </div>
    </TemplateSection>
  );
};

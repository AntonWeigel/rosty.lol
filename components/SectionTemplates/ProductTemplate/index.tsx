'use client';

import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { GiftIcon } from '@/icons/GiftIcon';
import { LandingSectionsProduct } from '@/tina/__generated__/types';

import { ProductCard } from './ProductCard';

export const ProductTemplate: React.FC<LandingSectionsProduct> = ({
  id,
  header,
  products,
}) => {
  return (
    <TemplateSection id={id} className="gap-16" highlighted>
      {header && (
        <SectionHeader className="container">
          {header.label && (
            <SectionHeader.Label>{header.label}</SectionHeader.Label>
          )}
          <SectionHeader.Title>{header.title}</SectionHeader.Title>
          {header.subtitleBlock && (
            <SectionHeader.Subtitle>
              <span className="inline-flex flex-wrap items-center justify-center gap-1 text-center">
                {header.subtitleBlock.discount && (
                  <span className="text-accent inline-flex shrink-0 items-center gap-1">
                    <GiftIcon />
                    {header.subtitleBlock.discount}
                  </span>
                )}
                <span className="text-current">
                  {header.subtitleBlock.text}
                </span>
              </span>
            </SectionHeader.Subtitle>
          )}
        </SectionHeader>
      )}

      <div className="container flex flex-wrap justify-center gap-10">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </TemplateSection>
  );
};

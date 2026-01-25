import Image from 'next/image';
import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { Badge } from '@/components/ui/Badge';
import { Position } from '@/constants/enums';
import { LandingSectionsFeatureCards } from '@/tina/__generated__/types';
import { cn } from '@/utils';

export const FeatureCardsTemplate: React.FC<LandingSectionsFeatureCards> = ({
  id,
  header,
  features,
}) => (
  <TemplateSection id={id} className="gap-16">
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

    <div className="flex w-full max-w-4xl flex-col gap-16">
      {features.map(({ title, description, image, badges }) => {
        const isLeft = image?.position === Position.Left;

        return (
          <div
            key={title}
            className={cn(
              'flex flex-col items-center gap-8 sm:flex-row md:gap-16',
              isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse',
            )}
          >
            {image.src && (
              <div className="bg-neutral relative aspect-[3/2] w-full max-w-[320px] flex-1 overflow-hidden rounded-xl shadow-xs">
                <Image
                  src={image.src}
                  alt={image.alt || title}
                  width={image.width || 900}
                  height={image.height || 600}
                  className="object-contain"
                />
              </div>
            )}

            <div
              className={cn(
                'flex w-full max-w-[320px] flex-1 flex-col justify-center gap-6 sm:max-w-xl',
                isLeft
                  ? 'sm:items-start sm:text-left'
                  : 'sm:items-end sm:text-right',
              )}
            >
              <h4 className="text-primary-dark dark:text-primary-light text-xl font-medium">
                {title}
              </h4>
              <p className="text-secondary-dark dark:text-neutral text-base leading-relaxed">
                {description}
              </p>

              {badges?.length && (
                <div
                  className={cn(
                    'flex flex-wrap gap-2',
                    isLeft ? 'sm:justify-start' : 'sm:justify-end',
                  )}
                >
                  {badges?.map((badge, i) => (
                    <Badge key={i} variant="tag">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </TemplateSection>
);

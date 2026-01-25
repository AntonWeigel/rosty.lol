import Image from 'next/image';
import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { Badge } from '@/components/ui/Badge';
import { LandingSectionsAbout } from '@/tina/__generated__/types';

type AboutTemplateTemplateProps = LandingSectionsAbout;

export const AboutTemplate: React.FC<AboutTemplateTemplateProps> = ({
  id,
  header,
  description,
  image,
  badges,
}) => (
  <TemplateSection id={id} className="gap-8">
    {header && (
      <SectionHeader className="max-w-3xl">
        {header.label && (
          <SectionHeader.Label>{header.label}</SectionHeader.Label>
        )}
        <SectionHeader.Title>{header.title}</SectionHeader.Title>
        {header.subtitle && (
          <SectionHeader.Subtitle>{header.subtitle}</SectionHeader.Subtitle>
        )}
      </SectionHeader>
    )}

    <div className="flex w-full max-w-3xl flex-col gap-16">
      <div className="flex flex-col items-center gap-8 sm:flex-row md:gap-16">
        <div className="flex w-full max-w-[320px] flex-1 flex-col justify-center gap-6 sm:max-w-xl sm:items-end sm:text-right">
          <p className="text-secondary-dark dark:text-neutral text-base leading-relaxed">
            {description}
          </p>

          {badges?.length && (
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {badges?.map((badge, i) => (
                <Badge key={i} variant="tag">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="bg-neutral relative aspect-square w-full max-w-[140px] flex-1 overflow-hidden rounded-full shadow-xs">
            <Image
              src={image.src}
              alt={image.alt || 'about us'}
              width={image.width || 300}
              height={image.height || 300}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </div>
  </TemplateSection>
);

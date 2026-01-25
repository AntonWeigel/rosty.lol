import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { AwardIconMap, CompanyLogoMap } from '@/constants/maps';
import { LandingSectionsSocialProof } from '@/tina/__generated__/types';

export const SocialProofTemplate: React.FC<LandingSectionsSocialProof> = ({
  id,
  header,
  awards,
  logos,
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

    {awards?.length && (
      <div className="flex flex-wrap justify-center gap-0 sm:gap-12">
        {awards.map((award) => {
          const Icon = AwardIconMap[award?.type as keyof typeof AwardIconMap];
          if (!Icon) return null;

          return award?.href ? (
            <a
              key={award.type}
              href={award.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-transform hover:opacity-100"
            >
              <Icon />
            </a>
          ) : (
            <div key={award?.type}>
              <Icon />
            </div>
          );
        })}
      </div>
    )}

    {logos?.length && (
      <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-8">
        {logos.map((logo) => {
          const Logo =
            CompanyLogoMap[logo?.type as keyof typeof CompanyLogoMap];
          if (!Logo) return null;

          return (
            <div
              key={logo?.type}
              className="flex items-center justify-center opacity-80"
            >
              <Logo />
            </div>
          );
        })}
      </div>
    )}
  </TemplateSection>
);

'use client';

import Link from 'next/link';
import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import { Button } from '@/components/ui/Button';
import { LinkType } from '@/constants/enums';
import { LogoIcon } from '@/icons/logo';
import {
  LandingSectionsCtaCtaButtonLink,
  LandingSectionsHeroCtaButtonLink,
} from '@/tina/__generated__/types';

type CtaLinkButtonProps =
  | LandingSectionsHeroCtaButtonLink
  | LandingSectionsCtaCtaButtonLink;

export const LinkButtonTemplate: React.FC<CtaLinkButtonProps> = ({
  href,
  label,
  linkType,
}) => {
  const isExternal = linkType === LinkType.External;

  return (
    <Button size="lg" asChild>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {label.icon ? (
          <LucideIconRenderer icon={label.icon} className="size-4" />
        ) : (
          <LogoIcon />
        )}
        {label.text}
      </Link>
    </Button>
  );
};

'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { SITE } from '@/config';
import { FooterMenu } from '@/layout/Footer/FooterMenu';
import { FooterBrand } from '@/layout/Footer/FooterBrand';
import { Separator } from '@/components/ui/Separator';

export const Footer: React.FC = () => {
  const activeRoute = usePathname();
  const { links, legal, more } = SITE.footer;

  return (
    <footer className="flex w-full">
      <div className="bg-secondary-light dark:bg-primary-dark items-between mx-auto mb-6 flex w-340 max-w-[calc(100%-32px)] flex-col flex-wrap justify-center gap-4 rounded-3xl px-8 pt-10 pb-8 shadow-md sm:flex-row sm:px-16">
        <div className="flex w-full flex-wrap gap-x-16 gap-y-10 sm:justify-between">
          <FooterMenu title={'Links'} activeRoute={activeRoute} items={links} />
          <FooterMenu title={'Legal'} activeRoute={activeRoute} items={legal} />
          <FooterMenu title={'More'} activeRoute={activeRoute} items={more} />
        </div>
        <Separator />
        <FooterBrand />
      </div>
    </footer>
  );
};

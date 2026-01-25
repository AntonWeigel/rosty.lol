'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { SITE } from '@/config';
import { FooterBrand } from '@/layout/Footer/FooterBrand';
import { FooterMenu } from '@/layout/Footer/FooterMenu';

export const Footer: React.FC = () => {
  const activeRoute = usePathname();
  const { links, legal, more } = SITE.footer;

  return (
    <footer className="flex w-full">
      <div className="bg-secondary-light dark:bg-primary-dark mx-auto mb-6 flex w-[85rem] max-w-[calc(100%-32px)] flex-col flex-wrap justify-between gap-8 rounded-3xl px-8 py-16 shadow-md sm:flex-row sm:p-16">
        <FooterBrand />
        <div className="flex flex-wrap gap-10 sm:w-3/5 sm:justify-between">
          <FooterMenu title={'Links'} activeRoute={activeRoute} items={links} />
          <FooterMenu title={'Legal'} activeRoute={activeRoute} items={legal} />
          <FooterMenu title={'More'} activeRoute={activeRoute} items={more} />
        </div>
      </div>
    </footer>
  );
};

import { Metadata } from 'next';
import * as React from 'react';

import { SITE } from '@/config';

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: 'Access the authentication pages of the demo starter template.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-7xl flex-col items-start gap-12">{children}</div>
  );
}

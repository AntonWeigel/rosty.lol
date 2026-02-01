import './globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import * as React from 'react';

import { SITE } from '@/config';
import { AppProviders } from '@/layout';

const nextFont = Inconsolata({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description:
    'Preview the demo SaaS starter template in action - including auth, dashboard, blog, pricing, docs, and more.',
  applicationName: SITE.name,
  appleWebApp: {
    title: SITE.name,
    capable: true,
    statusBarStyle: 'default',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${nextFont.className} bg-primary-light text-secondary-dark dark:bg-secondary-dark dark:text-primary-light`}
      >
        <AppProviders locale={locale} messages={messages}>
          {children}
        </AppProviders>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    </html>
  );
}

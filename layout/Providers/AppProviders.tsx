'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import { AbstractIntlMessages } from 'use-intl';

import { HexColors } from '@/constants/colors';
import { CookieBanner, Toaster } from '@/layout';

type AppProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export const AppProviders = ({
  children,
  locale,
  messages,
}: AppProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CookieBanner />
        <ProgressProvider
          height="4px"
          color={HexColors.highlight}
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
        </ProgressProvider>
        <Toaster />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

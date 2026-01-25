'use client';

import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { AppRoute } from '@/constants/routes';
import { cn } from '@/utils';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    const consent = getCookie('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie-consent', 'accepted', { maxAge: 60 * 60 * 24 * 365 }); // Expires in 1 year
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie('cookie-consent', 'declined', { maxAge: 60 * 60 * 24 * 365 }); // Expires in 1 year
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-900/30 backdrop-blur-xs" />
      <div
        className={cn(
          'fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-90 -translate-x-1/2 flex-col items-center gap-5 rounded-3xl p-4 text-center shadow-md',
          'dark:bg-secondary-dark bg-primary-light',
          'sm:bottom-8 sm:max-w-145 sm:flex-row sm:rounded-full',
        )}
      >
        <Image src="/cookie.webp" alt="Cookies" width={60} height={60} />
        <p className="m-0 w-full text-xs leading-relaxed font-medium">
          We use tasty{' '}
          <Link href={AppRoute.PrivacyPage} className="underline">
            cookies
          </Link>{' '}
          to personalize your site experience and analyze site traffic.
        </p>
        <div className="flex justify-center gap-5">
          <Button
            onClick={handleAccept}
            variant="outline"
            className="hover:border-success/80 dark:hover:border-success/80"
          >
            Accept
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="hover:border-destructive/60 dark:hover:border-destructive/60"
          >
            Decline
          </Button>
        </div>
      </div>
    </>
  );
};

import * as React from 'react';

import { features } from '@/config/features';
import { Footer, Navbar } from '@/layout';
import { fetchUserProfile } from '@/services/user';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthEnabled = features.auth;
  const userProfile = await fetchUserProfile();

  return (
    <>
      <Navbar isAuthEnabled={isAuthEnabled} initUserProfile={userProfile} />
      <main className="container mt-24 mb-48 flex min-h-[calc(100vh-192px)] flex-col items-center justify-between gap-24">
        {children}
      </main>
      <Footer />
    </>
  );
}

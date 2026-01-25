import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { CheckoutSuccess } from '@/components/CheckoutSuccess';
import { AppRoute } from '@/constants/routes';
import { fetchCheckoutSuccess } from '@/services/payment';

export const metadata: Metadata = {
  title: 'Purchase Successful',
  description: 'Your purchase has been completed successfully.',
  robots: { index: false, follow: false },
};

export default async function Page(props: {
  searchParams: Promise<{
    checkout_id?: string;
  }>;
}) {
  const { checkout_id: checkoutId } = await props.searchParams;

  if (!checkoutId) {
    redirect(AppRoute.HomePage);
  }

  const checkoutData = await fetchCheckoutSuccess(checkoutId);

  if (!checkoutData) {
    redirect(AppRoute.HomePage);
  }

  return <CheckoutSuccess data={checkoutData} />;
}

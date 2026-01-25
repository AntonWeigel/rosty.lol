'use server';

import { configurePolar } from '@/config/polar';
import { CheckoutSuccessData } from '@/types';

/**
 * Creates a new Polar checkout session for a product purchase.
 *
 * @param productId - The ID of the product to create a checkout for
 * @param customerEmail - Optional customer email to pre-fill checkout
 * @returns Promise resolving to the checkout URL for payment processing
 */
export async function createPolarCheckout({
  productId,
  customerEmail,
}: {
  productId: string;
  customerEmail?: string;
}): Promise<string> {
  const polar = configurePolar();

  const checkout = await polar.checkouts.create({
    products: [productId],
    customerEmail,
    successUrl: process.env.POLAR_SUCCESS_URL,
  });

  if (!checkout.url) {
    throw new Error('No checkout URL returned from Polar');
  }

  return checkout.url;
}

/**
 * Fetches checkout session data for success page display.
 *
 * @param checkoutId - The checkout session ID from URL params
 * @returns Checkout data formatted for success page
 */
export async function fetchCheckoutSuccess(
  checkoutId: string,
): Promise<CheckoutSuccessData | null> {
  try {
    const polar = configurePolar();

    const checkout = await polar.checkouts.get({ id: checkoutId });

    return {
      id: checkout.id,
      status: checkout.status,
      customerName: checkout.customerName || 'Customer',
      customerEmail: checkout.customerEmail || '',
      totalAmount: checkout.totalAmount || 0,
      currency: checkout.currency || 'usd',
      products:
        checkout.products?.map((product) => ({
          name: product.name || 'Product',
          description: product.description || '',
        })) || [],
    };
  } catch (error) {
    console.error('Error fetching checkout success data:', error);
    return null;
  }
}

/**
 * Creates a Polar customer portal session for subscription management.
 *
 * @param customerId - The Polar customer ID
 * @returns Promise resolving to the customer portal URL
 */
export async function createCustomerPortal({
  customerId,
}: {
  customerId: string;
}): Promise<string> {
  const polar = configurePolar();

  const session = await polar.customerSessions.create({
    customerId,
  });

  if (!session.customerPortalUrl) {
    throw new Error('No customer portal URL returned from Polar');
  }

  return session.customerPortalUrl;
}

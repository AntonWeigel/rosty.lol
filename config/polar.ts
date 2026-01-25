import { Polar } from '@polar-sh/sdk';

import { features } from '@/config/features';
import { createDisabledProxy, requireEnv } from '@/utils';

/**
 * Ensures required Polar environment variables are set and initializes the Polar SDK.
 * Throws an error if variables are missing so server actions fail fast during setup.
 */
export function configurePolar() {
  if (!features.polar) {
    return createDisabledProxy('Polar') as unknown as Polar;
  }

  requireEnv(['POLAR_ACCESS_TOKEN', 'POLAR_SUCCESS_URL'], 'Polar');

  return new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN!,
    server: process.env.POLAR_SERVER as 'sandbox' | 'production',
  });
}

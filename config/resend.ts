import { Resend } from 'resend';

import { features } from '@/config/features';
import { createDisabledProxy, requireEnv } from '@/utils';

/**
 * Ensures required Resend environment variables are set and initializes the Resend client.
 * Throws an error if variables are missing so the application fails fast during setup.
 */
function configureResend() {
  if (!features.resend) {
    return createDisabledProxy('Resend') as unknown as Resend;
  }

  requireEnv(['RESEND_API_KEY'], 'Resend');

  return new Resend(process.env.RESEND_API_KEY!);
}

const resend = configureResend();

export default resend;

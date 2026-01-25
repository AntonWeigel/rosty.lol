import OpenAI from 'openai';

import { features } from '@/config/features';
import { createDisabledProxy, requireEnv } from '@/utils';

/**
 * Ensures required OpenAI environment variables are set and initializes the OpenAI client.
 * Throws an error if variables are missing so the application fails fast during setup.
 */
function configureOpenAI() {
  if (!features.openai) {
    return createDisabledProxy('OpenAI') as unknown as OpenAI;
  }

  requireEnv(['OPENAI_API_KEY'], 'OpenAI');

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });
}

const openai = configureOpenAI();

export default openai;

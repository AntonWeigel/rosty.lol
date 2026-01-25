import { nanoid } from 'nanoid';

const PREFIX = 'asa';

type SecureToken = {
  rawToken: string;
  hashedToken: string;
  maskedToken: string;
};

/**
 * Generates a secure API token with three versions:
 * - rawToken: the full token (to be shown once and stored client-side).
 * - hashedToken: a SHA-256 hash (for secure storage).
 * - maskedToken: a redacted version (for display).
 *
 * @returns An object containing the raw, hashed, and masked versions of the token.
 */
export async function generateSecureToken(): Promise<SecureToken> {
  const rawToken = `${PREFIX}_${nanoid(32)}`;

  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(rawToken),
  );

  const hashedToken = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const maskedToken =
    rawToken.slice(0, 10) + '••••••••••••••••••••••••••••' + rawToken.slice(-4);

  return { rawToken, hashedToken, maskedToken };
}

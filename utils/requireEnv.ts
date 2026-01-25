/**
 * Asserts that required environment variables are set (non-empty).
 *
 * @param keys - Env var names to require
 * @param name - Optional scope label for clearer error messages
 * @throws Error listing all missing variables
 */
export function requireEnv(keys: string[], name?: string): void {
  const missing = keys.filter((k) => {
    const v = process.env[k];
    return v == null || String(v).trim() === '';
  });
  if (missing.length) {
    const scope = name ? `${name} ` : '';
    throw new Error(
      `Missing ${scope}env vars: ${missing.join(', ')}. Add them to .env`,
    );
  }
}

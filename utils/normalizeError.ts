/**
 * Normalizes any thrown error into a standard Error instance with optional fallback message.
 *
 * @param error - The caught error
 * @param fallbackMessage - Optional fallback if error cannot be understood
 * @returns A standardized Error object
 */
export function normalizeError(
  error: unknown,
  fallbackMessage = 'An unknown error occurred',
): Error {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === 'string') {
    return new Error(error);
  }

  return new Error(fallbackMessage);
}

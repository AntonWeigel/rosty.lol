/**
 * Normalizes optional TinaCMS field values by converting `null` to `undefined`
 *
 * @param value - The raw value from TinaCMS
 * @returns A cleaned value or `undefined` if empty
 */
export function normalizeValueFromTina<T>(
  value: T | null | undefined,
): T | undefined {
  return value ?? undefined;
}

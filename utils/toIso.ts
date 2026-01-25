/**
 * Normalises an incoming date-ish value to an ISO-8601 string.
 *
 * @param value – A `Date`, ISO `string`, or `null`/`undefined`.
 * @returns ISO-8601 string, or `null` when the input is nullish.
 */
export function toIso(value?: Date | string | null): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

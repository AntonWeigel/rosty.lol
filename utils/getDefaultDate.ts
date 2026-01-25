/**
 * Generates initials from a full name string.
 *
 * For example, "John Doe" → "JD".
 *
 * @param name - The full name to extract initials from.
 * @returns The uppercase initials of the name.
 */
export function getDefaultDate(): string {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

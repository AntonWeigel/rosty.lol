/**
 * Generates initials from a full name string.
 *
 * For example, "John Doe" → "JD".
 *
 * @param name - The full name to extract initials from.
 * @returns The uppercase initials of the name.
 */
export function getInitials(name: string): string {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => part.charAt(0)).join('');
  return initials.toUpperCase();
}

const DEFAULT_FALLBACK = 'NA';

/**
 * Generates a two-letter fallback from a name (e.g., "John Doe" → "JD").
 *
 * Splits the name by spaces and takes the first character of the first two words.
 * Falls back to "NA" if the input is null, undefined, or does not contain any letters.
 *
 * @param name - The full name to generate initials from.
 * @returns The uppercase initials or a fallback string.
 *
 * @example
 * generateAvatarFallback('Jane Smith'); // "JS"
 * generateAvatarFallback('elena');      // "E"
 * generateAvatarFallback(null);         // "NA"
 */
export function generateAvatarFallback(
  name: string | null | undefined,
): string {
  if (!name) return DEFAULT_FALLBACK;

  const initials = name
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return initials || DEFAULT_FALLBACK;
}

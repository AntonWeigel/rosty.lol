/**
 * Capitalizes only the first character of a string.
 *
 * Useful for titles or labels where only the initial letter should be uppercase,
 * while preserving the original casing of the rest of the word.
 *
 * @param text - The string to capitalize.
 * @returns The input string with the first character uppercased.
 *
 * @example
 * capitalizeFirst('starter'); // 'Starter'
 * capitalizeFirst('Pro');     // 'Pro'
 */
export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

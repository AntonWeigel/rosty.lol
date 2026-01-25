import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names with support for conditional logic.
 *
 * @param inputs - A list of class values (strings, arrays, objects).
 * @returns A single merged class string with duplicates resolved.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

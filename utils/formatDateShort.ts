import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { LocaleMap } from '@/constants/maps';

/**
 * Formats a date into a localized, human-readable short string (e.g., "28 Mar 2025").
 *
 * Uses the fixed format 'dd MMM yyyy' and supports localization through `LocaleMap`.
 * Designed for consistent, compact date displays.
 *
 * @param date - The date to format (can be a string, timestamp, or Date object).
 * @param localeCode - Optional locale code (e.g., 'en', 'de'). Defaults to 'en'.
 * @returns The formatted date string (e.g., "28 Mar 2025" or "28 Mär 2025").
 *
 * @example
 * formatDateShort('2025-04-07');       // "07 Apr 2025"
 * formatDateShort('2025-04-07', 'de'); // "07 Apr 2025" (with German locale if defined)
 */
export function formatDateShort(
  date: string | number | Date,
  localeCode: string = 'en',
): string {
  const locale = LocaleMap[localeCode] ?? enUS;
  return format(new Date(date), 'dd MMM yyyy', { locale });
}

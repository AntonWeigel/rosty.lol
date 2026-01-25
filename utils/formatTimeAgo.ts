import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { LocaleMap } from '@/constants/maps';

/**
 * Returns a relative time string like "5 days ago" or "in 2 hours",
 * localized based on the given locale code.
 *
 * @param date - A timestamp, string, or Date to compare to now
 * @param localeCode - (Optional) The locale code ('en', 'de', etc.)
 * @returns A string like "3 days ago" or "vor 3 Tagen"
 *
 * @example
 * formatTimeAgo('2025-03-25')       // "3 days ago"
 * formatTimeAgo('2025-03-25', 'de') // "vor 3 Tagen"
 */
export function formatTimeAgo(
  date: string | number | Date,
  localeCode: string = 'en',
): string {
  const locale = LocaleMap[localeCode] ?? enUS;
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale });
}

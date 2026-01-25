'use server';

import { cookies } from 'next/headers';

import { defaultLocale, Locale } from '@/i18n/request';

const COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Retrieves the user's locale from cookies or falls back to default.
 *
 * @returns The user's locale.
 */
export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

/**
 * Sets the user's locale in cookies.
 *
 * @param locale - The locale to store.
 */
export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

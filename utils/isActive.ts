import { LOCALES } from '@/constants';

function normalize(path: string) {
  return (
    path
      // strip locale prefix
      .replace(new RegExp(`^/(?:${LOCALES.join('|')})(?=/|$)`), '')
      // remove trailing slashes
      .replace(/\/+$/, '') || '/'
  );
}

/**
 * Checks if a link href should be marked active for the given pathname.
 *
 * @param href - The link target (e.g., "/docs").
 * @param pathname - The current route (e.g., "/docs/get-started").
 * @returns True if the pathname equals or starts with the href.
 */
export function isActive(href: string, pathname: string) {
  const current = normalize(pathname);
  const target = normalize(href);

  if (target === '/') return current === '/';
  return current === target || current.startsWith(target + '/');
}

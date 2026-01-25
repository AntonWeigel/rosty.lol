const SIDEBAR_COOKIE_PREFIX = 'sidebar-state';

export function getSidebarCookieNameById(id: string): string {
  return `${SIDEBAR_COOKIE_PREFIX}-${id}`;
}

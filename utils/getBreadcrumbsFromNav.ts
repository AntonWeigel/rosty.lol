import { NavItem } from '@/types';

/**
 * Resolves the breadcrumb trail for a given slug path by walking through
 * the structured nav items and matching each segment to its display title and URL.
 *
 * Falls back to raw slug parts if no matching nav item is found at any level.
 *
 * @param navItems - The full structured documentation nav tree.
 * @param slugParts - The current slug split into parts (e.g., ['styling-and-theming', 'test']).
 * @returns An array of breadcrumb entries with titles and hrefs.
 */
export function getBreadcrumbsFromNav(
  navItems: NavItem[],
  slugParts: string[],
): { title: string; href: string }[] {
  const breadcrumbs: { title: string; href: string }[] = [];
  let currentLevel = navItems;
  let currentPath = '/docs';

  for (const part of slugParts) {
    currentPath += `/${part}`;
    const match = currentLevel.find((item) => item.url === currentPath);
    if (match) {
      breadcrumbs.push({ title: match.title, href: currentPath });
      currentLevel = match.items;
    } else {
      // fallback: use slug segment
      breadcrumbs.push({ title: part, href: currentPath });
      break;
    }
  }

  return breadcrumbs;
}

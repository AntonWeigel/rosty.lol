import { FlatNavItem, NavItem } from '@/types';

/**
 * Flattens a nested list of `NavItem`s into a one-dimensional array containing only items with a defined `url`.
 *
 * @param navItems - The hierarchical list of docs (e.g., from `fetchAndStructureDocs`).
 * @returns A flat array of `{ title, url }` pairs, preserving the navigation order.
 */
function flattenDocsNav(navItems: NavItem[]): FlatNavItem[] {
  const flat: FlatNavItem[] = [];

  function collect(items: NavItem[]) {
    for (const item of items) {
      if (item.url) flat.push({ title: item.title, url: item.url });
      if (item.items?.length) collect(item.items);
    }
  }

  collect(navItems);
  return flat;
}

/**
 * Returns the previous and next documentation entries relative to the current page.
 *
 * @param navItems - The full list of nested `NavItem`s (e.g., from `fetchAndStructureDocs`).
 * @param currentUrl - The current doc URL (e.g., `/docs/get-started`).
 * @returns An object containing `prev` and `next` items, or `null` if not available.
 */
export function getPrevNextDoc(
  navItems: NavItem[],
  currentUrl: string,
): {
  prev: FlatNavItem | null;
  next: FlatNavItem | null;
} {
  const flat = flattenDocsNav(navItems);
  const index = flat.findIndex((item) => item.url === currentUrl);

  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

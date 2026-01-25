import * as React from 'react';

import { LucideIcon } from '@/constants/enums';
import client from '@/tina/__generated__/client';
import { DocConnectionEdges } from '@/tina/__generated__/types';
import { NavItem } from '@/types';

/**
 * Fetches and structures documentation entries from TinaCMS into a nested navigation format.
 *
 * @returns Structured list of `NavItem` objects for use in the docs sidebar.
 */
export const fetchAndStructureDocs = React.cache(
  async (): Promise<NavItem[]> => {
    const docsListData = await client.queries.docConnection();
    if (!docsListData?.data?.docConnection?.edges) {
      return [];
    }
    return structureDocs(
      docsListData.data.docConnection.edges as DocConnectionEdges[],
    );
  },
);

function structureDocs(edges: DocConnectionEdges[]): NavItem[] {
  const navMap = new Map<string, NavItem>();
  const rootItems: NavItem[] = [];

  for (const edge of edges) {
    if (!edge.node) continue;

    const parts = edge.node._sys.relativePath.split('/').filter(Boolean);

    let parentPath = '';
    let currentItems = rootItems;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const normalizedPart = part.replace('.mdx', '');
      const currentPath = parentPath
        ? `${parentPath}/${normalizedPart}`
        : normalizedPart;

      // Already exists in nav
      if (!navMap.has(currentPath)) {
        const newItem: NavItem = {
          title: edge.node.title || normalizedPart,
          icon: edge.node.icon ? (edge.node.icon as LucideIcon) : undefined,
          url: isLast
            ? `/docs/${parts.map((p) => p.replace('.mdx', '')).join('/')}`
            : '',
          items: [],
          root: i === 0,
          order: edge.node.order ?? 0,
        };

        navMap.set(currentPath, newItem);
        currentItems.push(newItem);
      }

      const currentItem = navMap.get(currentPath)!;
      currentItems = currentItem.items;
      parentPath = currentPath;
    }
  }

  return sortNavItems(rootItems);
}

function sortNavItems(items: NavItem[]): NavItem[] {
  return items
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      items: sortNavItems(item.items),
    }));
}

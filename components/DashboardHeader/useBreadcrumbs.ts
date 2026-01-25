'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import dashboardConfig from '@/config/dashboard';
import { DashboardRoute } from '@/constants/routes';
import { BreadcrumbEntry, Project, SidebarItem } from '@/types';

const root = DashboardRoute.OverviewPage;

type UseBreadcrumbsOptions = {
  projects?: Project[];
};

/**
 * Generates breadcrumb entries for the current dashboard route.
 *
 * @param options Optional data like project list for dynamic routes.
 * @returns An array of breadcrumb items including titles and URLs.
 */
export const useBreadcrumbs = (
  options: UseBreadcrumbsOptions = {},
): BreadcrumbEntry[] => {
  const pathname = usePathname();
  const breadcrumbs: BreadcrumbEntry[] = [];

  if (pathname === root) {
    return [{ title: 'Overview', url: root, isLast: true }];
  }

  const pathSegments = pathname.replace(root, '').split('/').filter(Boolean);

  const findRoute = (
    items: SidebarItem[],
    segments: string[],
    parentUrl: string = '',
  ): void => {
    for (const item of items) {
      const currentUrl = `${parentUrl}${item.url}`.replace(/\/+$/, '');

      if (segments[0] && currentUrl.endsWith(`/${segments[0]}`)) {
        breadcrumbs.push({
          title: item.title,
          url: currentUrl,
          isLast: false,
        });

        if (segments.length > 1 && item.items) {
          findRoute(item.items, segments.slice(1), currentUrl);
        }

        return;
      }
    }
  };

  findRoute(dashboardConfig.platform, pathSegments);

  // Check for dynamic matches to extend the breadcrumb
  const dynamicMatchers = [
    {
      match: '/dashboard/projects/:id',
      parentUrl: DashboardRoute.ProjectsPage,
      getLabel: (id: string) =>
        options.projects?.find((p) => p.id === id)?.name || `Project ${id}`,
    },
    // Add more dynamic matchers here
  ];

  for (const entry of dynamicMatchers) {
    const matcher = match(entry.match);
    const result = matcher(pathname);
    if (result) {
      const id = result.params.id as string;
      breadcrumbs.push({
        title: entry.getLabel(id),
        url: pathname,
        isLast: true,
      });
      return breadcrumbs;
    }
  }

  // If no dynamic match, fallback to last static crumb
  if (breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].isLast = true;
    return breadcrumbs;
  }

  return [{ title: 'Overview', url: root, isLast: true }];
};

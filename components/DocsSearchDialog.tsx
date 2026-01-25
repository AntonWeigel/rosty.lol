'use client';

import Link from 'next/link';
import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import { SearchInput } from '@/components/SearchInput';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { useDebounce, useHotkeys } from '@/hooks';
import { useDocsSearch } from '@/layout';
import { NavItem, SearchResult } from '@/types';

type DocsSearchDialogProps = { links: NavItem[] };

export const DocsSearchDialog: React.FC<DocsSearchDialogProps> = ({
  links,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const { setOpenMobile } = useSidebar();
  const { search } = useDocsSearch();
  const debouncedQuery = useDebounce(query, 400);

  useHotkeys([
    {
      keys: ['Meta', 'K'], // ⌘ + K
      handler: () => setDialogOpen(true),
    },
    {
      keys: ['Control', 'K'], // Ctrl + S
      handler: () => setDialogOpen(true),
    },
  ]);

  React.useEffect(() => {
    if (debouncedQuery) {
      const results = search(debouncedQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleLinkClick = () => {
    setDialogOpen(false);
    setOpenMobile(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setQuery('')}>
          <SearchInput hotkeys={['⌘', 'K']} />
        </button>
      </DialogTrigger>

      <DialogContent
        size="lg"
        position="top"
        showCloseButton={false}
        className="max-h-[calc(100dvh-10dvh-24px)] grid-rows-[auto,1fr] overflow-hidden"
      >
        <DialogHeader>
          {/*<DialogHeader>*/}
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <SearchInput
            value={query}
            onChange={handleSearchChange}
            placeholder="Search…"
            hotkeys={['Esc']}
          />
        </DialogHeader>

        {/* Dialog description for screen readers */}
        <DialogDescription className="sr-only">
          Use the search box above to find documentation topics. You can press
          <kbd>⎇ Alt</kbd> + <kbd>K</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd> to
          open this dialog.
        </DialogDescription>

        <div className="h-full min-h-0 overflow-y-auto">
          {query ? (
            searchResults.length === 0 ? (
              <p className="text-secondary-dark/50 dark:text-neutral text-center">
                No results found
              </p>
            ) : (
              <SidebarMenu>
                {searchResults.map((result, index) => (
                  <SidebarMenuItem key={index}>
                    {/* Render the title and icon */}
                    <SidebarMenuButton asChild>
                      <Link href={result.url} onClick={handleLinkClick}>
                        <LucideIconRenderer icon={result.icon} />
                        <span>{result.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {/* Render the matches */}
                    {result.matches.length > 0 && (
                      <SidebarMenuSub>
                        {result.matches.map((match, matchIndex) => (
                          <SidebarMenuSubItem key={matchIndex}>
                            <SidebarMenuSubButton asChild>
                              <Link href={result.url} onClick={handleLinkClick}>
                                <span
                                  className="truncate"
                                  dangerouslySetInnerHTML={{ __html: match }}
                                />
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )
          ) : (
            <SidebarMenu>
              {links.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <LucideIconRenderer icon={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

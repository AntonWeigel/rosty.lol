'use client';

import * as React from 'react';

import { PageHeader } from '@/components/PageHeader';
import { RichText } from '@/components/RichText';
import { Badge } from '@/components/ui/Badge';
import { ChangelogEntry } from '@/types';
import { formatTimeAgo } from '@/utils';

import { ChangelogFilterMenu } from './ChangelogFilterMenu';

type ChangelogOverviewProps = { entries: ChangelogEntry[] };

export const ChangelogOverview: React.FC<ChangelogOverviewProps> = ({
  entries,
}) => {
  const [search, setSearch] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const filteredEntries = React.useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        JSON.stringify(entry.description)
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        entry.tags.some((tag) => selectedTags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [entries, search, selectedTags]);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-32">
      <PageHeader title="Changelog" subtitle="What is New at aSaaSin?" />

      <div className="flex w-full justify-between gap-12">
        <div className="relative mx-auto flex h-fit max-w-3xl flex-1 flex-col">
          <div className="bg-secondary-dark/50 dark:bg-neutral/50 absolute inset-y-0 left-5 w-px sm:left-[154px]" />

          <div className="flex flex-col items-center gap-24">
            {filteredEntries.length === 0 ? (
              <span className="text-secondary-dark dark:text-neutral text-center text-lg">
                No changelog entries found.
              </span>
            ) : (
              filteredEntries.map((entry) => (
                <div
                  key={entry.version}
                  className="relative flex w-full flex-col sm:flex-row sm:items-start sm:gap-6"
                >
                  {/* Mobile */}
                  <div className="mb-4 flex items-center justify-between sm:hidden">
                    <Badge variant="version" className="mt-1">
                      {entry.version}
                    </Badge>
                    <span className="text-neutral mt-1 text-right text-[10px] font-semibold tracking-wide uppercase">
                      {formatTimeAgo(entry.createdAt)}
                    </span>
                  </div>

                  {/* Desktop */}
                  <div className="hidden w-[110px] justify-end pt-1 sm:flex">
                    <span className="text-secondary-dark dark:text-neutral mt-1 text-right text-[10px] font-semibold tracking-wide uppercase">
                      {formatTimeAgo(entry.createdAt)}
                    </span>
                  </div>

                  {/* Desktop */}
                  <div className="hidden w-[40px] flex-col items-center sm:flex">
                    <Badge variant="version" className="mt-1">
                      {entry.version}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-4 pl-12 sm:flex-1 sm:pl-4">
                    <h3 className="text-primary-dark dark:text-primary-light text-lg font-semibold">
                      {entry.title}
                    </h3>

                    <RichText content={entry.description} />

                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="tag">
                          {tag.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sticky top-32 hidden h-fit lg:ml-auto lg:block">
          <ChangelogFilterMenu
            search={search}
            setSearchAction={setSearch}
            selected={selectedTags}
            setSelectedAction={setSelectedTags}
          />
        </div>
      </div>
    </section>
  );
};

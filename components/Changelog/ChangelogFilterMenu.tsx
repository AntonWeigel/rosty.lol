'use client';

import * as React from 'react';

import { SearchInput } from '@/components/SearchInput';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import { useHotkeys } from '@/hooks';
import { changelogTags } from '@/tina/options';
import { cn } from '@/utils';

type ChangelogFilterMenuProps = {
  search: string;
  setSearchAction: (value: string) => void;
  selected: string[];
  setSelectedAction: (value: string[]) => void;
};

export const ChangelogFilterMenu: React.FC<ChangelogFilterMenuProps> = ({
  search,
  setSearchAction,
  selected,
  setSelectedAction,
}) => {
  useHotkeys([
    {
      keys: ['Escape'],
      handler: () => {
        if (search) {
          setSearchAction('');
        }
      },
    },
  ]);

  return (
    <aside
      className={cn(
        'bg-secondary-light dark:bg-primary-dark flex w-48 flex-col gap-4 rounded-xl p-4 shadow-lg',
      )}
    >
      <SearchInput
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearchAction(e.target.value)}
        hotkeys={search ? ['Esc'] : undefined}
      />

      <ToggleGroup
        type="multiple"
        variant="menu"
        size="sm"
        value={selected}
        onValueChange={setSelectedAction}
        className="flex w-full flex-col gap-0 pl-3"
      >
        {changelogTags.map((tag) => (
          <ToggleGroupItem key={tag} value={tag}>
            {tag}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </aside>
  );
};

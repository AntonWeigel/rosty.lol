import { Search } from 'lucide-react';
import * as React from 'react';

import { Hotkey } from '@/components/Hotkey';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils';

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hotkeys?: string[];
  className?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search…',
  value,
  onChange,
  hotkeys = [],
  className,
}) => (
  <div className={cn('relative', className)}>
    <Search className="text-primary-dark/50 dark:text-primary-light/50 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 select-none" />

    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="primary"
      className="h-9 w-full pr-14 pl-8"
    />

    {hotkeys.length > 0 && (
      <Hotkey className="absolute top-1/2 right-2 ml-2 -translate-y-1/2">
        {hotkeys.map((key, index) => (
          <Hotkey.Symbol key={index}>{key}</Hotkey.Symbol>
        ))}
      </Hotkey>
    )}
  </div>
);

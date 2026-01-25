import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { ApiToken } from '@/types';
import { cn } from '@/utils';

export const columns = (
  onDeleteClick: (token: ApiToken) => void,
): ColumnDef<ApiToken, unknown>[] => [
  {
    accessorKey: 'token',
    header: 'Token',
    cell: ({ row }) => (
      <code
        className={cn(
          'block max-w-fit rounded-md px-2 py-1 text-sm break-all',
          'bg-primary-light/50 group-hover:bg-primary-light/50 dark:bg-secondary-dark/50 dark:group-hover:bg-primary-dark/50 transition-colors',
        )}
        title={`${row.original.name} token`}
      >
        {row.original.publicToken}
      </code>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created On',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => {
            onDeleteClick(row.original);
          }}
          className="size-8"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    ),
  },
];

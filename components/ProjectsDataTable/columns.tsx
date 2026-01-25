import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { DataTableBadge } from '@/components/DataTable/DataTableBadge';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader';
import { Button } from '@/components/ui/Button';
import { DashboardRoute } from '@/constants/routes';
import { Project } from '@/types';

export const columns = (
  onDeleteClick: (project: Project) => void,
): ColumnDef<Project, unknown>[] => [
  {
    accessorKey: 'name',
    header: 'Project Name',
    cell: ({ row }) => (
      <Link
        href={`${DashboardRoute.ProjectsPage}/${row.original.id}`}
        className="hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <DataTableBadge>{row.original.status}</DataTableBadge>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created On',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDeleteClick(row.original)}
            className="size-8"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      );
    },
  },
];

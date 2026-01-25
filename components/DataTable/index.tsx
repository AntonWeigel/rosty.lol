'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { SearchInput } from '@/components/SearchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useHotkeys } from '@/hooks';
import { cn } from '@/utils';

const DataTableContext = React.createContext<{
  table: ReturnType<typeof useReactTable<any>>;
} | null>(null);

type DataTablePros<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children?: React.ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
}: DataTablePros<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      <div className="bg-secondary-light dark:bg-primary-dark flex flex-col gap-4 overflow-x-auto rounded-2xl p-4 shadow-sm">
        {children}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DataTableContext.Provider>
  );
}

const Header: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('flex items-center justify-between gap-4', className)}>
    {children}
  </div>
);

const SearchBar: React.FC<{
  searchColumn: string;
  searchPlaceholder?: string;
}> = ({ searchColumn, searchPlaceholder }) => {
  const ctx = React.useContext(DataTableContext);

  const table = ctx?.table;
  const filterValue =
    (searchColumn &&
      (table?.getColumn(searchColumn)?.getFilterValue() as string)) ??
    '';

  useHotkeys([
    {
      keys: ['Escape'],
      handler: () => {
        if (filterValue && searchColumn) {
          table?.getColumn(searchColumn)?.setFilterValue('');
        }
      },
    },
  ]);

  if (!ctx || !table) return null;

  return (
    <SearchInput
      placeholder={searchPlaceholder}
      value={filterValue ?? ''}
      onChange={(event) =>
        table.getColumn(searchColumn)?.setFilterValue(event.target.value)
      }
      hotkeys={filterValue ? ['Esc'] : undefined}
    />
  );
};

const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-4">{children}</div>
);

DataTable.Header = Header;
DataTable.Searchbar = SearchBar;
DataTable.Actions = Actions;

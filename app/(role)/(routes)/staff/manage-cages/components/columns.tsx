'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { CellAction } from './cell-action';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { AreaObj } from '@/app/models/area';

export type CageColumn = {
  cageId: string;
  name: string;
  maxCapacity: number;
  currentCapacity: number;
  areaId: string;
  area: AreaObj;
};

export const columns: ColumnDef<CageColumn>[] = [
  {
    accessorKey: 'cageId',
    header: 'Cage ID'
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'currentCapacity',
    header: 'Current Capacity'
  },
  {
    accessorKey: 'maxCapacity',
    header: 'Max Capacity'
  },

  {
    accessorKey: 'area.areaName',
    header: 'Area'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

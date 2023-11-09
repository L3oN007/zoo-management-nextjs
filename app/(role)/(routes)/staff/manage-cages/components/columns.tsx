'use client';

import { AreaObj } from '@/app/models/area';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { CellAction } from './cell-action';

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
    },
    cell: (props) => {
      return (
        <Link href={`/staff/manage-animals/${props.row.original.cageId}`}>
          <span>{props.row.original.name}</span>
        </Link>
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
    header: 'Area',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

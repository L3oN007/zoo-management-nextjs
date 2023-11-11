'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { CellAction } from './cell-action';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import Link from 'next/link';
import { useState } from 'react';

export type AreaColumn = {
  areaId: string;
  areaName: string;
  employeeId: string;
  employee: {
    fullName: string;
  };
};

export const columns: ColumnDef<AreaColumn>[] = [
  {
    accessorKey: 'areaId',
    header: 'AreaID'
  },
  {
    accessorKey: 'areaName',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Area&rsquo;s name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => {
      return (
        <Link href={`/staff/manage-cages/${props.row.original.areaId}`}>
          <span>{props.row.original.areaName}</span>
        </Link>
      );
    }
  },

  {
    accessorKey: 'employee',
    header: 'Trainer',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.employee?.fullName}</span>
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

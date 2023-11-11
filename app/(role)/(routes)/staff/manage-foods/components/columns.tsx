'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { CellAction } from './cell-action';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { AreaObj } from '@/app/models/area';

export type CertificateColumn = {
  no: number;
  importDate: Date;
  importQuantity: number;
  foodId: string;
  foodInventory: {
    foodName: string;
  };
};

export const columns: ColumnDef<CertificateColumn>[] = [
  {
    accessorKey: 'no',
    header: 'No'
  },
  {
    accessorKey: 'importDate',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Import Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'importQuantity',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Import Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'foodInventory.foodName',
    header: 'FoodName',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.foodInventory?.foodName}</span>
      </div>
    )
  }
];

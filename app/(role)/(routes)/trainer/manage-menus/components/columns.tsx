'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { CellAction } from './cell-action';

export type MenuColumn = {
  menuNo: string;
  menuName: string;
  foodInventory: {
    foodId: string;
    foodName: string;
  };
  animalSpecies: {
    speciesName: string;
  };
};

export const columns: ColumnDef<MenuColumn>[] = [
  {
    accessorKey: 'menuNo',
    header: 'Menu ID'
  },
  {
    accessorKey: 'menuName',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Menu Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },

  {
    accessorKey: 'foodInventory.foodName',
    header: 'Food Name'
  },
  {
    accessorKey: 'animalSpecies.speciesName',
    header: 'Species'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

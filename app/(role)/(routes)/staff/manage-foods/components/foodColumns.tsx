'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { CellAction } from './cell-action';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { AreaObj } from '@/app/models/area';


export type FoodColumn = {
   foodId: string;
   foodName: string;
   inventoryQuantity: number;
};


export const FoodColumn: ColumnDef<FoodColumn>[] = [
    {
        accessorKey: 'foodId',
        header: 'Food ID',

    },
    {
        accessorKey: 'foodName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Food Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    
    {
        accessorKey: 'inventoryQuantity',
        header: 'Quantity',

    },

    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
  
];


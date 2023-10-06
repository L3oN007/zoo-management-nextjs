'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { CellAction } from './cell-action';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';

export type CageColumn = {
    id: string;
    name: string;
    maxCapacity: number;
    areaID: string;

};

export const columns: ColumnDef<CageColumn>[] = [
    {
        accessorKey: 'id',
        header: 'Cage ID',
        
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'maxCapacity',
        header: 'Max Capacity',
    
    },
    
    {
        accessorKey: 'areaID',
        header: 'Area ID',
        
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
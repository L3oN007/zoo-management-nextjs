'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { AreaObj } from '@/app/models/area';
import { CellAction } from './cell-action';


export type empCertificateColumn = {
    no: number;
    empId: string;
    cerCode: string;
    description: string;
};


export const empColumns: ColumnDef<empCertificateColumn>[] = [
    {
        accessorKey: 'no',
        header: 'Number',

    },
    {
        accessorKey: 'empId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Employee ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'cerCode',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Certificate Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',

    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
    
  
];


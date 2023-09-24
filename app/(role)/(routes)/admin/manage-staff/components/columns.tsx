'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type StaffColumn = {
    id: string;
    img_url: string;
    fullName: string;
    dob: string;
    citizenId: string;
    email: string;
    phoneNumber: string;
    isDeleted: string;
};

export const columns: ColumnDef<StaffColumn>[] = [
    {
        accessorKey: 'Avatar',
        header: 'Avatar',
        cell: (props) => (
            <div className='flex items-center'>
                <Avatar>
                    <AvatarImage src={'https://github.com/shadcn.png'} alt={props.row.original.fullName} />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </div>
        ),
    },
    {
        accessorKey: 'fullName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'dob',
        header: 'Date of Birth',
    },
    {
        accessorKey: 'citizenId',
        header: 'Citizen ID',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (props) => (
            <div className='flex items-center'>
                <span
                    className={
                        props.row.original.isDeleted == "0"
                            ? 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
                            : 'bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
                    }
                >
                    {props.row.original.isDeleted == "0" ? 'Active' : 'Inactive'}
                </span>
                <p>{props.row.original.isDeleted}</p>
            </div>
        ),
    },
];

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { CellAction } from './cell-action';

export type AnimalColumn = {
  animalId: string;
  image: string;
  name: string;
  region: string;
  behavior: string;
  gender: string;
  birthDate: Date;
  importDate: Date;
  healthStatus: number;
  rarity: string;
  employee: {
    employeeId: string;
    fullName: string;
    citizenId: string;
    email: string;
    phoneNumber: string;
    image: string;
    role: string;
    employeeStatus: number;
  };
  cage: {
    cageId: string;
    name: string;
    maxCapacity: 0;
    areaId: string;
  };
  animalSpecies: {
    speciesId: number;
    speciesName: string;
  };
  isDeleted: number;
};

export const columns: ColumnDef<AnimalColumn>[] = [
  {
    accessorKey: 'img_url',
    header: 'Image',
    cell: (props) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={props.row.original.image} alt={props.row.original.name} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Animal&apos;s Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'region',
    header: 'Region'
  },
  {
    accessorKey: 'behavior',
    header: 'Behavior'
  },

  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'birthDate',
    header: 'Date of Birth'
  },
  {
    accessorKey: 'importDate',
    header: 'Import Date'
  },
  {
    accessorKey: 'healthStatus',
    header: 'Health Status',
    cell: (props) => (
      <div className="flex items-center">
        <span
          className={
            props.row.original.healthStatus === 1
              ? 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
              : 'bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
          }
        >
          {props.row.original.healthStatus === 1 ? 'Checked' : 'Unchecked'}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'rarity',
    header: 'Rarity'
  },
  {
    accessorKey: 'isDeleted',
    header: 'Status',
    cell: (props) => (
      <div className="flex items-center">
        <span
          className={
            props.row.original.isDeleted === 0
              ? 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
              : 'bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
          }
        >
          {props.row.original.isDeleted === 0 ? 'Active' : 'Inactive'}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'employee.fullName',
    header: 'Trainer',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.employee?.fullName}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'animalSpecies',
    header: 'Species',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.animalSpecies?.speciesName}</span>
      </div>
    )
  },
  {
    accessorKey: 'cage',
    header: 'Cage',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.cage?.name}</span>
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

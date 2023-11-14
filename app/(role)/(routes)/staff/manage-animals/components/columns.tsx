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
  healthStatus: string | number;
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
  isDeleted: number | string;
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
    header: 'Behavior',
    cell: (props) => <div className="line-clamp-3">{props.row.original.behavior}</div>
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
            props.row.original.healthStatus === '0'
              ? 'bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'
              : props.row.original.healthStatus === '2'
              ? 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
          }
        >
          {props.row.original.healthStatus === '0'
            ? 'Undefined'
            : props.row.original.healthStatus === '2'
            ? 'Good'
            : 'Bad'}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'rarity',
    header: 'Rarity',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'isDeleted',
    header: 'Status',
    cell: (props) => (
      <div className="flex items-center">
        <span
          className={
            props.row.original.isDeleted == '0'
              ? 'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'
              : 'bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'
          }
        >
          {props.row.original.isDeleted === '0' ? 'Active' : 'Inactive'}
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
    accessorKey: 'animalSpecies.speciesName',
    header: 'Species',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.animalSpecies?.speciesName}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'cage.name',
    header: 'Cage',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.cage?.name}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { EmpObj } from '../../../../../models/employee';
import { SpeciesObj } from '../../../../../models/species';

export type NewsColumn = {
  id: number;
  title: string;
  content: string;
  image: string;
  tag: string;
  thumbnailImg: string;
  author: string;
  createDate: string;
  employeeId: string;
  employee: EmpObj;
  speciesId: string;
  animalSpecies: SpeciesObj;
  writingDate: string;
  speciesName: string;
  newsId: number;
};

export const columns: ColumnDef<NewsColumn>[] = [
  {
    accessorKey: 'thumbnailImg',
    header: 'Thumbnail Image',
    cell: (props) => (
      <div className="flex items-center">
        <Image
          src={props.row.original.image}
          className="object-cover rounded-md"
          alt={props.row.original.title}
          width={200}
          height={100}
        />
      </div>
    )
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'employeee.fullName',
    header: 'Author',
    cell: (props) => {
      return <div className="">{props.row.original.employee.fullName}</div>;
    }
  },
  {
    accessorKey: 'writingDate',
    header: 'Create Date',
    cell: (props) => {
      return <div>{props.row.original.writingDate.substring(0, 10)}</div>;
    }
  },
  {
    accessorKey: 'animalSpecies.speciesName',
    header: 'Species',
    cell: (props) => {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          {props.row.original.animalSpecies.speciesName}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

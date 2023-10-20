'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { AreaObj } from '@/app/models/area';
import { CellAction } from './cell-action';

export type empCertificateColumn = {
  no: number;
  employeeId: string;
  certificateCode: string;
  description: string;
  certificate: {
    certificateName: string;
  };
};

export const empColumns: ColumnDef<empCertificateColumn>[] = [
  {
    accessorKey: 'certificate',
    header: 'Certificate',
    cell: (props) => (
      <div className="flex items-center">
        <span>{props.row.original.certificate?.certificateName}</span>
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

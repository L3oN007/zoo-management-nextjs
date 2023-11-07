'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { columns } from './columns';

interface ManageCageClientProps {
  data: any;
}

export const ManageCageClient: FC<ManageCageClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Cage (${Object.keys(data).length})`} description="Manage Cage information in the zoo" />

        <Button onClick={() => router.push('/staff/manage-cages/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" placeholder="Search by cage name" />
    </>
  );
};

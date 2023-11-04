'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { columns } from './columns';

interface ManageAreaClientProps {
  data: any;
}

export const ManageAreaClient: FC<ManageAreaClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Areas (${Object.keys(data).length})`} description="Manage Areas in the zoo" />

        <Button onClick={() => router.push('/staff/manage-areas/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="areaName" placeholder="Search by area name" />
    </>
  );
};

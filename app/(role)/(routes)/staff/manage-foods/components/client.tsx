'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { columns } from './columns';
import { FoodColumn } from './foodColumns';

interface ManageFoodClientProps {
  data: any;
}

export const ManageFoodClient: FC<ManageFoodClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Food (${Object.keys(data).length})`} description="Manage Food in the zoo" />
        <div>
          <Button className="ml-2" onClick={() => router.push('/staff/manage-foods/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Food
          </Button>
        </div>
      </div>
      <Separator />

      <DataTable
        key="empCertificate"
        columns={FoodColumn}
        data={data}
        searchKey={'foodName'}
        placeholder="Search by FoodName"
      />
    </>
  );
};

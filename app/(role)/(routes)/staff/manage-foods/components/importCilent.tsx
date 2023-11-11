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

interface ManageImportClientProps {
  data: any;
}

export const ManageImportClient: FC<ManageImportClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`ImportFood (${Object.keys(data).length})`} description="Manage Food in the zoo" />
        <div>
          <Button onClick={() => router.push('/staff/manage-foods/newImport')}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Import
          </Button>
          {/* <Button className="ml-2" onClick={() => router.push("/staff/manage-foods/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Food
                </Button> */}
        </div>
      </div>
      <Separator />
      {/* <div className="flex justify-around">
            <div className="flex-1"> */}
      <DataTable
        key="certificate"
        columns={columns}
        data={data}
        searchKey={'foodInventory_foodName'}
        placeholder="Search by FoodName"
      />
      {/* </div>
            <div className="ml-4">
            <DataTable key="empCertificate" columns={FoodColumn} data={food} searchKey={"foodName"}  filterOptions={null as any} />

            </div>
            </div> */}
    </>
  );
};

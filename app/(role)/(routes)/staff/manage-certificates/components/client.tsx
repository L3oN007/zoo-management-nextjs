'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { columns } from './columns';
import { empColumns } from './empColumns';

interface ManageCertificateClientProps {
  data: any;
  empCer: any;
}

export const ManageCertificateClient: FC<ManageCertificateClientProps> = ({ data, empCer }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Certificate (${Object.keys(data).length})`}
          description="Manage Certificate information of trainer"
        />

        <Button onClick={() => router.push('/staff/manage-certificates/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="flex justify-around">
        <DataTable
          key="certificate"
          columns={columns}
          data={data}
          searchKey="cerName"
          placeholder="Search by certificate name"
          filterOptions={null as any}
        />
        <div className="ml-4">
          <DataTable
            key="empCertificate"
            columns={empColumns}
            data={empCer}
            searchKey={'cerCode'}
            placeholder="Search by employee certificate name"
            filterOptions={null as any}
          />
        </div>
      </div>
    </>
  );
};

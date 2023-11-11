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
}

export const ManageEmpCertificateClient: FC<ManageCertificateClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Certificate  of Trainer (${Object.keys(data).length})`}
          description="Manage Certificate information of trainer"
        />
      </div>
      <Separator />

      <DataTable
        key="empCertificate"
        columns={empColumns}
        data={data}
        searchKey={'employee_fullName'}
        placeholder="Search by Name"
      />
    </>
  );
};

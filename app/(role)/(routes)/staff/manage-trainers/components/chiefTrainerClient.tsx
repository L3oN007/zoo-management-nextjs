'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { columns } from './columns';

interface ManageLeadTrainerClientProps {
  data: any;
}

export const ManageLeadTrainerClient: FC<ManageLeadTrainerClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`ChiefTrainer (${Object.keys(data).length})`}
          description="Manage Trainers' account in the zoo"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="fullName" placeholder="Search by full name" />
    </>
  );
};

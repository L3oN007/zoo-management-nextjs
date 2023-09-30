'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { columns } from './columns';
import { PersonIcon } from '@radix-ui/react-icons';

interface ManageStaffClientProps {
	data: any;
}

export const ManageStaffClient: FC<ManageStaffClientProps> = (data) => {
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title={`Staff (${Object.keys(data.data).length})`} description='Manage Staffs information in the zoo' />
				<Button onClick={() => router.push('/admin/manage-staffs/new')}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data.data} searchKey='fullName' />
		</>
	);
};

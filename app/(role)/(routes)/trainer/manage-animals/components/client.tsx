'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { columns } from './columns';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

interface ManageAnimalClientProps {
	data: any;
}

export const ManageAnimalClient: FC<ManageAnimalClientProps> = ({ data }) => {
	const router = useRouter();
	const statuses = [
		{
			value: "0",
			label: "Active",
			icon: CheckCircledIcon,
		},
		{
			value: "1",
			label: "Inactive",
			icon: CrossCircledIcon,
		},
	]


	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title={`Animals (${Object.keys(data).length})`} description='Manage Animals in the zoo' />
				
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey='fullName' filterOptions={statuses} />
		</>
	);
};

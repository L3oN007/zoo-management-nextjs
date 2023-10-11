'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';

export type NewsColumn = {
	id: string;
	title: string;
	description: string;
	content: string;
	tag: string;
	thumbnailImg: string;
	author: string;
	createDate: string;
};

export const columns: ColumnDef<NewsColumn>[] = [
	{
		accessorKey: 'thumbnailImg',
		header: 'Thumbnail Image',
		cell: (props) => (
			<div className='flex items-center'>
				<Image
					src={props.row.original.thumbnailImg}
					className='object-cover rounded-md'
					alt={props.row.original.title}
					width={200}
					height={100}
				/>
			</div>
		),
	},
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Title
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'author',
		header: 'Author',
		cell: (props) => {
			return (
				<div className='flex flex-wrap w-[100px]'>
					{props.row.original.author}
				</div>
			);
		},
	},
	{
		accessorKey: 'createDate',
		header: 'Create Date',
	},
	{
		accessorKey: 'tag',
		header: 'Tag',
		cell: (props) => {
			return (
				<span className='bg-green-100 text-green-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
					{props.row.original.tag.charAt(0).toUpperCase() +
						props.row.original.tag.slice(1)}
				</span>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];

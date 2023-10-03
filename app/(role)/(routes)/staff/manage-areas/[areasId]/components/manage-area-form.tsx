'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({

	name: z.string().min(1, { message: 'Title must be between 1-50 characters.' }).max(50),


});

type ManageAreasFormValues = z.infer<typeof formSchema>;

interface Areas { }

interface ManageAreasFormProps {
	initialData: Areas | null;
}

export const ManageAreasForm: React.FC<ManageAreasFormProps> = ({ initialData }) => {
	const url = 'https://6511a76d829fa0248e4086dc.mockapi.io/areas';
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');

	const title = initialData ? 'Edit a Areas' : 'Create new Areas';
	const description = initialData ? 'Edit a  areas.' : 'Add a new areas';
	const toastMessage = initialData ? 'Areas name updated.' : 'Areas updated.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<ManageAreasFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {

			name: ''
		},
	});

	const onSubmit = async (data: ManageAreasFormValues) => {
		try {
			setLoading(true);

			// Check if the name already exists in the database
			const existingAreas = await axios.get(url);
			const isDuplicate = existingAreas.data.some((area: ManageAreasFormValues) => area.name === data.name);

			if (isDuplicate) {
				toast.error('Areas with this name already exists.');
			} else {
				if (initialData) {
					await axios.put(url + `/${params.areasId}`, data);
				} else {
					await axios.post(url, data);
				}
				router.refresh();
				router.push(`/staff/manage-areas`);
				toast.success(toastMessage);
			}
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};


	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(url + `/${params.newsId}`);
			router.refresh();
			router.push(`/staff/manage-areas`);
			toast.success('Areas deleted.');
		} catch (error: any) {
			toast.error('Fail to delete.');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button disabled={loading} variant='destructive' size='sm' onClick={() => setOpen(true)}>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>

					<div className='md:grid md:grid-cols-3 gap-8'>

						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder='Billboard label' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};

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
	image: z.string().nullable(),
	fullName: z.string().min(1, { message: 'Full name must be between 1-50 characters.' }).max(50),
	dob: z.string().min(1, { message: 'Date of birth is required.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
		message: 'Phone number must be exactly 10 digits.',
	}),
	isDeleted: z.string(),
	// isDeleted: z.string().refine((value) => value === '0' || value === '1', {
	// 	message: "Status must be either '0' or '1'.",
	// }),
});

type ManageTrainerFormValues = z.infer<typeof formSchema>;

interface Trainer {}

interface ManageTrainerFormProps {
	initialData: Trainer | null;
}

export const ManageTrainerForm: React.FC<ManageTrainerFormProps> = ({ initialData }) => {
	const url = 'https://651822f6582f58d62d356e1a.mockapi.io/trainer';
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');

	const title = initialData ? 'Edit Trainer Account' : 'Create Trainer Account';
	const description = initialData ? 'Edit a Trainer account.' : 'Add a new Trainer account';
	const toastMessage = initialData ? 'Trainer account updated.' : 'Trainer account created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<ManageTrainerFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			image: '',
			fullName: '',
			dob: '',
			email: '',
			phoneNumber: '',
			isDeleted: '',
		},
	});

	const onSubmit = async (data: ManageTrainerFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.put(url + `/${params.trainerId}`, data);
			} else {
				await axios.post(url, data);
			}
			router.refresh();
			router.push(`/staff/manage-trainers-account`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(url + `/${params.trainerId}`);
			router.refresh();
			router.push(`/staff/manage-trainers-account`);
			toast.success('Trainer deleted.');
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
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Trainer Avatar Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={loading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='md:grid md:grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder='Billboard label' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='dob'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of birth</FormLabel>
									<FormControl>
										<Input type='date' disabled={loading} placeholder='Billboard label' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email:</FormLabel>
									<FormControl>
										<Input type='email' disabled={loading} placeholder='Billboard label' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phoneNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone:</FormLabel>
									<FormControl>
										<Input type='tel' disabled={loading} placeholder='Billboard label' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isDeleted'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status:</FormLabel>
									<Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue defaultValue={field.value} placeholder={field.value === '0' ? 'Active' : 'Inactive'} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Status</SelectLabel>
												<SelectItem value='0'>Active</SelectItem>
												<SelectItem value='1'>Inactive</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
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

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
	password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
	confirmpassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

type PasswordFormValues = z.infer<typeof formSchema>;

interface Password {}

interface PasswordFormProps {
	initialData: Password | null;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ initialData }) => {
	const url = 'https://648867740e2469c038fda6cc.mockapi.io/staff';
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const description = initialData ? 'Edit a staff account.' : 'Add a new staff account';
	const toastMessage = initialData ? 'Staff account updated.' : 'Staff account created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<PasswordFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			password: '',
			confirmpassword: '',
		},
	});

	const onSubmit = async (data: PasswordFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.put(url + `/${params.staffId}`, data);
			} else {
				await axios.post(url, data);
			}
			router.refresh();
			router.push(`/admin/manage-staff`);
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
			await axios.delete(url + `/${params.staffId}`);
			router.refresh();
			router.push(`/admin/manage-staff`);
			toast.success('Staff deleted.');
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
				<Heading title={'Password Settings'} description={'The Password Settings Page is where you manage your account password. '} />
				{initialData && (
					<Button disabled={loading} variant='destructive' size='sm' onClick={() => setOpen(true)}>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
					<div className='w-[45%] space-y-5'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder='Password' type='password' {...field} />
									</FormControl>
									<FormDescription>
										Protect your account with a strong password! Make it unique and hard to guess to keep your information safe.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmpassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder='Password' type='password' {...field} />
									</FormControl>
									<FormDescription>
										Confirm your password by re-entering it exactly as you typed it above. This ensures accuracy and helps keep your account secure.
									</FormDescription>
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

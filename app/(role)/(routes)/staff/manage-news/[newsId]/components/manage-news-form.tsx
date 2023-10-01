'use client';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
    thumbnailImg: z.string().nullable(),
    title: z.string().min(1, { message: 'Title must be between 1-50 characters.' }).max(50),
    description: z.string().min(1, { message: 'Description of news is required.' }),
});

type ManageNewsFormValues = z.infer<typeof formSchema>;

interface News { }

interface ManageNewsFormProps {
    initialData: News | null;
}

export const ManageNewsForm: React.FC<ManageNewsFormProps> = ({ initialData }) => {
    const url = 'https://648867740e2469c038fda6cc.mockapi.io/news';
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');

    const title = initialData ? 'Edit Staff Account' : 'Create Staff Account';
    const description = initialData ? 'Edit a staff account.' : 'Add a new staff account';
    const toastMessage = initialData ? 'Staff account updated.' : 'Staff account created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<ManageNewsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            thumbnailImg: '',
            title: '',
            description: '',
        },
    });

    const onSubmit = async (data: ManageNewsFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.put(url + `/${params.newsId}`, data);
            } else {
                await axios.post(url, data);
            }
            router.refresh();
            router.push(`/staff/manage-news`);
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
            await axios.delete(url + `/${params.newsId}`);
            router.refresh();
            router.push(`/staff/manage-news`);
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
            <div className="hidden h-full flex-col md:flex">
                <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <h2 className="text-lg font-semibold overflow-hidden whitespace-nowrap">News Editor</h2>
                    <div className="ml-auto flex w-[90%] space-x-2 sm:justify-end">

                        <Button variant={"secondary"}>Save</Button>
                        {initialData == null && (
                            <Button disabled={loading} variant='destructive' onClick={() => setOpen(true)}>
                                <Trash className='h-4 w-4 mr-2' /> Delete
                            </Button>
                        )}
                    </div>
                </div>
                <Separator />

            </div>

        </>
    );
};

'use client';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ImageUploadNews from '@/components/ui/image-upload-news';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import Editor, { EditorContentChanged } from './editor';
import { format } from "date-fns";
import { useSession } from 'next-auth/react';
import TagInput from '@/components/ui/create-tag';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
    thumbnailImg: z.string().nullable(),
    content: z.string().nullable(),
    // content: z.string().min(1, { message: 'Content of news is required.' }),
    title: z.string().min(1, { message: 'Title must be between 1-50 characters.' }).max(50),
    description: z.string().min(1, { message: 'Description of news is required.' }),
    createDate: z.string().nullable(),
    author: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
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
    const session = useSession();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewContent, setPreviewContent] = useState<string>("");
    // const [editorContent, setEditorContent] = useState<string>('');
    const [editorContent, setEditorContent] = useState<string>(initialData ? initialData.content : '');

    // Define a callback function that matches the EditorContentChanged type
    const handleEditorChange = (changes: EditorContentChanged) => {
        setPreviewContent(changes.html); // You can access the HTML content from changes
        setEditorContent(changes.html);
    };

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
            content: '',
            createDate: '',
            author: '',
        },
    });

    const onSubmit = async (data: ManageNewsFormValues) => {
        try {
            const currentDate = format(new Date(), "yyyy-MM-dd HH:mm");
            data.createDate = currentDate;

            data.author = session.data?.user.username!;

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
                        {initialData && (
                            <Button disabled={loading} variant='destructive' onClick={() => setOpen(true)}>
                                <Trash className='h-4 w-4 mr-2' /> Delete
                            </Button>
                        )}
                    </div>
                </div>
                <Separator />
                <Tabs defaultValue="raw" className="flex-1 h-auto mb-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                            <div className="container h-full py-6 mb-3">
                                <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
                                    <div className="hidden flex-col space-y-6 sm:flex md:order-2">
                                        <div className="grid gap-2">
                                            <HoverCard openDelay={200}>
                                                <HoverCardTrigger asChild>
                                                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Mode
                                                    </span>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-[320px] text-sm" side="left">
                                                    Choose the interface that best suits your task. You can
                                                    provide: a simple prompt to complete, starting and ending
                                                    text to insert a completion within, or some text with
                                                    instructions to edit it.
                                                </HoverCardContent>
                                            </HoverCard>
                                            <TabsList className="grid grid-cols-2">
                                                <TabsTrigger value="raw">
                                                    <span className="sr-only">Raw</span>
                                                    <p>Raw</p>
                                                </TabsTrigger>
                                                <TabsTrigger value="preview">
                                                    <span className="sr-only">Preview</span>
                                                    <p>Preview</p>
                                                </TabsTrigger>
                                            </TabsList>
                                        </div>
                                        {/* TODO: Code here */}
                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name='thumbnailImg'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Thumbnail image</FormLabel>
                                                        <FormControl>
                                                            <ImageUploadNews
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
                                            <FormField
                                                control={form.control}
                                                name='title'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>News Title</FormLabel>
                                                        <FormControl>
                                                            <Textarea disabled={loading} placeholder='News title here' className='max-h-[100px]' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name='description'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>News Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea disabled={loading} placeholder='News title here' className='max-h-[120px] h-[120px]' {...field} />
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
                                            <Button disabled={loading} className='ml-auto' type='submit'>
                                                Submit
                                            </Button>

                                        </div>
                                    </div>
                                    <div className="md:order-1">
                                        <TabsContent value="raw" className="mt-0 border-0 p-0">
                                            <div className="flex h-full flex-col space-y-4">
                                                {/* <Textarea
                                                    placeholder="Write a tagline for an ice cream shop"
                                                    className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                                                /> */}
                                                <FormField
                                                    control={form.control}
                                                    name='content'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>News Description</FormLabel>
                                                            <FormControl>
                                                                <Editor onChange={handleEditorChange} value={editorContent} />

                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                            </div>
                                        </TabsContent>
                                        {/* TODO: Preview here */}
                                        <TabsContent value="preview" className="mt-0 border-0 p-0">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex h-full flex-col space-y-4">
                                                    <Card className='px-5 py-3'>
                                                        <div className="html-preview" dangerouslySetInnerHTML={{ __html: previewContent }} />
                                                    </Card>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </Tabs>
            </div>

        </>
    );
};

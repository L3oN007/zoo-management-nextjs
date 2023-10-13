'use client';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ImageUploadNews from '@/components/ui/image-upload-news';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Check, ChevronsUpDown, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import Editor, { EditorContentChanged } from './editor';

const formSchema = z.object({
	title: z.string().min(1, { message: 'Title must be between 1-50 characters.' }),
	content: z.string().nullable(),
	writingDate: z.string().nullable(),
	image: z.string().nullable(),
	// content: z.string().min(1, { message: 'Content of news is required.' }),
	employeeId: z.string().nullable(),
	specieId: z.string().nullable(),
	animalId: z.string().nullable(),
});

type ManageNewsFormValues = z.infer<typeof formSchema>;

interface News {
	content: string;
}

interface ManageNewsFormProps {
	initialData: News | null;
}

export const ManageNewsForm: React.FC<ManageNewsFormProps> = ({ initialData }) => {
	const url = 'https://648867740e2469c038fda6cc.mockapi.io/news';
	const specieUrl = 'https://651d776944e393af2d59dbd7.mockapi.io/specie';
	const animalUrl = 'https://651d776944e393af2d59dbd7.mockapi.io/specie';
	const params = useParams();
	const router = useRouter();
	const session = useSession();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [specieData, setSpecieData] = useState([]);
	const [animalData, setAnimalData] = useState([]);
	const [openComboBoxSpecie, setOpenComboBoxSpecie] = useState(false);
	const [openComboBoxAnimal, setOpenComboBoxAnimal] = useState(false);
	useEffect(() => {
		axios
			.get(specieUrl)
			.then((response) => {
				const species = response.data.map((specie: any) => specie.name);
				setSpecieData(species);
			})
			.catch((error) => {
				console.error('Error fetching data from API:', error);
			});
		axios
			.get(specieUrl)
			.then((response) => {
				const animals = response.data.map((animal: any) => animal.name);
				setAnimalData(animals);
			})
			.catch((error) => {
				console.error('Error fetching data from API:', error);
			});
	}, []);
	const [previewContent, setPreviewContent] = useState<string>('');
	const [editorContent, setEditorContent] = useState<string>(initialData ? initialData.content : '');

	// Define a callback function that matches the EditorContentChanged type
	const handleEditorChange = (changes: EditorContentChanged) => {
		setPreviewContent(changes.html); // You can access the HTML content from changes
		setEditorContent(changes.html);
	};
	const displayHTMLTags = () => {
		if (typeof editorContent === 'string') {
			const encodedHTML = editorContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return { __html: encodedHTML };
		}
		return { __html: '' };
	};

	const title = initialData ? 'Edit Staff Account' : 'Create Staff Account';
	const description = initialData ? 'Edit a staff account.' : 'Add a new staff account';
	const toastMessage = initialData ? 'News updated.' : 'News created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<ManageNewsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			image: '',
			title: '',
			content: '',
			writingDate: '',
			employeeId: '',
			specieId: '',
			animalId: '',
		},
	});

	const onSubmit = async (data: ManageNewsFormValues) => {
		try {
			const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm');
			data.writingDate = currentDate;

			data.employeeId = session.data?.user.username!;
			data.content = editorContent;

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
			<div className='hidden h-full flex-col md:flex'>
				<div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
					<h2 className='text-lg font-semibold overflow-hidden whitespace-nowrap'>News Editor</h2>
					<div className='ml-auto flex w-[90%] space-x-2 sm:justify-end'>
						<Button variant={'secondary'}>Save</Button>
						{initialData && (
							<Button disabled={loading} variant='destructive' onClick={() => setOpen(true)}>
								<Trash className='h-4 w-4 mr-2' /> Delete
							</Button>
						)}
					</div>
				</div>
				<Separator />
				<Tabs defaultValue='raw' className='flex-1 h-auto mb-3'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
							<div className='container h-full py-6 mb-3'>
								<div className='grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]'>
									<div className='hidden flex-col space-y-6 sm:flex md:order-2'>
										<div className='grid gap-2'>
											<HoverCard openDelay={200}>
												<HoverCardTrigger asChild>
													<span className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Mode</span>
												</HoverCardTrigger>
												<HoverCardContent className='w-[320px] text-sm' side='left'>
													Choose the interface that best suits your task. You can provide: a simple prompt to complete, starting and ending text to
													insert a completion within, or some text with instructions to edit it.
												</HoverCardContent>
											</HoverCard>
											<TabsList className='grid grid-cols-2'>
												<TabsTrigger value='raw'>
													<span className='sr-only'>Raw</span>
													<p>Raw</p>
												</TabsTrigger>
												<TabsTrigger value='preview'>
													<span className='sr-only'>Preview</span>
													<p>Preview</p>
												</TabsTrigger>
											</TabsList>
										</div>
										{/* TODO: Code here */}
										<div className='space-y-2'>
											<FormField
												control={form.control}
												name='image'
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
												name='specieId'
												render={({ field }) => {
													return (
														<FormItem>
															<FormLabel>Specie ID</FormLabel>
															<FormControl>
																<Popover open={openComboBoxSpecie} onOpenChange={setOpenComboBoxSpecie}>
																	<PopoverTrigger asChild>
																		<Button
																			variant='outline'
																			role='combobox'
																			aria-expanded={open}
																			className='w-full flex items-center justify-between'
																		>
																			<div>{field.value ? specieData.find((item) => item === field.value) : 'Select AreaID...'}</div>
																			<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
																		</Button>
																	</PopoverTrigger>
																	<PopoverContent className='w-[200px] p-0'>
																		<Command>
																			<CommandInput placeholder='Search Specie ID...' />
																			<CommandEmpty>No Specie ID found.</CommandEmpty>
																			<CommandGroup>
																				{specieData.map((item) => (
																					<CommandItem
																						key={item}
																						onSelect={() => {
																							// Set the selected value in the field
																							field.onChange(item === field.value ? '' : item);
																							setOpenComboBoxSpecie(false);
																						}}
																					>
																						<Check className={cn('mr-2 h-4 w-4', item === field.value ? 'opacity-100' : 'opacity-0')} />
																						{item}
																					</CommandItem>
																				))}
																			</CommandGroup>
																		</Command>
																	</PopoverContent>
																</Popover>
															</FormControl>
															<FormMessage />
														</FormItem>
													);
												}}
											/>
											<FormField
												control={form.control}
												name='animalId'
												render={({ field }) => {
													return (
														<FormItem>
															<FormLabel>Specie ID</FormLabel>
															<FormControl>
																<Popover open={openComboBoxAnimal} onOpenChange={setOpenComboBoxAnimal}>
																	<PopoverTrigger asChild>
																		<Button
																			variant='outline'
																			role='combobox'
																			aria-expanded={open}
																			className='w-full flex items-center justify-between'
																		>
																			<div>{field.value ? animalData.find((item) => item === field.value) : 'Select AreaID...'}</div>
																			<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
																		</Button>
																	</PopoverTrigger>
																	<PopoverContent className='w-[200px] p-0'>
																		<Command>
																			<CommandInput placeholder='Search Specie ID...' />
																			<CommandEmpty>No Specie ID found.</CommandEmpty>
																			<CommandGroup>
																				{animalData.map((item) => (
																					<CommandItem
																						key={item}
																						onSelect={() => {
																							// Set the selected value in the field
																							field.onChange(item === field.value ? '' : item);
																							setOpenComboBoxAnimal(false);
																						}}
																					>
																						<Check className={cn('mr-2 h-4 w-4', item === field.value ? 'opacity-100' : 'opacity-0')} />
																						{item}
																					</CommandItem>
																				))}
																			</CommandGroup>
																		</Command>
																	</PopoverContent>
																</Popover>
															</FormControl>
															<FormMessage />
														</FormItem>
													);
												}}
											/>
											<Button disabled={loading} className='ml-auto' type='submit'>
												{action}
											</Button>
										</div>
									</div>
									<div className='md:order-1'>
										<TabsContent value='raw' className='mt-0 border-0 p-0'>
											<div className='flex h-full flex-col space-y-4'>
												<Editor onChange={handleEditorChange} value={editorContent} />
											</div>
										</TabsContent>
										{/* TODO: Preview here */}
										<TabsContent value='preview' className='mt-0 border-0 p-0'>
											<div className='flex flex-col space-y-4'>
												<div className='flex h-full flex-col space-y-4'>
													<Card className='px-5 py-3'>
														<div className='App-preview'>
															<h2>Normal Text</h2>
															<div
																className='html-preview'
																dangerouslySetInnerHTML={{
																	__html: previewContent,
																}}
															/>
														</div>
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

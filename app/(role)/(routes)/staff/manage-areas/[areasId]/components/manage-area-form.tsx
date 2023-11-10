'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Check, ChevronsUpDown, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  areaId: z.string().min(1, { message: 'AreaId must have Alphabet' }).max(1),
  areaName: z.string().min(1, { message: 'Title must be between 1-50 characters.' }).max(50),
  employeeId: z.string().min(1, { message: 'EmployeeID must be required' })
});

type ManageAreasFormValues = z.infer<typeof formSchema>;

interface Areas {}

interface ManageAreasFormProps {
  initialData: Areas | null;
}

export const ManageAreasForm: React.FC<ManageAreasFormProps> = ({ initialData }) => {
  const urlDelete = process.env.NEXT_PUBLIC_API_DELETE_AREAS;
  const urlUpdate = process.env.NEXT_PUBLIC_API_UPDATE_AREAS;
  const urlCreate = process.env.NEXT_PUBLIC_API_CREATE_AREAS;

  const params = useParams();
  const router = useRouter();

  const [openComboBox, setOpenComboBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_LOAD_TRAINERS!)
      .then((response) => {
        const employeeId = response.data.map((item: any) => item.employeeId);
        console.log(employeeId);
        setEmployeeData(employeeId);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const title = initialData ? 'Edit a Areas' : 'Create new Areas';
  const description = initialData ? 'Edit a  areas.' : 'Add a new areas';
  const toastMessage = initialData ? 'Areas updated.' : 'Areas created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ManageAreasFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      areaId: '',
      areaName: '',
      employeeId: ''
    }
  });

  const onSubmit = async (data: ManageAreasFormValues) => {
    try {
      if (initialData) {
        await axios.put(urlUpdate + `${params.areasId}`, data);
      } else {
        await axios.post(urlCreate + ``, data);
      }
      router.refresh();
      router.push(`/staff/manage-areas`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error.response.data.title);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(urlDelete + `${params.areasId}`);
      router.refresh();
      router.push(`/staff/manage-areas`);
      toast.success('Areas deleted.');
    } catch (error: any) {
      toast.error(error.response.data.title);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="areaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Id</FormLabel>
                  <FormControl>
                    <Input
                      className="read-only:bg-gray-100"
                      readOnly={!!initialData}
                      disabled={loading}
                      placeholder="[A-Z]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Area name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>EmployeeId</FormLabel>
                    <FormControl>
                      <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full flex items-center justify-between"
                          >
                            <div>
                              {field.value ? employeeData.find((item) => item === field.value) : 'Select EmployeeId...'}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search EmployeeId..." />
                            <CommandEmpty>No CertificateName found.</CommandEmpty>
                            <CommandGroup>
                              {employeeData.map((item) => (
                                <CommandItem
                                  key={item}
                                  onSelect={() => {
                                    // Set the selected value in the field
                                    field.onChange(item === field.value ? '' : item);
                                    setOpenComboBox(false);
                                  }}
                                >
                                  <Check
                                    className={cn('mr-2 h-4 w-4', item === field.value ? 'opacity-100' : 'opacity-0')}
                                  />
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
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

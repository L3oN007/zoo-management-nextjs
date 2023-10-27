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
import { useSession } from 'next-auth/react';
// import { render } from 'react-dom';

const formSchema = z.object({
  certificateCode: z.string().min(1, { message: 'Certificate code is required.' }),
  employeeId: z.string(),

  description: z.string().min(1, { message: 'Description is required.' })
});

type ManageCertificateFormValues = z.infer<typeof formSchema>;

interface Certificate {}

interface ManageCertificateFormProps {
  initialData: Certificate | null;
}

export const ManageCertificateForm: React.FC<ManageCertificateFormProps> = ({ initialData }) => {
  const params = useParams();
  const session = useSession();
  const router = useRouter();
  const [openComboBox, setOpenComboBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_LOAD_CERTIFICATE!)
      .then((response) => {
        const certificateCode = response.data.map((item: any) => item.certificateCode);
        console.log(certificateCode);
        setCertificateData(certificateCode);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const title = initialData ? 'Edit certificate' : 'Create new certificate';
  const description = initialData ? 'Edit certificate.' : 'Add a new certificate';
  const toastMessage = initialData ? 'Certificate updated.' : 'New certificate added.';
  const action = initialData ? 'Save changes' : 'Create';
  const [noCounter, setNoCounter] = useState(1);

  const form = useForm<ManageCertificateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      certificateCode: '',
      employeeId: '',
      description: ''
    }
  });

  const onSubmit = async (data: ManageCertificateFormValues) => {
    data.employeeId = `${session.data?.user.employeeId}`;
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(process.env.NEXT_PUBLIC_API_UPDATE_EMPLOYEECERTIFICATE + `${params.cerCode}`, data);
      } else {
        await axios.post(process.env.NEXT_PUBLIC_API_CREATE_EMPLOYEECERTIFICATE!, data);
        console.log(123);
      }
      router.refresh();
      router.push(`/trainer/manage-certificates`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error.response.data.title);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(process.env.NEXT_PUBLIC_API_DELETE_EMPLOYEECERTIFICATE + `${params.cerCode}`);
      await router.refresh();
      await router.push(`/trainer/manage-certificates`);
      toast.success('Certificate deleted.');
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
          <div className="md:grid md:grid-cols-4 gap-8">
            {initialData ? (
              <FormField
                control={form.control}
                name="certificateCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Certificate Code"
                        readOnly={initialData ? true : false}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="certificateCode"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>CertificateCode</FormLabel>
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
                                {field.value
                                  ? certificateData.find((item) => item === field.value)
                                  : 'Select CertificateCode...'}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search CertificateCode..." />
                              <CommandEmpty>No CertificateCode found.</CommandEmpty>
                              <CommandGroup>
                                {certificateData.map((item) => (
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
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" disabled={loading} placeholder="Employee ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

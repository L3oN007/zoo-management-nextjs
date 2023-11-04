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
import { CageObj } from '@/app/models/cage';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
  certificateCode: z.string().min(1, { message: 'Certificate code is required.' }),
  certificateName: z.string().min(1, { message: 'Certificate name is required.' }),
  level: z.string().min(1, { message: 'Certificate name is required.' }),

  trainingInstitution: z.string().min(1, { message: 'Training Institution is required.' }).max(5000)
});

type ManageCertificateFormValues = z.infer<typeof formSchema>;

interface Certificate {}

interface ManageCertificateFormProps {
  initialData: Certificate | null;
}
export const ManageCertificateForm: React.FC<ManageCertificateFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit certificate' : 'Create new certificate';
  const description = initialData ? 'Edit certificate.' : 'Add a new certificate';
  const toastMessage = initialData ? 'Certificate updated.' : 'New certificate added.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ManageCertificateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      certificateCode: '',
      certificateName: '',
      level: '',
      trainingInstitution: ''
    }
  });

  const onSubmit = async (data: ManageCertificateFormValues) => {
    debugger;
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(process.env.NEXT_PUBLIC_API_UPDATE_CERTIFICATE + `${params.cerCode}`, data);
      } else {
        await axios.post(process.env.NEXT_PUBLIC_API_CREATE_CERTIFICATE!, data);
      }
      router.refresh();
      router.push(`/staff/manage-certificates`);
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
      await axios.delete(process.env.NEXT_PUBLIC_API_DELETE_CERTIFICATE + `${params.cerCode}`);
      router.refresh();
      router.push(`/staff/manage-certificates`);
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
            <FormField
              control={form.control}
              name="certificateCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Code</FormLabel>
                  <FormControl>
                    <Input
                      className="read-only:bg-gray-100"
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
            <FormField
              control={form.control}
              name="certificateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Certificate Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} // Convert the value to a string here
                    defaultValue={field.value} // Convert the default value to a string
                  >
                    {field.value ? (
                      <>
                        <SelectTrigger>
                          <SelectValue>{field.value}</SelectValue>
                        </SelectTrigger>
                      </>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose a Level</SelectValue>
                      </SelectTrigger>
                    )}
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Level:</SelectLabel>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trainingInstitution"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Training Institution</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Training institution" {...field} />
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

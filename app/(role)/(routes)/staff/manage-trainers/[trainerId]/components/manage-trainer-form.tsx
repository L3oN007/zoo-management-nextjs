'use client';

import dotenv from 'dotenv';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

dotenv.config();

const formSchema = z.object({
  employeeId: z.string().refine((value) => /^E\d{3}$/.test(value), {
    message: 'ID must be in the format EXXX where XXX is a 3-digit number.'
  }),
  image: z.string().nullable(),
  fullName: z.string().min(1, { message: 'Full name must be between 1-50 characters.' }).max(50),
  citizenId: z.string().min(1, { message: 'Citizen ID is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: 'Phone number must be exactly 10 digits.'
  }),
  employeeStatus: z.coerce.number()
});

type ManageTrainerFormValues = z.infer<typeof formSchema>;

interface Trainer {}

interface ManageTrainerFormProps {
  initialData: Trainer | null;
}

export const ManageTrainerForm: React.FC<ManageTrainerFormProps> = ({ initialData }) => {
  const urlPut = process.env.NEXT_PUBLIC_API_UPDATE_TRAINER;
  const urlPost = process.env.NEXT_PUBLIC_API_CREATE_TRAINER || '';
  const urlDelete = process.env.NEXT_PUBLIC_API_DELETE_TRAINER;

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
      employeeId: '',
      image: '',
      fullName: '',
      citizenId: '',
      email: '',
      phoneNumber: '',
      employeeStatus: 0
    }
  });

  const onSubmit = async (data: ManageTrainerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(urlPut + `?id=${params.trainerId}`, data);
      } else {
        await axios.post(urlPost, data);
      }
      router.refresh();
      router.push(`/staff/manage-trainers/normal`);
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
      await axios.put(urlDelete + `?id=${params.trainerId}`);
      router.refresh();
      router.push(`/staff/manage-trainers/normal`);
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff Avatar Image</FormLabel>
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
          <div className="md:grid md:grid-cols-3 gap-8 w-[70%]">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer ID</FormLabel>
                  <FormControl>
                    <Input
                      className="read-only:bg-gray-100"
                      readOnly={!!initialData}
                      disabled={loading}
                      placeholder="Trainer ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="citizenId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Citizen ID:</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type="tel" disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {initialData ? (
              <FormField
                control={form.control}
                name="employeeStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status:</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value.toString()} // Convert the value to a string here
                      defaultValue={field.value.toString()} // Convert the default value to a string
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value == 0 ? 'Active' : 'Inactive'}>
                            {field.value == 0 ? 'Active' : 'Inactive'}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="0">Active</SelectItem>
                          <SelectItem value="1">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="employeeStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="hidden"
                        defaultValue={'0'}
                        disabled={loading}
                        placeholder="Billboard label"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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
import { log } from 'console';

const formSchema = z.object({
  speciesId: z.coerce.number(),
  speciesName: z.string().min(1, { message: "Species' name is required." })
});

type ManageSpeciesFormValues = z.infer<typeof formSchema>;

interface Species {}

interface ManageSpeciesFormProps {
  initialData: Species | null;
}

export const ManageSpeciesForm: React.FC<ManageSpeciesFormProps> = ({ initialData }) => {
  const deleteAPI = process.env.NEXT_PUBLIC_API_DELETE_ANIMALSPECIES;
  const updateAPI = process.env.NEXT_PUBLIC_API_UPDATE_ANIMALSPECIES;
  const createAPI = process.env.NEXT_PUBLIC_API_CREATE_ANIMALSPECIES;
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const title = initialData ? 'Edit Species information' : 'Add new Species';
  const description = initialData ? 'Edit an Species.' : 'Add new Species';
  const toastMessage = initialData ? 'Species information updated.' : 'Species Added.';
  const action = initialData ? 'Save changes' : 'Add';

  const form = useForm<ManageSpeciesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      speciesName: ''
    }
  });

  const onSubmit = async (data: ManageSpeciesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios
          .put(updateAPI+'', data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(data);
      } else {
        await axios.post(createAPI + ``, data);
      }
      router.refresh();
      router.push(`/trainer/manage-species`);
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
      await axios.delete(deleteAPI + `${params.speciesId}`);
      router.refresh();
      router.push(`/trainer/manage-species`);
      toast.success('Species deleted.');
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
              name="speciesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species ID</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="SpeciesID" readOnly={initialData ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speciesName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
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

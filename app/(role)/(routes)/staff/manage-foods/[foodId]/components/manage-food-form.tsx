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

const formSchema = z.object({
  inventoryQuantity: z.coerce.number().refine((value) => value >= 0, {
    message: 'InventoryQuantity must be greater than 0.'
  }),
  foodId: z
    .string()
    .trim()
    .refine(
      (value) => {
        const regex = /^FD\d{2}/;
        return regex.test(value);
      },
      {
        message: 'ID must be in format FDXX with A being an uppercase letter and XX being a 2 digit number'
      }
    ),
  foodName: z.string().min(1, { message: 'Food Names is required.' })
});

type ManageFoodFormValues = z.infer<typeof formSchema>;

interface Food {}

interface ManageFoodFormProps {
  initialData: Food | null;
}

export const ManageFoodForm: React.FC<ManageFoodFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const url = 'https://652d3b33f9afa8ef4b27101b.mockapi.io/food';
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line import/no-anonymous-default-export

  const title = initialData ? 'Edit food' : 'Create new food';
  const description = initialData ? 'Edit food' : 'Add a new food';
  const toastMessage = initialData ? 'Food updated.' : 'New food added.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ManageFoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      foodName: '',
      inventoryQuantity: 0,
      foodId: ''
    }
  });

  const onSubmit = async (data: ManageFoodFormValues) => {
    debugger;
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(process.env.NEXT_PUBLIC_API_UPDATE_FOOD + `${params.foodId}`, data);
      } else {
        await axios.post(process.env.NEXT_PUBLIC_API_CREATE_FOOD!, data);
      }
      router.refresh();
      router.push(`/staff/manage-foods/food`);
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
      await axios.delete(process.env.NEXT_PUBLIC_API_DELETE_FOOD + `${params.foodId}`);
      router.refresh();
      router.push(`/staff/manage-foods/food`);
      toast.success('Foods deleted.');
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
              name="foodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food ID</FormLabel>
                  <FormControl>
                    <Input
                      className="read-only:bg-gray-100"
                      readOnly={!!initialData}
                      disabled={loading}
                      placeholder="Format: FD _ _"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FoodName</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="FoodName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inventoryQuantity"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Inventory Quantity</FormLabel> */}
                  <FormControl>
                    <Input type="hidden" disabled={loading} placeholder="Inventory Quantity" {...field} />
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

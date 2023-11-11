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

const formSchema = z.object({
  importDate: z.string().min(1, { message: 'Import Date is required.' }),
  importQuantity: z.coerce.number().refine((value) => value > 0, {
    message: 'Import Quantity must be greater than 0.'
  }),
  foodId: z.string().min(1, { message: 'Food name is required.' })
});

type ManageImportFormValues = z.infer<typeof formSchema>;

interface Food {
  foodId: string;
  foodName: string;
  inventoryQuantity: number;
}

interface ManageImportFormProps {
  initialData: Food | null;
}

export const ManageImportForm: React.FC<ManageImportFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [openComboBox, setOpenComboBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line import/no-anonymous-default-export
  useEffect(() => {
    axios
      .get<Food[]>('http://localhost:5000/api/FoodInventories/foods')
      .then((response) => setFoodData(response.data))
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách trainers:', error);
        setLoading(false);
      });
  }, []);

  const title = initialData ? 'Edit import history' : 'Create new import';
  const description = initialData ? 'Edit import history.' : 'Add a new import';
  const toastMessage = initialData ? 'Import history updated.' : 'New import added.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ManageImportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      importDate: '',
      importQuantity: 0,
      foodId: ''
    }
  });

  const onSubmit = async (data: ManageImportFormValues) => {
    console.log(params.foodId);
    console.log('abc');
    try {
      setLoading(true);
      if (initialData) {
        // await axios.put(`${url}/${params.no}`, data);
      } else {
        await axios.post(process.env.NEXT_PUBLIC_API_CREATE_IMPORTFOOD!, data);
      }
      router.refresh();
      router.push(`/staff/manage-foods/importHistory`);
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
      // await axios.delete(url + `/${params.no}`);
      router.refresh();
      router.push(`/staff/manage-foods/importHistory`);
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
              name="importQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Import Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Import Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="importDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ImportDate</FormLabel>
                  <FormControl>
                    <Input type="date" disabled={loading} placeholder="ImportDate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FoodName:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} // Convert the value to a string here
                    defaultValue={field.value} // Convert the default value to a string
                  >
                    {field.value ? (
                      <>
                        <SelectTrigger>
                          <SelectValue>{foodData.find((food) => food.foodId == field.value)?.foodName}</SelectValue>
                        </SelectTrigger>
                      </>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose a Food</SelectValue>
                      </SelectTrigger>
                    )}
                    <SelectContent>
                      <SelectGroup>
                        {foodData.map((food) => (
                          <SelectItem key={food.foodId} value={food?.foodId.toString()}>
                            {food.foodName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

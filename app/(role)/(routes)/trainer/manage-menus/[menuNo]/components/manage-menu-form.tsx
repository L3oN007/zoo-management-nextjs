'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Check, ChevronsUpDown, Trash } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  menuNo: z
    .string()
    .trim()
    .refine(
      (value) => {
        const regex = /^MNU\d{3}$/;
        return regex.test(value);
      },
      {
        message: 'MenuNo must be in format MNUXXX with MNU being an uppercase letter and XXX being a 3 digit number'
      }
    ),
  menuName: z.string().min(1, { message: "Schedule's name is required." }),
  foodId: z.string().min(1, { message: 'Food ID is required.' }),
  speciesId: z.number().min(1, { message: 'Species ID is required' })
});

type ManageScheduleFormValues = z.infer<typeof formSchema>;

interface Schedule {}

interface Food {
  foodId: string;
  foodName: string;
}
interface Species {
  speciesId: number;
  speciesName: string;
}
interface ManageScheduleFormProps {
  initialData: Schedule | null;
}

export const ManageScheduleForm: React.FC<ManageScheduleFormProps> = ({ initialData }) => {
  const urlPost = process.env.NEXT_PUBLIC_API_CREATE_MENU;
  const urlPut = process.env.NEXT_PUBLIC_API_UPDATE_MENU;
  const urlDelete = process.env.NEXT_PUBLIC_API_DELETE_MENU;

  const loadFoodsUrl = process.env.NEXT_PUBLIC_API_LOAD_FOOD;
  const loadSpeciesUrl = process.env.NEXT_PUBLIC_API_LOAD_ANIMALSPECIES;

  const params = useParams();
  const router = useRouter();

  const [speciesData, setSpeciesData] = useState<Species[]>([]);
  const [foodData, setFoodData] = useState<Food[]>([]);

  const [openComboBoxSpecies, setOpenComboBoxSpecies] = useState(false);
  const [openComboBoxFood, setOpenComboBoxFood] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit menu information' : 'Add new menu';
  const description = initialData ? 'Edit an menu.' : 'Add new menu';
  const toastMessage = initialData ? 'Menu information updated.' : 'Menu Added.';
  const action = initialData ? 'Save changes' : 'Add';

  const form = useForm<ManageScheduleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      menuNo: '',
      menuName: '',
      foodId: '',
      speciesId: 0
    }
  });

  useEffect(() => {
    axios
      .get(loadSpeciesUrl!)
      .then((response) => {
        setSpeciesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
    axios
      .get(loadFoodsUrl!)
      .then((response) => {
        setFoodData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const onSubmit = async (data: ManageScheduleFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(urlPut + `${params.menuNo}`, data);
      } else {
        await axios.post(urlPost!, data);
      }
      router.refresh();
      router.push(`/trainer/manage-menus`);
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
      await axios.delete(urlDelete! + `${params.menuNo}`);
      router.refresh();
      router.push(`/trainer/manage-menus`);
      toast.success('Menu deleted.');
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
              name="menuNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu No</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Menu No" readOnly={initialData ? true : false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="menuName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Menu Name" {...field} />
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
                  <FormLabel>Food Name</FormLabel>
                  <FormControl>
                    <Popover open={openComboBoxFood} onOpenChange={setOpenComboBoxFood}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full flex items-center justify-between"
                        >
                          <div>
                            {field.value
                              ? foodData.find((food) => food.foodId === field.value)?.foodName
                              : 'Select food...'}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Food ..." />
                          <CommandEmpty>No food found.</CommandEmpty>
                          <CommandGroup>
                            {foodData.map((food) => (
                              <CommandItem
                                key={food.foodId}
                                onSelect={() => {
                                  field.onChange(food.foodId === field.value ? '' : food.foodId);
                                  setOpenComboBoxFood(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    food.foodId === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {food.foodName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speciesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species Name</FormLabel>
                  <FormControl>
                    <Popover open={openComboBoxSpecies} onOpenChange={setOpenComboBoxSpecies}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full flex items-center justify-between"
                        >
                          <div>
                            {field.value
                              ? speciesData.find((species) => species.speciesId === field.value)?.speciesName
                              : 'Select species...'}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Species..." />
                          <CommandEmpty>No Specie found.</CommandEmpty>
                          <CommandGroup>
                            {speciesData.map((species) => (
                              <CommandItem
                                key={species.speciesId}
                                onSelect={() => {
                                  field.onChange(species.speciesId === field.value ? '' : species.speciesId);
                                  setOpenComboBoxSpecies(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    species.speciesId === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {species.speciesName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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

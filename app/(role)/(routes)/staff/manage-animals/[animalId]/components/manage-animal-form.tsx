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
import { da } from 'date-fns/locale';

const formSchema = z.object({
  animalId: z
    .string()
    .trim()
    .refine(
      (value) => {
        const regex = /^ANI\d{3}/;
        return regex.test(value);
      },
      {
        message: 'ID must be in format ANIXXX with A being an uppercase letter and XXX being a 3 digit number'
      }
    ),
  image: z.object({ url: z.string() }).array() || z.string().optional(),
  name: z.string().min(1, { message: 'Full name must be between 1-50 characters.' }).max(50),
  birthDate: z.string().min(1, { message: 'Region is required.' }),
  importDate: z.string().min(1, { message: 'Region is required.' }),
  region: z.string().min(1, { message: 'Region is required.' }),
  behavior: z.string().min(1, { message: 'Behavior is required.' }),
  healthStatus: z.coerce.number(),
  isDeleted: z.coerce.number(),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  rarity: z.string().min(1, { message: 'Rarity is required.' }),
  employeeId: z.string().min(1, { message: 'Trainer is required.' }),
  cageId: z.string().min(1, { message: 'Cage is required.' }),
  speciesId: z.number().min(1, { message: 'Species is required.' })
});

type ManageAnimalFormValues = z.infer<typeof formSchema>;

interface Animal {}

interface Trainer {
  employeeId: string;
  fullName: string;
  citizenId: string;
  email: string;
  phoneNumber: string;
  image: string;
  role: string;
  employeeStatus: number;
}
interface Cage {
  cageId: string;
  name: string;
  maxCapacity: 0;
  areaId: string;
}
interface Species {
  speciesId: number;
  speciesName: string;
}
interface ManageAnimalFormProps {
  initialData: Animal | null;
}
export const ManageAnimalForm: React.FC<ManageAnimalFormProps> = ({ initialData }) => {
  const deleteAPI = process.env.NEXT_PUBLIC_API_DELETE_ANIMALS;
  const updateAPI = process.env.NEXT_PUBLIC_API_UPDATE_ANIMALS;
  const createAPI = process.env.NEXT_PUBLIC_API_CREATE_ANIMALS;
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [cages, setCages] = useState<Cage[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);

  const getTrainerNameByID = (id: string | undefined) => {
    return trainers.find((trainer) => trainer.employeeId === id);
  };
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Format the date to "YYYY-MM-DD"
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Set the max date in state
    setMaxDate(formattedDate);
  }, []);

  useEffect(() => {
    axios
      .get<Trainer[]>('http://localhost:5000/api/Employees/trainers')
      .then((response) => setTrainers(response.data))
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách trainers:', error);
        setLoading(false);
      });

    axios
      .get<Cage[]>('http://localhost:5000/api/Cages/load-cages')
      .then((response) => setCages(response.data))
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách Cages:', error);
        setLoading(false);
      });
    axios
      .get<Species[]>('http://localhost:5000/api/AnimalSpecies/species')
      .then((response) => setSpecies(response.data))
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách Species:', error);
        setLoading(false);
      });
  }, []);

  const title = initialData ? 'Edit Animal information' : 'Import new animal';
  const description = initialData ? 'Edit an animal.' : 'Import new animal';
  const toastMessage = initialData ? 'Animal information updated.' : 'Animal imported.';
  const action = initialData ? 'Save changes' : 'Import';

  const form = useForm<ManageAnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      animalId: '',
      image: [] || '',
      name: '',
      birthDate: '',
      importDate: '',
      region: '',
      behavior: '',
      healthStatus: 0,
      isDeleted: 0,
      gender: '',
      rarity: '',
      employeeId: '',
      cageId: '',
      speciesId: 0
    }
  });

  const onSubmit = async (data: ManageAnimalFormValues) => {
    const arrayimg = data.image.map((obj) => obj.url);
    data.image = '[' + arrayimg.toString() + ']';
    try {
      setLoading(true);
      if (initialData) {
        await axios
          .put(updateAPI + `${params.animalId}`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(data);
      } else {
        console.log(data);

        await axios.post(createAPI + ``, data);
      }
      router.refresh();
      router.push(`/staff/manage-animals`);
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
      await axios.delete(deleteAPI + `${params.animalId}`);
      router.refresh();
      router.push(`/staff/manage-animals`);
      toast.success('Animal deleted.');
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
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="animalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AnimalId</FormLabel>
                  <FormControl>
                    <Input
                      className="read-only:bg-gray-100"
                      readOnly={!!initialData}
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      max={maxDate}
                      type="date"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
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
                    <Input max={maxDate} type="date" disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region:</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="behavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behavior:</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()} // Convert the value to a string here
                    defaultValue={field.value.toString()} // Convert the default value to a string
                  >
                    {field.value ? (
                      <SelectTrigger>
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose the Gender</SelectValue>
                      </SelectTrigger>
                    )}
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rarity:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()} // Convert the value to a string here
                    defaultValue={field.value.toString()} // Convert the default value to a string
                  >
                    {field.value ? (
                      <SelectTrigger>
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose a Rarity</SelectValue>
                      </SelectTrigger>
                    )}

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Rarity:</SelectLabel>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Endangered">Endangered</SelectItem>
                        <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                        <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()} // Convert the value to a string here
                    defaultValue={field.value.toString()} // Convert the default value to a string
                  >
                    {field.value ? (
                      <SelectTrigger>
                        <SelectValue>
                          {trainers.find((trainer) => trainer.employeeId === field.value)?.fullName}
                        </SelectValue>
                      </SelectTrigger>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose a EmployeeId</SelectValue>
                      </SelectTrigger>
                    )}

                    <SelectContent>
                      <SelectGroup>
                        {trainers.map((trainer) => (
                          <SelectItem key={trainer.employeeId} value={trainer?.employeeId.toString()}>
                            {trainer.fullName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cage:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value} // Convert the value to a string here
                    defaultValue={field.value} // Convert the default value to a string
                  >
                    {field.value ? (
                      <SelectTrigger>
                        <SelectValue>{cages.find((cages) => cages.cageId == field.value)?.cageId}</SelectValue>
                      </SelectTrigger>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose a CageId</SelectValue>
                      </SelectTrigger>
                    )}

                    <SelectContent>
                      <SelectGroup>
                        {cages.map((cage) => (
                          <SelectItem key={cage.cageId} value={cage?.cageId.toString()}>
                            {cage.cageId}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speciesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value)} // Convert the value to a string here
                    defaultValue={String(field.value)} // Convert the default value to a string
                  >
                    {field.value ? (
                      <SelectTrigger>
                        <SelectValue>
                          {species.find((species) => species.speciesId === field.value)?.speciesName}
                        </SelectValue>
                      </SelectTrigger>
                    ) : (
                      <SelectTrigger>
                        <SelectValue>Choose a SpeciesId</SelectValue>
                      </SelectTrigger>
                    )}

                    <SelectContent>
                      <SelectGroup>
                        {species.map((species) => (
                          <SelectItem key={species.speciesId} value={species?.speciesId.toString()}>
                            {species.speciesName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {initialData ? (
              <FormField
                control={form.control}
                name="healthStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Status:</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value.toString()} // Convert the value to a string here
                      defaultValue={field.value.toString()} // Convert the default value to a string
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>
                            {field.value == 1 ? 'Bad' : field.value == 2 ? 'Good' : 'Undefined'}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Health Status</SelectLabel>
                          <SelectItem value="2">Good</SelectItem>
                          <SelectItem value="1">Bad</SelectItem>
                          <SelectItem value="0">Undefined</SelectItem>
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
                name="healthStatus"
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
            {initialData ? (
              <FormField
                control={form.control}
                name="isDeleted"
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
                          <SelectValue defaultValue={field.value === 0 ? 'Active' : 'Inactive'}>
                            {field.value === 0 ? 'Active' : 'Inactive'}
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
                name="isDeleted"
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

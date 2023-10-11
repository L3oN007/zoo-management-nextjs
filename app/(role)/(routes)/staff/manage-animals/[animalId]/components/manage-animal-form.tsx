"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { log } from "console";

const formSchema = z.object({
  image: z.string().nullable(),
  name: z
    .string()
    .min(1, { message: "Full name must be between 1-50 characters." })
    .max(50),
  birthDate: z.string().min(1, { message: "Date of birth is required." }),
  region: z.string().min(1, { message: "Region is required." }),
  behavior: z.string().min(1, { message: "Behavior is required." }),
  healthStatus: z.coerce.number(),
  isDeleted: z.coerce.number(),
  gender:z.string().min(1, { message: "Gender is required." }),
  rarity: z.string().min(1, { message: "Rarity is required." }),
  empId: z.string().min(1, { message: "Trainer is required." }),
  cageId: z.string().min(1, { message: "Cage is required." }),
});

type ManageAnimalFormValues = z.infer<typeof formSchema>;

interface Animal {}

interface Trainer {
    id: number;
    fullName: string;
    citizenId: string;
    email: string;
    phoneNumber: string;
    image: string;
    role: string;
    isDeleted: number;
}
interface Cage {
  id: number;
  name: string;
}
interface ManageAnimalFormProps {
  initialData: Animal | null;
}

export const ManageAnimalForm: React.FC<ManageAnimalFormProps> = ({
  initialData,
}) => {
  const url = "http://localhost:5000/api/Animals/update-animal?animalId=";
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [cages, setCages] = useState<Cage[]>([]);

  const getTrainerNameByID = (id: number | undefined) => {
    return trainers.find((trainer) => trainer.id === id);
    
  };

  
useEffect(() => {
        axios.get<Trainer[]>("http://localhost:5000/api/Employees/trainers")
        .then((response) => setTrainers(response.data))
        .catch(error => {
          console.error('Lỗi khi lấy danh sách trainers:', error);
          setLoading(false);
        });

        axios.get<Cage[]>("http://localhost:5000/api/Cages/load-cages")
        .then((response) => setCages(response.data))
        .catch(error => {
          console.error('Lỗi khi lấy danh sách Cages:', error);
          setLoading(false);
 
        });


    }, []); 

    

  const title = initialData ? "Edit Animal information" : "Import new animal";
  const description = initialData ? "Edit an animal." : "Import new animal";
  const toastMessage = initialData
    ? "Animal information updated."
    : "Animal imported.";
  const action = initialData ? "Save changes" : "Import";

  const form = useForm<ManageAnimalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      image: "",
      name: "",
      birthDate: "",
      region: "",
      behavior: "",
      healthStatus: 0,
      isDeleted: 0,
      gender: "",
      rarity: "",
      empId: "",
      cageId: "",
    },
  });

  const onSubmit = async (data: ManageAnimalFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(url + `${params.animalId}`, data).then((response) => {
          console.log(response);
        }).catch((error) => {console.log(error);});
        console.log(data);
      } else {
        await axios.post(url, data);
      }
      router.refresh();
      router.push(`/staff/manage-animals`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(url + `/${params.animalId}`);
      router.refresh();
      router.push(`/staff/manage-animals`);
      toast.success("Animal deleted.");
    } catch (error: any) {
      toast.error("Fail to delete.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animal Avatar Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Name</FormLabel>
                  <FormControl>
                    <Input
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
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
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
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region:</FormLabel>
                  <FormControl>
                    <Input
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
              name="behavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behavior:</FormLabel>
                  <FormControl>
                    <Input
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
                        <SelectValue
                          defaultValue={
                            field.value === 0 ? "Healthy" : "Unhealthy"
                          }
                        >
                          {field.value === 0 ? "Healthy" : "Unhealthy"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Health Status</SelectLabel>
                        <SelectItem value="0">Healthy</SelectItem>
                        <SelectItem value="1">Unhealthy</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                  <FormControl>
                    <Input
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
              name="rarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rarity:</FormLabel>
                  <FormControl>
                    <Input
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
                        <SelectValue
                          defaultValue={
                            field.value === 0 ? "Active" : "Inactive"
                          }
                        >
                          {field.value === 0 ? "Active" : "Inactive"}
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
            <FormField
              control={form.control}
              name="empId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()} // Convert the value to a string here
                    defaultValue={field.value.toString()} // Convert the default value to a string
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {
                          trainers.find(
                            (trainer) => trainer.id === parseInt(field.value)
                          )?.fullName
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {trainers.map((trainer) => (
                          <SelectItem key={trainer.id} value={trainer.id.toString()}>
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
                    <SelectTrigger>
                      <SelectValue>
                        {
                          cages.find(
                            (cages) => cages.id === parseInt(field.value)
                          )?.name
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {cages.map((cage) => (
                          <SelectItem key={cage.id} value={cage?.id.toString()}>
                            {cage.name}
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

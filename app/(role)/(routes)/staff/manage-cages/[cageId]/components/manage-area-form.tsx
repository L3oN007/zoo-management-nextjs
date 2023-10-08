"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CageObj } from "@/app/models/cage";

const formSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: "Name must be between 1-50 characters." })
    .max(50),
  maxCapacity: z.number().refine((value) => value > 0, {
    message: "Capacity must be greater than 0.",
  }),
  areaId: z.string().min(1, { message: "Area ID is required." }).max(50),
});

type ManageCageFormValues = z.infer<typeof formSchema>;

interface Cage { }

interface ManageCageFormProps {
  initialData: Cage | null;
}

export const ManageAreasForm: React.FC<ManageCageFormProps> = ({
  initialData,
}) => {
  const url = "http://localhost:5000/api/Cages";
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openComboBox, setOpenComboBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [areaIDData, setAreaIDData] = useState([]); // Store the API data

  useEffect(() => {
    axios.get("http://localhost:5000/api/Areas/load-areas")
      .then((response) => {
        const areaIDs = response.data.map((item: any) => item.id);
        console.log(areaIDs);
        setAreaIDData(areaIDs);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const title = initialData ? "Edit cage" : "Create new cage";
  const description = initialData ? "Edit cage." : "Add a new cage";
  const toastMessage = initialData ? "Cage updated." : "New cage added.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ManageCageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      id: "",
      maxCapacity: 0,
      name: "",
      areaId: "",
    },
  });

  const onSubmit = async (data: ManageCageFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(url + `/update-cage?cageId=${params.cageId}`, data);
      } else {
        await axios.post(url, data);
      }
      router.refresh();
      router.push(`/staff/manage-cages`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(url + `/delete?cageId=${params.cageId}`);
      router.refresh();
      router.push(`/staff/manage-cages`);
      toast.success("Cage deleted.");
    } catch (error: any) {
      toast.error(error.response.data.title);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "B",
      label: "B",
    },
    {
      value: "V",
      label: "V",
    },
  ]

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
          className="space-y-8 w-[50%]"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cage Id</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      readOnly={initialData? true : false}
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
                  <FormLabel>Name</FormLabel>
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
              name="maxCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Capacity</FormLabel>
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
              name="areaId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Area Id</FormLabel>
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
                              {field.value ? areaIDData.find((item) => item === field.value) : "Select AreaID..."}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Area ID..." />
                            <CommandEmpty>No Area ID found.</CommandEmpty>
                            <CommandGroup>
                              {areaIDData.map((item) => (
                                <CommandItem
                                  key={item}
                                  onSelect={() => {
                                    // Set the selected value in the field
                                    field.onChange(item === field.value ? "" : item);
                                    setOpenComboBox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      item === field.value ? "opacity-100" : "opacity-0"
                                    )}
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

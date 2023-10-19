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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CageObj } from "@/app/models/cage";

const formSchema = z.object({
  importDate: z.string().min(1, { message: "Import Date is required." }),
  importQuantity: z.coerce.number().refine((value) => value > 0, {
		message: 'Import Quantity must be greater than 0.',
	}),
  foodId: z.string().min(1, { message: "Food name is required." }),
});

type ManageFoodFormValues = z.infer<typeof formSchema>;

interface Food {}

interface ManageFoodFormProps {
  initialData: Food | null;
}

export const ManageFoodForm: React.FC<ManageFoodFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const url = "https://652f95450b8d8ddac0b2bfe2.mockapi.io/importFood";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line import/no-anonymous-default-export

  const title = initialData ? "Edit import history" : "Create new import";
  const description = initialData ? "Edit import history." : "Add a new import";
  const toastMessage = initialData
    ? "Import history updated."
    : "New import added.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ManageFoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      importDate: "",
      importQuantity: 0,
      foodId: "",
    },
  });

  const onSubmit = async (data: ManageFoodFormValues) => {
    debugger;
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`${url}/${params.no}`, data);
      } else {
        await axios.post(url, data);
      }
      router.refresh();
      router.push(`/staff/manage-foods`);
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
      await axios.delete(url + `/${params.no}`);
      router.refresh();
      router.push(`/staff/manage-foods`);
      toast.success("Foods deleted.");
    } catch (error: any) {
      toast.error(error.response.data.title);
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
          <div className="md:grid md:grid-cols-4 gap-8">
          <FormField
							control={form.control}
							name='importQuantity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Import Quantity</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={loading}
											placeholder='Import Quantity'
											{...field}
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
                    <Input
                      type="date"
                      disabled={loading}
                      placeholder="ImportDate"
                      {...field}
                    />
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
                  <FormLabel>Food ID</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Food ID"
                      {...field}
                    />
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

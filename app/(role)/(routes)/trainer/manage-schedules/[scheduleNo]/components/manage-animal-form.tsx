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
  scheduleNo: z.string().min(1, { message: "Schedule's ID is required." }),
  scheduleName: z.string().min(1, { message: "Schedule's name is required." }),
  feedingQuantity: z.coerce.number().refine((value) => value > 0, {
    message: "Feeding Quantity must be greater than 0.",
  }),
  foodID: z.string().min(1, { message: "Food ID is required." }),
});

type ManageScheduleFormValues = z.infer<typeof formSchema>;

interface Schedule {}

interface ManageScheduleFormProps {
  initialData: Schedule | null;
}

export const ManageScheduleForm: React.FC<ManageScheduleFormProps> = ({
  initialData,
}) => {
  const API = "https://652f95450b8d8ddac0b2bfe2.mockapi.io/feedingMenu";
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const title = initialData ? "Edit Schedule information" : "Add new Schedule";
  const description = initialData ? "Edit an Schedule." : "Add new Schedule";
  const toastMessage = initialData
    ? "Schedule information updated."
    : "Schedule Added.";
  const action = initialData ? "Save changes" : "Add";

  const form = useForm<ManageScheduleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      scheduleNo: "",
      scheduleName: "",
      foodID: "",
      feedingQuantity: 0,
      
    },
  });

  const onSubmit = async (data: ManageScheduleFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios
          .put(API + `${params.scheduleNo}`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(data);
      } else {
        await axios.post(API, data);
      }
      router.refresh();
      router.push(`/trainer/manage-schedules`);
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
      await axios.delete(API + `${params.scheduleNo}`);
      router.refresh();
      router.push(`/trainer/manage-schedules`);
      toast.success("Schedule deleted.");
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="scheduleNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule No</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Schedule No"
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
              name="scheduleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Schedule Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedingQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feeding Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Feeding Quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodID"
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

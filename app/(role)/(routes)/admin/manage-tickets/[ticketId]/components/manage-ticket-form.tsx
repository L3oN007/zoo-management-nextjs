"use client";

import dotenv from "dotenv";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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

dotenv.config();

const formSchema = z.object({
  ticketId: z.string().min(1, { message: "Ticket ID is required." }),
  image: z.string().nullable(),
  type: z
    .string(),
  description: z.string(),
  unitPrice: z.coerce.number(),
});

type ManageTicketFormValues = z.infer<typeof formSchema>;

interface Staff {}

interface ManageTicketFormProps {
  initialData: Staff | null;
}

export const ManageTicketForm: React.FC<ManageTicketFormProps> = ({
  initialData,
}) => {
  const urlPost = process.env.NEXT_PUBLIC_API_CREATE_TICKET || "";
  const urlPut = process.env.NEXT_PUBLIC_API_UPDATE_TICKET;
  const urlDelete = process.env.NEXT_PUBLIC_API_DELETE_TICKET;

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const title = initialData ? "Edit Ticket" : "Create Ticket";
  const description = initialData
    ? "Edit ticket."
    : "Add a new Ticket";
  const toastMessage = initialData
    ? "Ticket updated."
    : "Ticket created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ManageTicketFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      ticketId: "",
      image: "",
      type: "",
      description: "",
      unitPrice: 0,
    },
  });

  const onSubmit = async (data: ManageTicketFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(urlPut + `${params.ticketId}`, data);
      } else {
        await axios.post(urlPost, data);
      }
      router.refresh();
      router.push(`/admin/manage-tickets`);
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
      await axios.delete(urlDelete! + `${params.ticketId}`);
      router.refresh();
      router.push(`/admin/manage-tickets`);
      toast.success("Ticket deleted.");
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
                <FormLabel>Ticket Image</FormLabel>
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
          <div className="md:grid md:grid-cols-3 gap-8 w-[70%]">
            <FormField
              control={form.control}
              name="ticketId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket ID</FormLabel>
                  <FormControl>
                    <Input
                      className="read-only:bg-gray-100"
                      readOnly={!!initialData}
                      disabled={loading}
                      placeholder="Ticket ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit price:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Unit price"
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

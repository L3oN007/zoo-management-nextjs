"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
    image: z.string(),
    fullName: z.string().min(1, { message: "Full name must be between 1-50 characters." }).max(50),
    dob: z.string().min(1, { message: "Date of birth is required." }),
    citizenId: z.string().min(1, { message: "Citizen ID is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: "Phone number must be exactly 10 digits.",
    }),
    isDeleted: z.string().refine((value) => value === "0" || value === "1", {
        message: "Status must be either '0' or '1'.",
    }),

});

type ManageStaffFormValues = z.infer<typeof formSchema>

interface Staff {

}

interface ManageStaffFormProps {
    initialData: Staff | null;
};

export const ManageStaffForm: React.FC<ManageStaffFormProps> = ({
    initialData
}) => {
    const url = "https://648867740e2469c038fda6cc.mockapi.io/staff";
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit Staff Account' : 'Create Staff Account';
    const description = initialData ? 'Edit a staff account.' : 'Add a new staff account';
    const toastMessage = initialData ? 'Staff account updated.' : 'Staff account created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<ManageStaffFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            image: '',
            fullName: '',
            dob: '',
            citizenId: '',
            email: '',
            phoneNumber: '',
            isDeleted: '',
        },
    });


    const onSubmit = async (data: ManageStaffFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.put(url + `/${params.staffId}`, data);
            } else {
                await axios.post(url, data);
            }
            router.refresh();
            router.push(`/admin/manage-staff`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(url + `/${params.staffId}`);
            router.refresh();
            router.push(`/admin/manage-staff`);
            toast.success('Staff deleted.');
        } catch (error: any) {
            toast.error('Fail to delete.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Staff Avatar Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="citizenId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Citizen ID:</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone:</FormLabel>
                                    <FormControl>
                                        <Input type="tel" disabled={loading} placeholder="Billboard label" {...field} />
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
                                    <FormControl>
                                        <Input type="text" disabled={loading} placeholder="Billboard label" {...field} />
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
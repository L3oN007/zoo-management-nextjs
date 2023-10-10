"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { columns } from "./columns";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

interface ManageStaffClientProps {
  data: any;
}

export const ManageStaffClient: FC<ManageStaffClientProps> = ({ data }) => {
  const router = useRouter();
  const statuses = [
    {
      value: "0",
      label: "Active",
      icon: CheckCircledIcon,
    },
    {
      value: "1",
      label: "Inactive",
      icon: CrossCircledIcon,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Staff (${Object.keys(data).length})`}
          description="Manage Staffs information in the zoo"
        />
        <Button onClick={() => router.push("/admin/manage-staffs/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="fullName"
        filterOptions={statuses}
      />
    </>
  );
};

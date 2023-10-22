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

interface ManageScheduleClientProps {
  data: any;
}

export const ManageScheduleClient: FC<ManageScheduleClientProps> = ({ data }) => {
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
          title={`Species (${Object.keys(data).length})`}
          description="Manage Species in the zoo"
        />
        <Button onClick={() => router.push("/trainer/manage-schedules/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="scheduleName"
        filterOptions={statuses}
      />
    </>
  );
};

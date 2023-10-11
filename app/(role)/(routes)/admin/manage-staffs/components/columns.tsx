"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type StaffColumn = {
  employeeId: string;
  image: string;
  fullName: string;
  citizenId: string;
  email: string;
  phoneNumber: string;
  employeeStatus: number;
};

export const columns: ColumnDef<StaffColumn>[] = [
  {
    accessorKey: "Avatar",
    header: "Avatar",
    cell: (props) => (
      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src={"https://github.com/shadcn.png"}
            alt={props.row.original.fullName}
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "citizenId",
    header: "Citizen ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "employeeStatus",
    header: "Status",
    cell: (props) => (
      <div className="flex items-center">
        <span
          className={
            props.row.original.employeeStatus == 0
              ? "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              : "bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
          }
        >
          {props.row.original.employeeStatus == 0 ? "Active" : "Inactive"}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

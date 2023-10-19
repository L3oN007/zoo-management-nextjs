"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type SpeciesColumn = {
  scheduleNo: string;
  scheduleName: string;
  foodID: string;
  feedingQuantity: number;
};

export const columns: ColumnDef<SpeciesColumn>[] = [
  {
    accessorKey: "scheduleNo",
    header: "Schedule ID",
  },
  {
    accessorKey: "scheduleName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Schedule Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "feedingQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Feeding Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "foodID",
    header: "Food ID",
  },
 
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

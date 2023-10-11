"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-action";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

export type NewsColumn = {
  areaId: string;
  areaName: string;
};

export const columns: ColumnDef<NewsColumn>[] = [
  {
    accessorKey: "areaId",
    header: "AreaID",
  },
  {
    accessorKey: "areaName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Area&rsquo;s name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

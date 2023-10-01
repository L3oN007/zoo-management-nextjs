"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-action";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

export type NewsColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<NewsColumn>[] = [
  {
    accessorKey: "id",
    header: "AreaID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Area's name
          <ArrowUpDown className="ml-8 h-5 w-5" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

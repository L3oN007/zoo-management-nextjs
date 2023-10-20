"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-action";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { AreaObj } from "@/app/models/area";

export type CertificateColumn = {
  certificateCode: string;
  certificateName: string;
  level: string;
  trainingInstitution: string;
};

export const columns: ColumnDef<CertificateColumn>[] = [
  {
    accessorKey: "certificateCode",
    header: "Certificate Code",
  },
  {
    accessorKey: "certificateName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Certificate Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },

  {
    accessorKey: "trainingInstitution",
    header: "Training Institution",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

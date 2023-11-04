"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";
import Link from "next/link";

export type SpeciesColumn = {
  speciesId: string;
  speciesName: string;
 
};

export const columns: ColumnDef<SpeciesColumn>[] = [
  {
    accessorKey: "speciesId",
    header: "Species' ID",
  },
  {
    accessorKey: "speciesName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Species&rsquo; Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => {
     return (
      <Link href={`/trainer/manage-animals/${props.row.original.speciesId}`}>
      <span>{props.row.original.speciesName}</span>
      </Link>
     )
    }
  },
 
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

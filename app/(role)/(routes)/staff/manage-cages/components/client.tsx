"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { columns } from "./columns"


interface ManageCageClientProps {
    data: any
}

export const ManageCageClient: FC<ManageCageClientProps> = (data) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Cage (${Object.keys(data.data).length})`} description="Manage Cage information in the zoo" />

                <Button onClick={() => router.push("/staff/manage-cages/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data.data} searchKey="name" filterOptions={null as any} />

        </>
    )
}
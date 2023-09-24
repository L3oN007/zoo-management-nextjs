"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { columns } from "./columns"


interface ManageStaffClientProps {
    data: any
}

export const ManageStaffClient: FC<ManageStaffClientProps> = (data) => {
    const router = useRouter();
    const params = useParams();


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Staff (${Object.keys(data.data).length})`} description="Manage Staffs information in the zoo" />

                <Button onClick={() => router.push("/admin/manage-staff/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data.data} searchKey="fullName" />

        </>
    )
}
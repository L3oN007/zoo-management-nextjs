"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import {  empColumns } from "./columns"


interface ManageCertificateClientProps {
    data: any;
}

export const ManageCertificateClient: FC<ManageCertificateClientProps> = (data) => {
    const router = useRouter();

    return (    
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Employee's Certificate (${Object.keys(data.data).length})`} description="Manage Certificate information of trainer" />

                <Button onClick={() => router.push("/trainer/manage-certificates/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator className="mb-2"/>
            <DataTable columns={empColumns} data={data.data} searchKey="cerCode" filterOptions={null as any} />


        </>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { columns } from "./columns"


interface ManageCertificateClientProps {
    data: any
}

export const ManageCertificateClient: FC<ManageCertificateClientProps> = (data) => {
    const router = useRouter();

    return (    
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Certificate (${Object.keys(data.data).length})`} description="List certificate" />

              
            </div>
            <Separator />
            <DataTable columns={columns} data={data.data} searchKey="certificateName" filterOptions={null as any} />

        </>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { FC, useState } from "react"
import { columns } from "./columns"
import { empColumns } from "./foodColumns"


interface ManageFoodClientProps {
    data: any,
    empCer: any

}

export const ManageFoodClient: FC<ManageFoodClientProps> = ({data, empCer}) => {
    const router = useRouter();

   

    return (    
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Food (${Object.keys(data).length})`} description="Manage Food in the zoo" />

                <Button onClick={() => router.push("/staff/manage-foods/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <div className="flex justify-around">
            <div className="flex-1">
            <DataTable key="certificate" columns={columns} data={data} searchKey="cerName" filterOptions={null as any} />
            </div>
            <div className="ml-4">
            <DataTable key="empCertificate" columns={empColumns} data={empCer} searchKey={"cerCode"}  filterOptions={null as any} />

            </div>
            </div>
        </>
    )
}
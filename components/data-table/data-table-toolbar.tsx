"use client"

import { CheckCircledIcon, Cross2Icon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"


import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableDateFilter } from "./data-table-date-filter"


interface DataTableToolbarProps<TData> {
    table: Table<TData>
    searchKey: string
    filterOptions: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
}

export function DataTableToolbar<TData>({
    table,
    searchKey,
    filterOptions,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search"
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("isDeleted") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("isDeleted")}
                        title="Status"
                        options={filterOptions}
                    />
                )}
                {table.getColumn("tags") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("tags")}
                        title="Tags"
                        options={filterOptions}
                    />
                )}


                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}

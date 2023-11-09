'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { ta } from 'date-fns/locale';
import { useMemo } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  data: any;
  placeholder?: string;
}

interface filterOptions {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function DataTableToolbar<TData>({ table, searchKey, data, placeholder }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const employeeStatusColumn = table.getColumn('employeeStatus');
  const isDeletedColumn = table.getColumn('isDeleted');
  const areaNameColumn = table.getColumn('area_areaName');
  const trainerColumn = table.getColumn('employee_fullName');
  const healthStatusColumn = table.getColumn('healthStatus');
  const rarityColumn = table.getColumn('rarity');
  const animalSpeciesColumn = table.getColumn('animalSpecies_speciesName');
  const cageNameColumn = table.getColumn('cage_name');

  let empStatusOptions: filterOptions[] = [];
  let areaNameOptions: filterOptions[] = [];
  let trainerNameOptions: filterOptions[] = [];
  let healthStatusOptions: filterOptions[] = [];
  let rarityOptions: filterOptions[] = [];
  let animalSpeciesOptions: filterOptions[] = [];
  let isDeletedOptions: filterOptions[] = [];
  let cageNameOptions: filterOptions[] = [];

  if (employeeStatusColumn && employeeStatusColumn.getSize() > 0) {
    // Add filter options for employee status
    empStatusOptions.push(
      {
        label: 'Active',
        value: '0'
      },
      {
        label: 'Inactive',
        value: '1'
      }
    );
  }
  if (isDeletedColumn && isDeletedColumn.getSize() > 0) {
    // Add filter options for employee status
    isDeletedOptions.push(
      {
        label: 'Active',
        value: '0'
      },
      {
        label: 'Inactive',
        value: '1'
      }
    );
  }

  if (healthStatusColumn && healthStatusColumn.getSize() > 0) {
    // Add filter options for employee status
    healthStatusOptions.push(
      {
        label: 'Undefined',
        value: '0'
      },
      {
        label: 'Good',
        value: '1'
      },
      {
        label: 'Bad',
        value: '2'
      }
    );
  }

  if (areaNameColumn && areaNameColumn.getSize() > 0) {
    const allTags = data.map((item: any) => item.area.areaName);
    const uniqueTagsSet = new Set(allTags);
    const uniqueTags = Array.from(uniqueTagsSet) as string[];

    const tagsData = uniqueTags.map((tag) => ({
      label: tag,
      value: tag
    }));
    // Add filter options for health status
    areaNameOptions.push(...tagsData);
  }

  if (cageNameColumn && cageNameColumn.getSize() > 0) {
    const allTags = data.map((item: any) => item.cage.name);
    const uniqueTagsSet = new Set(allTags);
    const uniqueTags = Array.from(uniqueTagsSet) as string[];

    const tagsData = uniqueTags.map((tag) => ({
      label: tag,
      value: tag
    }));
    // Add filter options for health status
    cageNameOptions.push(...tagsData);
  }

  if (animalSpeciesColumn && animalSpeciesColumn.getSize() > 0) {
    const allTags = data.map((item: any) => item.animalSpecies.speciesName);
    const uniqueTagsSet = new Set(allTags);
    const uniqueTags = Array.from(uniqueTagsSet) as string[];

    const tagsData = uniqueTags.map((tag) => ({
      label: tag,
      value: tag
    }));
    // Add filter options for health status
    animalSpeciesOptions.push(...tagsData);
  }

  if (rarityColumn && rarityColumn.getSize() > 0) {
    const allTags = data.map((item: any) => item.rarity);
    const uniqueTagsSet = new Set(allTags);
    const uniqueTags = Array.from(uniqueTagsSet) as string[];

    const tagsData = uniqueTags.map((tag) => ({
      label: tag,
      value: tag
    }));
    // Add filter options for health status
    rarityOptions.push(...tagsData);
  }

  if (trainerColumn && trainerColumn.getSize() > 0) {
    const allTags = data.map((item: any) => item.employee.fullName);
    const uniqueTagsSet = new Set(allTags);
    const uniqueTags = Array.from(uniqueTagsSet) as string[];

    const tagsData = uniqueTags.map((tag) => ({
      label: tag,
      value: tag
    }));
    // Add filter options for health status
    trainerNameOptions.push(...tagsData);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex space-x-2">
        {table.getColumn('employeeStatus') && (
          <DataTableFacetedFilter
            column={table.getColumn('employeeStatus')}
            title="Status"
            options={empStatusOptions}
          />
        )}
        {table.getColumn('area_areaName') && (
          <DataTableFacetedFilter column={table.getColumn('area_areaName')} title="Area" options={areaNameOptions} />
        )}
        {table.getColumn('animalSpecies_speciesName') && (
          <DataTableFacetedFilter
            column={table.getColumn('animalSpecies_speciesName')}
            title="Species"
            options={animalSpeciesOptions}
          />
        )}
        {table.getColumn('rarity') && (
          <DataTableFacetedFilter column={table.getColumn('rarity')} title="Rarity" options={rarityOptions} />
        )}
        {table.getColumn('healthStatus') && (
          <DataTableFacetedFilter
            column={table.getColumn('healthStatus')}
            title="Health Status"
            options={healthStatusOptions}
          />
        )}
        {table.getColumn('employee_fullName') && (
          <DataTableFacetedFilter
            column={table.getColumn('employee_fullName')}
            title="Trainer"
            options={trainerNameOptions}
          />
        )}
        {table.getColumn('cage_name') && (
          <DataTableFacetedFilter column={table.getColumn('cage_name')} title="Cage" options={cageNameOptions} />
        )}
        {table.getColumn('isDeleted') && (
          <DataTableFacetedFilter column={table.getColumn('isDeleted')} title="Status" options={isDeletedOptions} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3 ">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}

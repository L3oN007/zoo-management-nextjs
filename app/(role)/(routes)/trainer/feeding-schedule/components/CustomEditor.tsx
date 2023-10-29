'use client';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface CustomScheduleEditorProps {
  eventData: any;
}

export const CustomScheduleEditor: React.FC<CustomScheduleEditorProps> = ({ eventData }) => {
  const cageName = eventData?.cageName || '';
  const startTime = new Date(eventData?.startTime || eventData?.StartTime);
  const endTime = new Date(eventData?.endTime || eventData?.EndTime);

  return (
    <>
      <Tabs defaultValue="cage" className="w-full">
        <TabsList className="grid w-[200px] grid-cols-2 mb-3">
          <TabsTrigger value="cage">Cage</TabsTrigger>
          <TabsTrigger value="animal">Animal</TabsTrigger>
        </TabsList>
        <TabsContent value="cage">
          <div className="border-b border-gray-900/10 pb-12 ">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Cage name
                </label>
                <div className="mt-2">
                  <input
                    id="cageName"
                    className="e-field e-input"
                    type="text"
                    name="cageName"
                    style={{ width: '100%' }}
                    defaultValue={cageName}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Employee Name
                </label>
                <div className="mt-2">
                  <input
                    readOnly={true}
                    value={'Vu Long'}
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="e-field e-input read-only:bg-slate-200"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Start time
                </label>
                <div className="mt-2">
                  <DateTimePickerComponent
                    id="StartTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="StartTime"
                    value={startTime}
                    className="e-field "
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  End time
                </label>
                <div className="mt-2">
                  <DateTimePickerComponent
                    id="EndTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="EndTime"
                    value={endTime}
                    className="e-field "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Menu
                </label>
                <div className="mt-2">
                  <select
                    id="menu"
                    name="menu"
                    autoComplete="menu-name"
                    className="e-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={'1'}>menu 1</option>
                    <option value={'2'}>menu 2</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Feeding Status
                </label>
                <div className="mt-2">
                  <select
                    id="feedingStatus"
                    name="feedingStatus"
                    autoComplete="menu-name"
                    className="e-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={'0'}>Pending</option>
                    <option value={'1'}>Already Feed</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Note
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="e-field block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
              </div>

              {/* <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="animal">
          <div className="border-b border-gray-900/10 pb-12 ">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Animal name
                </label>
                <div className="mt-2">
                  <input
                    id="cageName"
                    className="e-field e-input"
                    type="text"
                    name="cageName"
                    style={{ width: '100%' }}
                    defaultValue={cageName}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Employee Name
                </label>
                <div className="mt-2">
                  <input
                    readOnly={true}
                    value={'Vu Long'}
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="e-field e-input read-only:bg-slate-200"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Start time
                </label>
                <div className="mt-2">
                  <DateTimePickerComponent
                    id="StartTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="StartTime"
                    value={startTime}
                    className="e-field "
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  End time
                </label>
                <div className="mt-2">
                  <DateTimePickerComponent
                    id="EndTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="EndTime"
                    value={endTime}
                    className="e-field "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Menu
                </label>
                <div className="mt-2">
                  <select
                    id="menu"
                    name="menu"
                    autoComplete="menu-name"
                    className="e-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={'1'}>menu 1</option>
                    <option value={'2'}>menu 2</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Feeding Status
                </label>
                <div className="mt-2">
                  <select
                    id="feedingStatus"
                    name="feedingStatus"
                    autoComplete="menu-name"
                    className="e-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={'0'}>Pending</option>
                    <option value={'1'}>Already Feed</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Note
                </label>
                <div className="mt-2">
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="e-field block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

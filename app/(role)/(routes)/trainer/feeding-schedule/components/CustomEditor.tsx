'use client';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Event } from '../modal/event';
import { format } from 'date-fns';
import axios from 'axios';
import { string } from 'zod';
import { useSession } from 'next-auth/react';
import { read } from 'fs';
interface CustomScheduleEditorProps {
  eventData: Event;
}

export const CustomScheduleEditor: React.FC<CustomScheduleEditorProps> = ({ eventData }) => {
  console.log('eventData', eventData);
  let createdTime =
    eventData.createdTime ||
    format(new Date(new Date().getTime() - 7 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  const session = useSession();
  const areaId = session.data?.user.areaId;

  // attribute is used for authorizing which trainer can do CRUD
  let readOnly = areaId !== null ? false : true;

  const cageId = eventData?.cageId || '';
  const animalId = eventData?.animalId || '';
  const employeeId = eventData?.employeeId || '';
  const menuNo = eventData?.feedingMenu?.menuNo || '';
  const feedingAmount = eventData?.feedingAmount || 0;
  const feedingStatus = eventData?.feedingStatus || 0;
  const startTime = new Date(eventData?.StartTime);
  const endTime = new Date(eventData?.EndTime);
  const note = eventData?.note || '';

  const menuUrl = process.env.NEXT_PUBLIC_API_LOAD_MENUS;
  const animalUrl = process.env.NEXT_PUBLIC_API_LOAD_ANIMALS;
  const trainerUrl = process.env.NEXT_PUBLIC_API_LOAD_TRAINERS;

  const loadCagesByArea = process.env.NEXT_PUBLIC_API_LOAD_CAGE_BY_AREA + `${session.data?.user.areaId}`;

  const [menu, setMenu] = useState([]);
  const [cage, setCage] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async (url: string, setData: any) => {
        try {
          const response = await axios.get(url);
          setData(response.data);
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      };

      fetchData(menuUrl!, setMenu);
      fetchData(loadCagesByArea!, setCage);
      fetchData(animalUrl!, setAnimal);
      fetchData(trainerUrl!, setEmployee);

      setDataFetched(true);
    }
  }, [dataFetched]);

  let tab = eventData.cageId == null ? `cage` : `animal`;

  return (
    <>
      <input id="createdTime" className="e-field " type="hidden" name="createdTime" defaultValue={createdTime} />
      <Tabs defaultValue={tab} className="w-full">
        <TabsList className="grid w-[200px] grid-cols-2 mb-3">
          <TabsTrigger value="cage" disabled={eventData.cageId === null}>
            Cage
          </TabsTrigger>
          <TabsTrigger value="animal" disabled={eventData.animalId === null}>
            Animal
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cage">
          <div className="border-b border-gray-900/10 pb-12 ">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Cage ID
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    allowFiltering={true}
                    value={cageId}
                    id="cageId"
                    placeholder="Choose cage"
                    data-name="cageId"
                    className="e-field"
                    style={{ width: '100%' }}
                    readonly={readOnly}
                    dataSource={cage}
                    fields={{ text: 'cageId', value: 'cageId' }} // Specify text and value fields
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Employee Name
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    allowFiltering={true}
                    value={employeeId}
                    id="employeeId"
                    placeholder="Choose employee"
                    data-name="employeeId"
                    className="e-field"
                    style={{ width: '100%' }}
                    readonly={readOnly}
                    dataSource={employee}
                    fields={{ text: 'fullName', value: 'employeeId' }} // Specify text and value fields
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Start time
                </label>
                <div className="mt-2">
                  <DateTimePickerComponent
                    id="startTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="startTime"
                    value={startTime}
                    readonly={readOnly}
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
                    id="endTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="endTime"
                    value={endTime}
                    readonly={readOnly}
                    className="e-field "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Menu
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    allowFiltering={true}
                    value={menuNo}
                    id="menuNo"
                    placeholder="Choose menu"
                    data-name="menuNo"
                    className="e-field"
                    style={{ width: '100%' }}
                    readonly={readOnly}
                    dataSource={menu}
                    fields={{ text: 'menuName', value: 'menuNo' }} // Specify text and value fields
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Feeding amount
                </label>
                <div className="mt-2">
                  <input
                    id="feedingAmount"
                    defaultValue={feedingAmount}
                    className="e-field e-input"
                    type="number"
                    name="feedingAmount"
                    readOnly={readOnly}
                    min={0}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Feeding Status
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    value={feedingStatus}
                    id="feedingStatus"
                    placeholder="Choose feeding status"
                    data-name="feedingStatus"
                    className="e-field"
                    style={{ width: '100%' }}
                    dataSource={[
                      { text: 'Pending', value: 0 },
                      { text: 'Complete', value: 1 }
                    ]}
                    fields={{ text: 'text', value: 'value' }} // Specify text and value fields
                  />
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
                    defaultValue={note}
                  />
                </div>
              </div>
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
                  <DropDownListComponent
                    allowFiltering={true}
                    value={animalId}
                    id="animalId"
                    placeholder="Choose animal"
                    data-name="animalId"
                    className="e-field"
                    style={{ width: '100%' }}
                    readonly={readOnly}
                    dataSource={animal}
                    fields={{ text: 'name', value: 'animalId' }} // Specify text and value fields
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Employee Name
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    allowFiltering={true}
                    value={employeeId}
                    id="employeeId"
                    placeholder="Choose employee"
                    data-name="employeeId"
                    className="e-field"
                    style={{ width: '100%' }}
                    readonly={readOnly}
                    dataSource={employee}
                    fields={{ text: 'fullName', value: 'employeeId' }} // Specify text and value fields
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Start time
                </label>
                <div className="mt-2">
                  <DateTimePickerComponent
                    id="startTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="startTime"
                    readonly={readOnly}
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
                    id="endTime"
                    format="dd/MM/yy hh:mm a"
                    data-name="endTime"
                    value={endTime}
                    readonly={readOnly}
                    className="e-field "
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Menu
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    allowFiltering={true}
                    value={menuNo}
                    id="menuNo"
                    placeholder="Choose menu"
                    data-name="menuNo"
                    className="e-field"
                    style={{ width: '100%' }}
                    readonly={readOnly}
                    dataSource={menu}
                    fields={{ text: 'menuName', value: 'menuNo' }} // Specify text and value fields
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Feeding amount
                </label>
                <div className="mt-2">
                  <input
                    id="feedingAmount"
                    defaultValue={feedingAmount}
                    className="e-field e-input"
                    type="number"
                    name="feedingAmount"
                    readOnly={readOnly}
                    min={0}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Feeding Status
                </label>
                <div className="mt-2">
                  <DropDownListComponent
                    value={feedingStatus}
                    id="feedingStatus"
                    placeholder="Choose feeding status"
                    data-name="feedingStatus"
                    className="e-field"
                    style={{ width: '100%' }}
                    dataSource={[
                      { text: 'Pending', value: 0 },
                      { text: 'Complete', value: 1 }
                    ]}
                    fields={{ text: 'text', value: 'value' }} // Specify text and value fields
                  />
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
                    defaultValue={note}
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

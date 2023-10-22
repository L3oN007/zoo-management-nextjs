import { ManageScheduleClient } from './components/client';

import ErrorPage from '@/app/error/page';
import axios from 'axios';
import { format } from 'date-fns';

const ManageSchedulePage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_MENUS;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url!);

    // Check if the response contains data
    if (response.data === null) {
      // animal not found, set menuData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Feeding Menu not found.</p>
          </div>
        </div>
      );
    }

    // Extract menuData from the response
    let menuData = response.data;

    // If menuData is an array, loop through it and update date format and isDeleted property
    if (Array.isArray(menuData)) {
      menuData.forEach((animal: any) => {});
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageScheduleClient data={menuData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageSchedulePage;

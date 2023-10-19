import { ManageScheduleClient } from "./components/client";

import ErrorPage from "@/app/error/page";
import axios from "axios";
import { format } from "date-fns";

const ManageSchedulePage = async () => {
  const url = "https://652f95450b8d8ddac0b2bfe2.mockapi.io/feedingMenu";

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url!);

    // Check if the response contains data
    if (response.data === null) {
      // animal not found, set scheduleData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Feeding Schedule not found.</p>
          </div>
        </div>
      );
    }

    // Extract scheduleData from the response
    let scheduleData = response.data;

    // If scheduleData is an array, loop through it and update date format and isDeleted property
    if (Array.isArray(scheduleData)) {
      scheduleData.forEach((animal: any) => {
       
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageScheduleClient data={scheduleData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageSchedulePage;

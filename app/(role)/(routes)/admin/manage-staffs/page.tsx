import { ManageStaffClient } from "./components/client";

import ErrorPage from "@/app/error/page";
import axios from "axios";
import { format } from "date-fns";

const ManageStaffPage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_STAFF || "";
  try {
    // Make the GET request to fetch staff data
    console.log(url);
    const response = await axios.get(url);

    // Check if the response contains data
    if (response.data === null) {
      // Staff not found, set staffData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Staff not found.</p>
          </div>
        </div>
      );
    }

    // Extract staffData from the response
    let staffData = response.data;

    if (Array.isArray(staffData)) {
      staffData.forEach((staff: any) => {
        staff.employeeStatus = staff.employeeStatus.toString();
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageStaffClient data={staffData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageStaffPage;

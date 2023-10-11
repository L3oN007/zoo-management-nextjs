import { format } from "date-fns";
import { ManageAreasForm } from "./components/manage-area-form";
import axios from "axios";

const ManageAreasPage = async ({ params }: { params: { areasId: string } }) => {
  // Construct the URL using the staffId from the params object
  const url = process.env.NEXT_PUBLIC_API_GET_AREA + `${params.areasId}`;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract staffData from the response
    let areaData = response.data;

    // If staffData is null or undefined, set it to null
    if (areaData == null) {
      areaData = null;
    } else if (Array.isArray(areaData)) {
      // If staffData is an array, loop through it and update date format and isDeleted property
      areaData.forEach((staff: any) => {
        // staff.dob = format(new Date(staff.dob), 'MMMM do, yyyy');
        // staff.isDeleted = staff.isDeleted.toString();
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageAreasForm initialData={areaData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageAreasForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default ManageAreasPage;

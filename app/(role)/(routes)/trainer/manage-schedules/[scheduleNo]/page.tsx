import { format } from "date-fns";
import { ManageScheduleForm } from "./components/manage-animal-form";
import axios from "axios";

const EditAnimalPage = async ({ params }: { params: { scheduleNo: string } }) => {
  // Construct the URL using the animalId from the params object
  const url = "https://652f95450b8d8ddac0b2bfe2.mockapi.io/feedingMenu" + `${params.scheduleNo}`;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract scheduleData from the response
    let scheduleData = response.data;

    // If scheduleData is null or undefined, set it to null
    if (scheduleData == null) {
      scheduleData = null;
    } else if (Array.isArray(scheduleData)) {
      // If scheduleData is an array, loop through it and update date format and isDeleted property
      scheduleData.forEach((animal: any) => {
        
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageScheduleForm initialData={scheduleData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageScheduleForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default EditAnimalPage;

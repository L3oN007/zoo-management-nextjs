import { format } from "date-fns";
import { ManageTrainerForm } from "./components/manage-trainer-form";
import axios from "axios";

const ManageTrainerPage = async ({
  params,
}: {
  params: { trainerId: string };
}) => {
  // Construct the URL using the staffId from the params object
  const url = process.env.API_GET_TRAINER + `?id=${params.trainerId}`;
  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract trainerData from the response
    let trainerData = response.data;


    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTrainerForm initialData={trainerData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTrainerForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default ManageTrainerPage;

import { format } from "date-fns";
import { ManageCageForm } from "./components/manage-cage-form";
import axios from "axios";

const ManageAreasPage = async ({ params }: { params: { cageId: string } }) => {
  // Construct the URL using the cageId from the params object
  const url = `https://651822f6582f58d62d356e1a.mockapi.io/cage/${params.cageId}`;

  try {
    // Make the GET request to fetch cage data
    const response = await axios.get(url);

    // Extract cageId from the response
    let cageData = response.data;

    // If cageId is null or undefined, set it to null
    if (cageData == null) {
      cageData = null;
    } else if (Array.isArray(cageData)) {
      // If cageId is an array, loop through it
      cageData.forEach((staff: any) => { });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCageForm initialData={cageData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCageForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default ManageAreasPage;

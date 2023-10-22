import { format } from 'date-fns';
import { ManageScheduleForm } from './components/manage-menu-form';
import axios from 'axios';

const EditAnimalPage = async ({ params }: { params: { menuNo: string } }) => {
  // Construct the URL using the animalId from the params object
  const url = process.env.NEXT_PUBLIC_API_GET_MENU + `${params.menuNo}`;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract menuData from the response
    let menuData = response.data;

    // If menuData is null or undefined, set it to null
    if (menuData == null) {
      menuData = null;
    } else if (Array.isArray(menuData)) {
      // If menuData is an array, loop through it and update date format and isDeleted property
      menuData.forEach((animal: any) => {});
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageScheduleForm initialData={menuData} />
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

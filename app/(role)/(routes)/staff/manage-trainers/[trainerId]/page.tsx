import { format } from "date-fns";
import { ManageTrainerForm } from "./components/manage-trainer-form";
import axios from "axios";

const ManageTrainerPage = async ({ params }: { params: { trainerId: string } }) => {
    // Construct the URL using the staffId from the params object
    const url = `https://651d776944e393af2d59dbd7.mockapi.io/trainer/${params.trainerId}`;

    try {
        // Make the GET request to fetch staff data
        const response = await axios.get(url);

        // Extract trainerData from the response
        let trainerData = response.data;

        // If trainerData is null or undefined, set it to null
        if (trainerData == null) {
            trainerData = null;
        } else if (Array.isArray(trainerData)) {
            // If trainerData is an array, loop through it and update date format and isDeleted property
            trainerData.forEach((staff: any) => {
                staff.dob = format(new Date(staff.dob), 'MMMM do, yyyy');
            });
        }

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ManageTrainerForm initialData={trainerData} />

                </div>
            </div>
        );
    } catch (error) {

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ManageTrainerForm initialData={null} />
                </div>
            </div>
        );
    }
};

export default ManageTrainerPage;

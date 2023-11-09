import { format } from 'date-fns';
import { ManageTrainerForm } from './components/manage-trainer-form';
import axios from 'axios';
import { ManageTrainerClient } from '../components/client';

const ManageTrainerPage = async ({ params }: { params: { trainerId: string } }) => {
  // Construct the URL using the staffId from the params object
  const url = process.env.NEXT_PUBLIC_API_GET_TRAINER + `?id=${params.trainerId}`;
  const urlLead =  process.env.NEXT_PUBLIC_API_LOAD_LEADER_TRAINERS || ''; 
  const normalTrainer =  process.env.NEXT_PUBLIC_API_LOAD_MEMBER_TRAINERS || ''; 


  try {

    if(params.trainerId === 'lead'){
      const response = await axios.get(urlLead);
      let leadTrainer = response.data;
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTrainerClient data={leadTrainer} />
          </div>
        </div>
      );
    }
    if(params.trainerId === 'normal'){
      const response = await axios.get(normalTrainer);
      let memberTrainer = response.data;
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTrainerClient data={memberTrainer} />
          </div>
        </div>
      );
    }
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

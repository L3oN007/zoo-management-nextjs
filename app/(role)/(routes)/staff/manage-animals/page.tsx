import { ManageAnimalClient } from './components/client';

import ErrorPage from '@/app/error/page';
import axios from 'axios';
import { format } from 'date-fns';

const ManageAnimalPage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_ANIMALS;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url!);

    // Check if the response contains data
    if (response.data === null) {
      // animal not found, set animalData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Animal not found.</p>
          </div>
        </div>
      );
    }

    // Extract animalData from the response
    let animalData = response.data;

    // If animalData is an array, loop through it and update date format and isDeleted property
    if (Array.isArray(animalData)) {
      animalData.forEach((animal: any) => {
        animal.birthDate = format(new Date(animal.birthDate), 'MM/dd/yyyy');
        animal.importDate = format(new Date(animal.importDate), 'MM/dd/yyyy');
        var img = animal.image.replace(/\[|\]|'/g, '').split(',');
        animal.image = img[0];
        animal.healthStatus = animal.healthStatus.toString();
        animal.isDeleted = animal.isDeleted.toString();
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageAnimalClient data={animalData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageAnimalPage;

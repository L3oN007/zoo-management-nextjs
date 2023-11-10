import axios from 'axios';
import { format } from 'date-fns';
import { ManageAnimalClient } from '../components/client';
import { ManageAnimalForm } from './components/manage-animal-form';

const EditAnimalPage = async ({ params }: { params: { animalId: string } }) => {
  // Construct the URL using the animalId from the params object
  const url = process.env.NEXT_PUBLIC_API_GET_ANIMAL + `${params.animalId}`;
  const animalbycage = process.env.NEXT_PUBLIC_API_LOAD_ANIMALS_BY_CAGEID + `${params.animalId}`;

  try {
    if (params.animalId.length === 5) {
      const response = await axios.get(animalbycage!);

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
    }
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract animalData from the response
    let animalData = response.data;
    animalData.birthDate = format(new Date(animalData.birthDate), 'yyyy-MM-dd');
    animalData.importDate = format(new Date(animalData.importDate), 'yyyy-MM-dd');
    animalData.image = animalData.image
      .replace(/\[|\]|'/g, '')
      .split(',')
      .map((item: any) => {
        return { url: item.trim() };
      });
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageAnimalForm initialData={animalData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageAnimalForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default EditAnimalPage;

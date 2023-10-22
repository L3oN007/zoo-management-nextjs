import { format } from "date-fns";
import { ManageSpeciesForm } from "./components/manage-animal-form";
import axios from "axios";

const EditAnimalPage = async ({
  params,
}: {
  params: { speciesId: string };
}) => {
  // Construct the URL using the animalId from the params object
  const url =
    process.env.NEXT_PUBLIC_API_GET_ANIMAL_SPECIES + `${params.speciesId}`;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract speciesData from the response
    let speciesData = response.data;

    // If speciesData is null or undefined, set it to null
    if (speciesData == null) {
      speciesData = null;
    } else if (Array.isArray(speciesData)) {
      // If speciesData is an array, loop through it and update date format and isDeleted property
      speciesData.forEach((animal: any) => {});
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageSpeciesForm initialData={speciesData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageSpeciesForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default EditAnimalPage;

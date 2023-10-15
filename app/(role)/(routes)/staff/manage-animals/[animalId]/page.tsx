import { format } from "date-fns";
import axios from "axios";
import { ManageAnimalForm } from "./components/manage-animal-form";

const EditAnimalPage = async ({ params }: { params: { animalId: string } }) => {
  // Construct the URL using the animalId from the params object
  const url = process.env.NEXT_PUBLIC_API_GET_ANIMAL + `${params.animalId}`;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url);

    // Extract animalData from the response
    let animalData = response.data;
    animalData.birthDate = format(new Date(animalData.birthDate), "yyyy-MM-dd");
    animalData.importDate = format(
      new Date(animalData.importDate),
      "yyyy-MM-dd"
    );
    animalData.image = animalData.image.split(",").map((item: any) => {
      return { url: item.trim() };
    });

    // If animalData is null or undefined, set it to null
    // if (animalData == null) {
    //   animalData = null;
    // } else if (Array.isArray(animalData)) {
    //   animalData.forEach((animal: any) => {
    //     animal.birthDate = format(new Date(animal.birthDate), "MM/dd/yyyy");
    //     animal.importDate = format(new Date(animal.importDate), "MM/dd/yyyy");
    //     animal.image = animal.image.split(",").map((item: any) => {
    //       return { url: item.trim() };
    //     });
    //   });
    // }

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

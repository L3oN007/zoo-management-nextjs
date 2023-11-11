import { ManageSpeciesClient } from "./components/client";

import ErrorPage from "@/app/error/page";
import axios from "axios";
import { format } from "date-fns";

const ManageSpeciesPage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_ANIMALSPECIES;

  try {
    // Make the GET request to fetch staff data
    const response = await axios.get(url + ``);

    // Check if the response contains data
    if (response.data === null) {
      // animal not found, set speciesData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Species not found.</p>
          </div>
        </div>
      );
    }

    // Extract speciesData from the response
    let speciesData = response.data;

    // If speciesData is an array, loop through it and update date format and isDeleted property
    if (Array.isArray(speciesData)) {
      speciesData.forEach((animal: any) => {});
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageSpeciesClient data={speciesData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageSpeciesPage;

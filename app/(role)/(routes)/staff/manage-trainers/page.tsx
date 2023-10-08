import React, { useState } from "react";
import { ManageTrainerClient } from "./components/client";

import axios from "axios";
import { format, set } from "date-fns";
import { Button } from "@/components/ui/button";
import ErrorPage from "@/app/error/page";

const ManageTrainerAccPage = async () => {
  const url = `https://651d776944e393af2d59dbd7.mockapi.io/trainer`;

  try {
    // Make the GET request to fetch trainer data
    const response = await axios.get(url);

    // Check if the response contains data
    if (response.data === null) {
      // trainer not found, set trainerData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Trainer not found.</p>
          </div>
        </div>
      );
    }

    // Extract trainerData from the response
    let trainerData = response.data;

    // If trainerData is an array, loop through it and update date format and isDeleted property
    if (Array.isArray(trainerData)) {
      trainerData.forEach((trainer: any) => {
        trainer.dob = format(new Date(trainer.dob), "MMMM do, yyyy");
      });
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageTrainerClient data={trainerData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageTrainerAccPage;

import React, { useState } from "react";
import { ManageTrainerClient } from "./components/client";

import axios from "axios";
import { format, set } from "date-fns";
import { Button } from "@/components/ui/button";
import ErrorPage from "@/app/error/page";
import { string } from "zod";

const ManageTrainerAccPage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_TRAINERS || "";
  try {
    // Make the GET request to fetch trainer data
    const response = await axios.get(url + ``);
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

    let trainerData = response.data;

    if (Array.isArray(trainerData)) {
      trainerData.forEach((trainer: any) => {
        trainer.employeeStatus = trainer.employeeStatus.toString();
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

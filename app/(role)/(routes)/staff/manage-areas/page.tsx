import React, { useState } from "react";
import { ManageAreaClient } from "./components/client";

import axios from "axios";
import { format, set } from "date-fns";
import { Button } from "@/components/ui/button";
import ErrorPage from "@/app/error/page";

const ManageAreaPage = async () => {
  const url = process.env.NEXT_PUBLIC_API_LOAD_AREAS;

  try {
    // Make the GET request to fetch area data
    const response = await axios.get(url + ``);

    // Check if the response contains data
    if (response.data === null) {
      // Areas not found, set areaData to null
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Areas not found.</p>
          </div>
        </div>
      );
    }

    // Extract areaData from the response
    let areaData = response.data;

    // If areaData is an array, loop through it
    if (Array.isArray(areaData)) {
      areaData.forEach((areas: any) => {});
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageAreaClient data={areaData} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageAreaPage;

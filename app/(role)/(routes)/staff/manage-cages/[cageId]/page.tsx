'use client';

import axios from 'axios';
import { ManageCageForm } from './components/manage-cage-form';
import { ManageCageClient } from '../components/client';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @next/next/no-async-client-component
const ManageCagesPage = async ({ params }: { params: { cageId: string } }) => {
  const url = (await process.env.NEXT_PUBLIC_API_GET_CAGE) + `${params.cageId}`;
  const cagebyarea = (await process.env.NEXT_PUBLIC_API_LOAD_CAGE_BY_AREA) + `${params.cageId}`;

  try {
    if (params.cageId.length === 1) {
      const response = await axios.get(cagebyarea);
      let cageData = response.data;
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ManageCageClient data={cageData} />
          </div>
        </div>
      );
    }

    const response = await axios.get(url);
    let cageData = response.data;
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCageForm initialData={cageData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCageForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default ManageCagesPage;

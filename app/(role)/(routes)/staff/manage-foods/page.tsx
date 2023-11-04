import React, { useState } from 'react';
import { ManageFoodClient } from './components/client';

import axios from 'axios';
import { format, set } from 'date-fns';
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';

const ManageFoodPage = async () => {
  const importUrl = process.env.NEXT_PUBLIC_API_LOAD_IMPORTFOOD;
  const foodUrl = process.env.NEXT_PUBLIC_API_LOAD_FOOD;

  try {
    const responseImportFood = await axios.get(importUrl!);
    const responseFood = await axios.get(foodUrl!);
    var importData = responseImportFood.data;
    var food = responseFood.data;
    console.log(importData);

    if (Array.isArray(importData)) {
      importData.forEach((importFood: any) => {
        importFood.importDate = format(new Date(importFood.importDate), 'dd/MM/yyyy');
      });
    }
    if (importData === null) {
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Import history not found.</p>
          </div>
        </div>
      );
    }

    if (food === null) {
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Food not found.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* <ManageFoodClient data={importData} food={food} /> */}
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageFoodPage;

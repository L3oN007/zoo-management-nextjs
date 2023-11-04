import axios from 'axios';
import { ManageFoodForm } from './components/manage-food-form';
import { format } from 'date-fns';
import { ManageImportForm } from './components/manage-import-form';
import { ManageImportClient } from '../components/importCilent';
import { ManageFoodClient } from '../components/client';

const ManageCertificatePage = async ({ params }: { params: { foodId: string } }) => {
  const url = process.env.NEXT_PUBLIC_API_GET_FOOD + `${params.foodId}`;
  const importUrl = process.env.NEXT_PUBLIC_API_LOAD_IMPORTFOOD;
  const foodUrl = process.env.NEXT_PUBLIC_API_LOAD_FOOD;
  try {
    if (params.foodId === 'newImport')
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ManageImportForm initialData={null} />
          </div>
        </div>
      );else if (params.foodId === 'new')
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ManageFoodForm initialData={null} />
          </div>
        </div>
      );
      if(params.foodId === 'importHistory'){
        const responseImportFood = await axios.get(importUrl!);
        var importData = responseImportFood.data;
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
        return(
          <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ManageImportClient data={importData} />
          </div>
        </div>
        )
      } else if(params.foodId === 'food'){
        const responseFood = await axios.get(foodUrl!);
        var food = responseFood.data;
        if (food === null) {
          return (
            <div className="flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <p>Food not found.</p>
              </div>
            </div>
          );
        }
        return(
          <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ManageFoodClient data={food} />
          </div>
        </div>
        )
      }

    const response = await axios.get(url);
    let foodData = response.data;
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageFoodForm initialData={foodData} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ManageCertificatePage;

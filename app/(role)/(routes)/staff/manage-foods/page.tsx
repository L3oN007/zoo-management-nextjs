
import React, { useState } from 'react'
import { ManageFoodClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';


const ManageFoodPage = async () => {
    const url = "https://652f95450b8d8ddac0b2bfe2.mockapi.io/importFood";
    const empUrl= "https://652d3b33f9afa8ef4b27101b.mockapi.io/food";

    try {
        const response = await axios.get(url!);
        const response2 = await axios.get(empUrl!);
        var importData = response.data;
        var food = response2.data;
        console.log(importData);

        // importData.importDate = format(new Date(importData.importDate), "MM/dd/yyyy");
        if  (importData === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Import history not found.</p>
                    </div>
                </div>
            );
        }

        if  (food === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Food not found.</p>
                    </div>
                </div>
            );
        }
       
        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageFoodClient data= {importData} food={food} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <ErrorPage />
        );
    }
}

export default ManageFoodPage;
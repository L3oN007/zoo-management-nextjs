
import React, { useState } from 'react'
import { ManageCageClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';


const ManageCagePage = async () => {
    const url = `https://651822f6582f58d62d356e1a.mockapi.io/cage`;

    try {
        // Make the GET request to fetch cage data
        const response = await axios.get(url);

        // Check if the response contains data
        if (response.data === null) {
            // Cage not found, set cageData to null
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Cage not found.</p>
                    </div>
                </div>
            );
        }

        // Extract cageData from the response
        let cageData = response.data;

        // If cageData is an array, loop through it 
        if (Array.isArray(cageData)) {
            cageData.forEach((cage: any) => {

            });
        }

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageCageClient data={cageData} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <ErrorPage />
        );
    }
}

export default ManageCagePage;
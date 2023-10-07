
import React, { useState } from 'react'
import { ManageCageClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';


const ManageCagePage = async () => {
    const url = `http://localhost:5000/api/Cages/load-cages`;

    try {
        const response = await axios.get(url);
        var cages = response.data;
        // var cages = agent.Cages.list();
        console.log(cages);

        if (cages === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Cage not found.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageCageClient data={cages} />
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
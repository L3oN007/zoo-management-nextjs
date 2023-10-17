
import React, { useState } from 'react'
import { ManageCertificateClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';


const ManageCertificatePage = async () => {
    const url = "https://6525248067cfb1e59ce6b68f.mockapi.io/empCerti";

    try {
        const response = await axios.get(url!);
        var certificates = response.data;

        if  (certificates === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Certificate not found.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageCertificateClient data= {certificates} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <ErrorPage />
        );
    }
}

export default ManageCertificatePage;

import React, { useState } from 'react'
import { ManageCertificateClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';


const ManageCertificatePage = async () => {
    const url = "https://6525248067cfb1e59ce6b68f.mockapi.io/empCerti";
    const empUrl= "https://652d3b33f9afa8ef4b27101b.mockapi.io/empCertificate";

    try {
        const response = await axios.get(url!);
        const response2 = await axios.get(empUrl!);
        var certificates = response.data;
        var empCertificates = response2.data;
        
        if  (certificates === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Certificate not found.</p>
                    </div>
                </div>
            );
        }

        if  (empCertificates === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Employee Certificate not found.</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageCertificateClient data= {certificates} empCer={empCertificates} />
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
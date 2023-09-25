
import React, { useState } from 'react'
import { ManageStaffClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';


const ManageStaffPage = async () => {
    const url = `https://648867740e2469c038fda6cc.mockapi.io/staff`;

    try {
        // Make the GET request to fetch staff data
        const response = await axios.get(url);

        // Check if the response contains data
        if (response.data === null) {
            // Staff not found, set staffData to null
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Staff not found.</p>
                    </div>
                </div>
            );
        }

        // Extract staffData from the response
        let staffData = response.data;

        // If staffData is an array, loop through it and update date format and isDeleted property
        if (Array.isArray(staffData)) {
            staffData.forEach((staff: any) => {
                staff.dob = format(new Date(staff.dob), 'MMMM do, yyyy');
                staff.isDeleted = staff.isDeleted.toString();
            });
        }

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageStaffClient data={staffData} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <ErrorPage />
        );
    }
}

export default ManageStaffPage;
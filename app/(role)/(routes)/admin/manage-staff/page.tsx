
import React, { useState } from 'react'
import { ManageStaffClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";


const ManageStaffPage = async () => {
    const response = (await axios.get('https://648867740e2469c038fda6cc.mockapi.io/staff'));
    const staffData = response.data;
    staffData.forEach((staff: any) => {
        staff.dob = format(new Date(staff.dob), 'MMMM do, yyyy');
        staff.isDeleted = staff.isDeleted.toString();
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ManageStaffClient data={staffData} />
            </div>
        </div>
    )
}

export default ManageStaffPage;
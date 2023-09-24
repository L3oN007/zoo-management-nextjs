import React, { useState } from 'react'
import { ManageStaffClient } from './components/client';
import { StaffColumn } from './components/columns';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ManageStaffPage = async () => {

    const response = await axios.get('https://648867740e2469c038fda6cc.mockapi.io/staff');
    const staff = response.data;



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ManageStaffClient data={staff} />
            </div>
        </div>
    )
}

export default ManageStaffPage;
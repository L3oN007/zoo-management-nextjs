'use client';
import React, { useState } from 'react'
import { ManageCertificateClient } from './components/client';

import axios from 'axios';
import { format, set } from "date-fns";
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Card } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { SidebarNav } from './components/sidebar-nav';


// eslint-disable-next-line @next/next/no-async-client-component
const ManageCertificatePage = async () => {
    const url = "https://652d3b33f9afa8ef4b27101b.mockapi.io/empCertificate";

    try {
        const response = await axios.get(url!);
        var empCerti = response.data;
        console.log(empCerti);
        if  (empCerti === null) {
            return (
                <div className='flex-col'>
                    <div className='flex-1 space-y-4 p-8 pt-6'>
                        <p>Employee does not have any certificate.</p>
                    </div>
                </div>
            );
        }
  

        return (
            <>
			
			<div className='hidden space-y-6 p-10 pb-16 md:block'>
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav  />
					</aside>
                    <div className="flex-1 lg:max-w-full">
                <div >
                    <ManageCertificateClient data= {empCerti}  />
                </div>
            </div>
				</div>
			</div>
		</>
           
        );
    } catch (error) {
        return (
            <ErrorPage />
        );
    }
}


export default ManageCertificatePage;
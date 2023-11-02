"use client"
import axios from 'axios';
import { ManageCageForm } from './components/manage-cage-form';
import { ManageCageClient } from '../components/client';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
// eslint-disable-next-line @next/next/no-async-client-component
const ManageCagesPage = async ({params}: { params: { cageId: string} }) => {
	const url = process.env.NEXT_PUBLIC_API_GET_CAGE + `${params.cageId}`;
	const urlByArea = process.env.NEXT_PUBLIC_API_LOAD_CAGES_BY_AREAID;
	const [areaId, setAreaId] = useState('');
	const [cageByArea, setCageByArea] = useState([]);
	const [cageData, setCageData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const areaId = sessionStorage.getItem('areaId') || '';
			// console.log(areaId);
			// console.log(params.cageId);
			setAreaId(areaId);
			const responseData = await axios.get(urlByArea + `${params.cageId}`)
			.then(response => {
				setCageByArea(response.data);
			});
			const response = await axios.get(url).then(response => {
				setCageData(response.data);
			});
			
		};
		fetchData();
	}, [params.cageId, url, urlByArea]);

	
	try {
		
		
		if(params.cageId.length === 1) {
			return(
			<div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageCageClient data={cageByArea} />
                </div>
            </div>
			)
		}
		else if(params.cageId === 'new'){
			return (
				<div className='flex-col'>
					<div className='flex-1 space-y-4 p-8 pt-6'>
						<ManageCageForm initialData={null} />
					</div>
				</div>
			);
		}
	else if (cageData != null){
		console.log('test',cageData);
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageCageForm initialData={cageData} />
				</div>
			</div>
		)
		}
	} catch (error) {
		console.log(error);
		
	}
};

export default ManageCagesPage;

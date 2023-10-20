import axios from 'axios';
import { ManageFoodForm } from './components/manage-food-form';
import { format } from 'date-fns';
import { ManageImportForm } from './components/manage-import-form';

const ManageCertificatePage = async ({ params }: { params: { foodId: string } }) => {
	const url = "https://652d3b33f9afa8ef4b27101b.mockapi.io/food" + `/${params.foodId}`;

	try {
		
		if (params.foodId === "newImport")
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageImportForm initialData={null} />
				</div>
			</div>
		);

		if (params.foodId === "new")
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageFoodForm initialData={null} />
				</div>
			</div>
		);

		const response = await axios.get(url);
		let foodData = response.data;		
	
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageFoodForm initialData={foodData} />
				</div>
			</div>
		);
	} catch (error) {
		console.log(error);
	}
};

export default ManageCertificatePage;

import axios from 'axios';
import { ManageFoodForm } from './components/manage-food-form';
import { format } from 'date-fns';

const ManageCertificatePage = async ({ params }: { params: { no: number } }) => {
	const url = "https://652f95450b8d8ddac0b2bfe2.mockapi.io/importFood" + `/${params.no}`;

	try {
		const response = await axios.get(url);
		let foodData = response.data;
		foodData.importDate = format(new Date(foodData.importDate), "yyyy-MM-dd");
		console.log(foodData);
		
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageFoodForm initialData={foodData} />
				</div>
			</div>
		);
	} catch (error) {
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageFoodForm initialData={null} />
				</div>
			</div>
		);
	}
};

export default ManageCertificatePage;

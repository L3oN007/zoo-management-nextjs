import axios from 'axios';
import { ManageCageForm } from './components/manage-cage-form';

const ManageAreasPage = async ({ params }: { params: { cageId: string } }) => {
	const url = process.env.NEXT_PUBLIC_API_GET_CAGE + `?id=${params.cageId}`;

	try {
		const response = await axios.get(url);
		let cageData = response.data;

		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageCageForm initialData={cageData} />
				</div>
			</div>
		);
	} catch (error) {
		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageCageForm initialData={null} />
				</div>
			</div>
		);
	}
};

export default ManageAreasPage;

import { ManageNewsClient } from './components/client';

import ErrorPage from '@/app/error/page';
import axios from 'axios';
import { format } from 'date-fns';

const ManageNewsPage = async () => {
	const url = process.env.NEXT_PUBLIC_API_LOAD_NEWS!;

	try {
		const response = await axios.get(url);

		if (response.data === null) {
			return (
				<div className='flex-col'>
					<div className='flex-1 space-y-4 p-8 pt-6'>
						<p>News not found.</p>
					</div>
				</div>
			);
		}

		let newsData = response.data;

		return (
			<div className='flex-col'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<ManageNewsClient data={newsData} />
				</div>
			</div>
		);
	} catch (error) {
		return <ErrorPage />;
	}
};

export default ManageNewsPage;

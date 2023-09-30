import { ManageNewsClient } from './components/client';

import ErrorPage from '@/app/error/page';
import axios from 'axios';
import { format } from "date-fns";


const ManageNewsPage = async () => {
    const url = `https://648867740e2469c038fda6cc.mockapi.io/news`;

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

        // Extract staffData from the response
        let newsData = response.data;

        // If staffData is an array, loop through it and update date format and isDeleted property
        if (Array.isArray(newsData)) {
            newsData.forEach((news: any) => {
                news.createDate = format(new Date(news.createDate), 'MMMM do, yyyy');
            });
        }

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ManageNewsClient data={newsData} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <ErrorPage />
        );
    }
}

export default ManageNewsPage;
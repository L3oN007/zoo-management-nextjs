import { format } from "date-fns";

import axios from "axios";
import { ManageNewsForm } from "./components/manage-news-form";

const EditNewsPage = async ({ params }: { params: { newsId: string } }) => {
    const url = process.env.NEXT_PUBLIC_API_GET_NEWS + `?id=${params.newsId}`;

    try {
        const response = await axios.get(url);
        let newsData = response.data;
        console.log(newsData)

        if (newsData == null) {
            newsData = null;
        } else if (Array.isArray(newsData)) {
            newsData.forEach((news: any) => {
                news.createDate = format(new Date(news.createDate), 'MMMM do, yyyy');
            });
        }

        return (
            <div className="mb-4">
                <ManageNewsForm initialData={newsData} />
            </div>
        );
    } catch (error) {

        return (
            <div>
                <ManageNewsForm initialData={null} />
            </div>
        );
    }
};

export default EditNewsPage;

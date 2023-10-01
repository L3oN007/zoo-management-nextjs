import { format } from "date-fns";

import axios from "axios";
import { ManageNewsForm } from "./components/manage-news-form";

const EditNewsPage = async ({ params }: { params: { newsId: string } }) => {
    // Construct the URL using the staffId from the params object
    const url = `https://648867740e2469c038fda6cc.mockapi.io/news/${params.newsId}`;

    try {
        // Make the GET request to fetch staff data
        const response = await axios.get(url);

        // Extract newsData from the response
        let newsData = response.data;

        // If newsData is null or undefined, set it to null
        if (newsData == null) {
            newsData = null;
        } else if (Array.isArray(newsData)) {
            // If newsData is an array, loop through it and update date format and isDeleted property
            newsData.forEach((news: any) => {
                news.createDate = format(new Date(news.createDate), 'MMMM do, yyyy');
            });
        }

        return (
            <div>
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

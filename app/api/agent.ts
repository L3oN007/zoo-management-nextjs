import axios from "@/lib/axios";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "https://localhost:5000/api";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error.response);
    }
);

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Cages = {
    list: () => requests.get("Cages/load-cages"),
    // details: (id: number) => requests.get(`News/get-news?id=${id}`),
    // create: (news: {}) => requests.post("/news", news),
    // update: (news: {}) => requests.put("/news", news),
    delete: (id: string) => requests.delete(`Cages/delete?cageId=${id}`),
};

const agent = {
    Cages,
};

export default agent;

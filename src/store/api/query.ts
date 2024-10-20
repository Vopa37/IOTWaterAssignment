import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
    const url = import.meta.env.VITE_APP_API_URL;
    if (!url) {
        throw new Error("`VITE_APP_API_URL` env variable not set. Check .env file or README.md for more information");
    }

    const endpoint = queryKey[0];

    const fullUrl = `${url}${endpoint}`;

    const response = await fetch(fullUrl);
    if (!response.ok) {
        throw new Error(`Network response failed: ${response.status} ${response.statusText}`);
    }

    return response.text();
};

export const getQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                queryFn: defaultQueryFn,
            },
        },
    });

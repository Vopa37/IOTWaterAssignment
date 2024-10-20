import { useQuery } from "@tanstack/react-query";

import { parseResponse, parseHistoryResponse } from "store/api/helpers";
import { ExchangeRate } from "store/api/types";

export const useExchangeRates = () => {
    const queryInfo = useQuery<string>({
        queryKey: ["exchange-rates"],
        staleTime: 24 * 60 * 60 * 1000,
    });

    let parsedData: ExchangeRate[] | undefined = [];
    if (queryInfo.isSuccess && queryInfo.data) {
        parsedData = parseResponse(queryInfo.data);
    }

    return {
        ...queryInfo,
        data: parsedData,
    };
};

export const useRatesHistory = (currency?: string) => {
    let queryInfo = useQuery<string>({
        queryKey: [`exchange-rates/history/${currency}`],
        enabled: !!currency
    });

    let parsedData;
    if (queryInfo.isSuccess && queryInfo.data) {
        parsedData = parseHistoryResponse(queryInfo.data);
    }

    return {
        ...queryInfo,
        data: parsedData,
    };
};

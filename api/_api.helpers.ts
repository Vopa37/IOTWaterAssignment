import fetch from "node-fetch";

const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };

export const fetchExchangeRates = async () => {

    if (!process.env.EXCHANGE_RATES_API) {
        throw new Error("Missing EXCHANGE_RATES_API env variable");
    }

    const url = process.env.EXCHANGE_RATES_API+`daily.txt`;
   
    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .catch((error) => {
            console.error(error);
        });
};

export const fetchExchangeRatesHistory = async (currency: string) => {
    // Getting dates for api call
    let now = new Date();
    let nowString = formatDate(now)
    now.setMonth(now.getMonth() - 1);
    let beforeMonthString = formatDate(now)
    
    if (!process.env.EXCHANGE_RATES_API) {
        throw new Error("Missing EXCHANGE_RATES_API env variable");
    }

    const url = process.env.EXCHANGE_RATES_API+`selected.txt?from=${beforeMonthString}&to=${nowString}&currency=${currency}&format=txt`;
    
    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .catch((error) => {
            console.error(error);
        });
};

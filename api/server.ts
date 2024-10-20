import 'dotenv/config'

import express, { Request, Response } from "express";

import cors from 'cors';

import { fetchExchangeRates, fetchExchangeRatesHistory } from "./_api.helpers";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: 'GET,OPTIONS',
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

let cachedExchangeRates: any = null;
let lastFetchedDate: string | null = null;

// Function for fetching exchange rates just once per day
const fetchRatesOncePerDay = async () => {
    const today = new Date().toISOString().split('T')[0];

    // If already fetched today, return cached data
    if (lastFetchedDate === today && cachedExchangeRates) {
        console.log('RETURNING CACHED');
        return cachedExchangeRates;
    }
    
    // Else fetch new data
    const result = await fetchExchangeRates();

    // Set fetched data to cache
    cachedExchangeRates = result;

    // Set last fetch date
    lastFetchedDate = today;
    return result;
};

const handlerRates = async (req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    const result = await fetchRatesOncePerDay();
    res.status(200).send(result);
};

const handlerHistory = async (req: Request, res: Response) => {
    const { currencyCode } = req.params;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    
    const result = await fetchExchangeRatesHistory(currencyCode);
    res.status(200).send(result);
};

app.get("/api/exchange-rates", handlerRates);
app.get("/api/exchange-rates/history/:currencyCode", handlerHistory);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

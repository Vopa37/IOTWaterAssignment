import { z } from "zod";

export const rateSchema = z.object({
    country: z.string(),
    currency: z.string(),
    // this is not the ideal name, but I don't know the domain enough to come up with a better one
    amount: z.coerce.number(),
    code: z.string().min(3).max(3),
    rate: z.coerce.number(),
});

export const ratesSchema = z.array(rateSchema);

export const historyRateSchema = z.object({
    date: z.string(),
    rate: z.coerce.number(),
});

export const historyRatesSchema = z.array(historyRateSchema);

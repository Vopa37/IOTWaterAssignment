import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { ExchangeRate } from 'store/api/types';

interface ExchangeRatesContextType {
    amount: number | null;
    updateAmount: (amount: number | null) => void;
    currency: ExchangeRate | null;
    updateCurrency: (currency: ExchangeRate | null) => void;
}

export const ExchangeRatesContext = createContext<ExchangeRatesContextType>({
    amount: null,
    updateAmount: (amount: number | null) => {},
    currency: null,
    updateCurrency: (currency: ExchangeRate | null) => {},
});

export const ExchangeRatesContextProvider = ({ children }: { children: ReactNode }) => {
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<ExchangeRate | null>(null);

    const updateAmount = (amount: number | null) => {
        setAmount(amount);
    }

    const updateCurrency = (currencyParam: ExchangeRate | null) => {
        setCurrency(currencyParam);
    }

    return (
        <ExchangeRatesContext.Provider value={{ amount, updateAmount, currency, updateCurrency }}>
            {children}
        </ExchangeRatesContext.Provider>
    );
};

export default ExchangeRatesContextProvider;

import Chart from "components/Chart/Chart";
import { ExchangeRate } from "components/ExchangeRate";
import { List } from "components/List";
import { Layout } from "components/ui";
import ExchangeRatesContextProvider from "ExchangeRateContext";
import { useExchangeRates } from "store/api/hooks";

const App = () => {
    const { data: exchangeRates } = useExchangeRates();
    return (
        <>
            <Layout>
                <ExchangeRatesContextProvider>
                    <ExchangeRate />
                    <Chart/>
                    <List exchangeRates={exchangeRates} />
                </ExchangeRatesContextProvider>
            </Layout>
        </>
    );
};

export { App };

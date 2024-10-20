import { LineChart, Line,XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {ChartLayout} from './ChartLayout';
import { useContext } from 'react';
import { ExchangeRatesContext } from 'ExchangeRateContext';
import { useRatesHistory } from 'store/api/hooks';
const Chart = (props: any) => {

    const {currency} = useContext(ExchangeRatesContext);
    
    const { data: rateHistory } = useRatesHistory(currency?.code);

    // Function for calculating domain of Y axis
    const getDataDomain = () => {
        if (!rateHistory) {
            return [0, 10];
        }

        const minRate = rateHistory.history.reduce((min: number, item: any) => {
            return item.rate < min ? item.rate : min;
        }, rateHistory.history[0].rate);

        const maxRate = rateHistory.history.reduce((max: number, item: any) => {
            return item.rate > max ? item.rate : max;
        }, rateHistory.history[0].rate);

        return [minRate-0.2, maxRate+0.2];
    }

    return(
        <>
            { rateHistory && (
                <ChartLayout>
                    <LineChart width={500} height={300} data={rateHistory?.history}>
                        <XAxis dataKey="date" />
                        <YAxis domain={getDataDomain()}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rate" stroke="#37A2EB" />
                    </LineChart>
                </ChartLayout>
            )}
        </>
    )
}

export default Chart;
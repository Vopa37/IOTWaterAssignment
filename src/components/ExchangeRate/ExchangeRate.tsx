import { useState,useContext, useEffect } from "react";

import { AmountInput } from "components/ExchangeRate/AmountInput";
import { CurrencySelector } from "components/ExchangeRate/CurrencySelector";
import { FixedPlaceholder } from "components/ExchangeRate/FixedPlaceholder";
import { PromptLayout } from "components/ExchangeRate/PromptLayout";
import { Wrapper } from "components/ExchangeRate/Wrapper";
import { Loading } from "components/ui";
import { Typography } from "components/ui/Typography";
import { ExchangeIcon } from "components/ui/icons";
import { useExchangeRates } from "store/api/hooks";
import { convertCurrency } from "utils/exchange.helpers";
import { ExchangeRatesContext } from "ExchangeRateContext";

const _ExchangeRate = () => {
    const { data, isPending } = useExchangeRates();
    const {amount, updateAmount, currency, updateCurrency} = useContext(ExchangeRatesContext);

    if (isPending) {
        return <Loading />;
    }

    const result = currency && amount ? convertCurrency(currency, amount) : null;
    return (
        <FixedPlaceholder>
            <Wrapper>
                <ExchangeIcon />
                <Typography.Centered>
                    <Typography.Prompt>
                        <PromptLayout>
                            <AmountInput onChange={(number)=>{updateAmount(number)}} />
                            <span>CZK</span>
                        </PromptLayout>
                    </Typography.Prompt>
                    <Typography.Small>exchanges for</Typography.Small>
                    <PromptLayout>
                        {currency && <Typography.Prompt>{result?.toFixed(2)}</Typography.Prompt>}
                        <CurrencySelector currencies={data} onSelect={(currency)=>updateCurrency(currency)} />
                    </PromptLayout>
                </Typography.Centered>
            </Wrapper>
        </FixedPlaceholder>
    );
};

export { _ExchangeRate as ExchangeRate };

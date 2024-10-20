import styled from "styled-components";
import { ExchangeRate } from "store/api/types";

export const ListLayout = styled.div<{$margin: boolean;}>`
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background-color: var(--white);

    margin-top: ${(props)=>(props.$margin ? '0px': '146px')};
    margin-bottom: 2rem;
`;

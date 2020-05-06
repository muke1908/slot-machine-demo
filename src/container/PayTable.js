import React, { useContext } from 'react';
import styled from 'styled-components';
import PayoutCombo from '../components/PayoutCombo';

import GameContext from '../context';

import payTableConfig from '../config/payTable';
const { winningCombination } = payTableConfig;

const PayTableContainer = styled.div`
    background: linear-gradient(to right, #3f4c6b, #606c88);
    padding: 20px;
    border-radius: 10px;
    flex-direction: row;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
`

const PayTable = ()=> {
    const { gameResult } = useContext(GameContext);    
    const { lineIndex, symbolIndex } = gameResult || {};

    return(
        <PayTableContainer>
            {
                winningCombination.map(({line, combinations}, index)=> {
                    return(
                        <PayoutCombo symbolIndex={symbolIndex} winingRow={lineIndex === index} key={index} line={line} combinations={combinations}/>
                    )
                })
            }
        </PayTableContainer>
    )
}


export default PayTable;

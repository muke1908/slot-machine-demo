import React from 'react';
import styled from 'styled-components';

import reelConfig from '../config/reel';
const { symbols: SYMBOLS } = reelConfig;

const CombinationRowContainer = styled.div`
    background: #111;
    border-radius: 4px;
    overflow: hidden;
    width: 48%;
    margin: 1%;

    .row {
        display: flex;
        border-bottom: 1px solid #838383;
        padding: 10px;

        &:last-child {
            border: 0px;
        }

        &.blink {
            animation: blink 0.5s 5;
        }
    }

    img {
        width: 50px;
    }

    .symContainer {
        display: flex;
        flex: 1;
    }
    .winningAmount{
        font-size: 50px;
    }
    .header {
        font-size: 20px;
        padding: 20px 10px;
        background: #000;
        color:#FFCA00;
    }
`

const Combinations = ({ combinations, line, winingRow, symbolIndex })=> {

    return(
        <CombinationRowContainer>
            <div className='header'>{line}</div>
            {
                combinations.map(({ symbols, winingAmount }, index)=> {
                    const shouldBlink = winingRow && (index === symbolIndex);
                    return(
                        <div key={index} className={'row '+ (shouldBlink ? 'blink' : '')}>
                            <div className='symContainer'>
                            {
                                symbols.map((sym, index)=> {
                                    const { image } = SYMBOLS.find(({name})=>name===sym);
                                    return(
                                        <div key={`${sym}-${index}`}>
                                            <img src={image} />
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className='winningAmount'>
                                { winingAmount }
                            </div>
                        </div>
                    )
                })
            }
        </CombinationRowContainer>
    )
}


export default Combinations;

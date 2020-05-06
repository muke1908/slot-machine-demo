import React, { useContext } from 'react';
import styled from 'styled-components';
import GameContext from '../context';

import reelConfig from '../config/reel';
import slotConfig from '../config/slot';

const { symbols } = reelConfig;
const { winningLabels } = slotConfig;


const Wrapper = styled.div`
    font-size: 12px;
    margin-top: 10px;
`
const DebugComponent = ({ reelIndex }) => {
    const { debugConfig, setDebugConfig } = useContext(GameContext);

    const handleDebugChange = (type, value)=> {
        const newConfig = [...debugConfig];
        newConfig[reelIndex][type] = value;
        setDebugConfig(newConfig)
    }

    return (
        <Wrapper>
            <div>
                <div>Target symbol</div>
                <select onChange={(e)=>handleDebugChange('symbol', e.target.value)}>
                    {
                        symbols.map((sym)=>{
                            return(<option key={sym.name} value={sym.name}>{sym.name}</option>)
                        })
                    }
                </select>
            </div>
            <br/>
            <div>
                <div>Target position</div>
                <select onChange={(e)=>handleDebugChange('position', e.target.value)}>
                {
                    winningLabels.map((label)=>{
                            return(<option key={label} value={label}>{label}</option>)
                    })
                }
                </select>
            </div>
        </Wrapper>
    );
}


export default DebugComponent;

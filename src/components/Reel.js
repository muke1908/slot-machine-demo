import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

import reelConfig from '../config/reel';
import slotConfig from '../config/slot';

const { symbols } = reelConfig;

const POSITION_INDEX_MAP = {
    'BOTTOM': 2,
    'CENTER': 1,
    'TOP': 0
}

const ReelContainer = styled.div`
    background-color: #000;
    width: 108px;
    text-align: center;
    height: 300px;
    overflow: hidden;
    border: 2px solid #fff;
    border-radius: 3px;
    padding: 4px;
    position: relative;
`

const ReelOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0,0,0,1) 0px,rgba(0,0,0,0) 57px, rgba(0,0,0,0) 227px, rgba(0,0,0,1) 100%);
`

const Reel = ({row, spinState, landingPositions, reel })=> {
    const [ pos, setBgPos ] = useState(0);

    const requestRef = useRef();
    const previousTimeRef = useRef();

    const updatePos = (time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            const pixelToMove = (slotConfig.slotSpeed * 100) * (deltaTime*0.01);
            // Pass on a function to the setter of the state
            // to make sure we always have the latest state
            setBgPos(prevPos => (Math.round(prevPos + pixelToMove)));
        }

        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(updatePos);
    }

    const finishGame = ()=> {
        if(landingPositions) {
            const index = POSITION_INDEX_MAP[landingPositions.position];
            const symbolIndex = symbols.findIndex(({ name })=>name === landingPositions.symbol)

            const symbolHeight = 100;

            // const noOfSymbol = slotConfig.noOfVisibleSymbol;
            // const nextResetPos = pos + (symbolHeight*noOfSymbol) - (pos % (symbolHeight*noOfSymbol));

            setBgPos(0 + (index*symbolHeight) - (symbolIndex*symbolHeight));
        }
    }

    useLayoutEffect(()=> {
        if(spinState === true) {
            requestRef.current = requestAnimationFrame(updatePos);
        }else {
            finishGame();
            cancelAnimationFrame(requestRef.current);
        }
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [ spinState ])

    return (
    <ReelContainer>
        <ReelOverlay />
        <div className="reel-spinner" style={{
            backgroundImage: `url(${reel})`,
            height: '300px',
            backgroundColor: '#fff',
            backgroundRepeatX: 'no-repeat',
            backgroundRepeatY: 'repeat',
            backgroundPosition: `center ${pos}px`,
            transition: 'background-position ease-in-out',
            willChange: 'background-position',
            filter: `blur(${spinState ? 2 : 0}px)`
        }}>
        </div>
    </ReelContainer>
    );
}

export default Reel;

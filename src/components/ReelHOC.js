import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import slotConfig from '../config/slot';

const { reelSpinDelay } = slotConfig;

const ReelHOC = ({ row, spinState, landingPositions, reel })=> {
    const [ spinning, setSpiningState ] = useState(false);
    useEffect(()=> {
        let timer;

        if(spinState) {            
            setSpiningState(true);
        }else {
            timer = setTimeout(()=> {
                setSpiningState(false);
            }, (row*(reelSpinDelay * 1000)))
        }
        return ()=>clearTimeout(timer)
    }, [ spinState ])

    return (
        <>
            <Reel
                reel={reel}
                landingPositions={landingPositions}
                row={row}
                spinState={spinning}
            />
        </>
    );
}

export default ReelHOC;

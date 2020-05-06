import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WiningLineBody = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    background: #e91e63;
    height: 2px;
    left: 0;
    transition: 0.5s;
    z-index: 999;
    animation: blink 0.5s 5;
    transform: translateY(${props => props.transform || 0}px)
`

const WiningLine = ({ gameResult }) => {
    const [ show, setStatus ] = useState(false);

    useEffect(()=> {
        let timer;
        if(gameResult) {
            setStatus(true);
            timer = setTimeout(()=>{
                setStatus(false)
            }, 2500);
        }

    return ()=> clearTimeout(timer)
    }, [gameResult])

    if(!(gameResult && show)) {
        return null;
    }

    const transformDelta = (gameResult.lineIndex * 100) + 60;

    return(
        <WiningLineBody transform={transformDelta}/>
    )
}


export default WiningLine

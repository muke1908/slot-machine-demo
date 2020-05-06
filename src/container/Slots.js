import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Reel from '../components/Reel';
import SpinBtn from '../components/SpinBtn';
import DebugComponent from '../components/DebugComponent';
import WiningLine from '../components/WiningLine';

import GameContext from '../context';

import { iterable, imgAsyncLoad, getSpinResult, getRandomLandingPosition } from '../utils';

import reelConfig from '../config/reel';
import slotConfig from '../config/slot';
import payTableConfig from '../config/payTable';


const { spinDuration, reelsCount } = slotConfig;
const { spinCost } = payTableConfig;



const SlotsContainer = styled.div`
    display: flex;
    background: #000;
    border-radius: 4px;
    flex-direction: row;
    position: relative;
    & > .reel-wrapper {
        margin: 10px;
    }
`
const Wrapper = styled.div`
    background-image: linear-gradient(to bottom , #0005d8,#0042ff,#11459e,#28496f,#000000);
    padding: 30px;
    border-radius: 10px;
`

const Slots = () => {
    const {
        gameResult,
        gameLoading,
        setGameResult,
        setGameLoadingState,
        balance,
        setBalance,
        winAmount,
        setWinAmount,
        debugMode,
        debugConfig
    } = useContext(GameContext);

    const [ spinState, setSpinState ] = useState(false);
    const [ landingPositions, setLandingPosition ] = useState([]);
    const [ reel, setReelImage ] = useState('');

    const spin = ()=> {
        if(spinState || gameLoading) {
            return true
        }

        if((balance-spinCost) < 0) {
            alert('Insufficient coin!');
            return
        }
        setBalance(balance - Number(spinCost))
        const getRandomPositions = debugMode ? debugConfig : getRandomLandingPosition();

        setLandingPosition(getRandomPositions)
        setSpinState(true);
        setGameLoadingState(true);
        setGameResult(null);

        setTimeout(()=> {
            setSpinState(false);
            const gameResult = getSpinResult(getRandomPositions);
            setGameResult(gameResult);
            setWinAmount(winAmount+(gameResult.winAmount || 0));
            setGameLoadingState(false);
        }, (spinDuration*1000))
    }

    const imageFromCanvas = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = reelConfig.symbols.length*100;

        const context = canvas.getContext('2d');

        await Promise.all(reelConfig.symbols.map(async ({image}, index)=> {
            const img = await imgAsyncLoad(image);
            context.drawImage(img, 0, (index*100), 100, 100);
        }))
        const reel = canvas.toDataURL("image/png");
        setReelImage(reel);
    }

    useEffect(()=> {
        imageFromCanvas()
    }, [])

    return(
        <Wrapper>
            <SlotsContainer>
                <WiningLine gameResult={gameResult}/>
                {
                    iterable(reelsCount).map((item, index) => {
                        return(
                            <div className='reel-wrapper' key={index}>
                                <Reel
                                    reel={reel}
                                    landingPositions={landingPositions[index]}
                                    row={index}
                                    spinState={spinState}
                                />
                                { debugMode && <DebugComponent reelIndex={index} key={index}/> }
                            </div>
                        )
                    })
                }
            </SlotsContainer>
            <SpinBtn onClick={spin}/>
        </Wrapper>
    )
}


export default Slots;

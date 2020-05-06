import React, { useState } from 'react';
import styled from 'styled-components';

// import components
import Balance from './components/Balance';

// import containers
import Slots from './container/Slots';
import PayTable from './container/PayTable';

import GameContext from './context';

// import required configs
import userConfig from './config/user';

import { getInitialDebugOptions } from './utils';

const Wrapper = styled.div`
    display: flex;
    padding:10px;
    justify-content: center;
    & > div {
        display: flex;
        margin: 10px;
    }
`

const Footer = styled.div`
    display: flex;
    padding: 20px;
    .balance {
        flex: 1;
    }
`
const DebugBrnWrapper = styled.a`
    cursor: pointer;
`

const App = ()=> {
    const [ gameLoading, setGameLoadingState ] = useState(false);
    const [ gameResult, setGameResult ] = useState(null);
    const [ balance, setBalance ] = useState(userConfig.initialBalance);
    const [ winAmount, setWinAmount ] = useState(0);

    const [ debugMode, setDebugMode ] = useState(false);
    const [ debugConfig, setDebugConfig ] = useState(getInitialDebugOptions());

    const updateBalance = (newBalance)=> {
        setBalance(Number(balance)+Number(newBalance))
    }

    const debugHandler = (e)=> {
        e.preventDefault()
        setDebugMode(!debugMode)
    }

    return (
        <GameContext.Provider value={{
            gameLoading,
            setGameLoadingState,
            gameResult,
            setGameResult,
            balance,
            setBalance,
            debugMode,
            debugConfig,
            setDebugConfig,
            setWinAmount,
            winAmount
        }}>
            <Wrapper>
                <div>
                    <Slots/>
                </div>
                <div style={{flex:1}}>
                    <PayTable />
                </div>
            </Wrapper>
            <Footer>
                <div className='balance'>
                    <Balance balance={balance} onClick={updateBalance} winAmount={winAmount}/>
                </div>
                <div>
                    <DebugBrnWrapper onClick={(e)=>debugHandler(e)}>
                        { debugMode ? 'Exit Debug' : 'Debug'}
                    </DebugBrnWrapper>
                </div>
            </Footer>
        </GameContext.Provider>
    );
}

export default App;

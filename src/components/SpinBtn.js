import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-direction: column;

    #spin_btn {
        text-transform: uppercase;
        padding: 18px 45px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
        outline: none;
        color: #3d330e;
        background-color: #FFCA00;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #FF9900;
    }

    #spin_btn:hover {
        background-color: #fbd02b;
    }

    #spin_btn:active {
        background-color: #FFCA00;
        box-shadow: 0 5px #FF9900;
        transform: translateY(4px);
    }

    .disabled {
        opacity: 0.5;
        background-color: #FFCA00;
        box-shadow: 0 5px #FF9900;
        transform: translateY(4px);
        pointer-events: none;
    }
`
const SpinBtn = ({ onClick, gameLoading, spinCost })=> {
    const clickHandler = (e)=> {
        e.preventDefault();
        onClick()
    }
    return (
        <Wrapper>
            <a className={gameLoading ? 'disabled' : ''} id="spin_btn" onClick={(e)=>clickHandler(e)}>Spin</a>
            <br/>
            Bet {spinCost} Coin
        </Wrapper>
    );
}

export default SpinBtn;

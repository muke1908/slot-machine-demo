import React, { useState } from 'react';
import userConfig from '../config/user';
import styled from 'styled-components';

const { maxReloadAmount, minReloadAmount } = userConfig;

const BalanceWrapper = styled.div`
    display: flex;
    font-size: 30px;

    .item {
        margin-right: 100px;
    }

    .note {
        font-size: 12px;
    }

    input[type="text"] {
        padding: 10px;
        border-radius: 4px;
        border: 0px;
        width: 200px;
        margin-bottom: 5px;
        margin-right: 10px;
    }

    a {
        display: inline-block;
        cursor: pointer;
        background: #fff;
        color: #111;
        padding: 7px;
        font-size: 18px;
        border-radius: 4px;
        outline: none;

        &:active {
            transform: translateY(2px);
        }
    }
    .winAmount {
        color: #FFCA00;
    }
`

const Balance = ({ balance, winAmount, onClick })=> {

    const [ newBalance, setNewBalance ] = useState('');
    const validationString = `Enter a number from ${maxReloadAmount} to ${minReloadAmount}`;

    const updateBalance = (e, updateAmount) => {
        e.preventDefault();

        if(!(newBalance >= 0 && newBalance <= 5000)) {
            alert(validationString);
            return;
        }

        onClick(updateAmount);
        setNewBalance('');
    }

    return (
        <BalanceWrapper>
            <div className='item'>
                <span className='winAmount'>Won {winAmount}!</span>
                <br/>
                You have { balance } coins
            </div>
            <div>
                <input type='text' value={newBalance} onChange={(e)=>setNewBalance(e.target.value)}/>
                <div className='note'>{validationString}</div>
            </div>
            <div>
                <a onClick={(e)=>updateBalance(e, newBalance)}>Add coin</a>
            </div>
        </BalanceWrapper>
    );
}

export default Balance;

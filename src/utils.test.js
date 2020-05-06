import {
    iterable,
    getRandomFromArray,
    getRandomLandingPosition,
    getSpinResult
} from './utils';

import slotConfig from './config/slot';
import payTableConfig from './config/payTable';

test('Create iterable of length 3', () => {
    expect(iterable(3).length).toBe(3)
})

test('Create 0 size iterable if no arg passed', () => {
    expect(iterable().length).toBe(0)
})

test('Get random value from array', () => {
    const sampleArray = [1,2,3,4,5];
    const rand = getRandomFromArray(sampleArray);
    const indexOfRand = sampleArray.indexOf(rand);
    expect(indexOfRand).toBeGreaterThan(-1)
})

test('Return correct no of landing positions', () => {
    const returnValue = getRandomLandingPosition();
    expect(returnValue.length).toBe(slotConfig.reelsCount)
})

test('Pick right wining combination from paytable', () => {
    const landingPosition = [
       {
          "position":"TOP",
          "symbol":"cherry"
       },
       {
          "position":"TOP",
          "symbol":"cherry"
       },
       {
          "position":"TOP",
          "symbol":"cherry"
       }
    ]

    const expectedWinningCombo = payTableConfig.winningCombination[0].combinations[0];
    const returnValue = getSpinResult(landingPosition);

    expect(returnValue).toMatchObject({
      winingLabelIndex: 0,
      symbolIndex: 0,
      lineIndex: 0,
      winAmount: expectedWinningCombo.winingAmount
    })
})

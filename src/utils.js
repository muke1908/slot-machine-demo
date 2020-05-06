import slotConfig from './config/slot';
import reelConfig from './config/reel';

const { reelsCount, winningLabels, slotBias } = slotConfig;

export const iterable = (length = 0) => {
    return [...Array((length))]
}

export const getRandomFromArray = (array) => {
    const isArray = array && Array.isArray(array);
    const validArrayLength = !!array.length;
    const isValid = isArray && validArrayLength;

    if(!isValid) {
        throw 'Pass valid array with atleast 1 element';
    }
    return array[Math.floor(Math.random() * array.length)];
}

export const imgAsyncLoad = (src) => {
    return new Promise((resolve, reject)=> {
        const img = new Image();
        img.src = src;
        img.onload = function(){
            resolve(img);
        }
        img.onerror = reject
    })
}

export const getInitialDebugOptions = ()=> {
    const symbols = reelConfig.symbols.map(({ name })=>name);
    return iterable(reelsCount).map((item, index) => {
        return {
            position: winningLabels[0],
            symbol: symbols[0]
        }
    })
}

export const getRandomLandingPosition = () => {
    const symbols = reelConfig.symbols.map(({name})=>name);

    return iterable(reelsCount).map((item, index) => {
        return {
            position: getRandomFromArray(winningLabels),
            symbol: getRandomFromArray(slotBias[index]  || symbols)
        }
    })
}

// get all symbol at a row by a position and name of symbol
const getAllPositionsSym = (currentPosition, currentSymbol)=> {
    const symbols = reelConfig.symbols.map(({name})=>name);
    const positionIndex = winningLabels.indexOf(currentPosition);
    const _winningLabels = [...winningLabels]
    _winningLabels.splice(positionIndex, 1);
    const otherIndexes = _winningLabels.map((i)=>winningLabels.indexOf(i));

    const symbolIndex = symbols.indexOf(currentSymbol);

    const row = [];
    row[positionIndex] = currentSymbol;

    const otherSymAtPos = otherIndexes.map((i)=> {
        const delta = (i - positionIndex);
        const targetDelta = symbolIndex+delta;
        const targetSymbolIndexMod = targetDelta < 0 ? (symbols.length+targetDelta) : targetDelta
        const targetSymbolIndex = targetSymbolIndexMod%symbols.length;
        row[i] = symbols[targetSymbolIndex];
    })

    return row;
}

// return line if symbols landed in wining position
export const getSpinResult = (winningCombination, spinResult)=> {
    const resultMatrix = [];
    spinResult.map(({ position, symbol }, row)=> {
        resultMatrix[row] = getAllPositionsSym(position, symbol);
    })

    const transposed = [];
    winningLabels.forEach((i, j)=> {
        const index = winningLabels.indexOf(i);
        transposed[j] = {
            line: i,
            symbols: resultMatrix.map(i=>i[index]).join('_')
        }
    })

    let symbolIndex = -1;
    let lineIndex = -1;
    let winAmount = 0;

    winningCombination.forEach(({ line: lineToMatch, combinations }, index)=> {

        const symbolsToMatch = transposed.find(({ line })=>line === lineToMatch).symbols;
        const matchIndex = combinations.findIndex(({ symbols }, index)=> {
            return symbols.join('_') === symbolsToMatch
        })

        if(matchIndex > -1) {
            lineIndex = index;
            symbolIndex = matchIndex;
            winAmount = combinations[matchIndex].winingAmount
        }
    })

    if(symbolIndex > -1 && lineIndex > -1) {
        return {
            symbolIndex,
            lineIndex,
            winAmount
        }
    }

    return false

}

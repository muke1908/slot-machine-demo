import slotConfig from './config/slot';
import reelConfig from './config/reel';
import payTableConfig from './config/payTable';

const { reelsCount, winningLabels, slotBias } = slotConfig;
const { winningCombination  } = payTableConfig;

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
export const getSpinResult = (spinResult)=> {
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
    let winingLabelIndex = 0;

    for(let index in winningCombination) {
        const { line: lineToMatch, combinations } =  winningCombination[index];
        if(lineToMatch === 'ANY') {
            for(let j in transposed) {
                const { line, symbols: symbolsToMatch } = transposed[j];
                const matchIndex = combinations.findIndex(({ symbols }, index)=> {
                    return symbols.join('_') === symbolsToMatch
                })

                if(matchIndex > -1) {
                    winingLabelIndex = Number(winningLabels.indexOf(line));
                    lineIndex = Number(index);
                    symbolIndex = Number(matchIndex);
                    winAmount = combinations[matchIndex].winingAmount;
                    break;
                }
            }
        }else {
            const { line, symbols: symbolsToMatch } = transposed.find(({ line })=>line === lineToMatch);
            const matchIndex = combinations.findIndex(({ symbols }, index)=> {
                return symbols.join('_') === symbolsToMatch
            })

            if(matchIndex > -1) {
                winingLabelIndex = Number(winningLabels.indexOf(line));
                lineIndex = Number(index);
                symbolIndex = Number(matchIndex);
                winAmount = combinations[matchIndex].winingAmount
                break;
            }
        }
    }

    if(symbolIndex > -1 && lineIndex > -1) {
        return {
            winingLabelIndex,
            symbolIndex,
            lineIndex,
            winAmount
        }
    }

    return false
}

export const createAndGetCanvasCtx = (document, { width= 100, height= 100 }) => {

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    return { canvas, context };
}

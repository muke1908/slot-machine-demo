> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

DEMO: https://muke1908.github.io/slot-machine-demo/

## Slot Machine

This is a slot machine implementation having following features:
- Configurable reels (`./config/slot`, `./config/reel`)
- Supports bias in each reel.
- Configurable pay tables (`./config/paytable`)
- Balance indicator.
- Debug mode - debug mode will allow you to set a *symbol* at any position in each *reel*. However, the wining combination will be decided based on the paytable configuration.

## Configs  

1. **Reel** - `/config/reel.js`  

| Variables   |      Description      |  Type |
|----------|-------------|------|
| `symbols` |  Array of symbols in a reel   |   `[{symbol, image}]` |


2. **Slot** - `/config/slot.js`  

| Variables   |      Description      |  Type |
|----------|-------------|------|
| `slotSpeed` |  No of symbol/sec while spinning   |   `Number` |
| `reelSpinDelay` |  Delay in stopping spins from left to right   |   `Number` |
| `winningLabels` |  Winning labels in their vertical order   |   `Array` |
| `spinDuration` |  Spin duration in seconds   |   `Number` |
| `reelsCount` |  No of reels in slot   |   `Number` |
| `slotBias` |  Add bias for each reel while picking random symbol   |   [Array] |


3. **Pay Table** - `/config/payTable.js`  

| Variables   |      Description      |  Type |
|----------|-------------|------|
| `spinCost` |  No of coin required for each spin | Number |
| `winningCombination` |    The combination that defines wining line and winning amount   |   `Array` |

**NOTE:** Paytable supports any types (horizontal) of winning combinations. The final result will consider the **order** of combination in the table - *Latter will override the former*

4. **Player** - `/config/user.js`  

| Variables   |      Description      |  Type |
|----------|-------------|------|
| `initialBalance` |  Balance to start session with   |   `Number` |
| `maxReloadAmount` |  Max amount to reload at once    |   `Number` |
| `minReloadAmount` |  Min amount to reload at once    |   `Number` |



## Start the app  
```npm start```

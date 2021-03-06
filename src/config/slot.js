const slotConfig = {
    slotSpeed: 2, // 1 symbol per second
    winningLabels: ['TOP', 'CENTER', 'BOTTOM'],
    spinDuration: 2, // in second
    reelsCount: 3,
    reelSpinDelay: 0.5, // in second
    slotBias: [
        ['cherry', 'cherry', 'cherry', 'cherry', 'bar', 'bar'],
        ['seven', 'cherry', 'cherry', 'cherry', '2xbar', '2xbar'],
        ['seven', 'seven', 'cherry', 'cherry', '3xbar', '3xbar']
    ]
}

export default slotConfig;

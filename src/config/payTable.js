const payTable = {
    spinCost: 1,
    winningCombination: [
        {
            line: 'TOP',
            combinations: [
                {
                    symbols: ['2xbar', 'bar', '3xbar'],
                    winingAmount: 2000
                },
                {
                    symbols: ['cherry', 'cherry', 'seven'],
                    winingAmount: 75
                },
                {
                    symbols: ['cherry', 'seven', 'bar'],
                    winingAmount: 75
                }
            ]

        },
        {
            line: 'CENTER',
            combinations: [
                {
                    symbols: ['cherry', 'cherry', 'seven'],
                    winingAmount: 75
                },
                {
                    symbols: ['cherry', 'seven', 'bar'],
                    winingAmount: 75
                }, {
                    symbols: ['cherry', '2xbar', 'seven'],
                    winingAmount: 75
                }
            ]

        },
        {
            line: 'BOTTOM',
            combinations: [
                {
                    symbols: ['2xbar', 'bar', '3xbar'],
                    winingAmount: 2000
                },
                {
                    symbols: ['cherry', 'cherry', 'seven'],
                    winingAmount: 75
                }
            ]

        }
    ]
}

export default payTable;

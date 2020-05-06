const payTable = {
    spinCost: 1,
    winningCombination: [
        {
            line: 'TOP',
            combinations: [
                {
                    symbols: ['cherry', 'cherry', 'cherry'],
                    winingAmount: 2000
                },
                {
                    symbols: ['2xbar', 'cherry', '3xbar'],
                    winingAmount: 75
                }
            ]

        }, {
            line: 'CENTER',
            combinations: [
                {
                    symbols: ['cherry', 'cherry', 'cherry'],
                    winingAmount: 1000
                }, {
                    symbols: ['bar', 'bar', 'bar'],
                    winingAmount: 50
                }
            ]

        }, {
            line: 'BOTTOM',
            combinations: [
                {
                    symbols: ['cherry', 'cherry', 'cherry'],
                    winingAmount: 4000
                }
            ]

        }, {
            line: 'ANY',
            combinations: [
                {
                    symbols: ['seven', 'seven', 'seven'],
                    winingAmount: 150
                }, {
                    symbols: ['3xbar', '3xbar', '3xbar'],
                    winingAmount: 50
                }
            ]

        }
    ]
}

export default payTable;

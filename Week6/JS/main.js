function startGame(tableElement, size, pattern) {
    const gameGrid = new Grid(size, size, tableElement);

    // defining the glider pattern for preset option.
    const gliderPattern = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ];

    //defining the replicator pattern 
    const replicatorPattern = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    // Reset grid first
    gameGrid.reset();

    // placing pattern
    if (pattern === 'glider') {
        placePattern(gliderPattern, gameGrid);
    } else if (pattern === 'replicator') {
        placePattern(replicatorPattern, gameGrid);
    } else if (pattern === 'random') {
        gameGrid.randomize();
    }
    // if pattern is 'empty', we don't need to do anything since reset() was called

    return gameGrid;
}

function placePattern(pattern, gameGrid) {
    const startRow = Math.floor(gameGrid.rows / 2) - 1;
    const startCol = Math.floor(gameGrid.cols / 2) - 1;

    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j] === 1) {
                gameGrid.toggleCell(startRow + i, startCol + j);
            }
        }
    }
}

// Initialize game when DOM is loaded


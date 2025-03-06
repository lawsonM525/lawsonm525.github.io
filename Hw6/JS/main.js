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
    // if pattern is 'empty' we just dont do anything since reset() was called

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

// Add these new variables and functions
let animationId = null;
const ANIMATION_SPEED = 100; // milliseconds between generations

function animate(gameGrid) {
    gameGrid.nextGeneration();
    animationId = setTimeout(() => animate(gameGrid), ANIMATION_SPEED);
}

function toggleAnimation(gameGrid, startButton) {
    if (animationId === null) {
        // Start animation
        startButton.textContent = 'Stop';
        startButton.style.backgroundColor = '#ff1493';
        animate(gameGrid);
    } else {
        // Stop animation
        startButton.textContent = 'Start';
        startButton.style.backgroundColor = '#ff69b4';
        clearTimeout(animationId);
        animationId = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableElement = document.getElementById('gameGrid');
    const GRID_SIZE = 20;
    
    // Initialize game with glider pattern
    let gameGrid = startGame(tableElement, GRID_SIZE, 'glider');

    // Event listeners for buttons
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
        toggleAnimation(gameGrid, startButton);
    });

    document.getElementById('nextGen').addEventListener('click', () => {
        if (animationId !== null) {
            toggleAnimation(gameGrid, startButton);
        }
        gameGrid.nextGeneration();
    });

    document.getElementById('reset').addEventListener('click', () => {
        if (animationId !== null) {
            toggleAnimation(gameGrid, startButton);
        }
        const currentPattern = document.getElementById('current-pattern').textContent.toLowerCase();
        gameGrid = startGame(tableElement, GRID_SIZE, currentPattern);
    });

    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (animationId !== null) {
                toggleAnimation(gameGrid, startButton);
            }
            const pattern = e.target.getAttribute('data-pattern');
            document.getElementById('current-pattern').textContent = 
                pattern.charAt(0).toUpperCase() + pattern.slice(1);
            gameGrid = startGame(tableElement, GRID_SIZE, pattern);
        });
    });
});


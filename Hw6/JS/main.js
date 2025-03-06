// ====================================
// Grid Size Calculation and Styling
// ====================================

/**
 * Calculates the optimal cell size based on window height and grid size
 */
function calculateCellSize() {
    const controls = document.querySelector('.controls');
    const title = document.querySelector('h1');
    const timeInfo = document.querySelector('p');
    
    // Calculate available height (viewport height - controls - title - padding)
    const availableHeight = window.innerHeight - controls.offsetHeight - title.offsetHeight - timeInfo.offsetHeight - 100;
    const gridSize = parseInt(document.getElementById('gridSize').value);
    
    return Math.floor((availableHeight - gridSize) / gridSize);
}

/**
 * Updates the CSS rules for grid cell size
 */
function updateGridStyle() {
    const cellSize = calculateCellSize();
    const styleSheet = document.styleSheets[0];
    
    // Find and update or add the cell size rules
    let found = false;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (rule.selectorText === '#gameGrid td') {
            rule.style.width = `${cellSize}px`;
            rule.style.height = `${cellSize}px`;
            found = true;
            break;
        }
    }
    
    if (!found) {
        styleSheet.insertRule(`#gameGrid td { width: ${cellSize}px; height: ${cellSize}px; }`, styleSheet.cssRules.length);
    }
}

// ====================================
// Game Initialization and Patterns
// ====================================

/**
 * Initializes or resets the game with specified pattern
 */
function startGame(tableElement, size, pattern) {
    const gameGrid = new Grid(size, size, tableElement);
    updateGridStyle();

    // Pattern definitions
    const gliderPattern = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ];

    const replicatorPattern = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    // Reset and apply selected pattern
    gameGrid.reset();
    
    switch(pattern) {
        case 'glider':
            placePattern(gliderPattern, gameGrid);
            break;
        case 'replicator':
            placePattern(replicatorPattern, gameGrid);
            break;
        case 'random':
            gameGrid.randomize();
            break;
        // 'empty' pattern requires no additional action
    }

    return gameGrid;
}

/**
 * Places a pattern in the center of the grid 
 */
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

// ====================================
// Animation Control
// ====================================

let animationId = null;
const ANIMATION_SPEED = 100; // milliseconds between generations

/**
 * Animates the game by continuously generating next states 
 */
function animate(gameGrid) {
    gameGrid.nextGeneration();
    animationId = setTimeout(() => animate(gameGrid), ANIMATION_SPEED);
}

/**
 * Toggles the animation state between playing and stopped
 * @param {Grid} gameGrid - The game grid to animate
 * @param {HTMLElement} startButton - The button that toggles animation
 */
function toggleAnimation(gameGrid, startButton) {
    if (animationId === null) {
        startButton.textContent = 'Stop';
        startButton.style.backgroundColor = '#ff1493';
        animate(gameGrid);
    } else {
        startButton.textContent = 'Play';
        startButton.style.backgroundColor = '#ff69b4';
        clearTimeout(animationId);
        animationId = null;
    }
}

// ====================================
// Event Listeners
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    const tableElement = document.getElementById('gameGrid');
    let GRID_SIZE = 20;
    let gameGrid = startGame(tableElement, GRID_SIZE, 'glider');

    // Size control handlers
    const sizeSlider = document.getElementById('gridSize');
    const sizeValue = document.getElementById('sizeValue');
    
    sizeSlider.addEventListener('input', (e) => {
        sizeValue.textContent = e.target.value;
        updateGridStyle();
    });

    sizeSlider.addEventListener('change', (e) => {
        if (animationId !== null) {
            toggleAnimation(gameGrid, startButton);
        }
        GRID_SIZE = parseInt(e.target.value);
        const currentPattern = document.getElementById('current-pattern').textContent.toLowerCase();
        gameGrid = startGame(tableElement, GRID_SIZE, currentPattern);
    });

    // Game control buttons
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

    // Pattern selection handlers
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

    // Window resize handler
    window.addEventListener('resize', () => {
        updateGridStyle();
    });
});


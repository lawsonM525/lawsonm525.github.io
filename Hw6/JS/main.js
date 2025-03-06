function calculateCellSize() {
    // Get the height of the controls section
    const controls = document.querySelector('.controls');
    const title = document.querySelector('h1');
    const timeInfo = document.querySelector('p');
    
    // Calculate available height (viewport height - controls - title - padding)
    const availableHeight = window.innerHeight - controls.offsetHeight - title.offsetHeight - timeInfo.offsetHeight - 100; // 100px for padding/margins
    
    // Get current grid size
    const gridSize = parseInt(document.getElementById('gridSize').value);
    
    // Calculate cell size (subtract some pixels for borders)
    return Math.floor((availableHeight - gridSize) / gridSize);
}

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

function startGame(tableElement, size, pattern) {
    const gameGrid = new Grid(size, size, tableElement);
    updateGridStyle();

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

// adding animation feature
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
        startButton.textContent = 'Play';
        startButton.style.backgroundColor = '#ff69b4';
        clearTimeout(animationId);
        animationId = null;
    }
}

// Add these functions to handle saving the grid as an image
function createGridImage(gameGrid) {
    const canvas = document.getElementById('saveCanvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20; // Fixed size for the image
    const padding = 20; // Padding around the grid
    
    // Set canvas size based on grid dimensions
    canvas.width = gameGrid.cols * cellSize + (padding * 2);
    canvas.height = gameGrid.rows * cellSize + (padding * 2);
    
    // Fill background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    // Draw cells
    for (let i = 0; i < gameGrid.rows; i++) {
        for (let j = 0; j < gameGrid.cols; j++) {
            const x = j * cellSize + padding;
            const y = i * cellSize + padding;
            
            // Draw cell
            ctx.strokeRect(x, y, cellSize, cellSize);
            
            // Fill living cells
            if (gameGrid.cells[i][j].isAlive) {
                ctx.fillStyle = '#ff69b4';
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
    
    return canvas.toDataURL('image/png');
}

function saveGridAsImage(gameGrid) {
    try {
        const dataUrl = createGridImage(gameGrid);
        
        // Create temporary link to download the image
        const link = document.createElement('a');
        link.download = 'game-of-life-state.png';
        link.href = dataUrl;
        
        // Append link to body (needed for Firefox)
        document.body.appendChild(link);
        
        // Trigger click and remove link
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        alert('Image saved successfully!');
    } catch (error) {
        console.error('Error saving image:', error);
        alert('Failed to save image. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableElement = document.getElementById('gameGrid');
    let GRID_SIZE = 20;
    
    // Initialize game with glider pattern
    let gameGrid = startGame(tableElement, GRID_SIZE, 'glider');

    // Add size slider handler
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

    // Add save button handler
    document.getElementById('saveBtn').addEventListener('click', () => {
        if (animationId !== null) {
            // Pause animation while saving
            toggleAnimation(gameGrid, startButton);
        }
        saveGridAsImage(gameGrid);
    });

    // Update grid size when window is resized
    window.addEventListener('resize', () => {
        updateGridStyle();
    });
});


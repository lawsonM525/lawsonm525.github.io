// ====================================
// Grid Class Definition
// ====================================

class Grid {
    /**
     * Creates a new game grid
     * @param {number} rows - Number of rows
     * @param {number} cols - Number of columns
     * @param {HTMLElement} tableElement - Table element to render grid
     */
    constructor(rows, cols, tableElement) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.tableElement = tableElement;
        this.initializeGrid();
        this.createHTMLGrid(tableElement);
    }

    // ====================================
    // Grid Setup Methods
    // ====================================

    /**
     * Creates the 2D array of cells
     */
    initializeGrid() {
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    /**
     * Creates the HTML table representation of the grid
     */
    createHTMLGrid(tableElement) {
        tableElement.innerHTML = '';
        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('td');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => this.toggleCell(i, j));
                row.appendChild(cell);
            }
            tableElement.appendChild(row);
        }
    }

    // ====================================
    // Game Logic Methods
    // ====================================

    /**
     * Toggles cell state and updates display
     */
    toggleCell(row, col) {
        this.grid[row][col].switchState();
        this.updateDisplay();
    }

    /**
     * Counts living neighbors for a cell
     */
    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.rows && 
                    newCol >= 0 && newCol < this.cols) {
                    if (this.grid[newRow][newCol].alive === 1) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    /**
     * Advances the game by one generation
     */
    nextGeneration() {
        // Calculate next states
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const neighborCount = this.countNeighbors(i, j);
                if (this.grid[i][j].alive === 1) {
                    this.grid[i][j].nextState = (neighborCount === 2 || neighborCount === 3) ? 1 : 0;
                } else {
                    this.grid[i][j].nextState = (neighborCount === 3) ? 1 : 0;
                }
            }
        }

        // Update all states simultaneously
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].alive = this.grid[i][j].nextState;
            }
        }

        this.updateDisplay();
    }

    // ====================================
    // Display and State Methods
    // ====================================

    /**
     * Updates the visual display of the grid
     */
    updateDisplay() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.tableElement.rows[i].cells[j];
                if (this.grid[i][j].alive === 1) {
                    cell.classList.add('alive');
                } else {
                    cell.classList.remove('alive');
                }
            }
        }
    }

    /**
     * Resets all cells to dead state
     */
    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
        this.updateDisplay();
    }

    /**
     * Randomly sets cells to alive/dead
     */
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].alive = Math.random() < 0.3 ? 1 : 0; // 30% chance of being alive
                this.grid[i][j].nextState = this.grid[i][j].alive;
            }
        }
        this.updateDisplay();
    }
}

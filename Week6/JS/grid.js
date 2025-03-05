class Grid {
    constructor(rows, cols, tableElement) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.tableElement = tableElement;
        this.initializeGrid();
        this.createHTMLGrid(tableElement);
    }

    initializeGrid() {
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

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

    toggleCell(row, col) {
        this.grid[row][col].switchState();
        this.updateDisplay();
    }

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

    nextGeneration() {
        // Calculate next state for all cells
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const neighborCount = this.countNeighbors(i, j);
                // Store the next state without updating yet
                if (this.grid[i][j].alive === 1) {
                    this.grid[i][j].nextState = (neighborCount === 2 || neighborCount === 3) ? 1 : 0;
                } else {
                    this.grid[i][j].nextState = (neighborCount === 3) ? 1 : 0;
                }
            }
        }

        // Update all cells after calculating next states
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].alive = this.grid[i][j].nextState;
            }
        }

        this.updateDisplay();
    }

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

    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
        this.updateDisplay();
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].alive = Math.random() < 0.5 ? 1 : 0;
                this.grid[i][j].nextState = this.grid[i][j].alive;
            }
        }
        this.updateDisplay();
    }
}

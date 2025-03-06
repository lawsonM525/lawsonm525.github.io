// ====================================
// Cell Class Definition
// ====================================

class Cell {
    /**
     * Creates a cell with specified position and state
     * @param {number} row - Row position in grid
     * @param {number} col - Column position in grid
     * @param {number} alive - Initial state (0 = dead, 1 = alive)
     */
    constructor(row, col, alive = 0) {
        // Position
        this.row = row;
        this.col = col;

        // State
        this.alive = alive;
        this.nextState = alive;

        // Neighbor references
        this.top = null;
        this.bottom = null;
        this.left = null;
        this.right = null;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    /**
     * Determines next state based on Conway's Game of Life rules
     */
    setNextState() {
        const neighbors = this.countNeighbors();
        if (this.alive === 1) {
            // Survival rules
            this.nextState = (neighbors === 2 || neighbors === 3) ? 1 : 0;
        } else {
            // Birth rule
            this.nextState = (neighbors === 3) ? 1 : 0;
        }
    }

    /**
     * Updates current state to the calculated next state
     */
    updateState() {
        this.alive = this.nextState;
        return this.alive;
    }

    /**
     * Toggles cell state (used for manual cell clicking)
     */
    switchState() {
        this.alive = this.alive === 0 ? 1 : 0;
        this.nextState = this.alive;
    }

    /**
     * Counts number of living neighbors
     */
    countNeighbors() {
        let count = 0;
        // Check all 8 neighboring cells
        if (this.top && this.top.alive) count++;
        if (this.bottom && this.bottom.alive) count++;
        if (this.left && this.left.alive) count++;
        if (this.right && this.right.alive) count++;
        if (this.topLeft && this.topLeft.alive) count++;
        if (this.topRight && this.topRight.alive) count++;
        if (this.bottomLeft && this.bottomLeft.alive) count++;
        if (this.bottomRight && this.bottomRight.alive) count++;
        return count;
    }
}

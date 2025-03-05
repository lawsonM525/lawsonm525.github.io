class Cell {
    constructor(row, col, alive = 0) {
        this.row = row;
        this.col = col;
        this.alive = alive;
        this.nextState = alive;
        // defining neighbors for the cell
        this.top = null;
        this.bottom = null;
        this.left = null;
        this.right = null;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    setNextState() {
        const neighbors = this.countNeighbors();
        if (this.alive === 1) {
            // Cell dies if it has fewer than 2 or more than 3 neighbors
            this.nextState = (neighbors === 2 || neighbors === 3) ? 1 : 0;
        } else {
            // Dead cell becomes alive if it has exactly 3 neighbors
            this.nextState = (neighbors === 3) ? 1 : 0;
        }
    }

    updateState() {
        this.alive = this.nextState;
        return this.alive;
    }

    switchState() {
        this.alive = this.alive === 0 ? 1 : 0;
        this.nextState = this.alive;
    }

    // counting neighbors
    countNeighbors() {
        let count = 0;
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

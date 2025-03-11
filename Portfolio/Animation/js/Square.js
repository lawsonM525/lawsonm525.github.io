class Square {
    constructor(color, startX, startY, size = 50) {
        this.color = color;
        this.x = startX;
        this.y = startY;
        this.size = size;
        this.dx = Math.random() > 0.5 ? 2 : -2;
        this.dy = Math.random() > 0.5 ? 2 : -2;
        this.element = null;
        this.createElement();
    }

    createElement() {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.backgroundColor = this.color;
        square.style.left = `${this.x}px`;
        square.style.top = `${this.y}px`;
        this.element = square;
    }

    move(containerWidth, containerHeight) {
        // Check for collisions with container boundaries
        if (this.x >= containerWidth - this.size || this.x <= 0) {
            this.dx *= -1;
        }
        if (this.y >= containerHeight - this.size || this.y <= 0) {
            this.dy *= -1;
        }

        // Update position
        this.x += this.dx;
        this.y += this.dy;
        
        // Update element position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    getElement() {
        return this.element;
    }
}

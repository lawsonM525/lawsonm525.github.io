class AnimationManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.squares = [];
        this.animationId = null;
        this.initialConfig = null;
    }

    initialize(squaresConfig) {
        this.initialConfig = [...squaresConfig];
        this.reset();
    }

    reset() {
        // Stop any existing animation
        this.stopAnimation();

        // Clear container and squares array
        this.container.innerHTML = '';
        this.squares = [];
        
        // Recreate squares from initial config
        this.initialConfig.forEach(config => {
            const square = new Square(config.color, config.startX, config.startY);
            this.squares.push(square);
            this.container.appendChild(square.getElement());
        });
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    startAnimation() {
        // Stop any existing animation
        this.stopAnimation();

        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;

        // Animation loop
        const animate = () => {
            this.squares.forEach(square => {
                square.move(containerWidth, containerHeight);
            });
            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    addSquare() {
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        const size = 50;

        // Get random position within container bounds
        const startX = Math.floor(Math.random() * (containerWidth - size));
        const startY = Math.floor(Math.random() * (containerHeight - size));

        // Get random color from available colors
        const availableColors = ['red', 'blue', 'green', 'orange', 'purple', 'teal', 'pink', 'brown'];
        const color = availableColors[Math.floor(Math.random() * availableColors.length)];

        // Create and add new square
        const square = new Square(color, startX, startY);
        this.squares.push(square);
        this.container.appendChild(square.getElement());
    }

    removeSquare() {
        if (this.squares.length > 0) {
            // Stop animation when removing squares
            this.stopAnimation();
            
            const square = this.squares.pop();
            square.getElement().remove();
        }
    }
}

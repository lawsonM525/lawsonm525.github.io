// defining/configurating squares
const squaresConfig = [
    { color: '#ffffff', startX: 0, startY: 0 },
    { color: '#ffffff', startX: window.innerWidth - 50, startY: window.innerHeight - 50 },
    { color: '#ffffff', startX: 0, startY: window.innerHeight - 50 },
    { color: '#ffffff', startX: window.innerWidth - 50, startY: 0 }
];

function initializeSquares() {
    const container = document.getElementById("animationContainer");
    
    // remove the existing squares
    container.innerHTML = '';
    
    // Create squares from config
    squaresConfig.forEach(config => {
        const square = document.createElement('div');
        square.className = 'animated-square';
        square.style.backgroundColor = config.color;
        square.style.left = config.startX + 'px';
        square.style.top = config.startY + 'px';
        container.appendChild(square);
    });
}

function moveSquares() {
    const squares = document.querySelectorAll(".animated-square");
    const positions = Array.from(squares).map(square => ({
        element: square,
        x: parseInt(square.style.left) || 0,
        y: parseInt(square.style.top) || 0,
        dx: Math.random() > 0.5 ? 1 : -1,
        dy: Math.random() > 0.5 ? 1 : -1
    }));

    function step() {
        positions.forEach(pos => {
            // Check for collisions with window boundaries
            if (pos.x >= window.innerWidth - 50 || pos.x <= 0) {
                pos.dx *= -1;
            }
            if (pos.y >= window.innerHeight - 50 || pos.y <= 0) {
                pos.dy *= -1;
            }

            // Update position
            pos.x += pos.dx;
            pos.y += pos.dy;

            // Apply new position with smooth transition
            pos.element.style.left = pos.x + 'px';
            pos.element.style.top = pos.y + 'px';
        });

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

//  start animation when page loads
window.onload = () => {
    initializeSquares();
    moveSquares();
};

// Update square positions when window is resized
window.onresize = initializeSquares; 
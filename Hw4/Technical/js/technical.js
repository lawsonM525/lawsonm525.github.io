//  array for squares
const squaresConfig = [
    { color: 'red', startX: 0, startY: 0 },
    { color: 'blue', startX: 350, startY: 350 },
    { color: 'green', startX: 0, startY: 350 },
    { color: 'orange', startX: 350, startY: 0 }

];

// Function to create squares
function initializeSquares() {
    const container = document.getElementById("myContainer");
    
    // Clear already existing squares
    container.innerHTML = '';
    
    // Create squares from config
    squaresConfig.forEach(config => {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.backgroundColor = config.color;
        square.style.left = config.startX + 'px';
        square.style.top = config.startY + 'px';
        container.appendChild(square);
    });
}

 function moveAll() {
    // Get all squares and randomly initialize their positions & direction
    const squares = document.querySelectorAll(".square");
    const positions = Array.from(squares).map(square => ({
        element: square,
        x: parseInt(square.style.left) || 0,
        y: parseInt(square.style.top) || 0,
        dx: Math.random() > 0.5 ? 2 : -2,   
        dy: Math.random() > 0.5 ? 2 : -2    
    }));

    // Get container dimensions so we can have the squares bounce off the edges
    const containerWidth = document.getElementById("myContainer").offsetWidth;
    const containerHeight = document.getElementById("myContainer").offsetHeight;
    const squareSize = 50; // Square size from CSS

    function step() {
        positions.forEach(pos => {
            // Check for collisions with container boundaries
            if (pos.x >= containerWidth - squareSize || pos.x <= 0) {
                pos.dx *= -1;
            }
            if (pos.y >= containerHeight - squareSize || pos.y <= 0) {
                pos.dy *= -1;
            }

            // Update position
            pos.x += pos.dx;
            pos.y += pos.dy;

            // Apply new position
            pos.element.style.left = pos.x + 'px';
            pos.element.style.top = pos.y + 'px';
        });

        // continuing the animation
        requestAnimationFrame(step);
    }

    // start  animation
    requestAnimationFrame(step);
}

// Initializing the squares when  the page loads
window.onload = initializeSquares;

// event handler for the move all button
document.getElementById("moveAllBtn").onclick = moveAll;



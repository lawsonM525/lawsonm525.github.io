function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    
    context.strokeStyle = '#00ff00';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function createPointCenter(c, ctx) {
    c.midHeight = c.height/2;
    c.midWidth = c.width/2;

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(c.midWidth, c.midHeight, 10, 0, 2 * Math.PI);
    ctx.stroke();

    canvas_arrow(ctx, c.midWidth, c.midHeight, c.midWidth+50, c.midHeight+50);
}

function createFixedPoint(c, ctx, x, y, color, velocity=5) {
    const ARROW_SCALE = 5; 
    // Arrow will be 5 times longer than the velocity (I wanted slower velocities but with visible arrows)
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();

    canvas_arrow(ctx, x, y, x + (velocity * ARROW_SCALE), y + (velocity * ARROW_SCALE));
}

function createFixedPoints(number, c, ctx) {
    for (let i = 0; i < number; i++) {
        createFixedPoint(c, ctx, Math.random() * 400, Math.random() * 400, "red", Math.random() * 10);
    }
}

function createMovingPoints(number, c, ctx) {
    const points = [];
    for (let i = 0; i < number; i++) {
        const x = Math.random() * (c.width - 20) + 10;
        const y = Math.random() * (c.height - 20) + 10;
        const velocity = Math.random() * 10; // Actual movement speed stays low
        points.push({
            x: x,
            y: y,
            dx: velocity,
            dy: velocity,
            velocity: velocity
        });
        createFixedPoint(c, ctx, x, y, "red", velocity);
    }
    movePoints(c, ctx, points);
}

function movePoints(c, ctx, points) {
    function step() {
        ctx.clearRect(0, 0, c.width, c.height); // Clear canvas before redrawing
        points.forEach(point => {
            // Check for collisions with canvas boundaries
            if (point.x >= c.width - 10 || point.x <= 10) {
                point.dx *= -1;
            }
            if (point.y >= c.height - 10 || point.y <= 10) {
                point.dy *= -1;
            }

            // Update position
            point.x += point.dx;
            point.y += point.dy;

            // Redraw point
            createFixedPoint(c, ctx, point.x, point.y, "red", point.velocity);
        });

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function createDirectionalPoint(c, ctx, x, y, color, dx, dy) {
    const ARROW_SCALE = 5;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();

    // Scale the arrow length to 5x the velocity while maintaining direction
    const velocity = Math.sqrt(dx * dx + dy * dy);
    const arrowLength = velocity * ARROW_SCALE;
    const normalizedDx = dx / velocity;
    const normalizedDy = dy / velocity;
    
    canvas_arrow(ctx, x, y, 
        x + (normalizedDx * arrowLength), 
        y + (normalizedDy * arrowLength)
    );
}

function movePointsWithTrace(c, ctx, points, keepTrace) {
    let animationId;

    function step() {
        if (!keepTrace) {
            ctx.clearRect(0, 0, c.width, c.height);
        }
        
        points.forEach(point => {
            if (keepTrace) {
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            }

            // Update position
            if (point.x >= c.width - 10 || point.x <= 10) {
                point.dx *= -1;
            }
            if (point.y >= c.height - 10 || point.y <= 10) {
                point.dy *= -1;
            }

            point.x += point.dx;
            point.y += point.dy;

            if (keepTrace) {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }

            createDirectionalPoint(c, ctx, point.x, point.y, "red", point.dx, point.dy);
        });

        animationId = requestAnimationFrame(step);
    }

    const controller = {
        stop: function() {
            cancelAnimationFrame(animationId);
        }
    };

    animationId = requestAnimationFrame(step);
    return controller;
} 

function initializePoints() {
    // Stop any existing animation
    if (currentAnimation && currentAnimation.stop) {
        currentAnimation.stop();
    }
    
    points = [];
    const NRPTS = document.getElementById("dropdown").value;
    
    for (let i = 0; i < NRPTS; i++) {
        const x = Math.random() * (c.width - 20) + 10;
        const y = Math.random() * (c.height - 20) + 10;
        const velocity = Math.random() * 10;
        // Give random direction to each point
        const angle = Math.random() * 2 * Math.PI;
        points.push({
            x: x,
            y: y,
            dx: velocity * Math.cos(angle),
            dy: velocity * Math.sin(angle),
            velocity: velocity
        });
    }
    // Store reference to current animation
    currentAnimation = movePointsWithTrace(c, ctx, points, keepTrace);
}

function updateTrace() {
    keepTrace = document.getElementById("traceCheckbox").checked;
    if (!keepTrace) {
        // Clear existing traces
        ctx.clearRect(0, 0, c.width, c.height);
    }
    // Restart animation with new trace setting
    if (currentAnimation && currentAnimation.stop) {
        currentAnimation.stop();
    }
    currentAnimation = movePointsWithTrace(c, ctx, points, keepTrace);
}

function reset() {
    ctx.clearRect(0, 0, c.width, c.height);
    initializePoints();
}
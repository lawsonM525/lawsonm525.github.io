function canvas_arrow(context, fromx, fromy, tox, toy) { // arrow code from https://stackoverflow.com/questions/808826/drawing-an-arrow-using-html-canvas
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

// function to create point at center of canvas
function createPointCenter(c, ctx) {
    c.midHeight = c.height/2;
    c.midWidth = c.width/2;

    ctx.beginPath();
    ctx.arc(c.midWidth, c.midHeight, 10, 0, 2 * Math.PI);
    ctx.stroke();

    //add arrow
    canvas_arrow(ctx, c.midWidth, c.midHeight, c.midWidth+50, c.midHeight + 50);
    ctx.stroke();
}

//
function createFixedPoint(c, ctx, x, y, color, velocity=50) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();

    //add arrow
    canvas_arrow(ctx, x, y, x+velocity, y + velocity);
    ctx.stroke();
    
}

function createFixedPoints(number, c, ctx) {
    for (let i = 0; i < number; i++) {
        createFixedPoint(c, ctx, Math.random() * 400, Math.random() * 400, "red", Math.random() * 70);
    }
}

function createMovingPoints(number, c, ctx) {

    
    const points = [];
    for (let i = 0; i < number; i++) {
        const x = Math.random() * (c.width - 20) + 10;
        const y = Math.random() * (c.height - 20) + 10;
        const velocity = Math.random() * 70;
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
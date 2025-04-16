let currentGravity = 0.5;

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

const COLORS = [
    '#FF0000', // Bright Red
    '#00FF00', // Bright Green
    '#0088FF', // Bright Blue
    '#FF00FF', // Bright Magenta
    '#FFFF00', // Bright Yellow
    '#00FFFF', // Bright Cyan
    '#FF8800', // Bright Orange
    '#FF0088'  // Bright Pink
];

function createDirectionalPoint(c, ctx, x, y, color, dx, dy) {
    const ARROW_SCALE = 5;
    const PARTICLE_SIZE = 20;
    
    ctx.beginPath();
    ctx.arc(x, y, PARTICLE_SIZE, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.shadowBlur = 0;

    const velocity = Math.sqrt(dx * dx + dy * dy);
    const arrowLength = velocity * ARROW_SCALE;
    const normalizedDx = dx / velocity;
    const normalizedDy = dy / velocity;
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;  
    canvas_arrow(ctx, x, y, 
        x + (normalizedDx * arrowLength), 
        y + (normalizedDy * arrowLength)
    );
}

function movePointsWithTrace(c, ctx, points, initialKeepTrace, initialGravity = 0.5) {
    let animationId;
    let gravity = initialGravity;
    let keepTrace = initialKeepTrace;

    function step() {
        if (!keepTrace) {
            ctx.clearRect(0, 0, c.width, c.height);
        }
        
        points.forEach(point => {
            if (keepTrace) {
                ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            }

            point.dy += gravity;
            point.x += point.dx;
            point.y += point.dy;

            if (point.x >= c.width - 20 || point.x <= 20) {
                point.dx *= -0.8;
                point.x = Math.max(20, Math.min(c.width - 20, point.x));
            }
            if (point.y >= c.height - 20 || point.y <= 20) {
                point.dy *= -0.8;
                point.y = Math.max(20, Math.min(c.height - 20, point.y));
            }

            if (keepTrace) {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }

            createDirectionalPoint(c, ctx, point.x, point.y, point.color, point.dx, point.dy);
        });

        animationId = requestAnimationFrame(step);
    }

    const controller = {
        stop: function() {
            cancelAnimationFrame(animationId);
        },
        setGravity: function(value) {
            gravity = value;
        },
        setKeepTrace: function(value) {
            keepTrace = value;
            if (!keepTrace) {
                ctx.clearRect(0, 0, c.width, c.height);
            }
        }
    };

    animationId = requestAnimationFrame(step);
    return controller;
}

function initializePoints() {
    if (currentAnimation && currentAnimation.stop) {
        currentAnimation.stop();
    }
    
    points = [];
    const NRPTS = document.getElementById("dropdown").value;
    
    for (let i = 0; i < NRPTS; i++) {
        const x = Math.random() * (c.width - 20) + 10;
        const y = Math.random() * (c.height - 20) + 10;
        const velocity = Math.random() * 10;
        const angle = Math.random() * Math.PI - Math.PI/2;
        points.push({
            x: x,
            y: y,
            dx: velocity * Math.cos(angle),
            dy: velocity * Math.sin(angle),
            velocity: velocity,
            color: COLORS[i % COLORS.length]
        });
    }
    currentAnimation = movePointsWithTrace(c, ctx, points, keepTrace, currentGravity);
}

function updateGravity(value) {
    currentGravity = value;
    if (currentAnimation && currentAnimation.setGravity) {
        currentAnimation.setGravity(value);
    }
}

function updateTrace() {
    keepTrace = document.getElementById("traceCheckbox").checked;
    if (currentAnimation && currentAnimation.setKeepTrace) {
        currentAnimation.setKeepTrace(keepTrace);
    }
}

function reset() {
    ctx.clearRect(0, 0, c.width, c.height);
    initializePoints();
}

function moveRed()
{   
    var redSquare = document.getElementById("redSq");   
    var redPos = 0;
    var redSpeed = document.getElementById("redSpeed").value;
    var stepRedId = setInterval(stepRed, redSpeed);

    function stepRed() {
        if (redPos == 350) {
            clearInterval(stepRedId);
        } else {
            redPos++; 
            redSquare.style.top = redPos + 'px'; 
            redSquare.style.left = redPos + 'px';
        }
    }
}

function moveBlue() {   
    var blueSquare = document.getElementById("blueSq");   
    var bluePos = 350;
    var blueSpeed = document.getElementById("blueSpeed").value;
    var stepBlueId = setInterval(stepBlue, blueSpeed);

    function stepBlue() {
        if (bluePos == 0) {
            clearInterval(stepBlueId);
        } else {
            bluePos--; 
            blueSquare.style.top = bluePos + 'px'; 
            blueSquare.style.left = bluePos + 'px';
        }
    }
}

// event handlers for buttons
document.getElementById("moveRedBtn").onclick = moveRed;
document.getElementById("moveBlueBtn").onclick = moveBlue;



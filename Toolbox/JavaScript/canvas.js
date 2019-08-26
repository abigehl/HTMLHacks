var canvasObject = null;
var canvasTrigger = 0;
var leftOffset = 0;
var leftOffsett = 0;
var topOffset = 0;
var topOffsett = 0;
var xV = 0;
var yV = 0;
var pressed;
var keypressed = [];
var speed = 3;
var friction = .75;
function clearCanvas() {
    canvasTrigger = 1;
    drawCanvas1();
};

function drawCanvas0() {
    canvasTrigger = 1;
    drawCanvas1();
    var canvas = document.getElementById("canvas0");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    var gradient = ctx.createLinearGradient(0,75, 800, 0);
    gradient.addColorStop("0", "rgb(161, 163, 208)");
    gradient.addColorStop(".5", "rgb(193, 113, 199)");
    gradient.addColorStop("1", "rgb(234, 136, 112)");
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.moveTo(180,75);
    ctx.lineTo(400, 0);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = "3";
    ctx.stroke();
    ctx.fillRect(0, 0, 150, 75);

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.font = "20px OCR A";
    ctx.arc(720, 38, 30, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.strokeText("This is canvas text", 420, 40);
    ctx.stroke();
   
}

function drawCanvas1() {
    topOffset = 0;
    topOffsett = 0;
    leftOffset = 0;
    leftOffsett = 0;
    if (canvasTrigger) {
        canvasTrigger = 0;
        updateCanvas();
        document.removeEventListener('keydown', keypressCanvas1);
        document.removeEventListener('keyup', keypressUp);
        canvasObject = null;
        var canvas = document.getElementById("canvas0");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.beginPath();
        keypressed.splice(0, keypressed.length);
        return;
    }
    canvasTrigger = 1;
    document.addEventListener('keydown',keypressCanvas1);
    document.addEventListener('keyup',keypressUp);
    redrawCanvas();
    updateCanvas();
}

function keypressUp(event) {

    keypressed[event.keyCode] = false;
    event.stopPropagation();
    event.preventDefault();
}

function keypressCanvas1(event) {
    keypressed[event.keyCode] = true;
    event.stopPropagation();
    event.preventDefault();
}

function updateCanvas() {
    if (canvasTrigger) {
        requestAnimationFrame(updateCanvas);
        if (keypressed[38] == true || keypressed[87] == true || keypressed[32] == true || keypressed[37] == true || keypressed[65] == true || keypressed[39] == true || keypressed[68] == true || keypressed[40] == true || keypressed[83] == true) {
            if (keypressed[38] == true || keypressed[87] == true || keypressed[32] == true) {
                if (yV > -speed) {
                    yV--;
                }
                    topOffsett -= 3;
            }
            if (keypressed[37] == true || keypressed[65] == true) {
                if (xV > -speed) {
                    xV--;
                }
                leftOffsett -= 3;
            }
            if (keypressed[39] == true || keypressed[68] == true) {
                if (xV < speed) {
                    xV++;
                }
                leftOffsett += 3;
            }
            if (keypressed[40] == true || keypressed[83] == true) {
                if (yV < speed) {
                    yV++;
                }
                    topOffsett += 3;
            }
            xV *= friction;
            yV *= friction;
            topOffset += yV;
            leftOffset += xV;
        }
        redrawCanvas();
        return;
    }
}

function redrawCanvas() {
    var canvas = document.getElementById("canvas0");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255, .75)";
    ctx.fillRect(0, 0, 750, 300);
    ctx.beginPath();
    ctx.fillStyle = "rgb(99, 48, 35,.75)";
    if (topOffset > 250) {
        topOffset = 250;
    }
    if (topOffset < 0) {
        topOffset = 0;
    }
    if (leftOffset > 700) {
        leftOffset = 700;
    }
    if (leftOffset < 0) {
        leftOffset = 0;
    }
    ctx.fillRect(leftOffset, topOffset, 50, 50);
    ctx.beginPath();
    ctx.fillStyle = "rgb(161, 163, 208, .75)";
    if (topOffsett > 250) {
        topOffsett = 250;
    }
    if (topOffsett < 0) {
        topOffsett = 0;
    }
    if (leftOffsett > 700) {
        leftOffsett = 700;
    }
    if (leftOffsett < 0) {
        leftOffsett = 0;
    }
    ctx.fillRect(leftOffsett, topOffsett, 50, 50);
    ctx.beginPath();
    ctx.strokeStyle = "black";
}


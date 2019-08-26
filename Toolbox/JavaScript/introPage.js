var deg = 0;
var deltaY = 0;
var shownSpots = 0;
function fadeIn(event) {
    if (event.keyCode == 116) {
        event.stopPropagation();
        event.preventDefault();
        return;
    }
    if (event.keyCode != undefined || event.keyCode!=null) {
        if (event.keyCode == 116) {
            return;
        }
        else if (event.keyCode == 17 || event.keyCode == 61 || event.keyCode == 173|| event.keyCode == 9) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    }
    document.getElementById("shipObject").style.transform = " rotate(" + 360 + "deg) rotate(1deg)";
    document.getElementById("initialPage").style.opacity = 0;
    document.getElementById("initialPage").removeEventListener('wheel', fadeIntoContent);
    document.getElementById("initialPage").removeEventListener("click", fadeIn);
    document.removeEventListener("keyup", fadeIn);
    document.getElementById("initialPage").style.opacity = "0";
    document.getElementById("initialPage").style.zIndex = "-1";
    clearInterval();
    setTimeout(function () { loadFunction(); }, 1200);
    return;
}
function fadeIntoContent(event) {
    if (deg == -1000) {
        return;
    }
    event.stopPropagation();
    event.preventDefault();
    deltaY += parseInt(event.deltaY) * 1;
    if (deltaY == 0) {
        return;
    }
    var delta = deltaY;
    var temp = deg - (8 * delta);
    deltaY = 0;

    deg -= 8 * event.deltaY;
    document.getElementById("shipObject").style.transform = " rotate(" + deg + "deg) rotate(1deg)";
    if (deg>360||deg<-360) {
        deg = -1000;
        document.getElementById("initialPage").style.opacity = 0;
        document.getElementById("initialPage").removeEventListener('wheel', fadeIntoContent);
        document.getElementById("initialPage").removeEventListener("click", fadeIn);
        document.removeEventListener("keyup", fadeIn);
        document.getElementById("initialPage").style.opacity = "0";
        document.getElementById("initialPage").style.zIndex = "-1";
        clearInterval();
        setTimeout(function () { loadFunction(); }, 1200);
        return;
    }
};



function drawRocketTrail() {
    var ii = 0;
    var int = ((Math.PI * 2) / 90);
    while (ii < 90) {
        var angle = int * ii;
        var x = 355 + 300 * Math.cos(-1 * angle);
        var y = 305 + 300 * Math.sin(-1 * angle);
        var canvas = document.getElementById("shipTrailCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc((675 - (x)), y, 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        pointsAlong.push([x, y, false]);
        ii++;
    }
    var x = pointsAlong.splice(89, 1);
    pointsAlong.unshift(x);
};


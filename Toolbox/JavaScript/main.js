/* ------------------------ *\
 *      Basic Webpage       *
 *      Functionality       *
\* ------------------------ */

var sections = ["font", "drag", "svg", "svgGraph", "canvas", "socketManagement", "animation" ];
var index = 0;
var hit = 0;
var pointsAlong = [];
function initializeContent() {
    document.getElementById("initialPage").addEventListener("wheel", fadeIntoContent);
    document.getElementById("initialPage").addEventListener("click", fadeIn);
    document.addEventListener("keyup", fadeIn);
  //  document.addEventListener('mousemove', move);
};
function loadFunction() {
    console.log("load");
    index = 0;
    document.getElementById("shipObject").style.display = "none";
    document.getElementById("bd").style.overflowY = "scroll";
    document.getElementById(sections[index] + "Section").style.display = "initial";
    document.getElementById("mainButtons").style.animationPlayState = "initial";
    document.getElementById("mainButtons").style.display = "initial";
    document.getElementById("fontSlideBtn").classList.toggle("toggle");
    document.getElementById("pointXInput").addEventListener('keyup', function (event) { graphMove("x"); });
    document.getElementById("pointXInput").addEventListener('mousedown', function (event) {  event.stopPropagation();});
    document.getElementById("pointYInput").addEventListener('mousedown', function (event) {  event.stopPropagation(); });
    document.getElementById("pointYInput").addEventListener('keyup', function (event) { graphMove("y"); });
    document.getElementById("svgGraph").addEventListener('mousemove', dragSvg);
    document.getElementById("svgGraph").addEventListener('mouseleave', endDragSvg);
    document.getElementById("graphControls").addEventListener('mousedown', function (event) { event.stopPropagation(); });
    document.getElementById('numPointsLabel').innerHTML = "0";
    document.getElementById('pointYInput').value = "";
    document.getElementById('pointXInput').value = "";
    document.getElementById('numPointsLabel').innerHTML = "0";
    document.getElementById('toolImg').classList.toggle("fadein");
    document.removeEventListener('keyup', fadeIn);
    document.addEventListener('mousedown', function (event) {
        selected = null;
        old = null;
        document.getElementById('pointXInput').value = "";
        document.getElementById('pointYInput').value = "";
        lineSelected = null;
    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 39) {
            nextSection();
            event.stopPropagation();
            event.preventDefault();
        }
        else if (event.keyCode == 37) {
            lastSection();
            event.stopPropagation();
            event.preventDefault();

        }
    });
 //   document.removeEventListener('mousemove', move);
   
};

function changeDisplay(newIndex) {
    document.removeEventListener('keydown', keypressCanvas1);
    document.removeEventListener('keyup', keypressUp);
    if (index==newIndex) {
        return;
    }
    document.getElementById(sections[index] + "SlideBtn").className = "slide";
    document.getElementById(sections[newIndex] + "SlideBtn").classList.toggle("toggle");
    if (sections[newIndex] == "svgGraph") {
        document.addEventListener('keyup', deleteListener);
    }
    else if (sections[index] == "svgGraph") {
        document.removeEventListener('keyup', deleteListener);
    }
        changeSectionDisplayed(newIndex);

};

function changeSectionDisplayed(newIndex) {
    if (index == 4) {
        clearCanvas();
    }
    if (trigger != undefined) {
        trigger = 0;
    }
    if (index == newIndex) {
        return;
    }
    else {
        document.getElementById(sections[index] + "Section").classList.toggle("fadein");
        document.getElementById(sections[index] + "Section").classList.toggle("fadeout");
        document.getElementById(sections[index] + "Section").style.display="none";
        
        if (document.getElementById(sections[newIndex] + "Section").classList.contains("fadeout")) {
            document.getElementById(sections[newIndex] + "Section").classList.toggle("fadeout");
            document.getElementById(sections[newIndex] + "Section").style.display="initial";
            document.getElementById(sections[newIndex] + "Section").classList.toggle("fadein");
        }
        else {
            document.getElementById(sections[newIndex] + "Section").classList.toggle("fadein");
            document.getElementById(sections[newIndex] + "Section").style.display = "initial";
        }
    }
    index = newIndex;
};

function nextSection() {
    var temp = index + 1;
    if (temp >= sections.length) {
        temp = 0;
    }
    changeDisplay(temp);
};

function lastSection() {
    var temp = index - 1;
    if (temp < 0) {
        temp = sections.length-1;
    }
    changeDisplay(temp);
};




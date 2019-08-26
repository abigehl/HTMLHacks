/* ------------------------ *\
 *           SVG            *
 *      Functionality       *
\* ------------------------ */

function renderLineGraph() {

};
var selected = null;
var offsetx, offsety;
var old = null;
var line = 0;
var graph = new Graph(0);

function addPoint(event) {
    event.stopPropagation();
    event.preventDefault();
    var x, y;
    x = parseInt(document.getElementById("pointXInput").value);
    y = parseInt(document.getElementById("pointYInput").value);
    if (isNaN(x)) { x = 0; }
    if (isNaN(y)) { y = 0; }
    x = x + 550;
    y = -y + 300;
    if (x < 0) {
        x = 50;
    }
    if (y < 0) {
        y = 50;
    }
    if (x > 1050) {
        x = 1050;
    }
    if (y > 550) {
        y = 550;
    }
    addPointView(x, y);
    old = null;
};

function beginDragSvg(event) {
    lineSelected = null;
    event.preventDefault();
    event.stopPropagation();
    selected = event.target;
    if (line) {
        if (old != null && selected != null) {
            graph.addEdge(old, selected);
        }
        event.target.dispatchEvent(new CustomEvent('mouseup'));
        return;
    }
    var screenCorrection = document.getElementById("svgGraph").getScreenCTM();
    offsetx = ((event.clientX - screenCorrection.e) / screenCorrection.a) - parseFloat(selected.getAttributeNS(null, "cx"));
    offsety = ((event.clientY - screenCorrection.f) / screenCorrection.d) - parseFloat(selected.getAttributeNS(null, "cy"));
    document.getElementById('pointXInput').value = selected.getAttributeNS(null, "cx") - 550;
    document.getElementById('pointYInput').value = -selected.getAttributeNS(null, "cy") + 300;
};

function dragSvg(event) {
    event.preventDefault();
    if (selected != null) {
        var screenCorrection = document.getElementById("svgGraph").getScreenCTM();
        var xnum = ((event.clientX - screenCorrection.e) / screenCorrection.a) - offsetx;
        var ynum = ((event.clientY - screenCorrection.f) / screenCorrection.d) - offsety;
        if (xnum > 50 && xnum < 1051) {
            editLocationPoint(xnum, null, selected, true);
        }
        if (ynum > 50 && ynum < 551) {
            editLocationPoint(null, ynum, selected, true);
        }
    }
};


function dropSvg() {
    if (selected != null) {
        old = selected;
        selected = null;
    }
};
function endDragSvg() {
    if (selected != null) {
        old = selected;
        selected = null;
    }
};
function graphMove(section) {
    if (old != null) {
        if (section == "x") {
            var x;
            if (isNaN(parseInt(document.getElementById("pointXInput").value))) {
                x = 550;
            }
            else {
                x = parseInt(document.getElementById("pointXInput").value);
                x = x + 550;
                if (x > 1050) {
                    x = 1050;
                    document.getElementById("pointXInput").value = 500;
                }
                if (x < 0) {
                    x = 50;
                    document.getElementById("pointXInput").value = -500;

                }
            }
            editLocationPoint(x, null, old, false);
        }
        else {
            var y;
            if (isNaN(parseInt(document.getElementById("pointYInput").value))) {
                y = 300;
            }
            else {
                y = parseInt(document.getElementById("pointYInput").value);
                y = -y + 300;
                if (y >= 550) {
                    y = 550;
                    document.getElementById("pointYInput").value = -250;
                }
                if (y < 0) {
                    y = 50;
                    document.getElementById("pointYInput").value = 250;
                }
            }
            editLocationPoint(null, y, old, false);
        }
    }
};
function toggleLine() {
    document.getElementById("lineButton").classList.toggle('toggle');
    if (line == 1) {
        line = 0;
    }
    else {
        line = 1;
    }
    selected = null;
    old = null;
};
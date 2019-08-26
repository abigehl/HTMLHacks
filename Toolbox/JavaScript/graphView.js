function deleteListener(event) {
    if (event.keyCode == 46) {
        if (old != null) {
            document.getElementById("svgGraph").removeChild(old);
            old = null;
        }
    }
};

function addPointView(x, y) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttribute('id', "svgPoint" + graph.num);
    element.setAttribute('cx', x);
    element.setAttribute('cy', y);
    element.setAttribute('r', 7);
    element.setAttribute('class', "pointsDrag");
    element.setAttribute('fill', "rgb(196, 65, 35)");
    element.setAttribute('stroke', "transparent");
    element.setAttribute('stroke-width', "20");
    element.addEventListener('mousedown', beginDragSvg);
    element.addEventListener('mouseup', dropSvg);
    document.getElementById("svgGraph").appendChild(element);
    graph.addPoint(element);
    document.getElementById("numPointsLabel").innerHTML = " " + graph.num;
};

function addLineView(x, y) {
    if (x != null) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        element.setAttribute('id', "line" +x.id+y.id);
        element.setAttribute('x1', x.getAttributeNS(null, "cx"));
        element.setAttribute('x2', y.getAttributeNS(null, "cx"));
        element.setAttribute('y2', y.getAttributeNS(null, "cy"));
        element.setAttribute('y1', x.getAttributeNS(null, "cy"));
        element.setAttribute('stroke', "rgb(121, 61, 148)");
        element.setAttribute('stroke-width', "5");
        element.addEventListener('mousedown', function (event) { removeLine(event, x, y); });
        document.getElementById("svgGraph").prepend(element);
    }
};

function removeLine(event, x, y) {
    document.getElementById("svgGraph").removeChild(event.target);
    graph.removeEdge(x, y);
};

function editLocationPoint(x, y, object, update) {
    if (x != null) {
        object.setAttributeNS(null, "cx", x);
        if (update) {
            document.getElementById('pointXInput').value = object.getAttributeNS(null, "cx") - 550;
        }
    }
    if (y != null) {
        object.setAttributeNS(null, "cy", y);
        if (update) {
            document.getElementById('pointYInput').value = -object.getAttributeNS(null, "cy") + 300;
        }
    }
    var arr = graph.getEdges(object);
    refreshLines(object);
};

function refreshLines(x) {
    var arr = graph.getEdges(x);
    for (var i = 0; i < arr.length; i++) {
        if (document.getElementById("line" + x.id + arr[i].id) != null) {
            document.getElementById("line" + x.id + arr[i].id).setAttribute('x1', x.getAttributeNS(null, "cx"));
            document.getElementById("line" + x.id + arr[i].id).setAttribute('y1', x.getAttributeNS(null, "cy"));
        }
        if (document.getElementById("line" + arr[i].id + x.id) != null) {
            document.getElementById("line" + arr[i].id + x.id).setAttribute('x2', x.getAttributeNS(null, "cx"));
            document.getElementById("line" + arr[i].id + x.id).setAttribute('y2', x.getAttributeNS(null, "cy"));
        }
    }
};




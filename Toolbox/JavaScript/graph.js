class Graph {
    constructor(num) {
        this.num = num;
        this.numEdge = 0;
        this.graphStruct = new Map();
    }
    addPoint(x, y) {
        this.graphStruct.set(x, []);
        this.num++;
    }
    addEdge(x, y) {
        var xx = this.graphStruct.get(x);
        var yy = this.graphStruct.get(y);
        var added = 0;
        if (!xx.includes(y)) {
            xx.push(y);
            added = 1;
        }
        if (!yy.includes(x)) {
            yy.push(x);
            added = 1;
        }
        if (added) {
            this.numEdge++;
            addLineView(x, y);
        }
    }
    removeEdge(x, y) {
        var arr = this.graphStruct.get(x);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == y) {
                arr.splice(i, 1);
                break;
            }
        }
        this.num--;
    }
    removePoint(x) {
        var arr = this.graphStruct.get(x);
        var arrtemp;

        for (var i = 0; i < arr.length; i++) {
            arrtemp = this.graphStruct.get(arr[i]);
            for (var j = 0; j < arr.length; j++) {
                if (arrtemp[j] == x) {
                    arrtemp.splice(j, 1);
                    j--;

                }
            }
        }
        this.graphStruct.delete(x);
    }
    getEdges(x) {
        return this.graphStruct.get(x);
    }

}
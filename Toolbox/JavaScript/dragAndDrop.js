/* ------------------------ *\
 *      Drag and Drop       *
 *      Functionality       *
\* ------------------------ */

function simpleDrag(event) {
    event.dataTransfer.setData("text", event.target.id);
};
function simpleAllowDrop(event) {
    event.preventDefault();
};
function simpleDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
};

function fileDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById("fileDropArea").classList.add('highlight');
};
function fileDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById("fileDropArea").classList.add('highlight');
};
function fileDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById("fileDropArea").classList.remove('highlight');
};
function fileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById("fileDropArea").classList.remove('highlight');
    var file = event.dataTransfer.files[event.dataTransfer.files.length-1];
    doFileStuff(file);
};
var numFiles = 0;
function doFileStuff(file) {

    if (!file) {
        console.log("ERROR READING FILE");
        window.alert("Unable to read file!")
        return;
    }
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        document.getElementById("filePreview").innerHTML = "<div style=\"padding-right:10px; padding-left:10px\">" + event.target.result + "</div>";
    };
    getFilepathFromSelection(file);
};
function files() {
    document.getElementById('fileDropInput').click();
};
function getFilepathFromSelection(file) {
    var string = file.name;
    document.getElementById("fileNameList").innerHTML += "<p>" + string + "</p>";

};

/*Set size for all canvas */

var canvases = document.getElementsByTagName('canvas'),
    body = document.getElementsByTagName('body');
for (var i = 0; i < canvases.length; i++) {
    canvases[i].width = 1024;
    canvases[i].height = 640;
}
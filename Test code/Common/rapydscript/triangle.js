(function(){
"use strict";
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    return Object.keys(iterable);
}

(function(){

    var __name__ = "__main__";

    var gl, points;
    gl = null;
    points = null;
    function render() {
        global;
        gl;
        gl.js_clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function init() {
        var canvas, gl, vertices, program, vPositionLoc, bufferId;
        canvas = document.getElementById("gl-canvas");
        global;
        gl;
        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) {
            alert("WebGL isn't available");
        }
        vertices = [ vec2(-1, -1), vec2(0, 1), vec2(1, -1) ];
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);
        vPositionLoc = gl.getAttribLocation(program, "vPosition");
        bufferId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(vPositionLoc);
        gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 0);
        render();
    }
    window.onload = init;
})();
})();

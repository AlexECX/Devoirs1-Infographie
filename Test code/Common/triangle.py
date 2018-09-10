# from org.transcrypt.stubs.browser import (
#     __pragma__, document, window, WebGLUtils, vec2, alert, initShaders,
#     flatten,
# )
from vector import Vector2D


gl = None
points = None


def render():
    global gl
    gl.js_clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.Lines, 0, 4)


def init():
    canvas = document.getElementById("gl-canvas")
    global gl
    gl = WebGLUtils.setupWebGL(canvas)
    if not gl:
        alert("WebGL isn't available")

    vertices = [
        Vector2D(-1, -1).as_list(),
        Vector2D(1,  1).as_list(),
        Vector2D(1, -1).as_list(),
        Vector2D(-1, 1).as_list(),
    ]

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(1.0, 1.0, 1.0, 1.0)

    program = initShaders(gl, "vertex-shader", "fragment-shader")
    gl.useProgram(program)

    vPositionLoc = gl.getAttribLocation(program, "vPosition")

    bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(vPositionLoc)

    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, False, 0, 0)

    render()


window.onload = init

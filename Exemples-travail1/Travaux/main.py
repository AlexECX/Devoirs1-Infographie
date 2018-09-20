from org.transcrypt import __pragma__, __new__  # __: skip
from MV import vec4, ortho, flatten  # __: skip
from javascript import Worker, document, alert   # __: skip
from WebGL import initShaders, WebGLUtils  # __: skip

from py_vector import Vector3D
import shapes

__pragma__('js', """/*
The main module: 
- Will setup WebGL.
- Launch JS Workers to recursively divide each faces of an object.
- The last worker calls a render function. It will render each faces 
  using the appropriate subset of points/vectors, with different colors. 
*/""")


gl = None
program = None
__pragma__('js','//2D or 3D dimension')
render_D = None 

worker_count = 0
worker_points = []


BaseColors = [
    vec4(0.0, 0.0, 0.0, 1.0),  # black
    vec4(1.0, 0.0, 0.0, 1.0),  # red
    vec4(1.0, 1.0, 0.0, 1.0),  # yellow
    vec4(0.0, 1.0, 0.0, 1.0),  # green
    vec4(0.0, 0.0, 1.0, 1.0),  # blue
    vec4(1.0, 0.0, 1.0, 1.0),  # magenta
    vec4(0.0, 1.0, 1.0, 1.0),  # cyan
    vec4(1.0, 1.0, 1.0, 1.0),  # white
]

__pragma__('js', '{}', """
//This is the main 2D function, using a square of 2D vectors""")
def draw_Sierpinski_Carpet_2D_C():
    global gl
    global program
    global render_D
    render_D = 2
    gl = init_webgl_inst()
    clear_canvas(gl)
    program = select_shaders(gl, "vertex-shader2", "fragment-shader")

    shape = shapes.make_square2D(.5)
    count = 4
    ## Just some test code
    # points = shapes.divide_square(shape, count)
    # vertices = [js_list(vec) for vec in points]
    # render(gl, program, gl.TRIANGLES, vertices)
    # return

    launch_worker(shape, count, 1)


__pragma__('js', '{}', """
//This is the main 2D function, using a square of 3D vectors""")
def draw_Sierpinski_Carpet_2D_D():
    global gl
    global program
    global render_D
    render_D = 3
    gl = init_webgl_inst()
    clear_canvas(gl)
    program = select_shaders(gl, "vertex-shader2", "fragment-shader")

    shape = shapes.make_square(.5)
    count = 4
    ## Just some test code
    # points = shapes.divide_square(shape, count)
    # vertices = [js_list(vec) for vec in points]
    # render(gl, program, gl.TRIANGLES, vertices)
    # return

    launch_worker(shape, count, 1)


__pragma__('js', '{}', """
//This is the main 3D function""")
def draw_Sierpinski_Carpet_3D_E():
    global gl
    global program
    global render_D
    render_D = 3
    gl = init_webgl_inst()
    clear_canvas(gl)
    program = select_shaders(gl, "vertex-shader", "fragment-shader")

    shape = shapes.make_cube(.5)
    count = 4
    ## Just some test code
    # points = shapes.divide_square(shape, count)
    # vertices = [js_list(vec) for vec in points]
    # render(gl, program, gl.TRIANGLES, vertices)
    # return

    for face in shape:
        launch_worker(face, count, 6)


__pragma__('js', '{}', """
//JS worker that recursively divide a cube's face in 8 parts, count times.
//Six workers are used, the last worker calls the render function.""")


def launch_worker(shape, count, last_worker):
    def worker_receive(e):
        global worker_points
        global worker_count
        worker_points.append(e.data[0])
        worker_count += 1
        if worker_count is last_worker:
            worker_render()

    worker1 = __new__(Worker('./__target__/worker.js'))
    shape = js_list(shape)

    worker1.onmessage = worker_receive
    worker1.postMessage([shape, count])  # (cube[:4], count))


__pragma__('js', '{}', """
//Function called by the final worker""")


def worker_render():
    global gl
    global worker_points
    global program
    pMatrix = ortho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0)
    projectionLoc = gl.getUniformLocation(program, "projection")
    gl.uniformMatrix4fv(projectionLoc, False, flatten(pMatrix))
    i = 0
    for p in worker_points:
        colorLoc = gl.getUniformLocation(program, "color")
        gl.uniform4fv(colorLoc, flatten(BaseColors[i]))
        render(gl, program, gl.TRIANGLES, p)
        i += 1

    # render(gl, program, gl.TRIANGLES, vertices)

    #render(gl, program, gl.TRIANGLE_STRIP, vertices)
    # render(gl, program, gl.TRIANGLE_FAN, vertices)
    #render(gl, program, gl.TRIANGLES, vertices)
    # render(gl, program, gl.LINE_LOOP, vertices)

    # render(gl, program, gl.LINES, vertices)


__pragma__('js', '{}', """
//Render function using WebGL""")


def render(gl, program, mode, vertices):
    global render_D
    vPositionLoc = gl.getAttribLocation(program, "vPosition")

    bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(vPositionLoc)

    gl.vertexAttribPointer(vPositionLoc, render_D, gl.FLOAT, False, 0, 0)

    gl.drawArrays(mode, 0, len(vertices))


__pragma__('js', '{}', """
//Clears the canva""")
def clear_canvas(gl):
    gl.js_clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


__pragma__('js', '{}', """
//Get the desired shader and return a program instance""")
def select_shaders(gl, *args):
    program = initShaders(gl, *args)
    gl.useProgram(program)
    return program


__pragma__('js', '{}', """
//Initialise WebGL""")
def init_webgl_inst():
    canvas = document.getElementById("gl-canvas")
    gl = WebGLUtils.setupWebGL(canvas)
    if not gl:
        alert("WebGL isn't available")

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.enable(gl.DEPTH_TEST)

    return gl


__pragma__('js', '{}', """
//Recursively converts an iterable implementing __iter__, and all __iter__
//objects it contains, into bare list objects""")
def js_list(iterable):
    if hasattr(iterable, "__iter__"):
        return [js_list(i) for i in iterable] #__:opov
    else:
        return iterable

__pragma__('js', '{}', """
//function getScriptPath(foo){ return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]],{type:'text/javascript'})); }
""")
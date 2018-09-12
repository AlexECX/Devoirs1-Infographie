from matrice import Matrix
from vector import Vector2D, Vector3D
import vector
import shapes


gl = None
program = None
colorLoc = None

points = []
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
function getScriptPath(foo){ return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]],{type:'text/javascript'})); }
""")


def js_array(iterable):
    __pragma__('opov')
    return [item for item in iterable]
    __pragma__('noopov')


def divide_cube(cube, count):
    divide_square(cube[:4], count)
    divide_square(cube[4:], count)
    divide_square([cube[0], cube[1], cube[5], cube[4], ], count)
    divide_square([cube[2], cube[3], cube[7], cube[6], ], count)
    divide_square([cube[0], cube[3], cube[7], cube[4], ], count)
    divide_square([cube[1], cube[2], cube[6], cube[5], ], count)


def divide_square(sq, count):
    global points
    if (count is 0):
        tri = [js_array(vec) for vec in sq]
        points += tri[0:3]  # __: opov
        points += tri[1:4]  # __: opov
        points += [tri[2], tri[3], tri[0], ]  # __: opov

        # vertices = points
        # program = select_shaders(gl, "vertex-shader", "fragment-shader2")
        # render(gl, program, gl.TRIANGLES, vertices)

    else:
        ab = vector.mix(sq[0], sq[1], 1/3)
        ac = vector.mix(sq[0], sq[2], 1/3)
        ad = vector.mix(sq[0], sq[3], 1/3)
        ba = vector.mix(sq[1], sq[0], 1/3)
        bc = vector.mix(sq[1], sq[2], 1/3)
        bd = vector.mix(sq[1], sq[3], 1/3)
        ca = vector.mix(sq[2], sq[0], 1/3)
        cb = vector.mix(sq[2], sq[1], 1/3)
        cd = vector.mix(sq[2], sq[3], 1/3)
        da = vector.mix(sq[3], sq[0], 1/3)
        db = vector.mix(sq[3], sq[1], 1/3)
        dc = vector.mix(sq[3], sq[2], 1/3)

        count -= 1

        # __pragma__('opov')
        # average = (sq[0] + sq[1] + sq[2] + sq[3])/[4,4]
        # __pragma__('noopov')

        # a1 = vector.mix(average, sq[0], 1/3)
        # b1 = vector.mix(average, sq[1], 1/3)
        # c1 = vector.mix(average, sq[2], 1/3)
        # d1 = vector.mix(average, sq[3], 1/3)

        divide_square((sq[0], ab, ac, ad,), count)
        divide_square((ba, sq[1], bc, bd), count)
        divide_square((ca, cb, sq[2], cd), count)
        divide_square((da, db, dc, sq[3],), count)

        divide_square((ab, ba, bd, ac,), count)
        divide_square((bd, bc, cb, ca,), count)
        divide_square((db, ca, cd, dc), count)
        divide_square((ad, ac, db, da), count)


def vec_round(vector, n):
    __pragma__('opov')
    vec = [round(i, n) for i in vector]
    __pragma__('noopov')
    return vector.__class__(*vec)


def divide_triangle(sq, count):
    global gl
    global points
    if (count is 0):
        points.push(*sq)
        vertices = points
        program = select_shaders(gl, "vertex-shader", "fragment-shader2")
        render(gl, program, gl.TRIANGLES, vertices)

    else:

        ab = mix(sq[0], sq[1], 1/3)
        ac = mix(sq[0], sq[2], 1/3)
        bc = mix(sq[1], sq[2], 1/3)

        count -= 1

        divide_triangle((sq[2], ac, bc,), count)
        divide_triangle((sq[0], ab, ac,), count)
        divide_triangle((sq[1], bc, ab,), count)


def main_draw():
    global gl
    global points
    global program
    gl = init_webgl_inst()
    clear_canvas(gl)
    shape = shapes.make_cube(.5)

    count = 4
    shape = shapes.rotate_left(shape)
    shape = shapes.rotate_up(shape)

    #divide_cube(shape, count)

    program = select_shaders(gl, "vertex-shader", "fragment-shader")
    

    cube = shape
   

    cube_faces = [
        cube[:4],
        cube[4:],
        [cube[0], cube[1], cube[5], cube[4], ],
        [cube[2], cube[3], cube[7], cube[6], ],
        [cube[0], cube[3], cube[7], cube[4], ],
        [cube[1], cube[2], cube[6], cube[5], ],
    ]

    
    for face in cube_faces:
        launch_worker(face, count)

def launch_worker(shape, count):
        def worker_receive(e):
            global worker_points
            global worker_count
            worker_points.append(e.data[0]) 
            worker_count += 1
            if worker_count is 6:
                worker_render()

        worker1 = __new__(Worker('worker.js'))
        shape = [js_array(vec) for vec in shape]

        worker1.onmessage = worker_receive
        worker1.postMessage([shape, count])  # (cube[:4], count))


def worker_render():
    global gl
    global worker_points
    global program
    i = 0
    for p in worker_points:
        colorLoc = gl.getUniformLocation(program, "color")
        gl.uniform4fv(colorLoc, flatten(BaseColors[i]))
        render(gl, program, gl.TRIANGLES, p)
        i+=1

    # i = 0
    # sides = 6
    # while i < sides:
    #     vertices = points[i * len(points)/sides:(i+1)*len(points)/sides]
    #     gl.uniform4fv(colorLoc, flatten(BaseColors[i]))
    #     render(gl, program, gl.TRIANGLES, vertices)
    #     i+=1

    # vertices = points[len(points)/6:2*len(points)/6]
    # gl.uniform4fv(colorLoc, flatten(BaseColors[1]))
    # render(gl, program, gl.TRIANGLES, vertices)

    # vertices = points[2*len(points)/6:3*len(points)/6]
    # gl.uniform4fv(colorLoc, flatten(BaseColors[2]))
    # render(gl, program, gl.TRIANGLES, vertices)

    # vertices = points[3*len(points)/6:4*len(points)/6]
    # gl.uniform4fv(colorLoc, flatten(BaseColors[3]))
    # render(gl, program, gl.TRIANGLES, vertices)

    # vertices = points[4*len(points)/6:5*len(points)/6]
    # gl.uniform4fv(colorLoc, flatten(BaseColors[0]))
    # render(gl, program, gl.TRIANGLES, vertices)

    # vertices = points[5*len(points)/6:6*len(points)/6]
    # gl.uniform4fv(colorLoc, flatten(BaseColors[5]))
    # render(gl, program, gl.TRIANGLES, vertices)

    #render(gl, program, gl.TRIANGLE_STRIP, vertices)
    # render(gl, program, gl.TRIANGLE_FAN, vertices)
    #render(gl, program, gl.TRIANGLES, vertices)
    # render(gl, program, gl.LINE_LOOP, vertices)

    # render(gl, program, gl.LINES, vertices)


def render(gl, program, mode, vertices):

    vPositionLoc = gl.getAttribLocation(program, "vPosition")

    bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(vPositionLoc)

    gl.vertexAttribPointer(vPositionLoc, 3, gl.FLOAT, False, 0, 0)

    gl.drawArrays(mode, 0, len(vertices))


def clear_canvas(gl):
    gl.js_clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


def select_shaders(gl, *args):
    program = initShaders(gl, *args)
    gl.useProgram(program)
    return program


def init_webgl_inst():
    canvas = document.getElementById("gl-canvas")
    gl = WebGLUtils.setupWebGL(canvas)
    if not gl:
        alert("WebGL isn't available")

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.enable(gl.DEPTH_TEST)

    return gl


window.onload = main_draw

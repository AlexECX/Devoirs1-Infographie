from matrice import Matrix
from vector import Vector2D, Vector3D
import vector


gl = None
program = None

__pragma__('js','{}',"""
var points = []
""")
 

BaseColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  # black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  # red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  # yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  # green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  # blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  # magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  # cyan
    vec4( 1.0, 1.0, 1.0, 1.0 ),  # white
]


def js_array(iterable):
    __pragma__('opov')
    return [item for item in iterable]
    __pragma__('noopov')


def make_square(size=.5):
    square = [
        Vector3D(-size, -size, 0),
        Vector3D(size, -size, 0),
        Vector3D(size, size, 0),
        Vector3D(-size, size, 0),
    ]
    return square

def make_cube(size=.5, z=0):
    cube = [
        Vector3D(-.5, .5, .5),
        Vector3D(-.5, -.5, .5),
        Vector3D(0, -.2, -.5),
        Vector3D(0, .8, -.5),

        Vector3D(0, .8, -.5),
        Vector3D(0, -.2, -.5),
        Vector3D(.5, -.5, .5),
        Vector3D(.5, .5, .5),

        Vector3D(-.5, .5, .5),
        Vector3D(-.5, -.5, .5),
        Vector3D(0, -.8, .5),
        Vector3D(0, .2, .5),

        Vector3D(0, .2, .5),
        Vector3D(0, -.8, .5),
        Vector3D(.5, -.5, .5),
        Vector3D(.5, .5, .5),
    ]
    return cube


def make_triangle(size=.5):
    triangle = [
        # Vector2D(0, size),
        # Vector2D(-size, -size),
        # Vector2D(size,  -size),
        Vector2D(-size, size),
        Vector2D(-size, -size),
        Vector2D(size, size),
    ]

    return triangle


def shift_shape(shape, coord):

    for vec in shape:
        __pragma__('opov')
        vec += coord
        __pragma__('noopov')

    return shape


def divide_square(sq, count):
    global points
    if (count is 0):
        tri = [js_array(vec) for vec in sq]
        points.push(*tri[0:3])
        points.push(*tri[1:4])
        points.push(*[tri[2], tri[3], tri[0],])

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
    gl = init_webgl_inst()
    clear_canvas(gl)
    shape = make_cube(1)

    count = 4

    divide_square(shape[:4], count)
    vertices = points

    program = select_shaders(gl, "vertex-shader", "fragment-shader")
    colorLoc = gl.getUniformLocation( program, "color" )
    
    gl.uniform4fv(colorLoc, flatten(BaseColors[4]))
    render(gl, program, gl.TRIANGLES, vertices)

    points.length = 0
    divide_square(shape[4:8], count)
    vertices = points
    gl.uniform4fv(colorLoc, flatten(BaseColors[1]))
    render(gl, program, gl.TRIANGLES, vertices)

    points.length = 0
    divide_square(shape[8:12], count)
    vertices = points
    gl.uniform4fv(colorLoc, flatten(BaseColors[2]))
    render(gl, program, gl.TRIANGLES, vertices)

    points.length = 0
    divide_square(shape[12:], count)
    vertices = points
    gl.uniform4fv(colorLoc, flatten(BaseColors[3]))
    render(gl, program, gl.TRIANGLES, vertices)

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

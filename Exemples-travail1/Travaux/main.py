from matrice import Matrix
from vector import Vector2D


gl = None
program = None
__pragma__('js', '{}', """
var points = []
""")


def js_array(iterable):
    __pragma__('opov')
    return [item for item in iterable]
    __pragma__('noopov')


def make_square(size=.5, aspect=1):
    square = [
        Vector2D(-size, size*aspect),
        Vector2D(-size, -size*aspect),
        Vector2D(size, -size*aspect),

        Vector2D(-size, size*aspect),
        Vector2D(size, size*aspect),
        Vector2D(size, -size*aspect),
    ]
    return square


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


def render(gl, program, mode, vertices):

    vPositionLoc = gl.getAttribLocation(program, "vPosition")

    bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(vPositionLoc)

    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, False, 0, 0)

    gl.drawArrays(mode, 0, len(vertices))


def clear_canvas(gl):
    gl.js_clear(gl.COLOR_BUFFER_BIT)


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

    return gl

    # p
    # rogram = initShaders(gl, "vertex-shader", "fragment-shader")
    # gl.useProgram(program)


def test_func(sq):
    ab = mix(sq[0], sq[1], .5)
    ac = mix(sq[0], sq[2], .5)
    ad = mix(sq[0], sq[3], .5)
    bc = mix(sq[1], sq[2], .5)
    bd = mix(sq[1], sq[3], .5)
    cd = mix(sq[2], sq[3], .5)

    aab = mix(sq[0], ab, .5)
    aac = mix(sq[0], ac, .5)
    aad = mix(sq[0], ad, .5)
    bbc = mix(sq[1], bc, .5)
    bab = mix(sq[1], ab, .5)
    bbd = mix(sq[1], bd, .5)

    new_shape = [
        sq[0], aab, aac, aad,
        sq[1], bab, bbc, bbd
    ]

    return new_shape

def _divide_right_triangle(sq, count):
    global points
    if (count is 0):
        sq = [js_array(vec) for vec in sq]
        points.push(*sq[:3])
        vertices = points
        program = select_shaders(gl, "vertex-shader", "fragment-shader2")
        render(gl, program, gl.TRIANGLES, vertices)
    else:
        ab = mix(sq[0], sq[1], 1/3)
        ac = mix(sq[0], sq[2], 1/3)
        bc = mix(sq[1], sq[2], 1/3)

    
        count -= 1

        _divide_right_triangle((sq[2], ac, bc,), count)
        _divide_right_triangle((sq[0], ab, ac,), count)
        _divide_right_triangle((sq[1], bc, ab,), count)

def divide_square(sq, count):

    ab = mix(sq[0], sq[1], 1/3)
    ac = mix(sq[0], sq[2], 1/3)
    ad = mix(sq[0], [0,0], 1/3)
    ba = mix(sq[1], sq[0], 1/3)
    bc = mix(sq[1], sq[2], 1/3)
    bd = mix(sq[1], [0,0], 1/3)
    ca = mix(sq[2], sq[0], 1/3)
    cb = mix(sq[2], sq[1], 1/3)
    cd = mix(sq[2], [0,0], 1/3)
    da = mix([0,0], sq[0], 1/3)
    db = mix([0,0], sq[1], 1/3)
    dc = mix([0,0], sq[2], 1/3)

    func_count = count
    _divide_right_triangle((sq[0], ab, ad,), count)
    #_divide_right_triangle((ab, ba, ac, bd), count)
    _divide_right_triangle((sq[1], ba, bc,), count)
    #_divide_right_triangle((bc, cb, bd, ca,), count)
    _divide_right_triangle((sq[2], cd, cb,), count)
    #_divide_right_triangle((cd, dc, ca, db), count)
    _divide_right_triangle((sq[3], dc, da,), count)
    #_divide_right_triangle((da, ad, db, ac), count)

    divide_square(sq[:3], count)
       

    global points
    # if (count is 0):
    #     sq = [js_array(vec) for vec in sq]
    #     points.push(*sq[:3])
    #     vertices = points
    #     program = select_shaders(gl, "vertex-shader", "fragment-shader2")
    #     render(gl, program, gl.TRIANGLES, vertices)

    # else:
        # ab = mix(sq[0], sq[1], 1/3)
        # ac = mix(sq[0], sq[2], 1/3)
        # ad = mix(sq[0], sq[3], 1/3)
        # ba = mix(sq[1], sq[0], 1/3)
        # bc = mix(sq[1], sq[2], 1/3)
        # bd = mix(sq[1], sq[3], 1/3)
        # ca = mix(sq[2], sq[0], 1/3)
        # cb = mix(sq[2], sq[1], 1/3)
        # cd = mix(sq[2], sq[3], 1/3)
        # da = mix(sq[3], sq[0], 1/3)
        # db = mix(sq[3], sq[1], 1/3)
        # dc = mix(sq[3], sq[2], 1/3)

        # count -= 1

        # divide_square((sq[0], ab, ad, ac,), count)
        # #divide_square((ab, ba, ac, bd), count)
        # divide_square((sq[1], ba, bc, bd,), count)
        # #divide_square((bc, cb, bd, ca,), count)
        # divide_square((sq[2], cd, cb, ca, ), count)
        # #divide_square((cd, dc, ca, db), count)
        # divide_square((sq[3], dc, da, db), count)
        # #divide_square((da, ad, db, ac), count)

# def divide_square(sq, count):
#     global gl
#     global points
#     if (count is 0):
#         sq = [js_array(vec) for vec in sq]
#         points.push(*sq)
#         vertices = points
#         program = select_shaders(gl, "vertex-shader", "fragment-shader2")
#         render(gl, program, gl.TRIANGLES, vertices)

#     else:

#         ab = mix(sq[0], sq[1], .5)
#         ac = mix(sq[0], sq[2], .5)
#         bc = mix(sq[1], sq[2], .5)

#         de = mix(sq[3], sq[4], .5)
#         df = mix(sq[3], sq[5], .5)
#         ef = mix(sq[4], sq[5], .5)

#         count -= 1

#         divide_square((sq[2], ac, bc, sq[5], df, ef,), count)
#         divide_square((sq[0], ab, ac, sq[3], de,df,), count)
#         divide_square((sq[1], bc, ab, sq[4], de, ef), count)


def inv(vec):
    return [vec[1]*(vec[0]/abs(vec[0])),
            vec[0]*(vec[1]/abs(vec[1]))]


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
    shape = make_square(1)
    shape2 = [
        Vector2D(0, 1),
        Vector2D(-1, 0),
        Vector2D(0, -1),
        
        Vector2D(1, 0),

    ]
    #shape = __add__(shape, shape2)
    #shape = shift_shape(shape, Vector2D(-.4, 0))
    #shape2 = test_func(shape)
    shape = [js_array(vec) for vec in shape]
    shape2 = [js_array(vec) for vec in shape2]

    # vertices = [js_array(vec) for vec in shape]

    # program = select_shaders(gl, "vertex-shader", "fragment-shader")
    # render(gl, program, gl.TRIANGLE_FAN, vertices)
    # for i in range(1):
    #     shape = test_func(shape)

    # divide_triangle(shape[:3], 2)
    # divide_triangle(shape[3:], 2)
    divide_square(shape, 1)
    #divide_square(shape2, 1)
    # vertices = points
    vertices = shape
    #vertices = [js_array(vec) for vec in shape2]

    program = select_shaders(gl, "vertex-shader", "fragment-shader")
    #render(gl, program, gl.TRIANGLE_STRIP, vertices)
    # render(gl, program, gl.TRIANGLE_FAN, vertices)
    #render(gl, program, gl.TRIANGLES, vertices)
    # render(gl, program, gl.LINE_LOOP, vertices)
    #render(gl, program, gl.TRIANGLES, vertices)
    # render(gl, program, gl.LINES, vertices)


window.onload = main_draw

from vector import Vector2D, Vector3D


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
        Vector3D(-size, size, -size),
        Vector3D(-size, -size, -size),
        Vector3D(size, -size, -size),
        Vector3D(size, size, -size),

        Vector3D(-size, size, size),
        Vector3D(-size, -size, size),
        Vector3D(size, -size, size),
        Vector3D(size, size, size),

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


def shift(shape, coord):

    for vec in shape:
        __pragma__('opov')
        vec += coord
        __pragma__('noopov')

    return shape


def rotate_left(shape):
    __pragma__('opov')
    new_shape = [
        shape[0] + [-1/8, 0, -1/8],
        shape[1] + [-1/8, 0, -1/8],
        shape[2] + [-1/8, 0, 1/8],
        shape[3] + [-1/8, 0, 1/8],

        shape[4] + [1/8, 0, 1/8],
        shape[5] + [1/8, 0, 1/8],
        shape[6] + [1/8, 0, -1/8],
        shape[7] + [1/8, 0, -1/8]
    ]
    __pragma__('noopov')
    return new_shape

def rotate_up(shape):
    __pragma__('opov')
    new_shape = [
        shape[0] + [0, 1/8, -1/8],
        shape[1] + [0, 1/8, 1/8],
        shape[2] + [0, 1/8, 1/8],
        shape[3] + [0, 1/8, -1/8],

        shape[4] + [0, -1/8, 1/8],
        shape[5] + [0, -1/8, -1/8],
        shape[6] + [0, -1/8, -1/8],
        shape[7] + [0, -1/8, 1/8]
    ]
    __pragma__('noopov')
    return new_shape

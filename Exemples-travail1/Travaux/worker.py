importScripts('../../Common/MV.js')

def divide_square(sq, count):
    if (count is 0):
        points.push(*tri[0:3])
        points.push(*tri[1:4])
        points.push(*[tri[2], tri[3], tri[0], ])

        # vertices = points
        # program = select_shaders(gl, "vertex-shader", "fragment-shader2")
        # render(gl, program, gl.TRIANGLES, vertices)

    else:
        ab = mix(sq[0], sq[1], 1/3)
        ac = mix(sq[0], sq[2], 1/3)
        ad = mix(sq[0], sq[3], 1/3)
        ba = mix(sq[1], sq[0], 1/3)
        bc = mix(sq[1], sq[2], 1/3)
        bd = mix(sq[1], sq[3], 1/3)
        ca = mix(sq[2], sq[0], 1/3)
        cb = mix(sq[2], sq[1], 1/3)
        cd = mix(sq[2], sq[3], 1/3)
        da = mix(sq[3], sq[0], 1/3)
        db = mix(sq[3], sq[1], 1/3)
        dc = mix(sq[3], sq[2], 1/3)

        count -= 1

        divide_square((sq[0], ab, ac, ad,), count)
        divide_square((ba, sq[1], bc, bd), count)
        divide_square((ca, cb, sq[2], cd), count)
        divide_square((da, db, dc, sq[3],), count)

        divide_square((ab, ba, bd, ac,), count)
        divide_square((bd, bc, cb, ca,), count)
        divide_square((db, ca, cd, dc), count)
        divide_square((ad, ac, db, da), count)


def worker_func(e):
    __pragma__('js','{}',"""var points = []""")
    # divide_square(e.data)
    shape = e.data[0]
    count = e.data[1]
    color = e.data[2]
    divide_square(shape, count)
    self.postMessage([points, color])
    self.close()


self.onmessage = worker_func

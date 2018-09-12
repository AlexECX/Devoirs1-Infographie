from vector import Vector3D
from shapes import divide_square



def worker_func(e):
    points = []
    # divide_square(e.data)
    print(e.data)
    shape = e.data[0]
    shape = [Vector3D(v[0], v[1], v[2]) for v in shape]
    count = e.data[1]
    color = e.data[2]
    divide_square(shape, count)
    #self.postMessage([points, color])
    self.close()


self.onmessage = worker_func

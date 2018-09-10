
# __pragma__('opov')


def pack_unpack_compat(args, compare):
    if type(args[0]).__name__ == compare.__class__.__name__:
        return args[0]
    else:
        return args


class Vector:

    coord = []
    normalized = False

    #__pragma__('iconv')

    def __init__(self, *args):
        #args = pack_unpack_compat(args, self)
        self.coord = [float(i) for i in args]
    #__pragma__('noiconv')

    def __str__(self):
        return "{}{}".format(self.__class__.__name__, self.coord)

    def __repr__(self):
        return "{}{}".format(self.__class__.__name__, self.coord)

    def __getitem__(self, item):
        """Add list[] functionnalities"""
        return self.coord[item]

    def __len__(self):
        """Add len() functionnality"""
        return len(self.coord)

    def __add__(self, vector):
        """Operator + overload (self + vector case)"""
        result = [self.coord[i] + vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __radd__(self, vector):
        """Operator + overload (vector + self case)"""
        result = [self.coord[i] + vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __iadd__(self, vector):
        """Operator += overload"""
        for i in range(len(self.coord)):
            self.coord[i] += vector[i]
        return self

    def __sub__(self, vector):
        """Operator - overload (self - vector case)"""
        result = [self.coord[i] - vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __rsub__(self, vector):
        """Operator - overload (vector - self case)"""
        result = [self.coord[i] - vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __isub__(self, vector):
        """Operator -= overload"""
        for i in range(len(self.coord)):
            self.coord[i] -= vector[i]
        return self

    def __mul__(self, vector):
        """Operator * overload (self + vector case)"""
        result = [self.coord[i] * vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __rmul__(self, vector):
        """Operator * overload (vector + self case)"""
        result = [self.coord[i] * vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __imul__(self, vector):
        """Operator *= overload"""
        for i in range(len(self.coord)):
            self.coord[i] *= vector[i]
        return self


    def lenght_vec(self):
        """Return the vector lenght of the vector."""
        sqrt_components = 0
        for coord in self.coord:
            sqrt_components += coord * coord
        return sqrt_components**(.5)

    def normalize(self):
        """Normalize the Vector."""
        if not self.normalized:
            if self.lenght_vec() != 0.0:
                for i, coord in enumerate(self.coord):
                    self.coord[i] = coord / self.lenght_vec()
                self.normalized = True
        return self

    @classmethod
    def dot_product(cls, vector1, vector2) -> float:
        """Find the dot product of 2 vectors."""
        dot = 0.0
        vec1 = cls(*vector1)
        vec2 = cls(*vector2)
        vec1.normalize()
        vec2.normalize()
        for i in range(len(vec1)):
            dot += vec1[i] * vec2[i]

        return dot

    def as_list(self):
        """Return vector coordinates as a list"""
        return self.coord[:]


class Vector2D(Vector):

    def __init__(self, *args):
        super().__init__(*args)
        while len(self.coord) < 2:
            self.coord.append(0.0)
        self.coord = self.coord[0:2]


class Vector3D(Vector):

    def __init__(self, *args):
        super().__init__(*args)
        while len(self.coord) < 3:
            self.coord.append(0.0)
        self.coord = self.coord[0:3]

    def cross_product(self, vec1, vec2):
        """
        Find the cross product of 2 vectors and return the resulting 
        vector.
        """
        vector1 = self.__class__(*vec1)
        vector2 = self.__class__(*vec2)
        return self.__class__(
            vector1[1] * vector2[2] - vector1[2] * vector2[1],
            vector1[2] * vector2[0] - vector1[0] * vector2[2],
            vector1[0] * vector2[1] - vector1[1] * vector2[0],
        )


# __pragma__('noopov')

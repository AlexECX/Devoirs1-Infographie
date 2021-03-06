from org.transcrypt import __pragma__ #__: skip


# __pragma__('opov')

__pragma__('js',"""
//MV.mix implementation using python operator overload""")
def mix(u, v, s ):
    __pragma__('js', 'var t = typeof s')
    if not t is "number":
        __pragma__('js', '{}', """throw "mix: the last paramter " + s + " must be a number";""")
        
    
    if ( len(u) != len(v) ):
        __pragma__('js', '{}', """throw "vector dimension mismatch";""")

    return u * [1-s for i in u] + v * [s for i in v] 

# __pragma__('noopov')

__pragma__('js', '{}', """
//Custom made Vector classes translated from python to JS.
//Mainly used for operator overload functionnality, and to try the 
//Transcrypt transpiler functionnalities.""")
class Vector:

    coord = []
    normalized = False


    def __init__(self, *args):
        #args = pack_unpack_compat(args, self)
        self.coord = [float(i) for i in args]

    def __str__(self):
        return "{}{}".format(self.__class__.__name__, self.coord)

    def __repr__(self):
        return "{}{}".format(self.__class__.__name__, self.coord)

    def __getitem__(self, item):
        """Add list[] functionnalities"""
        return self.coord[item] 

    def __setitem__(self, key, value):
        """Add list[key] = value functionnalities"""
        self.coord[key] = value

    def __iter__(self):
        """Add iterability"""
        for item in self.coord:
            yield item

    def __len__(self):
        """Add len() functionnality"""
        return len(self.coord)

    def __abs__(self):
        """Python abs() method overload """
        result = [c/c for c in self.coord]
        return self.__class__(*result)

    def __neg__(self):
        """Negation operator overload"""
        result = [-c for c in self.coord]
        return self.__class__(*result)

    # __pragma__('opov')

    def __eq__(self, vector):
        """Equality == operator overload"""
        for i in range(len(self.coord)):
            if self.coord[i] != vector[i]:
                return False
        return True

    def __ne__(self, vector):
        """Equality != operator overload"""
        return False if self.__eq__(vector) else True

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

    def __truediv__(self, vector):
        """Operator / overload (self + vector case)"""
        result = [self.coord[i] / vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __rtruediv__(self, vector):
        """Operator / overload (vector + self case)"""
        result = [self.coord[i] / vector[i]
                  for i in range(len(self.coord))]
        return self.__class__(*result)

    def __itruediv__(self, vector):
        """Operator /= overload"""
        for i in range(len(self.coord)):
            self.coord[i] /= vector[i]
        return self

    # __pragma__('noopov')

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

    def as_list(self):
        """Return vector coordinates as a list"""
        return self.coord[:]


    @classmethod
    def dot_product(cls, vector1, vector2) -> float:
        """Find the dot product of 2 vectors."""
        dot = 0.0
        vec1 = cls(*vector1) 
        vec2 = cls(*vector2)
        vec1.normalize()
        vec2.normalize()
        for i in range(len(vec1)):
            dot += vec1[i] * vec2[i] #__: opov

        return dot



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

    # __pragma__('opov')

    @classmethod
    def cross_product(cls, vec1, vec2):
        """
        Find the cross product of 2 vectors and return the resulting 
        vector.
        """
        vector1 = cls(*vec1)
        vector2 = cls(*vec2)
        return cls(
            vector1[1] * vector2[2] - vector1[2] * vector2[1],
            vector1[2] * vector2[0] - vector1[0] * vector2[2],
            vector1[0] * vector2[1] - vector1[1] * vector2[0],
        )

    # __pragma__('noopov')

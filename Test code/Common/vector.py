

class Vector:

    coordinates = []
    normalized = False

    def __init__(self, *args):
        self.coordinates = [float(i) for i in args]

    def __str__(self):
        return "{}{}".format(self.__class__.__name__, self.coordinates)

    def __repr__(self):
        return "{}{}".format(self.__class__.__name__, self.coordinates)

    def __getitem__(self, item):
        return self.coordinates[item]

    def __len__(self):
        return len(self.coordinates)

    def __add__(self, vector):
        result = [self.coordinates[i] + vector[i]
                  for i in range(len(self.coordinates))]
        return self.__class__(*result)

    def __radd__(self, vector):
        result = [self.coordinates[i] + vector[i]
                  for i in range(len(self.coordinates))]
        return self.__class__(*result)

    def __iadd__(self, vector):
        for i in range(len(self.coordinates)):
            self.coordinates[i] += vector[i]
        return self

    def __sub__(self, vector):
        result = [self.coordinates[i] - vector[i]
                  for i in range(len(self.coordinates))]
        return self.__class__(*result)

    def __rsub__(self, vector):
        result = [self.coordinates[i] - vector[i]
                  for i in range(len(self.coordinates))]
        return self.__class__(*result)

    def __isub__(self, vector):
        for i in range(len(self.coordinates)):
            self.coordinates[i] -= vector[i]
        return self

    def lenght_vec(self):
        sqrt_components = 0
        for coord in self.coordinates:
            sqrt_components += coord * coord
        return sqrt_components**(.5)

    def normalize(self):
        if not self.normalized:
            for i, coord in enumerate(self.coordinates):
                self.coordinates[i] = coord / self.lenght_vec()
            self.normalized = True
        return self

    @classmethod
    def dot_product(cls, vector1, vector2):
        dot = 0
        vec1 = cls(*vector1)
        vec2 = cls(*vector2)
        vec1.normalize()
        vec2.normalize()
        for i in range(len(vec1)):
            dot += vec1[i] * vec2[i]
        return dot

    def as_list(self):
        return self.coordinates[:]


class Vector2D(Vector):

    def __init__(self, *args):
        super().__init__(*args)
        while len(self.coordinates) < 2:
            self.coordinates.append(0.0)
        self.coordinates = self.coordinates[0:2]


class Vector3D(Vector):

    def __init__(self, *args):
        super().__init__(*args)
        while len(self.coordinates) < 3:
            self.coordinates.append(0.0)
        self.coordinates = self.coordinates[0:3]

    @classmethod
    def cross_product(cls, vec1, vec2):
        vector1 = cls(*vec1)
        vector2 = cls(*vec2)
        return cls(
            vector1[1] * vector2[2] - vector1[2] * vector2[2],
            vector1[2] * vector2[0] - vector1[0] * vector2[2],
            vector1[0] * vector2[1] - vector1[1] * vector2[0],
        )

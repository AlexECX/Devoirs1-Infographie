

class Matrix:

    matrix = None

    def __init__(self, matrix=None, size_x=0, size_y=1):
        if matrix != None:
            self.matrix = matrix
        else:
            self.matrix = [
                [0 for i in range(size_x)]*size_y
            ]

    def print_matrix(self):
        print(self.__class__.__name__+":")
        for m_list in self.matrix:
            print(str(m_list))

    def __str__(self):
        return "{}{}".format(self.__class__.__name__, self.matrix)

    def __repr__(self):
        return "{}{}".format(self.__class__.__name__, self.matrix)

    def __getitem__(self, item):
        """Add list[] functionnalities"""
        return self.matrix[item]

    def __len__(self):
        """Add len() functionnality"""
        return len(self.matrix)

    def lenght(self):
        "Returns the lign and column length as a tuple"
        return (len(self.matrix), len(self.matrix[0]))

    def __add__(self, matrix):
        """Operator + overload (self + matrix case)"""
        result = list()
        for i in range(len(self.matrix)):
            result.append(
                [self.matrix[i][j] + matrix[i][j]
                 for j in range(len(self.matrix[i]))]
            )
        return self.__class__(result)

    def __radd__(self, matrix):
        """Operator + overload (matrix + self case)"""
        result = []
        for i in range(len(self.matrix)):
            result.append(
                [self.matrix[i][j] + matrix[i][j]
                 for j in range(len(self.matrix[i]))]
            )
        return self.__class__(result)

    def __iadd__(self, matrix):
        """Operator += overload"""
        for i in range(len(self.matrix)):
            for j in range(len(self.matrix[i])):
                self.matrix[i][j] += matrix[i][j]
        return self

    def __sub__(self, matrix):
        """Operator - overload (self - matrix case)"""
        result = []
        for i in range(len(self.matrix)):
            result.append(
                [self.matrix[i][j] - matrix[i][j]
                 for j in range(len(self.matrix[i]))]
            )
        return self.__class__(result)

    def __rsub__(self, matrix):
        """Operator - overload (matrix - self case)"""
        result = []
        for i in range(len(self.matrix)):
            result.append(
                [self.matrix[i][j] - matrix[i][j]
                 for j in range(len(self.matrix[i]))]
            )
        return self.__class__(result)

    def __isub__(self, matrix):
        """Operator -= overload"""
        for i in range(len(self.matrix)):
            for j in range(len(self.matrix[i])):
                self.matrix[i][j] -= matrix[i][j]
        return self

    def __mul__(self, matrix):
        """Operator * overload (self * matrix case)"""
        result = []
        for e in range(len(self.matrix)):
            summation = []
            for i in range(len(self.matrix[e])):
                summation.append(
                    [self.matrix[i][j] * matrix[j][i]
                     for j in range(len(self.matrix[i]))]
                )
            result.append([sum(s) for s in summation])
        return self.__class__(result)

    def __rmul__(self, matrix):
        """Operator * overload (matrix * self case)"""
        result = []
        for e in range(len(self.matrix)):
            summation = []
            for i in range(len(self.matrix[e])):
                summation.append(
                    [self.matrix[i][j] * matrix[j][i]
                     for j in range(len(self.matrix[i]))]
                )
            result.append([sum(s) for s in summation])
        return self.__class__(result)

    def __imul__(self, matrix):
        """Operator *= overload"""
        for e in range(len(self.matrix)):
            summation = []
            for i in range(len(self.matrix[e])):
                summation.append(
                    [self.matrix[i][j] * matrix[j][i]
                     for j in range(len(self.matrix[i]))]
                )
            self.matrix[e] = ([sum(s) for s in summation])
        return self

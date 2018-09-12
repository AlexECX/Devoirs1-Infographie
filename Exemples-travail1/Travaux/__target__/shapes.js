// Transcrypt'ed from Python, 2018-09-12 01:52:51
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Vector2D, Vector3D} from './vector.js';
var __name__ = 'shapes';
export var make_square = function (size) {
	if (typeof size == 'undefined' || (size != null && size.hasOwnProperty ("__kwargtrans__"))) {;
		var size = 0.5;
	};
	var square = list ([Vector3D (-(size), -(size), 0), Vector3D (size, -(size), 0), Vector3D (size, size, 0), Vector3D (-(size), size, 0)]);
	return square;
};
export var make_cube = function (size, z) {
	if (typeof size == 'undefined' || (size != null && size.hasOwnProperty ("__kwargtrans__"))) {;
		var size = 0.5;
	};
	if (typeof z == 'undefined' || (z != null && z.hasOwnProperty ("__kwargtrans__"))) {;
		var z = 0;
	};
	var cube = list ([Vector3D (-(size), size, -(size)), Vector3D (-(size), -(size), -(size)), Vector3D (size, -(size), -(size)), Vector3D (size, size, -(size)), Vector3D (-(size), size, size), Vector3D (-(size), -(size), size), Vector3D (size, -(size), size), Vector3D (size, size, size)]);
	return cube;
};
export var make_triangle = function (size) {
	if (typeof size == 'undefined' || (size != null && size.hasOwnProperty ("__kwargtrans__"))) {;
		var size = 0.5;
	};
	var triangle = list ([Vector2D (-(size), size), Vector2D (-(size), -(size)), Vector2D (size, size)]);
	return triangle;
};
export var divide_square = function (sq, count) {
	if (count === 0) {
		var tri = (function () {
			var __accu0__ = [];
			for (var vec of sq) {
				__accu0__.append (js_array (vec));
			}
			return __accu0__;
		}) ();
		points = __call__ (__iadd__, null, points, __getslice__ (tri, 0, 3, 1));
		points = __call__ (__iadd__, null, points, __getslice__ (tri, 1, 4, 1));
		points = __call__ (__iadd__, null, points, list ([__getitem__ (tri, 2), __getitem__ (tri, 3), __getitem__ (tri, 0)]));
	}
	else {
		var ab = vector.mix (sq [0], sq [1], 1 / 3);
		var ac = vector.mix (sq [0], sq [2], 1 / 3);
		var ad = vector.mix (sq [0], sq [3], 1 / 3);
		var ba = vector.mix (sq [1], sq [0], 1 / 3);
		var bc = vector.mix (sq [1], sq [2], 1 / 3);
		var bd = vector.mix (sq [1], sq [3], 1 / 3);
		var ca = vector.mix (sq [2], sq [0], 1 / 3);
		var cb = vector.mix (sq [2], sq [1], 1 / 3);
		var cd = vector.mix (sq [2], sq [3], 1 / 3);
		var da = vector.mix (sq [3], sq [0], 1 / 3);
		var db = vector.mix (sq [3], sq [1], 1 / 3);
		var dc = vector.mix (sq [3], sq [2], 1 / 3);
		count--;
		divide_square (tuple ([sq [0], ab, ac, ad]), count);
		divide_square (tuple ([ba, sq [1], bc, bd]), count);
		divide_square (tuple ([ca, cb, sq [2], cd]), count);
		divide_square (tuple ([da, db, dc, sq [3]]), count);
		divide_square (tuple ([ab, ba, bd, ac]), count);
		divide_square (tuple ([bd, bc, cb, ca]), count);
		divide_square (tuple ([db, ca, cd, dc]), count);
		divide_square (tuple ([ad, ac, db, da]), count);
	}
};
export var shift = function (shape, coord) {
	for (var vec of shape) {
		var vec = __call__ (__iadd__, null, vec, coord);
	}
	return shape;
};
export var rotate_left = function (shape) {
	var new_shape = list ([__add__ (__getitem__ (shape, 0), list ([__truediv__ (__neg__ (1), 8), 0, __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 1), list ([__truediv__ (__neg__ (1), 8), 0, __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 2), list ([__truediv__ (__neg__ (1), 8), 0, __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 3), list ([__truediv__ (__neg__ (1), 8), 0, __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 4), list ([__truediv__ (1, 8), 0, __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 5), list ([__truediv__ (1, 8), 0, __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 6), list ([__truediv__ (1, 8), 0, __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 7), list ([__truediv__ (1, 8), 0, __truediv__ (__neg__ (1), 8)]))]);
	return new_shape;
};
export var rotate_up = function (shape) {
	var new_shape = list ([__add__ (__getitem__ (shape, 0), list ([0, __truediv__ (1, 8), __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 1), list ([0, __truediv__ (1, 8), __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 2), list ([0, __truediv__ (1, 8), __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 3), list ([0, __truediv__ (1, 8), __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 4), list ([0, __truediv__ (__neg__ (1), 8), __truediv__ (1, 8)])), __add__ (__getitem__ (shape, 5), list ([0, __truediv__ (__neg__ (1), 8), __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 6), list ([0, __truediv__ (__neg__ (1), 8), __truediv__ (__neg__ (1), 8)])), __add__ (__getitem__ (shape, 7), list ([0, __truediv__ (__neg__ (1), 8), __truediv__ (1, 8)]))]);
	return new_shape;
};

//# sourceMappingURL=shapes.map
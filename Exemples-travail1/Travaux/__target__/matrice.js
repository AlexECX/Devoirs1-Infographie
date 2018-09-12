// Transcrypt'ed from Python, 2018-09-12 01:52:52
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'matrice';
export var Matrix =  __class__ ('Matrix', [object], {
	__module__: __name__,
	matrix: null,
	get __init__ () {return __get__ (this, function (self, matrix, size_x, size_y) {
		if (typeof matrix == 'undefined' || (matrix != null && matrix.hasOwnProperty ("__kwargtrans__"))) {;
			var matrix = null;
		};
		if (typeof size_x == 'undefined' || (size_x != null && size_x.hasOwnProperty ("__kwargtrans__"))) {;
			var size_x = 0;
		};
		if (typeof size_y == 'undefined' || (size_y != null && size_y.hasOwnProperty ("__kwargtrans__"))) {;
			var size_y = 1;
		};
		if (matrix != null) {
			self.matrix = matrix;
		}
		else {
			self.matrix = list ([(function () {
				var __accu0__ = [];
				for (var i = 0; i < size_x; i++) {
					__accu0__.append (0);
				}
				return __accu0__;
			}) () * size_y]);
		}
	});},
	get print_matrix () {return __get__ (this, function (self) {
		print (self.__class__.__name__ + ':');
		for (var m_list of self.matrix) {
			print (str (m_list));
		}
	});},
	get __str__ () {return __get__ (this, function (self) {
		return '{}{}'.format (self.__class__.__name__, self.matrix);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return '{}{}'.format (self.__class__.__name__, self.matrix);
	});},
	get __getitem__ () {return __get__ (this, function (self, item) {
		return self.matrix [item];
	});},
	get __len__ () {return __get__ (this, function (self) {
		return len (self.matrix);
	});},
	get lenght () {return __get__ (this, function (self) {
		return tuple ([len (self.matrix), len (self.matrix [0])]);
	});},
	get __add__ () {return __get__ (this, function (self, matrix) {
		var result = list ();
		for (var i = 0; i < len (self.matrix); i++) {
			result.append ((function () {
				var __accu0__ = [];
				for (var j = 0; j < len (self.matrix [i]); j++) {
					__accu0__.append (self.matrix [i] [j] + matrix [i] [j]);
				}
				return __accu0__;
			}) ());
		}
		return self.__class__ (result);
	});},
	get __radd__ () {return __get__ (this, function (self, matrix) {
		var result = list ([]);
		for (var i = 0; i < len (self.matrix); i++) {
			result.append ((function () {
				var __accu0__ = [];
				for (var j = 0; j < len (self.matrix [i]); j++) {
					__accu0__.append (self.matrix [i] [j] + matrix [i] [j]);
				}
				return __accu0__;
			}) ());
		}
		return self.__class__ (result);
	});},
	get __iadd__ () {return __get__ (this, function (self, matrix) {
		for (var i = 0; i < len (self.matrix); i++) {
			for (var j = 0; j < len (self.matrix [i]); j++) {
				self.matrix [i] [j] += matrix [i] [j];
			}
		}
		return self;
	});},
	get __sub__ () {return __get__ (this, function (self, matrix) {
		var result = list ([]);
		for (var i = 0; i < len (self.matrix); i++) {
			result.append ((function () {
				var __accu0__ = [];
				for (var j = 0; j < len (self.matrix [i]); j++) {
					__accu0__.append (self.matrix [i] [j] - matrix [i] [j]);
				}
				return __accu0__;
			}) ());
		}
		return self.__class__ (result);
	});},
	get __rsub__ () {return __get__ (this, function (self, matrix) {
		var result = list ([]);
		for (var i = 0; i < len (self.matrix); i++) {
			result.append ((function () {
				var __accu0__ = [];
				for (var j = 0; j < len (self.matrix [i]); j++) {
					__accu0__.append (self.matrix [i] [j] - matrix [i] [j]);
				}
				return __accu0__;
			}) ());
		}
		return self.__class__ (result);
	});},
	get __isub__ () {return __get__ (this, function (self, matrix) {
		for (var i = 0; i < len (self.matrix); i++) {
			for (var j = 0; j < len (self.matrix [i]); j++) {
				self.matrix [i] [j] -= matrix [i] [j];
			}
		}
		return self;
	});},
	get __mul__ () {return __get__ (this, function (self, matrix) {
		var result = list ([]);
		for (var e = 0; e < len (self.matrix); e++) {
			var summation = list ([]);
			for (var i = 0; i < len (self.matrix [e]); i++) {
				summation.append ((function () {
					var __accu0__ = [];
					for (var j = 0; j < len (self.matrix [i]); j++) {
						__accu0__.append (self.matrix [i] [j] * matrix [j] [i]);
					}
					return __accu0__;
				}) ());
			}
			result.append ((function () {
				var __accu0__ = [];
				for (var s of summation) {
					__accu0__.append (sum (s));
				}
				return __accu0__;
			}) ());
		}
		return self.__class__ (result);
	});},
	get __rmul__ () {return __get__ (this, function (self, matrix) {
		var result = list ([]);
		for (var e = 0; e < len (self.matrix); e++) {
			var summation = list ([]);
			for (var i = 0; i < len (self.matrix [e]); i++) {
				summation.append ((function () {
					var __accu0__ = [];
					for (var j = 0; j < len (self.matrix [i]); j++) {
						__accu0__.append (self.matrix [i] [j] * matrix [j] [i]);
					}
					return __accu0__;
				}) ());
			}
			result.append ((function () {
				var __accu0__ = [];
				for (var s of summation) {
					__accu0__.append (sum (s));
				}
				return __accu0__;
			}) ());
		}
		return self.__class__ (result);
	});},
	get __imul__ () {return __get__ (this, function (self, matrix) {
		for (var e = 0; e < len (self.matrix); e++) {
			var summation = list ([]);
			for (var i = 0; i < len (self.matrix [e]); i++) {
				summation.append ((function () {
					var __accu0__ = [];
					for (var j = 0; j < len (self.matrix [i]); j++) {
						__accu0__.append (self.matrix [i] [j] * matrix [j] [i]);
					}
					return __accu0__;
				}) ());
			}
			self.matrix [e] = (function () {
				var __accu0__ = [];
				for (var s of summation) {
					__accu0__.append (sum (s));
				}
				return __accu0__;
			}) ();
		}
		return self;
	});}
});

//# sourceMappingURL=matrice.map
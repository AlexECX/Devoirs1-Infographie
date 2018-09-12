// Transcrypt'ed from Python, 2018-09-12 01:52:51
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'vector';
export var pack_unpack_compat = function (args, compare) {
	if (__eq__ (py_typeof (__getitem__ (args, 0)).__name__, compare.__class__.__name__)) {
		return __getitem__ (args, 0);
	}
	else {
		return args;
	}
};
export var mix = function (u, v, s) {
	var t = typeof s
	if (!(t === 'number')) {
		
		        throw "mix: the last paramter " + s + " must be a number";
		        
	}
	if (__ne__ (__call__ (len, null, u), __call__ (len, null, v))) {
		
		        throw "vector dimension mismatch";
		        
	}
	return __add__ (__mul__ (u, (function () {
		var __accu0__ = [];
		var __iterable0__ = u;
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var i = __getitem__ (__iterable0__, __index0__);
			__call__ (__accu0__.append, __accu0__, __sub__ (1, s));
		}
		return __accu0__;
	}) ()), __mul__ (v, (function () {
		var __accu0__ = [];
		var __iterable0__ = v;
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var i = __getitem__ (__iterable0__, __index0__);
			__call__ (__accu0__.append, __accu0__, s);
		}
		return __accu0__;
	}) ()));
};
export var Vector =  __class__ ('Vector', [object], {
	__module__: __name__,
	coord: list ([]),
	normalized: false,
	get __init__ () {return __get__ (this, function (self) {
		var args = tuple ([].slice.apply (arguments).slice (1));
		self.coord = (function () {
			var __accu0__ = [];
			var __iterable0__ = args;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var i = __getitem__ (__iterable0__, __index0__);
				__call__ (__accu0__.append, __accu0__, __call__ (float, null, i));
			}
			return __accu0__;
		}) ();
	});},
	get __str__ () {return __get__ (this, function (self) {
		return __call__ ('{}{}'.format, '{}{}', self.__class__.__name__, self.coord);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return __call__ ('{}{}'.format, '{}{}', self.__class__.__name__, self.coord);
	});},
	get __getitem__ () {return __get__ (this, function (self, item) {
		return __getitem__ (self.coord, item);
	});},
	get __len__ () {return __get__ (this, function (self) {
		return __call__ (len, null, self.coord);
	});},
	get __neg__ () {return __get__ (this, function (self) {
		var result = (function () {
			var __accu0__ = [];
			var __iterable0__ = self.coord;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				__call__ (__accu0__.append, __accu0__, __neg__ (c));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __eq__ () {return __get__ (this, function (self, vector) {
		for (var i = 0; i < __call__ (len, null, self.coord); i++) {
			if (__ne__ (__getitem__ (self.coord, i), __getitem__ (vector, i))) {
				return false;
			}
		}
		return true;
	});},
	get __ne__ () {return __get__ (this, function (self, vector) {
		return (__call__ (self.__eq__, self, vector) ? false : true);
	});},
	get __abs__ () {return __get__ (this, function (self) {
		var result = (function () {
			var __accu0__ = [];
			var __iterable0__ = self.coord;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				__call__ (__accu0__.append, __accu0__, __truediv__ (c, c));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __add__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __add__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __radd__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __add__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __iadd__ () {return __get__ (this, function (self, vector) {
		for (var i = 0; i < __call__ (len, null, self.coord); i++) {
			__setitem__ (self.coord, i, __call__ (__iadd__, null, __getitem__ (self.coord, i), __getitem__ (vector, i)));
		}
		return self;
	});},
	get __sub__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __sub__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __rsub__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __sub__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __isub__ () {return __get__ (this, function (self, vector) {
		for (var i = 0; i < __call__ (len, null, self.coord); i++) {
			__setitem__ (self.coord, i, __call__ (__isub__, null, __getitem__ (self.coord, i), __getitem__ (vector, i)));
		}
		return self;
	});},
	get __mul__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __mul__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __rmul__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __mul__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __imul__ () {return __get__ (this, function (self, vector) {
		for (var i = 0; i < __call__ (len, null, self.coord); i++) {
			__setitem__ (self.coord, i, __call__ (__imul__, null, __getitem__ (self.coord, i), __getitem__ (vector, i)));
		}
		return self;
	});},
	get __truediv__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __truediv__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __rtruediv__ () {return __get__ (this, function (self, vector) {
		var result = (function () {
			var __accu0__ = [];
			for (var i = 0; i < __call__ (len, null, self.coord); i++) {
				__call__ (__accu0__.append, __accu0__, __truediv__ (__getitem__ (self.coord, i), __getitem__ (vector, i)));
			}
			return __accu0__;
		}) ();
		return __call__ (self.__class__, self, ...result);
	});},
	get __itruediv__ () {return __get__ (this, function (self, vector) {
		for (var i = 0; i < __call__ (len, null, self.coord); i++) {
			__setitem__ (self.coord, i, __call__ (__idiv__, null, __getitem__ (self.coord, i), __getitem__ (vector, i)));
		}
		return self;
	});},
	get lenght_vec () {return __get__ (this, function (self) {
		var sqrt_components = 0;
		var __iterable0__ = self.coord;
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var coord = __getitem__ (__iterable0__, __index0__);
			var sqrt_components = __call__ (__iadd__, null, sqrt_components, __mul__ (coord, coord));
		}
		return __pow__ (sqrt_components, 0.5);
	});},
	get normalize () {return __get__ (this, function (self) {
		if (!(self.normalized)) {
			if (__ne__ (__call__ (self.lenght_vec, self), 0.0)) {
				var __iterable0__ = __call__ (enumerate, null, self.coord);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var __left0__ = __getitem__ (__iterable0__, __index0__);
					var i = __left0__ [0];
					var coord = __left0__ [1];
					__setitem__ (self.coord, i, __truediv__ (coord, __call__ (self.lenght_vec, self)));
				}
				self.normalized = true;
			}
		}
		return self;
	});},
	get dot_product () {return __getcm__ (this, function (cls, vector1, vector2) {
		var dot = 0.0;
		var vec1 = __call__ (cls, null, ...vector1);
		var vec2 = __call__ (cls, null, ...vector2);
		__call__ (vec1.normalize, vec1);
		__call__ (vec2.normalize, vec2);
		for (var i = 0; i < __call__ (len, null, vec1); i++) {
			var dot = __call__ (__iadd__, null, dot, __mul__ (__getitem__ (vec1, i), __getitem__ (vec2, i)));
		}
		return dot;
	});},
	get as_list () {return __get__ (this, function (self) {
		return __getslice__ (self.coord, 0, null, 1);
	});}
});
export var Vector2D =  __class__ ('Vector2D', [Vector], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var args = tuple ([].slice.apply (arguments).slice (1));
		__call__ (__call__ (__super__, null, Vector2D, '__init__'), null, self, ...args);
		while (__lt__ (__call__ (len, null, self.coord), 2)) {
			__call__ (self.coord.append, self.coord, 0.0);
		}
		self.coord = __getslice__ (self.coord, 0, 2, 1);
	});}
});
export var Vector3D =  __class__ ('Vector3D', [Vector], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var args = tuple ([].slice.apply (arguments).slice (1));
		__call__ (__call__ (__super__, null, Vector3D, '__init__'), null, self, ...args);
		while (__lt__ (__call__ (len, null, self.coord), 3)) {
			__call__ (self.coord.append, self.coord, 0.0);
		}
		self.coord = __getslice__ (self.coord, 0, 3, 1);
	});},
	get cross_product () {return __get__ (this, function (self, vec1, vec2) {
		var vector1 = __call__ (self.__class__, self, ...vec1);
		var vector2 = __call__ (self.__class__, self, ...vec2);
		return __call__ (self.__class__, self, __sub__ (__mul__ (__getitem__ (vector1, 1), __getitem__ (vector2, 2)), __mul__ (__getitem__ (vector1, 2), __getitem__ (vector2, 1))), __sub__ (__mul__ (__getitem__ (vector1, 2), __getitem__ (vector2, 0)), __mul__ (__getitem__ (vector1, 0), __getitem__ (vector2, 2))), __sub__ (__mul__ (__getitem__ (vector1, 0), __getitem__ (vector2, 1)), __mul__ (__getitem__ (vector1, 1), __getitem__ (vector2, 0))));
	});}
});

//# sourceMappingURL=vector.map
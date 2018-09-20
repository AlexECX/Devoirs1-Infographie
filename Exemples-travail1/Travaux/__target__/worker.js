// Transcrypt'ed from Python, 2018-09-20 13:47:45
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
importScripts ('../../Common/MV.js');
export var divide_square = function (sq, count) {
	if (count === 0) {
		points.push (...tri.__getslice__ (0, 3, 1));
		points.push (...tri.__getslice__ (1, 4, 1));
		points.push (...list ([tri [2], tri [3], tri [0]]));
	}
	else {
		var ab = mix (sq [0], sq [1], 1 / 3);
		var ac = mix (sq [0], sq [2], 1 / 3);
		var ad = mix (sq [0], sq [3], 1 / 3);
		var ba = mix (sq [1], sq [0], 1 / 3);
		var bc = mix (sq [1], sq [2], 1 / 3);
		var bd = mix (sq [1], sq [3], 1 / 3);
		var ca = mix (sq [2], sq [0], 1 / 3);
		var cb = mix (sq [2], sq [1], 1 / 3);
		var cd = mix (sq [2], sq [3], 1 / 3);
		var da = mix (sq [3], sq [0], 1 / 3);
		var db = mix (sq [3], sq [1], 1 / 3);
		var dc = mix (sq [3], sq [2], 1 / 3);
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
export var worker_func = function (e) {
	var points = []
	var shape = e.data [0];
	var count = e.data [1];
	var color = e.data [2];
	divide_square (shape, count);
	self.postMessage (list ([points, color]));
	self.close ();
};
self.onmessage = worker_func;

//# sourceMappingURL=worker.map
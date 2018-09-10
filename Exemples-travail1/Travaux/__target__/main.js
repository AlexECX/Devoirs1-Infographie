// Transcrypt'ed from Python, 2018-09-10 13:00:49
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Vector2D} from './vector.js';
import {Matrix} from './matrice.js';
var __name__ = '__main__';
export var gl = null;
export var program = null;

var points = []

export var js_array = function (iterable) {
	return (function () {
		var __accu0__ = [];
		var __iterable0__ = iterable;
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var item = __getitem__ (__iterable0__, __index0__);
			__call__ (__accu0__.append, __accu0__, item);
		}
		return __accu0__;
	}) ();
};
export var make_square = function (size) {
	if (typeof size == 'undefined' || (size != null && size.hasOwnProperty ("__kwargtrans__"))) {;
		var size = 0.5;
	};
	var square = list ([Vector2D (-(size), size), Vector2D (-(size), -(size)), Vector2D (size, -(size)), Vector2D (size, size)]);
	return square;
};
export var make_triangle = function (size) {
	if (typeof size == 'undefined' || (size != null && size.hasOwnProperty ("__kwargtrans__"))) {;
		var size = 0.5;
	};
	var triangle = list ([Vector2D (-(size), size), Vector2D (-(size), -(size)), Vector2D (size, size)]);
	return triangle;
};
export var shift_shape = function (shape, coord) {
	for (var vec of shape) {
		var vec = __call__ (__iadd__, null, vec, coord);
	}
	return shape;
};
export var render = function (gl, program, mode, vertices) {
	var vPositionLoc = gl.getAttribLocation (program, 'vPosition');
	var bufferId = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, bufferId);
	gl.bufferData (gl.ARRAY_BUFFER, flatten (vertices), gl.STATIC_DRAW);
	gl.enableVertexAttribArray (vPositionLoc);
	gl.vertexAttribPointer (vPositionLoc, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays (mode, 0, len (vertices));
};
export var clear_canvas = function (gl) {
	gl.clear (gl.COLOR_BUFFER_BIT);
};
export var select_shaders = function (gl) {
	var args = tuple ([].slice.apply (arguments).slice (1));
	var program = initShaders (gl, ...args);
	gl.useProgram (program);
	return program;
};
export var init_webgl_inst = function () {
	var canvas = document.getElementById ('gl-canvas');
	var gl = WebGLUtils.setupWebGL (canvas);
	if (!(gl)) {
		alert ("WebGL isn't available");
	}
	gl.viewport (0, 0, canvas.width, canvas.height);
	gl.clearColor (1.0, 1.0, 1.0, 1.0);
	return gl;
};
export var test_func = function (sq) {
	var ab = mix (sq [0], sq [1], 0.5);
	var ac = mix (sq [0], sq [2], 0.5);
	var ad = mix (sq [0], sq [3], 0.5);
	var bc = mix (sq [1], sq [2], 0.5);
	var bd = mix (sq [1], sq [3], 0.5);
	var cd = mix (sq [2], sq [3], 0.5);
	var aab = mix (sq [0], ab, 0.5);
	var aac = mix (sq [0], ac, 0.5);
	var aad = mix (sq [0], ad, 0.5);
	var bbc = mix (sq [1], bc, 0.5);
	var bab = mix (sq [1], ab, 0.5);
	var bbd = mix (sq [1], bd, 0.5);
	var new_shape = list ([sq [0], aab, aac, aad, sq [1], bab, bbc, bbd]);
	return new_shape;
};
export var divide_square = function (sq, count) {
	if (count === 0) {
		var sq = (function () {
			var __accu0__ = [];
			for (var vec of sq) {
				__accu0__.append (js_array (vec));
			}
			return __accu0__;
		}) ();
		points.push (...sq.__getslice__ (0, 3, 1));
		var vertices = points;
		var program = select_shaders (gl, 'vertex-shader', 'fragment-shader2');
		render (gl, program, gl.TRIANGLES, vertices);
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
		divide_square (tuple ([sq [0], ab, ad, ac]), count);
		divide_square (tuple ([sq [1], ba, bc, bd]), count);
		divide_square (tuple ([sq [2], cd, cb, ca]), count);
		divide_square (tuple ([sq [3], dc, da, db]), count);
	}
};
export var inv = function (vec) {
	return list ([vec [1] * (vec [0] / abs (vec [0])), vec [0] * (vec [1] / abs (vec [1]))]);
};
export var divide_triangle = function (sq, count) {
	if (count === 0) {
		points.push (...sq);
		var vertices = points;
		var program = select_shaders (gl, 'vertex-shader', 'fragment-shader2');
		render (gl, program, gl.TRIANGLES, vertices);
	}
	else {
		var ab = mix (sq [0], sq [1], 1 / 3);
		var ac = mix (sq [0], sq [2], 1 / 3);
		var bc = mix (sq [1], sq [2], 1 / 3);
		count--;
		divide_triangle (tuple ([sq [2], ac, bc]), count);
		divide_triangle (tuple ([sq [0], ab, ac]), count);
		divide_triangle (tuple ([sq [1], bc, ab]), count);
	}
};
export var main_draw = function () {
	gl = init_webgl_inst ();
	clear_canvas (gl);
	var shape = make_square (1);
	var shape2 = list ([Vector2D (0, 1), Vector2D (-(1), 0), Vector2D (0, -(1)), Vector2D (1, 0)]);
	var shape = (function () {
		var __accu0__ = [];
		for (var vec of shape) {
			__accu0__.append (js_array (vec));
		}
		return __accu0__;
	}) ();
	var shape2 = (function () {
		var __accu0__ = [];
		for (var vec of shape2) {
			__accu0__.append (js_array (vec));
		}
		return __accu0__;
	}) ();
	divide_square (shape, 1);
	var vertices = shape;
	var program = select_shaders (gl, 'vertex-shader', 'fragment-shader');
};
window.onload = main_draw;

//# sourceMappingURL=main.map
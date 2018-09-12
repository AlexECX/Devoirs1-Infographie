// Transcrypt'ed from Python, 2018-09-12 01:52:51
var shapes = {};
var vector = {};
var worker = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_worker__ from './worker.js';
__nest__ (worker, '', __module_worker__);
import * as __module_shapes__ from './shapes.js';
__nest__ (shapes, '', __module_shapes__);
import * as __module_vector__ from './vector.js';
__nest__ (vector, '', __module_vector__);
import {Vector2D, Vector3D} from './vector.js';
import {Matrix} from './matrice.js';
var __name__ = '__main__';
export var gl = null;
export var program = null;
export var points = list ([]);
export var BaseColors = list ([vec4 (0.0, 0.0, 0.0, 1.0), vec4 (1.0, 0.0, 0.0, 1.0), vec4 (1.0, 1.0, 0.0, 1.0), vec4 (0.0, 1.0, 0.0, 1.0), vec4 (0.0, 0.0, 1.0, 1.0), vec4 (1.0, 0.0, 1.0, 1.0), vec4 (0.0, 1.0, 1.0, 1.0), vec4 (1.0, 1.0, 1.0, 1.0)]);

function getScriptPath(foo){ return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]],{type:'text/javascript'})); }

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
export var divide_cube = function (cube, count) {
	divide_square (cube.__getslice__ (0, 4, 1), count);
	divide_square (cube.__getslice__ (4, null, 1), count);
	divide_square (list ([cube [0], cube [1], cube [5], cube [4]]), count);
	divide_square (list ([cube [2], cube [3], cube [7], cube [6]]), count);
	divide_square (list ([cube [0], cube [3], cube [7], cube [4]]), count);
	divide_square (list ([cube [1], cube [2], cube [6], cube [5]]), count);
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
export var vec_round = function (vector, n) {
	var vec = (function () {
		var __accu0__ = [];
		var __iterable0__ = vector;
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var i = __getitem__ (__iterable0__, __index0__);
			__call__ (__accu0__.append, __accu0__, __call__ (round, null, i, n));
		}
		return __accu0__;
	}) ();
	return vector.__class__ (...vec);
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
	var shape = shapes.make_cube (0.5);
	var count = 2;
	var shape = shapes.rotate_left (shape);
	var shape = shapes.rotate_up (shape);
	divide_cube (shape, count);
	var program = select_shaders (gl, 'vertex-shader', 'fragment-shader');
	var colorLoc = gl.getUniformLocation (program, 'color');
	var i = 0;
	var sides = 6;
	while (i < sides) {
		var vertices = points.__getslice__ ((i * len (points)) / sides, ((i + 1) * len (points)) / sides, 1);
		gl.uniform4fv (colorLoc, flatten (BaseColors [i]));
		render (gl, program, gl.TRIANGLES, vertices);
		i++;
	}
};
export var render = function (gl, program, mode, vertices) {
	var vPositionLoc = gl.getAttribLocation (program, 'vPosition');
	var bufferId = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, bufferId);
	gl.bufferData (gl.ARRAY_BUFFER, flatten (vertices), gl.STATIC_DRAW);
	gl.enableVertexAttribArray (vPositionLoc);
	gl.vertexAttribPointer (vPositionLoc, 3, gl.FLOAT, false, 0, 0);
	gl.drawArrays (mode, 0, len (vertices));
};
export var clear_canvas = function (gl) {
	gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
	gl.enable (gl.DEPTH_TEST);
	return gl;
};
window.onload = main_draw;

//# sourceMappingURL=main.map
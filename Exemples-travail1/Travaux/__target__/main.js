// Transcrypt'ed from Python, 2018-09-13 03:08:25
var py_vector = {};
var shapes = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_shapes__ from './shapes.js';
__nest__ (shapes, '', __module_shapes__);
import * as __module_py_vector__ from './py_vector.js';
__nest__ (py_vector, '', __module_py_vector__);
var __name__ = '__main__';
/*
#comment
*/
export var gl = null;
export var program = null;
export var colorLoc = null;
export var points = list ([]);
export var worker_count = 0;
export var worker_points = list ([]);
export var BaseColors = list ([vec4 (0.0, 0.0, 0.0, 1.0), vec4 (1.0, 0.0, 0.0, 1.0), vec4 (1.0, 1.0, 0.0, 1.0), vec4 (0.0, 1.0, 0.0, 1.0), vec4 (0.0, 0.0, 1.0, 1.0), vec4 (1.0, 0.0, 1.0, 1.0), vec4 (0.0, 1.0, 1.0, 1.0), vec4 (1.0, 1.0, 1.0, 1.0)]);

function getScriptPath(foo){ return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]],{type:'text/javascript'})); }


//Converts an iterable object into a bare js array
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

//This is the main function
export var main_draw = function () {
	gl = init_webgl_inst ();
	clear_canvas (gl);
	var shape = shapes.make_square (0.5);
	var count = 4;
	points = shapes.divide_square (shape, count);
	var vertices = (function () {
		var __accu0__ = [];
		for (var vec of points) {
			__accu0__.append (js_array (vec));
		}
		return __accu0__;
	}) ();
	program = select_shaders (gl, 'vertex-shader2', 'fragment-shader2');
	render (gl, program, gl.TRIANGLES, vertices);
	return ;
	var cube = shape;
	var cube_faces = list ([cube.__getslice__ (0, 4, 1), cube.__getslice__ (4, null, 1), list ([cube [0], cube [1], cube [5], cube [4]]), list ([cube [2], cube [3], cube [7], cube [6]]), list ([cube [0], cube [3], cube [7], cube [4]]), list ([cube [1], cube [2], cube [6], cube [5]])]);
	for (var face of cube_faces) {
		launch_worker (face, count);
	}
};

//JS worker that recursively divide a cube's face in 8 parts, count times.
//Six workers are used, the last worker calls the render function.
export var launch_worker = function (shape, count) {
	var worker_receive = function (e) {
		worker_points.append (e.data [0]);
		worker_count++;
		if (worker_count === 6) {
			worker_render ();
		}
	};
	var worker1 = new Worker ('worker.js');
	var shape = (function () {
		var __accu0__ = [];
		for (var vec of shape) {
			__accu0__.append (js_array (vec));
		}
		return __accu0__;
	}) ();
	worker1.onmessage = worker_receive;
	worker1.postMessage (list ([shape, count]));
};

//Render function called by the final worker
export var worker_render = function () {
	var pMatrix = ortho (-(1.0), 1.0, -(1.0), 1.0, -(1.0), 1.0);
	var projectionLoc = gl.getUniformLocation (program, 'projection');
	gl.uniformMatrix4fv (projectionLoc, false, flatten (pMatrix));
	var i = 0;
	for (var p of worker_points) {
		var colorLoc = gl.getUniformLocation (program, 'color');
		gl.uniform4fv (colorLoc, flatten (BaseColors [i]));
		render (gl, program, gl.TRIANGLES, p);
		i++;
	}
};

//Render function using WebGL
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

//# sourceMappingURL=main.map
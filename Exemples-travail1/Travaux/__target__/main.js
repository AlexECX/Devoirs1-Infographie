// Transcrypt'ed from Python, 2018-09-20 13:33:04
var shapes = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_shapes__ from './shapes.js';
__nest__ (shapes, '', __module_shapes__);
import {Vector3D} from './py_vector.js';
var __name__ = '__main__';
/*
The main module: 
- Will setup WebGL.
- Launch JS Workers to recursively divide each faces of an object.
- The last worker calls a render function. It will render each faces 
  using the appropriate subset of points/vectors, with different colors. 
*/
export var gl = null;
export var program = null;
//2D or 3D dimension
export var render_D = null;
export var worker_count = 0;
export var worker_points = list ([]);
export var BaseColors = list ([vec4 (0.0, 0.0, 0.0, 1.0), vec4 (1.0, 0.0, 0.0, 1.0), vec4 (1.0, 1.0, 0.0, 1.0), vec4 (0.0, 1.0, 0.0, 1.0), vec4 (0.0, 0.0, 1.0, 1.0), vec4 (1.0, 0.0, 1.0, 1.0), vec4 (0.0, 1.0, 1.0, 1.0), vec4 (1.0, 1.0, 1.0, 1.0)]);

//This is the main 2D function, using a square of 2D vectors
export var draw_Sierpinski_Carpet_2D_C = function () {
	render_D = 2;
	gl = init_webgl_inst ();
	clear_canvas (gl);
	program = select_shaders (gl, 'vertex-shader2', 'fragment-shader');
	var shape = shapes.make_square2D (0.5);
	var count = 4;
	launch_worker (shape, count, 1);
};

//This is the main 2D function, using a square of 3D vectors
export var draw_Sierpinski_Carpet_2D_D = function () {
	render_D = 3;
	gl = init_webgl_inst ();
	clear_canvas (gl);
	program = select_shaders (gl, 'vertex-shader2', 'fragment-shader');
	var shape = shapes.make_square (0.5);
	var count = 4;
	launch_worker (shape, count, 1);
};

//This is the main 3D function
export var draw_Sierpinski_Carpet_3D_E = function () {
	render_D = 3;
	gl = init_webgl_inst ();
	clear_canvas (gl);
	program = select_shaders (gl, 'vertex-shader', 'fragment-shader');
	var shape = shapes.make_cube (0.5);
	var count = 4;
	for (var face of shape) {
		launch_worker (face, count, 6);
	}
};

//JS worker that recursively divide a cube's face in 8 parts, count times.
//Six workers are used, the last worker calls the render function.
export var launch_worker = function (shape, count, last_worker) {
	var worker_receive = function (e) {
		worker_points.append (e.data [0]);
		worker_count++;
		if (worker_count === last_worker) {
			worker_render ();
		}
	};
	var worker1 = new Worker ('./__target__/worker.js');
	var shape = js_list (shape);
	worker1.onmessage = worker_receive;
	worker1.postMessage (list ([shape, count]));
};

//Function called by the final worker
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
	gl.vertexAttribPointer (vPositionLoc, render_D, gl.FLOAT, false, 0, 0);
	gl.drawArrays (mode, 0, len (vertices));
};

//Clears the canva
export var clear_canvas = function (gl) {
	gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

//Get the desired shader and return a program instance
export var select_shaders = function (gl) {
	var args = tuple ([].slice.apply (arguments).slice (1));
	var program = initShaders (gl, ...args);
	gl.useProgram (program);
	return program;
};

//Initialise WebGL
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

//Recursively converts an iterable implementing __iter__, and all __iter__
//objects it contains, into bare list objects
export var js_list = function (iterable) {
	if (hasattr (iterable, '__iter__')) {
		return (function () {
			var __accu0__ = [];
			var __iterable0__ = iterable;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var i = __getitem__ (__iterable0__, __index0__);
				__call__ (__accu0__.append, __accu0__, __call__ (js_list, null, i));
			}
			return __accu0__;
		}) ();
	}
	else {
		return iterable;
	}
};

//function getScriptPath(foo){ return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]],{type:'text/javascript'})); }


//# sourceMappingURL=main.map
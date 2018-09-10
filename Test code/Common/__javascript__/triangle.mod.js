	(function () {
		var __name__ = '__main__';
		tuple ([__pragma__, document, window, WebGLUtils, vec2, alert, initShaders]);
		var Vector2D = __init__ (__world__.vector).Vector2D;
		var gl = null;
		var points = null;
		var render = function () {
			gl.clear (gl.COLOR_BUFFER_BIT);
			gl.drawArrays (gl.Lines, 0, 4);
		};
		var init = function () {
			var canvas = document.getElementById ('gl-canvas');
			gl = WebGLUtils.setupWebGL (canvas);
			if (!(gl)) {
				alert ("WebGL isn't available");
			}
			var vertices = list ([Vector2D (-(1), -(1)).as_list (), Vector2D (1, 1).as_list (), Vector2D (1, -(1)).as_list (), Vector2D (-(1), 1).as_list ()]);
			gl.viewport (0, 0, canvas.width, canvas.height);
			gl.clearColor (1.0, 1.0, 1.0, 1.0);
			var program = initShaders (gl, 'vertex-shader', 'fragment-shader');
			gl.useProgram (program);
			var vPositionLoc = gl.getAttribLocation (program, 'vPosition');
			var bufferId = gl.createBuffer ();
			gl.bindBuffer (gl.ARRAY_BUFFER, bufferId);
			gl.bufferData (gl.ARRAY_BUFFER, flatten (vertices), gl.STATIC_DRAW);
			gl.enableVertexAttribArray (vPositionLoc);
			gl.vertexAttribPointer (vPositionLoc, 2, gl.FLOAT, false, 0, 0);
			render ();
		};
		window.onload = init;
		__pragma__ ('<use>' +
			'vector' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Vector2D = Vector2D;
			__all__.__name__ = __name__;
			__all__.gl = gl;
			__all__.init = init;
			__all__.points = points;
			__all__.render = render;
		__pragma__ ('</all>')
	}) ();

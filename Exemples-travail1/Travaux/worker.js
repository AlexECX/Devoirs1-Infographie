// Transcrypt'ed from Python, 2018-09-12 09:59:23
var __name__ = 'worker';
importScripts('../Common/MV.js')

var points = []

var divide_square = function (sq, count) {
	if (count === 0) {
		points.push (...sq.slice (0, 3, 1));
		points.push (...sq.slice (1, 4, 1));
		points.push (...[sq [2], sq [3], sq [0]]);
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
		divide_square ([sq [0], ab, ac, ad], count);
		divide_square ([ba, sq [1], bc, bd], count);
		divide_square ([ca, cb, sq [2], cd], count);
		divide_square ([da, db, dc, sq [3]], count);
		divide_square ([ab, ba, bd, ac], count);
		divide_square ([bd, bc, cb, ca], count);
		divide_square ([db, ca, cd, dc], count);
		divide_square ([ad, ac, db, da], count);
	}
};
var worker_func = function (e) {
	    
	//console.log (e.data);
	var shape = e.data [0];
	var count = e.data [1];
	divide_square (shape, count);
    self.postMessage ([points]);
	self.close ();
};
self.onmessage = worker_func;

//# sourceMappingURL=worker.map
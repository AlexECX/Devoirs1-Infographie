	__nest__ (
		__all__,
		'vector', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'vector';
					var Vector = __class__ ('Vector', [object], {
						__module__: __name__,
						coordinates: list ([]),
						normalized: false,
						get __init__ () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							self.coordinates = (function () {
								var __accu0__ = [];
								var __iterable0__ = args;
								for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
									var i = __iterable0__ [__index0__];
									__accu0__.append (float (i));
								}
								return __accu0__;
							}) ();
						});},
						get __str__ () {return __get__ (this, function (self) {
							return '{}{}'.format (self.__class__.__name__, self.coordinates);
						});},
						get __repr__ () {return __get__ (this, function (self) {
							return '{}{}'.format (self.__class__.__name__, self.coordinates);
						});},
						get __getitem__ () {return __get__ (this, function (self, item) {
							return self.coordinates [item];
						});},
						get __len__ () {return __get__ (this, function (self) {
							return len (self.coordinates);
						});},
						get __add__ () {return __get__ (this, function (self, vector) {
							var result = (function () {
								var __accu0__ = [];
								for (var i = 0; i < len (self.coordinates); i++) {
									__accu0__.append (self.coordinates [i] + vector [i]);
								}
								return __accu0__;
							}) ();
							return self.__class__.apply (null, result);
						});},
						get __radd__ () {return __get__ (this, function (self, vector) {
							var result = (function () {
								var __accu0__ = [];
								for (var i = 0; i < len (self.coordinates); i++) {
									__accu0__.append (self.coordinates [i] + vector [i]);
								}
								return __accu0__;
							}) ();
							return self.__class__.apply (null, result);
						});},
						get __iadd__ () {return __get__ (this, function (self, vector) {
							for (var i = 0; i < len (self.coordinates); i++) {
								self.coordinates [i] += vector [i];
							}
							return self;
						});},
						get __sub__ () {return __get__ (this, function (self, vector) {
							var result = (function () {
								var __accu0__ = [];
								for (var i = 0; i < len (self.coordinates); i++) {
									__accu0__.append (self.coordinates [i] - vector [i]);
								}
								return __accu0__;
							}) ();
							return self.__class__.apply (null, result);
						});},
						get __rsub__ () {return __get__ (this, function (self, vector) {
							var result = (function () {
								var __accu0__ = [];
								for (var i = 0; i < len (self.coordinates); i++) {
									__accu0__.append (self.coordinates [i] - vector [i]);
								}
								return __accu0__;
							}) ();
							return self.__class__.apply (null, result);
						});},
						get __isub__ () {return __get__ (this, function (self, vector) {
							for (var i = 0; i < len (self.coordinates); i++) {
								self.coordinates [i] -= vector [i];
							}
							return self;
						});},
						get lenght_vec () {return __get__ (this, function (self) {
							var sqrt_components = 0;
							var __iterable0__ = self.coordinates;
							for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
								var coord = __iterable0__ [__index0__];
								sqrt_components += coord * coord;
							}
							return Math.pow (sqrt_components, 0.5);
						});},
						get normalize () {return __get__ (this, function (self) {
							if (!(self.normalized)) {
								var __iterable0__ = enumerate (self.coordinates);
								for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
									var __left0__ = __iterable0__ [__index0__];
									var i = __left0__ [0];
									var coord = __left0__ [1];
									self.coordinates [i] = coord / self.lenght_vec ();
								}
								self.normalized = true;
							}
							return self;
						});},
						get dot_product () {return __getcm__ (this, function (cls, vector1, vector2) {
							var dot = 0;
							var vec1 = cls.apply (null, vector1);
							var vec2 = cls.apply (null, vector2);
							vec1.normalize ();
							vec2.normalize ();
							for (var i = 0; i < len (vec1); i++) {
								dot += vec1 [i] * vec2 [i];
							}
							return dot;
						});},
						get as_list () {return __get__ (this, function (self) {
							return self.coordinates.__getslice__ (0, null, 1);
						});}
					});
					var Vector2D = __class__ ('Vector2D', [Vector], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							__super__ (Vector2D, '__init__').apply (null, [self].concat (args));
							while (len (self.coordinates) < 2) {
								self.coordinates.append (0.0);
							}
							self.coordinates = self.coordinates.__getslice__ (0, 2, 1);
						});}
					});
					var Vector3D = __class__ ('Vector3D', [Vector], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							__super__ (Vector3D, '__init__').apply (null, [self].concat (args));
							while (len (self.coordinates) < 3) {
								self.coordinates.append (0.0);
							}
							self.coordinates = self.coordinates.__getslice__ (0, 3, 1);
						});},
						get cross_product () {return __getcm__ (this, function (cls, vec1, vec2) {
							var vector1 = cls.apply (null, vec1);
							var vector2 = cls.apply (null, vec2);
							return cls (vector1 [1] * vector2 [2] - vector1 [2] * vector2 [2], vector1 [2] * vector2 [0] - vector1 [0] * vector2 [2], vector1 [0] * vector2 [1] - vector1 [1] * vector2 [0]);
						});}
					});
					__pragma__ ('<all>')
						__all__.Vector = Vector;
						__all__.Vector2D = Vector2D;
						__all__.Vector3D = Vector3D;
						__all__.__name__ = __name__;
					__pragma__ ('</all>')
				}
			}
		}
	);

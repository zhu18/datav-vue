!
function(e, t) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		var n = t();
		for (var o in n)("object" == typeof exports ? exports: e)[o] = n[o]
	}
} ("undefined" != typeof self ? self: this,
function() {
	return webpackJsonp([2], {
		Aoxt: function(e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var o = n("Zrlr"),
			i = n.n(o),
			r = n("wxAW"),
			c = n.n(r),
			f = n("xR0d"),
			u = n.n(f),
			a = {
				run: function(e) {
					console.log("run pie..."),
					this.chart = u.a.init({
						id: e.chartId,
						container: e.contentId
					})
				}
			},
			s = {
				run: function(e) {
					console.log("run line..."),
					this.chart = u.a.init({
						id: e.chartId,
						container: e.contentId
					})
				}
			},
			l = function() {
				function e() {
					i()(this, e)
				}
				return c()(e, null, [{
					key: "init",
					value: function(e) {
						e.parts.forEach(function(e) {
							switch (e.type.toLowerCase()) {
							case "partchartpie":
								a.run(e);
								break;
							case "partchartline":
								s.run(e)
							}
						})
					}
				}]),
				e
			} ();
			t.
		default = l
		}
	},
	["Aoxt"])
}); //# sourceMappingURL=all.ed58c7163e3a27687f91.js.map


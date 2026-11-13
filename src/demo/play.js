import { A as e, C as t, D as n, E as r, F as i, I as a, M as o, N as s, O as c, P as l, S as u, T as d, _ as f, a as p, b as m, c as h, d as g, f as _, g as v, h as y, i as b, j as x, k as S, l as C, m as w, p as ee, r as te, s as ne, t as re, u as ie, v as T, w as ae, x as E, y as oe } from "./play-C3BMHzyV.js";
import { i as se, n as ce, r as le, t as ue } from "./play-0uCLndnB.js";
// node_modules/scheduler/cjs/scheduler.production.js
var de = /* @__PURE__ */ le(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, re());
			else {
				var t = n(l);
				t !== null && ae(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function ne() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && te());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ae(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? re() : S = !1;
			}
		}
	}
	var re;
	if (typeof y == "function") re = function() {
		y(ne);
	};
	else if (typeof MessageChannel < "u") {
		var ie = new MessageChannel(), T = ie.port2;
		ie.port1.onmessage = ne, re = function() {
			T.postMessage(null);
		};
	} else re = function() {
		_(ne, 0);
	};
	function ae(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ae(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, re()))), r;
	}, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), fe = /* @__PURE__ */ le(((e, t) => {
	t.exports = de();
})), pe = /* @__PURE__ */ le(((e) => {
	var t = fe(), n = ce(), r = ue();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function f(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && f(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function p(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function m(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function h(e) {
		var t = [null, null], n = p(e);
		return n === null || g(t, e, n.child, { foundSelf: !1 }), t;
	}
	function g(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && g(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function _(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var v = null, y = null;
	function b(e, t, n) {
		return e === n || e === t && (v = e, !0);
	}
	function x(e, t, n) {
		return e === n ? (y = e, !1) : e === t && (y !== null && (v = e), !0);
	}
	function S(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function C(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var w = Object.assign, ee = Symbol.for("react.element"), te = Symbol.for("react.transitional.element"), ne = Symbol.for("react.portal"), re = Symbol.for("react.fragment"), ie = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), ae = Symbol.for("react.consumer"), E = Symbol.for("react.context"), oe = Symbol.for("react.forward_ref"), se = Symbol.for("react.suspense"), le = Symbol.for("react.suspense_list"), de = Symbol.for("react.memo"), pe = Symbol.for("react.lazy"), me = Symbol.for("react.activity"), he = Symbol.for("react.legacy_hidden"), ge = Symbol.for("react.memo_cache_sentinel"), _e = Symbol.for("react.view_transition"), ve = Symbol.for("react.recoverable"), ye = Symbol.iterator;
	function be(e) {
		return typeof e != "object" || !e ? null : (e = ye && e[ye] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var xe = Symbol.for("react.client.reference");
	function Se(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === xe ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case re: return "Fragment";
			case T: return "Profiler";
			case ie: return "StrictMode";
			case se: return "Suspense";
			case le: return "SuspenseList";
			case me: return "Activity";
			case _e: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case ne: return "Portal";
			case E: return e.displayName || "Context";
			case ae: return (e._context.displayName || "Context") + ".Consumer";
			case oe:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case de: return t = e.displayName || null, t === null ? Se(e.type) || "Memo" : t;
			case pe:
				t = e._payload, e = e._init;
				try {
					return Se(e(t));
				} catch {}
		}
		return null;
	}
	var Ce = Array.isArray, D = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, we = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, Te = [], Ee = -1;
	function De(e) {
		return { current: e };
	}
	function k(e) {
		0 > Ee || (e.current = Te[Ee], Te[Ee] = null, Ee--);
	}
	function A(e, t) {
		Ee++, Te[Ee] = e.current, e.current = t;
	}
	var Oe = De(null), ke = De(null), Ae = De(null), je = De(null);
	function Me(e, t) {
		switch (A(Ae, t), A(ke, e), A(Oe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		k(Oe), A(Oe, e);
	}
	function Ne() {
		k(Oe), k(ke), k(Ae);
	}
	function Pe(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, A(je, e)), t = Oe.current;
		var n = dp(t, e.type);
		t !== n && (A(ke, e), A(Oe, n));
	}
	function Fe(e) {
		ke.current === e && (k(Oe), k(ke)), je.current === e && (k(je), sh._currentValue = we);
	}
	var Ie, Le;
	function Re(e) {
		if (Ie === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ie = t && t[1] || "", Le = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ie + e + Le;
	}
	var ze = !1;
	function Be(e, t) {
		if (!e || ze) return "";
		ze = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			ze = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Re(n) : "";
	}
	function Ve(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Re(e.type);
			case 16: return Re("Lazy");
			case 13: return e.child !== t && t !== null ? Re("Suspense Fallback") : Re("Suspense");
			case 19: return Re("SuspenseList");
			case 0:
			case 15: return Be(e.type, !1);
			case 11: return Be(e.type.render, !1);
			case 1: return Be(e.type, !0);
			case 31: return Re("Activity");
			case 30: return Re("ViewTransition");
			default: return "";
		}
	}
	function He(e) {
		try {
			var t = "", n = null;
			do
				t += Ve(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ue = Object.prototype.hasOwnProperty, We = t.unstable_scheduleCallback, Ge = t.unstable_cancelCallback, Ke = t.unstable_shouldYield, qe = t.unstable_requestPaint, Je = t.unstable_now, Ye = t.unstable_getCurrentPriorityLevel, Xe = t.unstable_ImmediatePriority, Ze = t.unstable_UserBlockingPriority, Qe = t.unstable_NormalPriority, $e = t.unstable_LowPriority, et = t.unstable_IdlePriority, tt = t.log, nt = t.unstable_setDisableYieldValue, rt = null, it = null;
	function at(e) {
		if (typeof tt == "function" && nt(e), it && typeof it.setStrictMode == "function") try {
			it.setStrictMode(rt, e);
		} catch {}
	}
	var ot = Math.clz32 ? Math.clz32 : lt, st = Math.log, ct = Math.LN2;
	function lt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (st(e) / ct | 0) | 0;
	}
	var ut = 256, dt = 262144, ft = 4194304;
	function pt(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function mt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = pt(n))) : i = pt(o) : i = pt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = pt(n))) : i = pt(o)) : i = pt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ht(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function gt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - ot(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function _t(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function vt() {
		var e = ft;
		return ft <<= 1, !(ft & 62914560) && (ft = 4194304), e;
	}
	function yt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function bt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function xt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - ot(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && St(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function St(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - ot(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Ct(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - ot(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function wt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Tt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Tt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function Et(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Dt() {
		var e = O.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function Ot(e, t) {
		var n = O.p;
		try {
			return O.p = e, t();
		} finally {
			O.p = n;
		}
	}
	var kt = Math.random().toString(36).slice(2), At = "__reactFiber$" + kt, jt = "__reactProps$" + kt, Mt = "__reactContainer$" + kt, j = "__reactEvents$" + kt, Nt = "__reactListeners$" + kt, Pt = "__reactHandles$" + kt, Ft = "__reactResources$" + kt, It = "__reactMarker$" + kt, Lt = "__reactLoad$" + kt;
	function Rt(e) {
		delete e[At], delete e[jt], delete e[Nt], delete e[Pt];
	}
	function zt(e) {
		var t;
		if (t = e[At]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Mt] || n[At]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[At]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Bt(e) {
		if (e = e[At] || e[Mt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Vt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Ht(e) {
		var t = e[Ft];
		return t ||= e[Ft] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ut(e) {
		e[It] = !0;
	}
	function Wt(e) {
		e[Lt] = void 0;
	}
	var Gt = /* @__PURE__ */ new Set(), Kt = {};
	function qt(e, t) {
		Jt(e, t), Jt(e + "Capture", t);
	}
	function Jt(e, t) {
		for (Kt[e] = t, e = 0; e < t.length; e++) Gt.add(t[e]);
	}
	var Yt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Xt = {}, Zt = {};
	function Qt(e) {
		return Ue.call(Zt, e) ? !0 : Ue.call(Xt, e) ? !1 : Yt.test(e) ? Zt[e] = !0 : (Xt[e] = !0, !1);
	}
	var M = !1;
	function $t() {
		var e = M;
		return M = !1, e;
	}
	function en(e, t, n) {
		if (Qt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function tn(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function nn(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function rn(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function an(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function on(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function sn(e) {
		if (!e._valueTracker) {
			var t = an(e) ? "checked" : "value";
			e._valueTracker = on(e, t, "" + e[t]);
		}
	}
	function cn(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = an(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var ln = /[\n"\\]/g;
	function un(e) {
		return e.replace(ln, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function dn(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + rn(t)) : e.value !== "" + rn(t) && (e.value = "" + rn(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : pn(e, rn(n)) : o === "number" && e.value == t ? pn(e, rn(e.value)) : pn(e, rn(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + rn(s) : e.removeAttribute("name");
	}
	function fn(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				sn(e);
				return;
			}
			n = n == null ? "" : "" + rn(n), t = t == null ? n : "" + rn(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), sn(e);
	}
	function pn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function mn(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + rn(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function hn(e, t, n) {
		t != null && (t = "" + rn(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + rn(n);
	}
	function gn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (Ce(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = rn(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), sn(e);
	}
	function _n(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var vn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function yn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || vn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function bn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", M = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (yn(e, a, r), M = !0);
		} else for (var o in t) t.hasOwnProperty(o) && yn(e, o, t[o]);
	}
	function xn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Sn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Cn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function wn(e) {
		return Cn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Tn() {}
	var En = null;
	function Dn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var On = null, kn = null;
	function An(e) {
		var t = Bt(e);
		if (t && (e = t.stateNode)) {
			var n = e[jt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (dn(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + un("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[jt] || null;
								if (!a) throw Error(i(90));
								dn(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && cn(r);
					}
					break a;
				case "textarea":
					hn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && mn(e, !!n.multiple, t, !1);
			}
		}
	}
	var jn = !1;
	function Mn(e, t, n) {
		if (jn) return e(t, n);
		jn = !0;
		try {
			return e(t);
		} finally {
			if (jn = !1, (On !== null || kn !== null) && (zd(), On && (t = On, e = kn, kn = On = null, An(t), e))) for (t = 0; t < e.length; t++) An(e[t]);
		}
	}
	function Nn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[jt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var Pn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Fn = !1;
	if (Pn) try {
		var In = {};
		Object.defineProperty(In, "passive", { get: function() {
			Fn = !0;
		} }), window.addEventListener("test", In, In), window.removeEventListener("test", In, In);
	} catch {
		Fn = !1;
	}
	var Ln = null, Rn = null, zn = null;
	function Bn() {
		if (zn) return zn;
		var e, t = Rn, n = t.length, r, i = "value" in Ln ? Ln.value : Ln.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return zn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Vn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Hn() {
		return !0;
	}
	function Un() {
		return !1;
	}
	function Wn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Hn : Un, this.isPropagationStopped = Un, this;
		}
		return w(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Hn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Hn);
			},
			persist: function() {},
			isPersistent: Hn
		}), t;
	}
	var Gn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Kn = Wn(Gn), qn = w({}, Gn, {
		view: 0,
		detail: 0
	}), Jn = Wn(qn), Yn, Xn, Zn, Qn = w({}, qn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: lr,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Zn && (Zn && e.type === "mousemove" ? (Yn = e.screenX - Zn.screenX, Xn = e.screenY - Zn.screenY) : Xn = Yn = 0, Zn = e), Yn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Xn;
		}
	}), $n = Wn(Qn), er = Wn(w({}, Qn, { dataTransfer: 0 })), tr = Wn(w({}, qn, { relatedTarget: 0 })), nr = Wn(w({}, Gn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), rr = Wn(w({}, Gn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), ir = Wn(w({}, Gn, { data: 0 })), ar = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, or = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, sr = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function cr(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = sr[e]) ? !!t[e] : !1;
	}
	function lr() {
		return cr;
	}
	var ur = Wn(w({}, qn, {
		key: function(e) {
			if (e.key) {
				var t = ar[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Vn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? or[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: lr,
		charCode: function(e) {
			return e.type === "keypress" ? Vn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Vn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), dr = Wn(w({}, Qn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), fr = Wn(w({}, Gn, { submitter: 0 })), pr = Wn(w({}, qn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: lr
	})), mr = Wn(w({}, Gn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), hr = Wn(w({}, Qn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), gr = Wn(w({}, Gn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), _r = [
		9,
		13,
		27,
		32
	], vr = Pn && "CompositionEvent" in window, yr = null;
	Pn && "documentMode" in document && (yr = document.documentMode);
	var br = Pn && "TextEvent" in window && !yr, xr = Pn && (!vr || yr && 8 < yr && 11 >= yr), Sr = " ", Cr = !1;
	function wr(e, t) {
		switch (e) {
			case "keyup": return _r.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Tr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Er = !1;
	function Dr(e, t) {
		switch (e) {
			case "compositionend": return Tr(t);
			case "keypress": return t.which === 32 ? (Cr = !0, Sr) : null;
			case "textInput": return e = t.data, e === Sr && Cr ? null : e;
			default: return null;
		}
	}
	function Or(e, t) {
		if (Er) return e === "compositionend" || !vr && wr(e, t) ? (e = Bn(), zn = Rn = Ln = null, Er = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return xr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var kr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Ar(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!kr[e.type] : t === "textarea";
	}
	function jr(e, t, n, r) {
		On ? kn ? kn.push(r) : kn = [r] : On = r, t = Jf(t, "onChange"), 0 < t.length && (n = new Kn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Mr = null, Nr = null;
	function Pr(e) {
		Vf(e, 0);
	}
	function Fr(e) {
		if (cn(Vt(e))) return e;
	}
	function Ir(e, t) {
		if (e === "change") return t;
	}
	var Lr = !1;
	if (Pn) {
		var Rr;
		if (Pn) {
			var zr = "oninput" in document;
			if (!zr) {
				var Br = document.createElement("div");
				Br.setAttribute("oninput", "return;"), zr = typeof Br.oninput == "function";
			}
			Rr = zr;
		} else Rr = !1;
		Lr = Rr && (!document.documentMode || 9 < document.documentMode);
	}
	function Vr() {
		Mr && (Mr.detachEvent("onpropertychange", Hr), Nr = Mr = null);
	}
	function Hr(e) {
		if (e.propertyName === "value" && Fr(Nr)) {
			var t = [];
			jr(t, Nr, e, Dn(e)), Mn(Pr, t);
		}
	}
	function Ur(e, t, n) {
		e === "focusin" ? (Vr(), Mr = t, Nr = n, Mr.attachEvent("onpropertychange", Hr)) : e === "focusout" && Vr();
	}
	function Wr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Fr(Nr);
	}
	function Gr(e, t) {
		if (e === "click") return Fr(t);
	}
	function Kr(e, t) {
		if (e === "input" || e === "change") return Fr(t);
	}
	function qr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Jr = typeof Object.is == "function" ? Object.is : qr;
	function Yr(e, t) {
		if (Jr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ue.call(t, i) || !Jr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Xr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Zr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Qr(e, t) {
		var n = Zr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Zr(n);
		}
	}
	function $r(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? $r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function ei(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Xr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Xr(e.document);
		}
		return t;
	}
	function ti(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var ni = Pn && "documentMode" in document && 11 >= document.documentMode, ri = null, ii = null, ai = null, oi = !1;
	function si(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		oi || ri == null || ri !== Xr(r) || (r = ri, "selectionStart" in r && ti(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ai && Yr(ai, r) || (ai = r, r = Jf(ii, "onSelect"), 0 < r.length && (t = new Kn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = ri)));
	}
	function ci(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var li = {
		animationend: ci("Animation", "AnimationEnd"),
		animationiteration: ci("Animation", "AnimationIteration"),
		animationstart: ci("Animation", "AnimationStart"),
		transitionrun: ci("Transition", "TransitionRun"),
		transitionstart: ci("Transition", "TransitionStart"),
		transitioncancel: ci("Transition", "TransitionCancel"),
		transitionend: ci("Transition", "TransitionEnd")
	}, ui = {}, di = {};
	Pn && (di = document.createElement("div").style, "AnimationEvent" in window || (delete li.animationend.animation, delete li.animationiteration.animation, delete li.animationstart.animation), "TransitionEvent" in window || delete li.transitionend.transition);
	function fi(e) {
		if (ui[e]) return ui[e];
		if (!li[e]) return e;
		var t = li[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in di) return ui[e] = t[n];
		return e;
	}
	var pi = fi("animationend"), mi = fi("animationiteration"), hi = fi("animationstart"), gi = fi("transitionrun"), _i = fi("transitionstart"), vi = fi("transitioncancel"), yi = fi("transitionend"), bi = /* @__PURE__ */ new Map(), xi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	xi.push("scrollEnd");
	function Si(e, t) {
		bi.set(e, t), qt(t, [e]);
	}
	var Ci = 0;
	function wi(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = bd.identifierPrefix;
		var n = Ci++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function Ti(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Od;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function Ei(e, t) {
		return e = Ti(e), t = Ti(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var Di = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Oi = [], ki = 0, Ai = 0;
	function ji() {
		for (var e = ki, t = Ai = ki = 0; t < e;) {
			var n = Oi[t];
			Oi[t++] = null;
			var r = Oi[t];
			Oi[t++] = null;
			var i = Oi[t];
			Oi[t++] = null;
			var a = Oi[t];
			if (Oi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Fi(n, i, a);
		}
	}
	function Mi(e, t, n, r) {
		Oi[ki++] = e, Oi[ki++] = t, Oi[ki++] = n, Oi[ki++] = r, Ai |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Ni(e, t, n, r) {
		return Mi(e, t, n, r), Ii(e);
	}
	function Pi(e, t) {
		return Mi(e, null, null, t), Ii(e);
	}
	function Fi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - ot(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Ii(e) {
		if (50 < kd) throw kd = 0, Ad = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Li = {};
	function Ri(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function zi(e, t, n, r) {
		return new Ri(e, t, n, r);
	}
	function Bi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Vi(e, t) {
		var n = e.alternate;
		return n === null ? (n = zi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Hi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ui(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Bi(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, Oe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case me: return e = zi(31, n, t, a), e.elementType = me, e.lanes = o, e;
			case re: return Wi(n.children, a, o, t);
			case ie:
				s = 8, a |= 24;
				break;
			case T: return e = zi(12, n, t, a | 2), e.elementType = T, e.lanes = o, e;
			case se: return e = zi(13, n, t, a), e.elementType = se, e.lanes = o, e;
			case le: return e = zi(19, n, t, a), e.elementType = le, e.lanes = o, e;
			case he:
			case _e: return e = a | 32, e = zi(30, n, t, e), e.elementType = _e, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case E:
						s = 10;
						break a;
					case ae:
						s = 9;
						break a;
					case oe:
						s = 11;
						break a;
					case de:
						s = 14;
						break a;
					case pe:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = zi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Wi(e, t, n, r) {
		return e = zi(7, e, r, t), e.lanes = n, e;
	}
	function Gi(e, t, n) {
		return e = zi(6, e, null, t), e.lanes = n, e;
	}
	function Ki(e) {
		var t = zi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function qi(e, t, n) {
		return t = zi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ji = /* @__PURE__ */ new WeakMap();
	function Yi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ji.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: He(t)
			}, Ji.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: He(t)
		};
	}
	var Xi = [], Zi = 0, Qi = null, $i = 0, ea = [], ta = 0, na = null, ra = 1, ia = "";
	function aa(e, t) {
		Xi[Zi++] = $i, Xi[Zi++] = Qi, Qi = e, $i = t;
	}
	function oa(e, t, n) {
		ea[ta++] = ra, ea[ta++] = ia, ea[ta++] = na, na = e;
		var r = ra;
		e = ia;
		var i = 32 - ot(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - ot(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ra = 1 << 32 - ot(t) + i | n << i | r, ia = a + e;
		} else ra = 1 << a | n << i | r, ia = e;
	}
	function sa(e) {
		e.return !== null && (aa(e, 1), oa(e, 1, 0));
	}
	function ca(e) {
		for (; e === Qi;) Qi = Xi[--Zi], Xi[Zi] = null, $i = Xi[--Zi], Xi[Zi] = null;
		for (; e === na;) na = ea[--ta], ea[ta] = null, ia = ea[--ta], ea[ta] = null, ra = ea[--ta], ea[ta] = null;
	}
	function la(e, t) {
		ea[ta++] = ra, ea[ta++] = ia, ea[ta++] = na, ra = t.id, ia = t.overflow, na = e;
	}
	var ua = null, N = null, P = !1, da = null, fa = !1, pa = Error(i(519));
	function ma(e) {
		throw ba(Yi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), pa;
	}
	function ha(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[At] = e, t[jt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < zf.length; n++) Q(zf[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), fn(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), gn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || ep(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = Tn), t = !0) : t = !1, t || ma(e, !0);
	}
	function ga(e) {
		for (ua = e.return; ua;) switch (ua.tag) {
			case 5:
			case 31:
			case 13:
				fa = !1;
				return;
			case 27:
			case 3:
				fa = !0;
				return;
			default: ua = ua.return;
		}
	}
	function _a(e) {
		if (e !== ua) return !1;
		if (!P) return ga(e), P = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && N && ma(e), ga(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			N = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			N = dm(e);
		} else t === 27 ? (t = N, Sp(e.type) ? (e = um, um = null, N = e) : N = t) : N = ua ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function va() {
		N = ua = null, P = !1;
	}
	function ya() {
		var e = da;
		return e !== null && (pd === null ? pd = e : pd.push.apply(pd, e), da = null), e;
	}
	function ba(e) {
		da === null ? da = [e] : da.push(e);
	}
	var xa = De(null), Sa = null, Ca = null;
	function wa(e, t, n) {
		A(xa, t._currentValue), t._currentValue = n;
	}
	function Ta(e) {
		e._currentValue = xa.current, k(xa);
	}
	function Ea(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Da(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ea(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ea(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Ea(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Oa(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Jr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === je.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && Da(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function ka(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Jr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Aa(e) {
		Sa = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ja(e) {
		return Na(Sa, e);
	}
	function Ma(e, t) {
		return Sa === null && Aa(e), Na(e, t);
	}
	function Na(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ca === null) {
			if (e === null) throw Error(i(308));
			Ca = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ca = Ca.next = t;
		return n;
	}
	var Pa = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Fa = t.unstable_scheduleCallback, Ia = t.unstable_NormalPriority, La = {
		$$typeof: E,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Ra() {
		return {
			controller: new Pa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function za(e) {
		e.refCount--, e.refCount === 0 && Fa(Ia, function() {
			e.controller.abort();
		});
	}
	function Ba(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Va = null;
	function Ha(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Ua = null, Wa = 0, Ga = 0, Ka = null;
	function qa(e, t) {
		if (Ua === null) {
			var n = Ua = [];
			Wa = 0, Ga = Pf(), Ka = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Wa++, t.then(Ja, Ja), t;
	}
	function Ja() {
		if (--Wa === 0 && (Va = null, Ua !== null)) {
			Ka !== null && (Ka.status = "fulfilled");
			var e = Ua;
			Ua = null, Ga = 0, Ka = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ya(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Xa = D.S;
	D.S = function(e, t) {
		if (gd = Je(), typeof t == "object" && t && typeof t.then == "function" && qa(e, t), Va !== null) for (var n = bf; n !== null;) Ba(n, Va), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = bf; r !== null;) Ba(r, n), r = r.next;
			if (Ga !== 0) {
				r = Va, r === null && (r = Va = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Xa !== null && Xa(e, t);
	};
	var Za = De(null);
	function Qa() {
		var e = Za.current;
		return e === null ? K.pooledCache : e;
	}
	function $a(e, t) {
		t === null ? A(Za, Za.current) : A(Za, t.pool);
	}
	function eo() {
		var e = Qa();
		return e === null ? null : {
			parent: La._currentValue,
			pool: e
		};
	}
	var to = Error(i(460)), no = Error(i(474)), ro = Error(i(542)), io = { then: function() {} };
	function ao(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function oo(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Tn, Tn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, co(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(Tn, Tn);
				else {
					if (e = K, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, co(e), e;
				}
				throw I = t, to;
		}
	}
	function F(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (I = e, to) : e;
		}
	}
	var I = null;
	function so() {
		if (I === null) throw Error(i(459));
		var e = I;
		return I = null, e;
	}
	function co(e) {
		if (e === to || e === ro) throw Error(i(483));
	}
	var L = null, lo = 0;
	function uo(e) {
		var t = lo;
		return lo += 1, L === null && (L = []), oo(L, e, t);
	}
	function fo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function po(e, t) {
		throw t.$$typeof === ee ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function mo(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Vi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Gi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === re ? (e = d(e, t, n.props.children, r, n.key), fo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === pe && F(i) === t.type) ? (t = a(t, n.props), fo(t, n), t.return = e, t) : (t = Ui(n.type, n.key, n.props, null, e.mode, r), fo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = qi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Wi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Gi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case te: return n = Ui(t.type, t.key, t.props, null, e.mode, n), fo(n, t), n.return = e, n;
					case ne: return t = qi(t, e.mode, n), t.return = e, t;
					case pe: return t = F(t), f(e, t, n);
				}
				if (Ce(t) || be(t)) return t = Wi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, uo(t), n);
				if (t.$$typeof === E) return f(e, Ma(e, t), n);
				po(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case te: return n.key === i ? l(e, t, n, r) : null;
					case ne: return n.key === i ? u(e, t, n, r) : null;
					case pe: return n = F(n), p(e, t, n, r);
				}
				if (Ce(n) || be(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, uo(n), r);
				if (n.$$typeof === E) return p(e, t, Ma(e, n), r);
				po(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case te: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case ne: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case pe: return r = F(r), m(e, t, n, r, i);
				}
				if (Ce(r) || be(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, uo(r), i);
				if (r.$$typeof === E) return m(e, t, n, Ma(t, r), i);
				po(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), P && aa(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return P && aa(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), P && aa(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), P && aa(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return P && aa(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), P && aa(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === re && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case te:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === re) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), fo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === pe && F(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), fo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === re ? (c = Wi(o.props.children, e.mode, c, o.key), fo(c, o), c.return = e, e = c) : (c = Ui(o.type, o.key, o.props, null, e.mode, c), fo(c, o), c.return = e, e = c);
						}
						return s(e);
					case ne:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = qi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case pe: return o = F(o), _(e, r, o, c);
				}
				if (Ce(o)) return h(e, r, o, c);
				if (be(o)) {
					if (l = be(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, uo(o), c);
				if (o.$$typeof === E) return _(e, r, Ma(e, o), c);
				po(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Gi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				lo = 0;
				var i = _(e, t, n, r);
				return L = null, i;
			} catch (t) {
				if (t === to || t === ro) throw t;
				var a = zi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ho = mo(!0), go = mo(!1), _o = !1;
	function vo(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function yo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function bo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function xo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Ii(e), Fi(e, null, n), t;
		}
		return Mi(e, r, t, n), Ii(e);
	}
	function So(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ct(e, n);
		}
	}
	function Co(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var wo = !1;
	function To() {
		if (wo) {
			var e = Ka;
			if (e !== null) throw e;
		}
	}
	function Eo(e, t, n, r) {
		wo = !1;
		var i = e.updateQueue;
		_o = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === Ga && (wo = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = w({}, d, f);
								break a;
							case 2: _o = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), sd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Do(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Oo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Do(n[e], t);
	}
	var ko = De(null), Ao = De(0);
	function jo(e, t) {
		e = ad, A(Ao, e), A(ko, t), ad = e | t.baseLanes;
	}
	function Mo() {
		A(Ao, ad), A(ko, ko.current);
	}
	function No() {
		ad = Ao.current, k(ko), k(Ao);
	}
	var Po = De(null), Fo = null;
	function Io(e) {
		var t = e.alternate;
		A(Vo, Vo.current & 1), A(Po, e), Fo === null && (t === null || ko.current !== null || t.memoizedState !== null) && (Fo = e);
	}
	function Lo(e) {
		A(Vo, Vo.current), A(Po, e), Fo === null && (Fo = e);
	}
	function Ro(e) {
		e.tag === 22 ? (A(Vo, Vo.current), A(Po, e), Fo === null && (Fo = e)) : zo();
	}
	function zo() {
		A(Vo, Vo.current), A(Po, Po.current);
	}
	function Bo(e) {
		k(Po), Fo === e && (Fo = null), k(Vo);
	}
	var Vo = De(0);
	function Ho(e, t) {
		A(Po, Po.current), A(Vo, t);
	}
	function Uo(e) {
		k(Vo), k(Po), Fo === e && (Fo = null);
	}
	function Wo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Go = 0, R = null, z = null, Ko = null, qo = !1, Jo = !1, Yo = !1, Xo = 0, Zo = 0, Qo = null, $o = 0;
	function B() {
		throw Error(i(321));
	}
	function es(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Jr(e[n], t[n])) return !1;
		return !0;
	}
	function ts(e, t, n, r, i, a) {
		return Go = a, R = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? _c : vc, Yo = !1, a = n(r, i), Yo = !1, Jo && (a = rs(t, n, r, i)), ns(e), a;
	}
	function ns(e) {
		D.H = gc;
		var t = z !== null && z.next !== null;
		if (Go = 0, Ko = z = R = null, qo = !1, Zo = 0, Qo = null, t) throw Error(i(300));
		e === null || Fc || (e = e.dependencies, e !== null && ka(e) && (Fc = !0));
	}
	function rs(e, t, n, r) {
		R = e;
		var a = 0;
		do {
			if (Jo && (Qo = null), Zo = 0, Jo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Ko = z = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			D.H = yc, o = t(n, r);
		} while (Jo);
		return o;
	}
	function is() {
		var e = D.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? us(t) : t, e = e.useState()[0], (z === null ? null : z.memoizedState) !== e && (R.flags |= 1024), t;
	}
	function as() {
		var e = Xo !== 0;
		return Xo = 0, e;
	}
	function os(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function ss(e) {
		if (qo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			qo = !1;
		}
		Go = 0, Ko = z = R = null, Jo = !1, Zo = Xo = 0, Qo = null;
	}
	function cs() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Ko === null ? R.memoizedState = Ko = e : Ko = Ko.next = e, Ko;
	}
	function ls() {
		if (z === null) {
			var e = R.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = z.next;
		var t = Ko === null ? R.memoizedState : Ko.next;
		if (t !== null) Ko = t, z = e;
		else {
			if (e === null) throw R.alternate === null ? Error(i(467)) : Error(i(310));
			z = e, e = {
				memoizedState: z.memoizedState,
				baseState: z.baseState,
				baseQueue: z.baseQueue,
				queue: z.queue,
				next: null
			}, Ko === null ? R.memoizedState = Ko = e : Ko = Ko.next = e;
		}
		return Ko;
	}
	function V() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function us(e) {
		var t = Zo;
		return Zo += 1, Qo === null && (Qo = []), e = oo(Qo, e, t), t = R, (Ko === null ? t.memoizedState : Ko.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? _c : vc), e;
	}
	function ds(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return us(e);
			if (e.$$typeof === ve) return;
			if (e.$$typeof === E) return ja(e);
		}
		throw Error(i(438, String(e)));
	}
	function fs(e) {
		var t = null, n = R.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = R.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = V(), R.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ge;
		return t.index++, n;
	}
	function ps(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function ms(e) {
		return hs(ls(), z, e);
	}
	function hs(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Go & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ga && (d = !0);
					else if ((Go & p) === p) {
						u = u.next, p === Ga && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, R.lanes |= p, sd |= p;
					f = u.action, Yo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, R.lanes |= f, sd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Jr(o, e.memoizedState) && (Fc = !0, d && (n = Ka, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function gs(e) {
		var t = ls(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Jr(o, t.memoizedState) || (Fc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function _s(e, t, n) {
		var r = R, a = ls(), o = P;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Jr((z || a).memoizedState, n);
		if (s && (a.memoizedState = n, Fc = !0), a = a.queue, Hs(bs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Ko !== null && !!(Ko.memoizedState.tag & 1), Ls(e ? 9 : 8, { destroy: void 0 }, ys.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, K === null) throw Error(i(349));
			o || Go & 127 || vs(r, t, n);
		}
		return n;
	}
	function vs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = R.updateQueue, t === null ? (t = V(), R.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ys(e, t, n, r) {
		t.value = n, t.getSnapshot = r, xs(t) && Ss(e);
	}
	function bs(e, t, n) {
		return n(function() {
			xs(t) && Ss(e);
		});
	}
	function xs(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Jr(e, n);
		} catch {
			return !0;
		}
	}
	function Ss(e) {
		var t = Pi(e, 2);
		t !== null && Pd(t, e, 2);
	}
	function Cs(e) {
		var t = cs();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Yo) {
				at(!0);
				try {
					n();
				} finally {
					at(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ps,
			lastRenderedState: e
		}, t;
	}
	function ws(e, t, n, r) {
		return e.baseState = n, hs(e, z, typeof r == "function" ? r : ps);
	}
	function Ts(e, t, n, r, a) {
		if (pc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			D.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Es(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Es(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = D.T, o = {};
			o.types = a === null ? null : a.types, D.T = o;
			try {
				var s = n(i, r), c = D.S;
				c !== null && c(o, s), Ds(e, t, s);
			} catch (n) {
				ks(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), D.T = a;
			}
		} else try {
			a = n(i, r), Ds(e, t, a);
		} catch (n) {
			ks(e, t, n);
		}
	}
	function Ds(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Os(e, t, n);
		}, function(n) {
			return ks(e, t, n);
		}) : Os(e, t, n);
	}
	function Os(e, t, n) {
		t.status = "fulfilled", t.value = n, As(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Es(e, n)));
	}
	function ks(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, As(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function As(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function js(e, t) {
		return t;
	}
	function Ms(e, t) {
		if (P) {
			var n = K.formState;
			if (n !== null) {
				a: {
					var r = R;
					if (P) {
						if (N) {
							b: {
								for (var i = N, a = fa; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								N = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ma(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = cs(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: js,
			lastRenderedState: t
		}, n.queue = r, n = uc.bind(null, R, r), r.dispatch = n, r = Cs(!1), a = fc.bind(null, R, !1, r.queue), r = cs(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Ts.bind(null, R, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ns(e) {
		return Ps(ls(), z, e);
	}
	function Ps(e, t, n) {
		if (t = hs(e, t, js)[0], e = ms(ps)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = us(t);
		} catch (e) {
			throw e === to ? ro : e;
		}
		else r = t;
		t = ls();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (R.flags |= 2048, Ls(9, { destroy: void 0 }, Fs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Fs(e, t) {
		e.action = t;
	}
	function Is(e) {
		var t = ls(), n = z;
		if (n !== null) return Ps(t, n, e);
		ls(), t = t.memoizedState, n = ls();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Ls(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = R.updateQueue, t === null && (t = V(), R.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Rs() {
		return ls().memoizedState;
	}
	function zs(e, t, n, r) {
		var i = cs();
		R.flags |= e, i.memoizedState = Ls(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Bs(e, t, n, r) {
		var i = ls();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		z !== null && r !== null && es(r, z.memoizedState.deps) ? i.memoizedState = Ls(t, a, n, r) : (R.flags |= e, i.memoizedState = Ls(1 | t, a, n, r));
	}
	function Vs(e, t) {
		zs(8390656, 8, e, t);
	}
	function Hs(e, t) {
		Bs(2048, 8, e, t);
	}
	function Us(e) {
		R.flags |= 4;
		var t = R.updateQueue;
		if (t === null) t = V(), R.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Ws(e) {
		var t = ls().memoizedState;
		return Us({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Gs(e, t) {
		return Bs(4, 2, e, t);
	}
	function Ks(e, t) {
		return Bs(4, 4, e, t);
	}
	function qs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Js(e, t, n) {
		n = n == null ? null : n.concat([e]), Bs(4, 4, qs.bind(null, t, e), n);
	}
	function Ys() {}
	function Xs(e, t) {
		var n = ls();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && es(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Zs(e, t) {
		var n = ls();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && es(t, r[1])) return r[0];
		if (r = e(), Yo) {
			at(!0);
			try {
				e();
			} finally {
				at(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Qs(e, t, n) {
		return n === void 0 || Go & 1073741824 && !(J & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Md(), R.lanes |= e, sd |= e, n);
	}
	function $s(e, t, n, r) {
		return Jr(n, t) ? n : ko.current === null ? !(Go & 106) || Go & 1073741824 && !(J & 261930) ? (Fc = !0, e.memoizedState = n) : (e = Md(), R.lanes |= e, sd |= e, t) : (e = Qs(e, n, r), Jr(e, t) || (Fc = !0), e);
	}
	function ec(e, t, n, r, i) {
		var a = O.p;
		O.p = a !== 0 && 8 > a ? a : 8;
		var o = D.T, s = {};
		s.types = o === null ? null : o.types, D.T = s, fc(e, !1, t, n);
		try {
			var c = i(), l = D.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? dc(e, t, Ya(c, r), jd(e)) : dc(e, t, r, jd(e));
		} catch (n) {
			dc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, jd());
		} finally {
			O.p = a, o !== null && s.types !== null && (o.types = s.types), D.T = o;
		}
	}
	function tc() {}
	function nc(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = rc(e).queue;
		ec(e, a, t, we, n === null ? tc : function() {
			return ic(e), n(r);
		});
	}
	function rc(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: we,
			baseState: we,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ps,
				lastRenderedState: we
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ps,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ic(e) {
		var t = rc(e);
		t.next === null && (t = e.alternate.memoizedState), dc(e, t.next.queue, {}, jd());
	}
	function ac() {
		return ja(sh);
	}
	function oc() {
		return ls().memoizedState;
	}
	function sc() {
		return ls().memoizedState;
	}
	function cc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = jd();
					e = bo(n);
					var r = xo(t, e, n);
					r !== null && (Pd(r, t, n), So(r, t, n)), t = { cache: Ra() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function lc(e, t, n) {
		var r = jd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, pc(e) ? mc(t, n) : (n = Ni(e, t, n, r), n !== null && (Pd(n, e, r), hc(n, t, r)));
	}
	function uc(e, t, n) {
		dc(e, t, n, jd());
	}
	function dc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (pc(e)) mc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Jr(s, o)) return Mi(e, t, i, 0), K === null && ji(), !1;
			} catch {}
			if (n = Ni(e, t, i, r), n !== null) return Pd(n, e, r), hc(n, t, r), !0;
		}
		return !1;
	}
	function fc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Pf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, pc(e)) {
			if (t) throw Error(i(479));
		} else t = Ni(e, n, r, 2), t !== null && Pd(t, e, 2);
	}
	function pc(e) {
		var t = e.alternate;
		return e === R || t !== null && t === R;
	}
	function mc(e, t) {
		Jo = qo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function hc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ct(e, n);
		}
	}
	var gc = {
		readContext: ja,
		use: ds,
		useCallback: B,
		useContext: B,
		useEffect: B,
		useImperativeHandle: B,
		useLayoutEffect: B,
		useInsertionEffect: B,
		useMemo: B,
		useReducer: B,
		useRef: B,
		useState: B,
		useDebugValue: B,
		useDeferredValue: B,
		useTransition: B,
		useSyncExternalStore: B,
		useId: B,
		useHostTransitionStatus: B,
		useFormState: B,
		useActionState: B,
		useOptimistic: B,
		useMemoCache: B,
		useCacheRefresh: B,
		useEffectEvent: B
	}, _c = {
		readContext: ja,
		use: ds,
		useCallback: function(e, t) {
			return cs().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ja,
		useEffect: Vs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), zs(4194308, 4, qs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return zs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			zs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = cs();
			t = t === void 0 ? null : t;
			var r = e();
			if (Yo) {
				at(!0);
				try {
					e();
				} finally {
					at(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = cs();
			if (n !== void 0) {
				var i = n(t);
				if (Yo) {
					at(!0);
					try {
						n(t);
					} finally {
						at(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = lc.bind(null, R, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = cs();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Cs(e);
			var t = e.queue, n = uc.bind(null, R, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Ys,
		useDeferredValue: function(e, t) {
			return Qs(cs(), e, t);
		},
		useTransition: function() {
			var e = Cs(!1);
			return e = ec.bind(null, R, e.queue, !0, !1), cs().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = R, a = cs();
			if (P) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), K === null) throw Error(i(349));
				J & 127 || vs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Vs(bs.bind(null, r, o, e), [e]), r.flags |= 2048, Ls(9, { destroy: void 0 }, ys.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = cs(), t = K.identifierPrefix;
			if (P) {
				var n = ia, r = ra;
				n = (r & ~(1 << 32 - ot(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Xo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = $o++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ac,
		useFormState: Ms,
		useActionState: Ms,
		useOptimistic: function(e) {
			var t = cs();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = fc.bind(null, R, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: fs,
		useCacheRefresh: function() {
			return cs().memoizedState = cc.bind(null, R);
		},
		useEffectEvent: function(e) {
			var t = cs(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, vc = {
		readContext: ja,
		use: ds,
		useCallback: Xs,
		useContext: ja,
		useEffect: Hs,
		useImperativeHandle: Js,
		useInsertionEffect: Gs,
		useLayoutEffect: Ks,
		useMemo: Zs,
		useReducer: ms,
		useRef: Rs,
		useState: function() {
			return ms(ps);
		},
		useDebugValue: Ys,
		useDeferredValue: function(e, t) {
			return $s(ls(), z.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ms(ps)[0], t = ls().memoizedState;
			return [typeof e == "boolean" ? e : us(e), t];
		},
		useSyncExternalStore: _s,
		useId: oc,
		useHostTransitionStatus: ac,
		useFormState: Ns,
		useActionState: Ns,
		useOptimistic: function(e, t) {
			return ws(ls(), z, e, t);
		},
		useMemoCache: fs,
		useCacheRefresh: sc,
		useEffectEvent: Ws
	}, yc = {
		readContext: ja,
		use: ds,
		useCallback: Xs,
		useContext: ja,
		useEffect: Hs,
		useImperativeHandle: Js,
		useInsertionEffect: Gs,
		useLayoutEffect: Ks,
		useMemo: Zs,
		useReducer: gs,
		useRef: Rs,
		useState: function() {
			return gs(ps);
		},
		useDebugValue: Ys,
		useDeferredValue: function(e, t) {
			var n = ls();
			return z === null ? Qs(n, e, t) : $s(n, z.memoizedState, e, t);
		},
		useTransition: function() {
			var e = gs(ps)[0], t = ls().memoizedState;
			return [typeof e == "boolean" ? e : us(e), t];
		},
		useSyncExternalStore: _s,
		useId: oc,
		useHostTransitionStatus: ac,
		useFormState: Is,
		useActionState: Is,
		useOptimistic: function(e, t) {
			var n = ls();
			return z === null ? (n.baseState = e, [e, n.queue.dispatch]) : ws(n, z, e, t);
		},
		useMemoCache: fs,
		useCacheRefresh: sc,
		useEffectEvent: Ws
	};
	function bc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : w({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var xc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = bo(r);
			i.payload = t, n != null && (i.callback = n), t = xo(e, i, r), t !== null && (Pd(t, e, r), So(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = jd(), i = bo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = xo(e, i, r), t !== null && (Pd(t, e, r), So(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = jd(), r = bo(n);
			r.tag = 2, t != null && (r.callback = t), t = xo(e, r, n), t !== null && (Pd(t, e, n), So(t, e, n));
		}
	};
	function Sc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Yr(n, r) || !Yr(i, a) : !0;
	}
	function Cc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && xc.enqueueReplaceState(t, t.state, null);
	}
	function wc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = w({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Tc(e) {
		Di(e);
	}
	function Ec(e) {
		console.error(e);
	}
	function Dc(e) {
		Di(e);
	}
	function Oc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function kc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ac(e, t, n) {
		return n = bo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Oc(e, t);
		}, n;
	}
	function jc(e) {
		return e = bo(e), e.tag = 3, e;
	}
	function Mc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				kc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			kc(t, n, r), typeof i != "function" && (yd === null ? yd = /* @__PURE__ */ new Set([this]) : yd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Nc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Oa(t, n, a, !0), n = Po.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Fo === null ? Kd() : n.alternate === null && od === 0 && (od = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === io ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), mf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === io ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), mf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return mf(e, r, a), Kd(), !1;
		}
		if (P) return t = Po.current, t === null ? (r !== pa && (t = Error(i(423), { cause: r }), ba(Yi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Yi(r, n), a = Ac(e.stateNode, r, a), Co(e, a), od !== 4 && (od = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== pa && (e = Error(i(422), { cause: r }), ba(Yi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Yi(o, n), fd === null ? fd = [o] : fd.push(o), od !== 4 && (od = 2), t === null) return !0;
		r = Yi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ac(n.stateNode, r, e), Co(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (yd === null || !yd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = jc(a), Mc(a, e, n, r), Co(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Pc = Error(i(461)), Fc = !1;
	function Ic(e, t, n, r) {
		t.child = e === null ? go(t, null, n, r) : ho(t, e.child, n, r);
	}
	function Lc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Aa(t), r = ts(e, t, n, o, a, i), s = as(), e !== null && !Fc ? (os(e, t, i), dl(e, t, i)) : (P && s && sa(t), t.flags |= 1, Ic(e, t, r, i), t.child);
	}
	function Rc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Bi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, zc(e, t, a, r, i)) : (e = Ui(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !fl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Yr : n, n(o, r) && e.ref === t.ref) return dl(e, t, i);
		}
		return t.flags |= 1, e = Vi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function zc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Yr(a, r) && e.ref === t.ref) {
				if (Fc = !1, t.pendingProps = r = a, fl(e, i)) e.flags & 131072 && (Fc = !0);
				else return t.lanes = e.lanes, dl(e, t, i);
			}
		}
		return qc(e, t, n, r, i);
	}
	function Bc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Hc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && $a(t, a === null ? null : a.cachePool), a === null ? Mo() : jo(t, a), Ro(t);
			else return r = t.lanes = 536870912, Hc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && $a(t, null), Mo(), zo()) : ($a(t, a.cachePool), jo(t, a), zo(), t.memoizedState = null);
		return Ic(e, t, i, n), t.child;
	}
	function Vc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Hc(e, t, n, r, i) {
		var a = Qa();
		return a = a === null ? null : {
			parent: La._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && $a(t, null), Mo(), Ro(t), e !== null && Oa(e, t, r, !0), t.childLanes = i, null;
	}
	function Uc(e, t) {
		return t = nl({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Wc(e, t, n) {
		return ho(t, e.child, null, n), e = Uc(t, t.pendingProps), e.flags |= 2, Bo(t), t.memoizedState = null, e;
	}
	function Gc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (P) {
				if (r.mode === "hidden") return e = Uc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Vc(null, e);
				if (Lo(t), (e = N) ? (e = am(e, fa), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: na === null ? null : {
						id: ra,
						overflow: ia
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ki(e), n.return = t, t.child = n, ua = t, N = null)) : e = null, e === null) throw ma(t);
				return t.lanes = 536870912, null;
			}
			return Uc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Lo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Wc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Fc || Oa(e, t, n, !1), a = (n & e.childLanes) !== 0, Fc || a) {
				if (ko.current === null) {
					if (r = K, r !== null && (s = wt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Pi(e, s), Pd(r, e, s), Pc;
					Kd();
				}
				t = Wc(e, t, n);
			} else e = o.treeContext, N = lm(s.nextSibling), ua = t, P = !0, da = null, fa = !1, e !== null && la(t, e), t = Uc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Vi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Kc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function qc(e, t, n, r, i) {
		return Aa(t), n = ts(e, t, n, r, void 0, i), r = as(), e !== null && !Fc ? (os(e, t, i), dl(e, t, i)) : (P && r && sa(t), t.flags |= 1, Ic(e, t, n, i), t.child);
	}
	function Jc(e, t, n, r, i, a) {
		return Aa(t), t.updateQueue = null, n = rs(t, r, n, i), ns(e), r = as(), e !== null && !Fc ? (os(e, t, a), dl(e, t, a)) : (P && r && sa(t), t.flags |= 1, Ic(e, t, n, a), t.child);
	}
	function Yc(e, t, n, r, i) {
		if (Aa(t), t.stateNode === null) {
			var a = Li, o = n.contextType;
			typeof o == "object" && o && (a = ja(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = xc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, vo(t), o = n.contextType, a.context = typeof o == "object" && o ? ja(o) : Li, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (bc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && xc.enqueueReplaceState(a, a.state, null), Eo(t, r, a, i), To(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = wc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Li, typeof u == "object" && u && (o = ja(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Cc(t, a, r, o), _o = !1;
			var f = t.memoizedState;
			a.state = f, Eo(t, r, a, i), To(), l = t.memoizedState, s || f !== l || _o ? (typeof d == "function" && (bc(t, n, d, r), l = t.memoizedState), (c = _o || Sc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, yo(e, t), o = t.memoizedProps, u = wc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Li, typeof l == "object" && l && (c = ja(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Cc(t, a, r, c), _o = !1, f = t.memoizedState, a.state = f, Eo(t, r, a, i), To();
			var p = t.memoizedState;
			o !== d || f !== p || _o || e !== null && e.dependencies !== null && ka(e.dependencies) ? (typeof s == "function" && (bc(t, n, s, r), p = t.memoizedState), (u = _o || Sc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ka(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Kc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ho(t, e.child, null, i), t.child = ho(t, null, n, i)) : Ic(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = dl(e, t, i), e;
	}
	function Xc(e, t, n, r) {
		return va(), t.flags |= 256, Ic(e, t, n, r), t.child;
	}
	var Zc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Qc(e) {
		return {
			baseLanes: e,
			cachePool: eo()
		};
	}
	function $c(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ud), e;
	}
	function el(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Vo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (P) {
				if (i ? Io(t) : zo(), (e = N) ? (e = am(e, fa), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: na === null ? null : {
						id: ra,
						overflow: ia
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ki(e), n.return = t, t.child = n, ua = t, N = null)) : e = null, e === null) throw ma(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (zo(), i = t.mode, a = nl({
				mode: "hidden",
				children: a
			}, i), r = Wi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Qc(n), r.childLanes = $c(e, o, n), t.memoizedState = Zc, Vc(null, r)) : (Io(t), tl(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return il(e, t, a, o, r, c, s, n);
		}
		return i ? (zo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Vi(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Wi(i, a, n, null), i.flags |= 2) : i = Vi(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Vc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Qc(n) : (a = i.cachePool, a === null ? a = eo() : (s = La._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = $c(e, o, n), t.memoizedState = Zc, Vc(e.child, r)) : (Io(t), n = e.child, e = n.sibling, n = Vi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function tl(e, t) {
		return t = nl({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function nl(e, t) {
		return e = zi(22, e, null, t), e.lanes = 0, e;
	}
	function rl(e, t, n) {
		return ho(t, e.child, null, n), e = tl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function il(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Io(t), t.flags &= -257, rl(e, t, c)) : t.memoizedState === null ? (zo(), o = a.fallback, s = t.mode, a = nl({
			mode: "visible",
			children: a.children
		}, s), o = Wi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, ho(t, e.child, null, c), a = t.child, a.memoizedState = Qc(c), a.childLanes = $c(e, r, c), t.memoizedState = Zc, Vc(null, a)) : (zo(), t.child = e.child, t.flags |= 128, null);
		if (Io(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ba({
				value: a,
				source: null,
				stack: null
			})), rl(e, t, c);
		}
		if (Fc || Oa(e, t, c, !1), r = (c & e.childLanes) !== 0, Fc || r) {
			if (ko.current !== null) return rl(e, t, c);
			if (r = K, r !== null && (a = wt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, Pi(e, a), Pd(r, e, a), Pc;
			return om(o) || Kd(), rl(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, N = lm(o.nextSibling), ua = t, P = !0, da = null, fa = !1, e !== null && la(t, e), t = tl(t, a.children), t.flags |= 134221824, t);
	}
	function al(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ea(e.return, t, n);
	}
	function ol(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Wo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function sl(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function cl(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function ll(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Vo.current;
		if (t.flags & 128) return Ho(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Ho(t, o), i === "backwards" && e !== null ? (cl(e), Ic(e, t, r, n), cl(e)) : Ic(e, t, r, n), r = P ? $i : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && al(e, n, t);
			else if (e.tag === 19) al(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = ol(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, cl(t)), sl(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Wo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				sl(t, !0, n, null, a, r);
				break;
			case "together":
				sl(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = ol(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), sl(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function ul(e, t, n) {
		var r = t.pendingProps;
		return wa(t, t.type, r.value), Ic(e, t, r.children, n), t.child;
	}
	function dl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), sd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Oa(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Vi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Vi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function fl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ka(e)));
	}
	function pl(e, t, n) {
		switch (t.tag) {
			case 3:
				Me(t, t.stateNode.containerInfo), wa(t, La, e.memoizedState.cache), va();
				break;
			case 27:
			case 5:
				Pe(t);
				break;
			case 4:
				Me(t, t.stateNode.containerInfo);
				break;
			case 10:
				wa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Lo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Io(t), t.flags |= 128, null;
					r = Oa(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? el(e, t, n) : (Io(t), e = dl(e, t, n), e === null ? null : e.sibling);
				}
				Io(t);
				break;
			case 19:
				if (t.flags & 128) return ll(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (Oa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return ll(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ho(t, Vo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Bc(e, t, n, t.pendingProps);
			case 24: wa(t, La, e.memoizedState.cache);
		}
		return dl(e, t, n);
	}
	function ml(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Fc = !0;
			else {
				if (!fl(e, n) && !(t.flags & 128)) return Fc = !1, pl(e, t, n);
				Fc = !!(e.flags & 131072);
			}
		} else Fc = !1, P && t.flags & 1048576 && oa(t, $i, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = F(t.elementType), t.type = e, typeof e == "function") Bi(e) ? (r = wc(e, r), t.tag = 1, t = Yc(null, t, e, r, n)) : (t.tag = 0, t = qc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === oe) {
								t.tag = 11, t = Lc(null, t, e, r, n);
								break a;
							}
							if (a === de) {
								t.tag = 14, t = Rc(null, t, e, r, n);
								break a;
							}
							if (a === E) {
								t.tag = 10, t.type = e, t = ul(null, t, n);
								break a;
							}
						}
						throw t = Se(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return qc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = wc(r, t.pendingProps), Yc(e, t, r, a, n);
			case 3:
				a: {
					if (Me(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, yo(e, t), Eo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, wa(t, La, r), r !== o.cache && Da(t, [La], n, !0), To(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Xc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Yi(Error(i(424)), t), ba(a), t = Xc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (N = lm(e.firstChild), ua = t, P = !0, da = null, fa = !0, n = go(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (va(), r === a) {
							t = dl(e, t, n);
							break a;
						}
						Ic(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Kc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : P || (t.stateNode = fp(t.type, t.pendingProps, Ae.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Pe(t), e === null && P && (r = t.stateNode = hm(t.type, t.pendingProps, Ae.current), ua = t, fa = !0, a = N, Sp(t.type) ? (um = a, N = lm(r.firstChild)) : N = a), Ic(e, t, t.pendingProps.children, n), Kc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && P && ((a = r = N) && (r = rm(r, t.type, t.pendingProps, fa), r === null ? a = !1 : (t.stateNode = r, ua = t, N = lm(r.firstChild), fa = !1, a = !0)), a || ma(t)), Pe(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ts(e, t, is, null, null, n), sh._currentValue = a), Kc(e, t), Ic(e, t, r, n), t.child;
			case 6: return e === null && P && ((e = n = N) && (n = im(n, t.pendingProps, fa), n === null ? e = !1 : (t.stateNode = n, ua = t, N = null, e = !0)), e || ma(t)), null;
			case 13: return el(e, t, n);
			case 4: return Me(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ho(t, null, r, n) : Ic(e, t, r, n), t.child;
			case 11: return Lc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Kc(e, t), Ic(e, t, r, n), t.child;
			case 8: return Ic(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ic(e, t, t.pendingProps.children, n), t.child;
			case 10: return ul(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Aa(t), a = ja(a), r = r(a), t.flags |= 1, Ic(e, t, r, n), t.child;
			case 14: return Rc(e, t, t.type, t.pendingProps, n);
			case 15: return zc(e, t, t.type, t.pendingProps, n);
			case 19: return ll(e, t, n);
			case 31: return Gc(e, t, n);
			case 22: return Bc(e, t, n, t.pendingProps);
			case 24: return Aa(t), r = ja(La), e === null ? (a = Qa(), a === null && (a = K, o = Ra(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, vo(t), wa(t, La, a)) : ((e.lanes & n) !== 0 && (yo(e, t), Eo(t, null, null, n), To()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, wa(t, La, r), r !== a.cache && Da(t, [La], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), wa(t, La, r))), Ic(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : P && sa(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Kc(e, t), Ic(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function hl(e) {
		e.flags |= 4;
	}
	function gl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Ud()) e.flags |= 8192;
				else throw I = io, no;
			}
		} else e.flags &= -16777217;
	}
	function _l(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Ud()) e.flags |= 8192;
			else throw I = io, no;
		}
	}
	function vl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : vt(), e.lanes |= t, dd |= t);
	}
	function yl(e, t) {
		if (!P) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function H(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function bl(e, t, n) {
		var r = t.pendingProps;
		switch (ca(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return H(t), null;
			case 1: return H(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ta(La), Ne(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (_a(t) ? hl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ya())), H(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (hl(t), o === null ? (H(t), gl(t, a, null, r, n)) : (H(t), _l(t, o))) : o ? o === e.memoizedState ? (H(t), t.flags &= -16777217) : (hl(t), H(t), _l(t, o)) : (e = e.memoizedProps, e !== r && hl(t), H(t), gl(t, a, e, r, n)), null;
			case 27:
				if (Fe(t), n = Ae.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && hl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return H(t), t.subtreeFlags &= -33554433, null;
					}
					e = Oe.current, _a(t) ? ha(t, e) : (e = hm(a, r, n), t.stateNode = e, hl(t));
				}
				return H(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Fe(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && hl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return H(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = Oe.current, _a(t)) ha(t, o);
					else {
						var s = lp(Ae.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[At] = t, o[jt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && hl(t);
					}
				}
				return H(t), t.subtreeFlags &= -33554433, gl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && hl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Ae.current, _a(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = ua, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[At] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || ep(e.nodeValue, n)), e || ma(t, !0);
					} else e = lp(e).createTextNode(r), e[At] = t, t.stateNode = e;
				}
				return H(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = _a(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[At] = t;
						} else va(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						H(t), e = !1;
					} else n = ya(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Bo(t), t) : (Bo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return H(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = _a(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[At] = t;
						} else va(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						H(t), a = !1;
					} else a = ya(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Bo(t), t) : (Bo(t), null);
				}
				return Bo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), vl(t, t.updateQueue), H(t), null);
			case 4: return Ne(), e === null && Wf(t.stateNode.containerInfo), t.flags |= 67108864, H(t), null;
			case 10: return Ta(t.type), H(t), null;
			case 19:
				if (Uo(t), r = t.memoizedState, r === null) return H(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) yl(r, !1);
					else {
						if (od !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Wo(e), o !== null) {
								for (t.flags |= 128, yl(r, !1), e = o.updateQueue, t.updateQueue = e, vl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Hi(n, e), n = n.sibling;
								return Ho(t, Vo.current & 1 | 2), P && aa(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Je() > _d && (t.flags |= 128, a = !0, yl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Wo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, vl(t, e), yl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !P) return H(t), null;
						} else 2 * Je() - r.renderingStartTime > _d && n !== 536870912 && (t.flags |= 128, a = !0, yl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Je(), e.sibling = null, o = Vo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || P ? Ho(t, o) : (n = o, A(Po, t), A(Vo, n), Fo === null && (Fo = t)), P && aa(t, r.treeForkCount), e;
				}
				return H(t), null;
			case 22:
			case 23: return Bo(t), No(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (H(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : H(t), n = t.updateQueue, n !== null && vl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && k(Za), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ta(La), H(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, H(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function xl(e, t) {
		switch (ca(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ta(La), Ne(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Fe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Bo(t), t.alternate === null) throw Error(i(340));
					va();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Bo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					va();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Uo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return Ne(), null;
			case 10: return Ta(t.type), null;
			case 22:
			case 23: return Bo(t), No(), e !== null && k(Za), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ta(La), null;
			case 25: return null;
			default: return null;
		}
	}
	function Sl(e, t) {
		switch (ca(t), t.tag) {
			case 3:
				Ta(La), Ne();
				break;
			case 26:
			case 27:
			case 5:
				Fe(t);
				break;
			case 4:
				Ne();
				break;
			case 31:
				t.memoizedState !== null && Bo(t);
				break;
			case 13:
				Bo(t);
				break;
			case 19:
				Uo(t);
				break;
			case 10:
				Ta(t.type);
				break;
			case 22:
			case 23:
				Bo(t), No(), e !== null && k(Za);
				break;
			case 24: Ta(La);
		}
	}
	function Cl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function wl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Tl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Oo(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function El(e, t, n) {
		n.props = wc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Dl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = wi(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							f(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Ol(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function kl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function Al(e) {
		for (var t = e.return; t !== null && (Nl(t) && em(e.stateNode, t.stateNode), !Ml(t));) t = t.return;
	}
	function jl(e) {
		for (var t = e.return; t !== null && (Nl(t) && tm(e.stateNode, t.stateNode), !Ml(t));) t = t.return;
	}
	function Ml(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Nl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Pl(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Fl(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[jt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Il(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Ll(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Il(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Rl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Tn)), kl(e, r), M = !0;
		else if (i !== 4 && (i === 27 && (kl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Rl(e, t, n, r), e = e.sibling; e !== null;) Rl(e, t, n, r), e = e.sibling;
	}
	function zl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), kl(e, r), M = !0;
		else if (i !== 4 && (i === 27 && (kl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (zl(e, t, n, r), e = e.sibling; e !== null;) zl(e, t, n, r), e = e.sibling;
	}
	function Bl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[At] = e, t[jt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var Vl = !1, Hl = null;
	function Ul(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Vl = !0);
	}
	var Wl = null;
	function Gl() {
		var e = Wl;
		return Wl = null, e;
	}
	var Kl = 0;
	function ql(e, t, n, r, i) {
		return Kl = 0, Jl(e.child, t, n, r, i);
	}
	function Jl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Vl = !0, Tp(o, Kl === 0 ? t : t + "_" + Kl, n), Kl++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Jl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Yl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Yl(e.child, t), e = e.sibling;
	}
	function Xl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Xl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = Ei(t.default, t.share), t !== "none" && (ql(e, n, t, null, !1) || Yl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Zl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = wi(r, n), a = Ei(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Xl(e) : ql(e, i, a, null, !1) ? (Xl(e), n.paired || t || Nd(e, r.onEnter)) : Yl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Zl(e, t), e = e.sibling;
		else Xl(e);
	}
	function Ql(e) {
		if (Hl !== null && Hl.size !== 0) {
			var t = Hl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = Ei(n.default, n.share);
								if (a !== "none" && (ql(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Nd(e, n.onShare)) : Yl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Ql(e);
				}
				e = e.sibling;
			}
		}
	}
	function $l(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = wi(t, e.stateNode), r = Hl === null ? void 0 : Hl.get(n), i = Ei(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (ql(e, n, i, null, !1) ? r === void 0 ? Nd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Hl.delete(n), Nd(e, t.onShare)) : Yl(e.child, !1)), Hl !== null && Ql(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) $l(e), e = e.sibling;
		else Hl !== null && Ql(e);
	}
	function eu(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = wi(t, e.stateNode);
				t = Ei(t.default, t.update), e.flags &= -5, t !== "none" && ql(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && eu(e);
			e = e.sibling;
		}
	}
	function tu(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Yl(e.child, !1));
				}
				tu(e);
			}
			e = e.sibling;
		}
	}
	function nu(e) {
		if (e.tag === 30) e.stateNode.paired = null, Yl(e.child, !1), tu(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) nu(e), e = e.sibling;
		else tu(e);
	}
	function ru(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Yl(e.child, !1) : e.subtreeFlags & 33554432 && ru(e), e = e.sibling;
	}
	function iu(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Kl < a.length) {
					var l = a[Kl], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, Kl === 0 ? n : n + "_" + Kl, i), s && e.flags & 4 || (Wl === null && (Wl = []), Wl.push(c, Kl === 0 ? r : r + "_" + Kl, t.memoizedProps)), Kl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : iu(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function au(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = wi(n, r), a = Ei(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Kl = 0, i = iu(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Nd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && au(e, t);
			e = e.sibling;
		}
	}
	var ou = !1, U = !1, su = !1, cu = !1, lu = typeof WeakSet == "function" ? WeakSet : Set, uu = null, du = !1, fu = !1, pu = !1, mu = !1;
	function hu(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = ei(e), ti(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, uu = t, t = n ? 9270 : 1024; uu !== null;) {
			if (e = uu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && $l(r[a]);
			if (e.alternate === null && e.flags & 2) n && Ul(e), gu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && $l(r), gu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Ul(e), gu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, uu = r) : (n && eu(e), gu(n));
			}
		}
		Hl = null;
	}
	function gu(e) {
		for (; uu !== null;) {
			var t = uu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = wc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							Z(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = wi(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = Ei(a.default, a.update), a !== "none" && ql(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, uu = r;
				break;
			}
			uu = t.return;
		}
	}
	function _u(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Iu(e, n), r & 4 && Cl(5, n);
				break;
			case 1:
				if (Iu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = wc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Tl(n), r & 512 && Dl(n, n.return);
				break;
			case 3:
				if (Iu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Oo(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Bl(n);
			case 26:
			case 5:
				Iu(e, n), t === null && r & 4 && Pl(n), r & 512 && Dl(n, n.return);
				break;
			case 12:
				Iu(e, n);
				break;
			case 31:
				Iu(e, n), r & 4 && Tu(e, n);
				break;
			case 13:
				Iu(e, n), r & 4 && Eu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = _f.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || ou, !r) {
					var a = t !== null && t.memoizedState !== null || U;
					t = ou, i = U, ou = r, (U = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Ru(e, n, r)) : Iu(e, n), ou = t, U = i;
				}
				break;
			case 30:
				Iu(e, n), r & 512 && Dl(n, n.return);
				break;
			case 7: r & 512 && Dl(n, n.return);
			default: Iu(e, n);
		}
	}
	function vu(e, t) {
		for (e = e.child; e !== null;) yu(e, t), e = e.sibling;
	}
	function yu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					Z(e, e.return, t);
				}
				bu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, M = !0;
				} catch (t) {
					Z(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					Z(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && vu(e, t);
				break;
			default: vu(e, t);
		}
	}
	function bu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						yu(n, r);
						break a;
					case 22:
						n.memoizedState === null && bu(n, r);
						break a;
					default: bu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function xu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, xu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Rt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var W = null, Su = !1;
	function Cu(e, t, n) {
		for (n = n.child; n !== null;) wu(e, t, n), n = n.sibling;
	}
	function wu(e, t, n) {
		if (it && typeof it.onCommitFiberUnmount == "function") try {
			it.onCommitFiberUnmount(rt, n);
		} catch {}
		switch (n.tag) {
			case 26:
				U || Ol(n, t), Cu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !U && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				U || Ol(n, t), jl(n);
				var r = W, i = Su;
				Sp(n.type) && (W = n.stateNode, Su = !1), Cu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), W = r, Su = i;
				break;
			case 5: U || Ol(n, t), jl(n);
			case 6:
				if (n.tag === 6 && jl(n), r = W, i = Su, W = null, Cu(e, t, n), W = r, Su = i, W !== null) {
					if (Su) try {
						(W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(n.stateNode), M = !0;
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						W.removeChild(n.stateNode), M = !0;
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				W !== null && (Su ? (e = W, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(W, n.stateNode));
				break;
			case 4:
				r = W, i = Su, W = n.stateNode.containerInfo, Su = !0, Cu(e, t, n), W = r, Su = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				wl(2, n, t), U || wl(4, n, t), Cu(e, t, n);
				break;
			case 1:
				U || (Ol(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && El(n, t, r)), Cu(e, t, n);
				break;
			case 21:
				Cu(e, t, n);
				break;
			case 22:
				U = (r = U) || n.memoizedState !== null, Cu(e, t, n), U = r;
				break;
			case 30:
				Ol(n, t), Cu(e, t, n);
				break;
			case 7:
				U || Ol(n, t), Cu(e, t, n);
				break;
			default: Cu(e, t, n);
		}
	}
	function Tu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function Eu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Du(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new lu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new lu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Ou(e, t) {
		var n = Du(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = vf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ku(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							W = l.stateNode, Su = !1;
							break a;
						}
						break;
					case 5:
						W = l.stateNode, Su = !1;
						break a;
					case 3:
					case 4:
						W = l.stateNode.containerInfo, Su = !0;
						break a;
				}
				l = l.return;
			}
			if (W === null) throw Error(i(160));
			wu(s, c, o), W = null, Su = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) ju(t, e, n), t = t.sibling;
	}
	var Au = null;
	function ju(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				ku(t, e, n), Mu(e), a & 4 && (wl(3, e, e.return), Cl(3, e), wl(5, e, e.return));
				break;
			case 1:
				ku(t, e, n), Mu(e), a & 512 && (U || r === null || Ol(r, r.return)), a & 64 && ou && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Au, ku(t, e, n), Mu(e), a & 512 && (U || r === null || Ol(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (ou) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[It] || r[At] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[At] = e, Ut(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[At] = e, Ut(r), t = r;
									}
									e.stateNode = t;
								}
							} else ou || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Fl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || U || t.parentNode.removeChild(t)) : a.count--, n === null ? ou || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				ku(t, e, n), Mu(e), a & 512 && (U || r === null || Ol(r, r.return)), r !== null && a & 4 && Fl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = su, su = !1, ku(t, e, n), su = o, Mu(e), a & 512 && (U || r === null || Ol(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						_n(t, ""), M = !0;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Fl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (cu = !0);
				break;
			case 6:
				if (ku(t, e, n), Mu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, M = !0;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (M = !1, Wm = null, o = Au, Au = bm(t.containerInfo), ku(t, e, n), Au = o, Mu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				cu && (cu = !1, Nu(e)), M = !1;
				break;
			case 4:
				a = su, su = ou, r = $t(), o = Au, Au = bm(e.stateNode.containerInfo), ku(t, e, n), Mu(e), Au = o, M && fu && (pu = !0), M = r, su = a;
				break;
			case 12:
				ku(t, e, n), Mu(e);
				break;
			case 31:
				ku(t, e, n), Mu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Ou(e, t)));
				break;
			case 13:
				ku(t, e, n), Mu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (hd = Je()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Ou(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = ou, l = U, u = su;
				ou = c || o, su = u || o, U = l || s, ku(t, e, n), U = l, su = u, ou = c, Mu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || ou || U || (t = s || U, n = ou, r = U, ou = o || ou, U = t, Lu(e, 2), ou = n, U = r), !o && su || vu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Ou(e, n))));
				break;
			case 19:
				ku(t, e, n), Mu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Ou(e, t)));
				break;
			case 30:
				a & 512 && (U || r === null || Ol(r, r.return)), a = $t(), o = fu, s = (n & 335544064) === n, c = e.memoizedProps, fu = s && Ei(c.default, c.update) !== "none", ku(t, e, n), Mu(e), s && r !== null && M && (e.flags |= 4), fu = o, M = a;
				break;
			case 21: break;
			case 7: a & 512 && (U || r === null || Ol(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: ku(t, e, n), Mu(e);
		}
	}
	function Mu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Il(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Nl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Ml(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						zl(e, Ll(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (_n(l, ""), n.flags &= -33), zl(e, Ll(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Rl(e, Ll(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Nu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Nu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Pu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Fu(t, e), t = t.sibling;
		else au(t, !1);
	}
	function Fu(e, t) {
		var n = e.alternate;
		if (n === null) Zl(e, !1);
		else switch (e.tag) {
			case 3:
				if (mu = du = !1, Gl(), Pu(t, e), !du && !pu) {
					if (e = Wl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), mu = !0;
				}
				Wl = null;
				break;
			case 5:
				Pu(t, e);
				break;
			case 4:
				r = du, du = !1, Pu(t, e), du && (pu = !0), du = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Pu(t, e) : Zl(e, !1));
				break;
			case 30:
				r = du, i = Gl(), du = !1, Pu(t, e), du && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = wi(a, o), o = wi(n.memoizedProps, o);
				var s = Ei(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Kl = 0, t = iu(e, n, t, o, s, a, !0), Kl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Nd(e, e.memoizedProps.onUpdate), Wl = i) : i !== null && (i.push.apply(i, Wl), Wl = i), du = e.flags & 32 ? !0 : r;
				break;
			default: Pu(t, e);
		}
	}
	function Iu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) _u(e, t.alternate, t), t = t.sibling;
	}
	function Lu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					wl(4, n, n.return), Lu(n, r);
					break;
				case 1:
					Ol(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && El(n, n.return, i), Lu(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					Ol(n, n.return), n.tag !== 5 && n.tag !== 27 || jl(n), Lu(n, r);
					break;
				case 6:
					jl(n);
					break;
				case 26:
					Ol(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || U || i.parentNode.removeChild(i), Lu(n, r);
					break;
				case 22:
					n.memoizedState === null && Lu(n, r);
					break;
				case 30:
					Ol(n, n.return), Lu(n, r);
					break;
				case 7: Ol(n, n.return);
				default: Lu(n, r);
			}
			e = e.sibling;
		}
	}
	function Ru(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Ru(i, a, n), Cl(4, a);
					break;
				case 1:
					if (Ru(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) Do(l[i], c);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					s && o & 64 && Tl(a), Dl(a, a.return);
					break;
				case 27: n & 2 && Bl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Al(a), Ru(i, a, n), s && r === null && o & 4 && Pl(a), Dl(a, a.return);
					break;
				case 6:
					Al(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || ou || Km(bm(c.ownerDocument), a.type, c), Ru(i, a, n), s && r === null && o & 4 && Pl(a), Dl(a, a.return);
					break;
				case 12:
					Ru(i, a, n);
					break;
				case 31:
					Ru(i, a, n), s && o & 4 && Tu(i, a);
					break;
				case 13:
					Ru(i, a, n), s && o & 4 && Eu(i, a);
					break;
				case 22:
					a.memoizedState === null && Ru(i, a, n), Dl(a, a.return);
					break;
				case 30:
					Ru(i, a, n), Dl(a, a.return);
					break;
				case 7: Dl(a, a.return);
				default: Ru(i, a, n);
			}
			t = t.sibling;
		}
	}
	function zu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && za(n));
	}
	function Bu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && za(e));
	}
	function Vu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Hu(e, t, n, r), t = t.sibling;
		else i && ru(t);
	}
	function Hu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && nu(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Vu(e, t, n, r), a & 2048 && Cl(9, t);
				break;
			case 1:
				Vu(e, t, n, r);
				break;
			case 3:
				Vu(e, t, n, r), i && mu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && za(a)));
				break;
			case 12:
				if (a & 2048) {
					Vu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Vu(e, t, n, r);
				break;
			case 31:
				Vu(e, t, n, r);
				break;
			case 13:
				Vu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && nu(t), o._visibility & 2 ? Vu(e, t, n, r) : (o._visibility |= 2, Uu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && nu(s), o._visibility & 2 ? Vu(e, t, n, r) : Wu(e, t)), a & 2048 && zu(s, t);
				break;
			case 24:
				Vu(e, t, n, r), a & 2048 && Bu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Yl(a.child, !0), Yl(t.child, !0))), Vu(e, t, n, r);
				break;
			default: Vu(e, t, n, r);
		}
	}
	function Uu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Uu(a, o, s, c, i), Cl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Uu(a, o, s, c, i)) : u._visibility & 2 ? Uu(a, o, s, c, i) : Wu(a, o), i && l & 2048 && zu(o.alternate, o);
					break;
				case 24:
					Uu(a, o, s, c, i), i && l & 2048 && Bu(o.alternate, o);
					break;
				default: Uu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Wu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Wu(n, r), i & 2048 && zu(r.alternate, r);
					break;
				case 24:
					Wu(n, r), i & 2048 && Bu(r.alternate, r);
					break;
				default: Wu(n, r);
			}
			t = t.sibling;
		}
	}
	var Gu = 8192;
	function Ku(e, t, n) {
		if (e.subtreeFlags & Gu) for (e = e.child; e !== null;) qu(e, t, n), e = e.sibling;
	}
	function qu(e, t, n) {
		switch (e.tag) {
			case 26:
				Ku(e, t, n), e.flags & Gu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, Au, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Ku(e, t, n), e.flags & Gu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = Au;
				Au = bm(e.stateNode.containerInfo), Ku(e, t, n), Au = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Gu, Gu = 16777216, Ku(e, t, n), Gu = r) : Ku(e, t, n));
				break;
			case 30:
				if ((e.flags & Gu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Hl === null && (Hl = /* @__PURE__ */ new Map()), Hl.set(r, i);
				}
				Ku(e, t, n);
				break;
			default: Ku(e, t, n);
		}
	}
	function Ju(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Yu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				uu = r, Qu(r, e);
			}
			Ju(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Xu(e), e = e.sibling;
	}
	function Xu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Yu(e), e.flags & 2048 && wl(9, e, e.return);
				break;
			case 3:
				Yu(e);
				break;
			case 12:
				Yu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Zu(e)) : Yu(e);
				break;
			default: Yu(e);
		}
	}
	function Zu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				uu = r, Qu(r, e);
			}
			Ju(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					wl(8, t, t.return), Zu(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Zu(t));
					break;
				default: Zu(t);
			}
			e = e.sibling;
		}
	}
	function Qu(e, t) {
		for (; uu !== null;) {
			var n = uu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					wl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: za(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, uu = r;
			else a: for (n = e; uu !== null;) {
				r = uu;
				var i = r.sibling, a = r.return;
				if (xu(r), r === n) {
					uu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, uu = i;
					break a;
				}
				uu = a;
			}
		}
	}
	var $u = {
		getCacheForType: function(e) {
			var t = ja(La), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ja(La).controller.signal;
		}
	}, ed = typeof WeakMap == "function" ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, td = null, nd = !1, rd = !1, id = !1, ad = 0, od = 0, sd = 0, cd = 0, ld = 0, ud = 0, dd = 0, fd = null, pd = null, md = !1, hd = 0, gd = 0, _d = Infinity, vd = null, yd = null, X = 0, bd = null, xd = null, Sd = 0, Cd = 0, wd = null, Td = null, Ed = null, Dd = null, Od = null, kd = 0, Ad = null;
	function jd() {
		return G & 2 && J !== 0 ? J & -J : D.T === null ? Dt() : Pf();
	}
	function Md() {
		if (ud === 0) {
			if (!(J & 536870912) || P) {
				var e = dt;
				dt <<= 1, !(dt & 3932160) && (dt = 262144), ud = e;
			} else ud = 536870912;
		}
		return e = Po.current, e !== null && (e.flags |= 32), ud;
	}
	function Nd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(wi(e.memoizedProps, n))), Dd === null && (Dd = []), Dd.push(t.bind(null, r));
		}
	}
	function Pd(e, t, n) {
		(e === K && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) && (Vd(e, 0), Rd(e, J, ud, !1)), bt(e, n), G & 2 && e === K || (e === K && (!(G & 2) && (cd |= n), od === 4 && Rd(e, J, ud, !1)), Ef(e));
	}
	function Fd(e, t, n) {
		if (G & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ht(e, t), a = r ? Yd(e, t) : qd(e, t, !0), o = r;
		do {
			if (a === 0) {
				rd && !r && Rd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Ld(n)) a = qd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = fd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Vd(c, s).flags |= 256), s = qd(c, s, !1), s !== 2 && s !== 6) {
								if (id && !l) {
									c.errorRecoveryDisabledLanes |= o, cd |= o, a = 4;
									break a;
								}
								o = pd, pd = a, o !== null && (pd === null ? pd = o : pd.push.apply(pd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Vd(e, 0), Rd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Rd(r, t, ud, !nd);
							break a;
						case 2:
							pd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = hd + 300 - Je(), 10 < a)) {
						if (Rd(r, t, ud, !nd), mt(r, 0, !0) !== 0) break a;
						Sd = t, r.timeoutHandle = gp(Id.bind(null, r, n, pd, vd, md, t, ud, cd, dd, nd, o, "Throttled", -0, 0), a);
						break a;
					}
					Id(r, n, pd, vd, md, t, ud, cd, dd, nd, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Ef(e);
	}
	function Id(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: Tn
		}, Hl = null, qu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? hd - Je() : (a & 4194048) === a ? gd - Je() : 0, m = eh(d, m), m !== null) ? (Sd = a, e.cancelPendingCommit = m(nf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Rd(e, a, o, !l)) : nf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Ld(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Jr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Rd(e, t, n, r) {
		t = gt(e, t), t &= ~ld, t &= ~cd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - ot(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && St(e, n, t);
	}
	function zd() {
		return G & 6 ? !0 : (Df(0, !1), !1);
	}
	function Bd() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, Ca = Sa = null, ss(e), L = null, lo = 0, e = q;
			for (; e !== null;) Sl(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function Vd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Sd = 0, Bd(), K = e, q = n = Vi(e.current, null), J = t, Y = 0, td = null, nd = !1, rd = ht(e, t), id = !1, dd = ud = ld = cd = sd = od = 0, pd = fd = null, md = !1, ad = gt(e, t), ji(), n;
	}
	function Hd(e, t) {
		R = null, D.H = gc, t === to || t === ro ? (t = so(), Y = 3) : t === no ? (t = so(), Y = 4) : Y = t === Pc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, td = t, q === null && (od = 1, Oc(e, Yi(t, e.current)));
	}
	function Ud() {
		var e = Po.current;
		return e === null ? !0 : (J & 4194048) === J ? Fo === null : (J & 62914560) === J || J & 536870912 ? e === Fo : !1;
	}
	function Wd() {
		var e = D.H;
		return D.H = gc, e === null ? gc : e;
	}
	function Gd() {
		var e = D.A;
		return D.A = $u, e;
	}
	function Kd() {
		od = 4, nd || (J & 4194048) !== J && Po.current !== null || (rd = !0), !(sd & 134217727) && !(cd & 134217727) || K === null || Rd(K, J, ud, !1);
	}
	function qd(e, t, n) {
		var r = G;
		G |= 2;
		var i = Wd(), a = Gd();
		(K !== e || J !== t) && (vd = null, Vd(e, t)), t = !1;
		var o = od;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = td;
					switch (Y) {
						case 8:
							Bd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Po.current === null && (t = !0);
							var l = Y;
							if (Y = 0, td = null, $d(e, s, c, l), n && rd) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, td = null, $d(e, s, c, l);
					}
				}
				Jd(), o = od;
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ca = Sa = null, G = r, D.H = i, D.A = a, q === null && (K = null, J = 0, ji()), o;
	}
	function Jd() {
		for (; q !== null;) Zd(q);
	}
	function Yd(e, t) {
		var n = G;
		G |= 2;
		var r = Wd(), a = Gd();
		K !== e || J !== t ? (vd = null, _d = Je() + 500, Vd(e, t)) : rd = ht(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var o = td;
					b: switch (Y) {
						case 1:
							Y = 0, td = null, $d(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ao(o)) {
								Y = 0, td = null, Qd(t);
								break;
							}
							t = function() {
								Y !== 2 && Y !== 9 || K !== e || (Y = 7), Ef(e);
							}, o.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							ao(o) ? (Y = 0, td = null, Qd(t)) : (Y = 0, td = null, $d(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (q.tag) {
								case 26: s = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (s ? Ym(s) : c.stateNode.complete) {
										Y = 0, td = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, ef(u));
										}
										break b;
									}
							}
							Y = 0, td = null, $d(e, t, o, 5);
							break;
						case 6:
							Y = 0, td = null, $d(e, t, o, 6);
							break;
						case 8:
							Bd(), od = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Xd();
				break;
			} catch (t) {
				Hd(e, t);
			}
		while (1);
		return Ca = Sa = null, D.H = r, D.A = a, G = n, q === null ? (K = null, J = 0, ji(), od) : 0;
	}
	function Xd() {
		for (; q !== null && !Ke();) Zd(q);
	}
	function Zd(e) {
		var t = ml(e.alternate, e, ad);
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : q = t;
	}
	function Qd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Jc(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = Jc(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5:
				ss(t);
				var r = t;
				r === ua && (P ? (ga(r), r.tag === 5 && r.stateNode != null && (N = r.stateNode)) : (ga(r), P = !0));
			default: Sl(n, t), t = q = Hi(t, ad), t = ml(n, t, ad);
		}
		e.memoizedProps = e.pendingProps, t === null ? ef(e) : q = t;
	}
	function $d(e, t, n, r) {
		Ca = Sa = null, ss(t), L = null, lo = 0;
		var i = t.return;
		try {
			if (Nc(e, i, t, n, J)) {
				od = 1, Oc(e, Yi(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			od = 1, Oc(e, Yi(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (P || r === 1 ? e = !0 : rd || J & 536870912 ? e = !1 : (nd = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Po.current, r !== null && r.tag === 13 && (r.flags |= 16384))), tf(t, e)) : ef(t);
	}
	function ef(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				tf(t, nd);
				return;
			}
			e = t.return;
			var n = bl(t.alternate, t, ad);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		od === 0 && (od = 5);
	}
	function tf(e, t) {
		do {
			var n = xl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		od = 6, q = null;
	}
	function nf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			df();
		while (X !== 0);
		if (G & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === K && (q = K = null, J = 0), xd = t, bd = e, Sd = n, wd = a, Td = r, rf(e, t, n, s, c, l, f);
		}
	}
	function rf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Cd = s, s |= Ai, xt(e, n, s, r, i, a), Dd = null, (n & 335544064) === n ? (Od = Ha(e), r = 10262) : (Od = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yf(Qe, function() {
			return ff(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Vl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = D.T, D.T = null, i = O.p, O.p = 2, a = G, G |= 4;
			try {
				hu(e, t, n);
			} finally {
				G = a, O.p = i, D.T = r;
			}
		}
		X = 1, Vl ? Ed = Mp(o, e.containerInfo, Od, sf, cf, of, lf, ff, af, null, null) : (sf(), cf(), lf());
	}
	function af(e) {
		if (X !== 0) {
			var t = bd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function of() {
		X === 3 && (X = 0, Fu(xd, bd), X = 4);
	}
	function sf() {
		if (X === 1) {
			X = 0;
			var e = bd, t = xd, n = Sd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = D.T, D.T = null;
				var i = O.p;
				O.p = 2;
				var a = G;
				G |= 4;
				try {
					fu = pu = !1, ju(t, e, n), n = cp;
					var o = ei(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && $r(s.ownerDocument.documentElement, s)) {
						if (c !== null && ti(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Qr(s, h), v = Qr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					G = a, O.p = i, D.T = r;
				}
			}
			e.current = t, X = 2;
		}
	}
	function cf() {
		if (X === 2) {
			X = 0;
			var e = bd, t = xd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = D.T, D.T = null;
				var r = O.p;
				O.p = 2;
				var i = G;
				G |= 4;
				try {
					_u(e, t.alternate, t);
				} finally {
					G = i, O.p = r, D.T = n;
				}
			}
			X = 3;
		}
	}
	function lf() {
		if (X === 4 || X === 3) {
			X = 0;
			var e = Ed;
			Ed = null, qe();
			var t = bd, n = xd, r = Sd, i = Td, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? X = 5 : (X = 0, xd = bd = null, uf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (yd = null), Et(r), n = n.stateNode, it && typeof it.onCommitFiberRoot == "function") try {
				it.onCommitFiberRoot(rt, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = D.T, a = O.p, O.p = 2, D.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					D.T = n, O.p = a;
				}
			}
			if (i = Dd, o = Od, Od = null, i !== null && (Dd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Sd & 3 && df(), Ef(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Ad ? kd++ : (kd = 0, Ad = t) : (kd = 0, Ad = null), Df(0, !1);
		}
	}
	function uf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, za(t)));
	}
	function df() {
		return Ed !== null && (Ed.skipTransition(), Ed = null), sf(), cf(), lf(), ff();
	}
	function ff() {
		if (X !== 5) return !1;
		var e = bd, t = Cd;
		Cd = 0;
		var n = Et(Sd), r = D.T, a = O.p;
		try {
			O.p = 32 > n ? 32 : n, D.T = null, n = wd, wd = null;
			var o = bd, s = Sd;
			if (X = 0, xd = bd = null, Sd = 0, G & 6) throw Error(i(331));
			var c = G;
			if (G |= 4, Xu(o.current), Hu(o, o.current, s, n), G = c, Df(0, !1), it && typeof it.onPostCommitFiberRoot == "function") try {
				it.onPostCommitFiberRoot(rt, o);
			} catch {}
			return !0;
		} finally {
			O.p = a, D.T = r, uf(e, t);
		}
	}
	function pf(e, t, n) {
		t = Yi(n, t), t = Ac(e.stateNode, t, 2), e = xo(e, t, 2), e !== null && (bt(e, 2), Ef(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) pf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				pf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (yd === null || !yd.has(r))) {
					e = Yi(n, e), n = jc(2), r = xo(t, n, 2), r !== null && (Mc(n, r, t, e), bt(r, 2), Ef(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new ed();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (id = !0, i.add(n), e = hf.bind(null, e, t, n), t.then(e, e));
	}
	function hf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, K === e && (J & n) === n && (od === 4 || od === 3 && (J & 62914560) === J && 300 > Je() - hd ? G & 2 ? ld |= n : Vd(e, 0) : ld |= n, dd === J && (dd = 0)), Ef(e);
	}
	function gf(e, t) {
		t === 0 && (t = vt()), e = Pi(e, t), e !== null && (bt(e, t), Ef(e));
	}
	function _f(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), gf(e, n);
	}
	function vf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), gf(e, n);
	}
	function yf(e, t) {
		return We(e, t);
	}
	var bf = null, xf = null, Sf = !1, Cf = !1, wf = !1, Tf = 0;
	function Ef(e) {
		e !== xf && e.next === null && (xf === null ? bf = xf = e : xf = xf.next = e), Cf = !0, Sf || (Sf = !0, Nf());
	}
	function Df(e, t) {
		if (!wf && Cf) {
			wf = !0;
			do
				for (var n = !1, r = bf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - ot(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Mf(r, a));
						} else a = J, a = mt(r, r === K ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ht(r, a) || (n = !0, Mf(r, a));
					}
					r = r.next;
				}
			while (n);
			wf = !1;
		}
	}
	function Of() {
		kf();
	}
	function kf() {
		Cf = Sf = !1;
		var e = 0;
		Tf !== 0 && hp() && (e = Tf);
		for (var t = Je(), n = null, r = bf; r !== null;) {
			var i = r.next, a = Af(r, t);
			a === 0 ? (r.next = null, n === null ? bf = i : n.next = i, i === null && (xf = n)) : (n = r, (e !== 0 || a & 3) && (Cf = !0)), r = i;
		}
		X !== 0 && X !== 5 || Df(e, !1), Tf !== 0 && (Tf = 0);
	}
	function Af(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - ot(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = _t(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = K, n = J, n = mt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ge(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ht(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ge(r), Et(n)) {
				case 2:
				case 8:
					n = Ze;
					break;
				case 32:
					n = Qe;
					break;
				case 268435456:
					n = et;
					break;
				default: n = Qe;
			}
			return r = jf.bind(null, e), n = We(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ge(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function jf(e, t) {
		if (X !== 0 && X !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (df() && e.callbackNode !== n) return null;
		var r = J;
		return r = mt(e, e === K ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Fd(e, r, t), Af(e, Je()), e.callbackNode != null && e.callbackNode === n ? jf.bind(null, e) : null);
	}
	function Mf(e, t) {
		if (df()) return null;
		Fd(e, t, !0);
	}
	function Nf() {
		bp(function() {
			G & 6 ? We(Xe, Of) : kf();
		});
	}
	function Pf() {
		if (Tf === 0) {
			var e = Ga;
			e === 0 && (e = ut, ut <<= 1, !(ut & 261888) && (ut = 256)), Tf = e;
		}
		return Tf;
	}
	function Ff(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : wn(e);
	}
	function If(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Ff((i[jt] || null).action), o = r.submitter;
			o && (t = (t = o[jt] || null) ? Ff(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Kn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Tf !== 0) {
								var e = new FormData(i, o);
								nc(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), nc(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Lf = 0; Lf < xi.length; Lf++) {
		var Rf = xi[Lf];
		Si(Rf.toLowerCase(), "on" + (Rf[0].toUpperCase() + Rf.slice(1)));
	}
	Si(pi, "onAnimationEnd"), Si(mi, "onAnimationIteration"), Si(hi, "onAnimationStart"), Si("dblclick", "onDoubleClick"), Si("focusin", "onFocus"), Si("focusout", "onBlur"), Si(gi, "onTransitionRun"), Si(_i, "onTransitionStart"), Si(vi, "onTransitionCancel"), Si(yi, "onTransitionEnd"), Jt("onMouseEnter", ["mouseout", "mouseover"]), Jt("onMouseLeave", ["mouseout", "mouseover"]), Jt("onPointerEnter", ["pointerout", "pointerover"]), Jt("onPointerLeave", ["pointerout", "pointerover"]), qt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), qt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), qt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), qt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), qt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), qt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var zf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zf));
	function Vf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Di(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Di(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[j];
		n === void 0 && (n = t[j] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Gf(t, e, 2, !1), n.add(r));
	}
	function Hf(e, t, n) {
		var r = 0;
		t && (r |= 4), Gf(n, e, r, t);
	}
	var Uf = "_reactListening" + Math.random().toString(36).slice(2);
	function Wf(e) {
		if (!e[Uf]) {
			e[Uf] = !0, Gt.forEach(function(t) {
				t !== "selectionchange" && (Bf.has(t) || Hf(t, !1, e), Hf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Uf] || (t[Uf] = !0, Hf("selectionchange", !1, t));
		}
	}
	function Gf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !Fn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Kf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = zt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Mn(function() {
			var r = a, i = Dn(n), s = [];
			a: {
				var c = bi.get(e);
				if (c !== void 0) {
					var l = Kn, u = e;
					switch (e) {
						case "keypress": if (Vn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = ur;
							break;
						case "focusin":
							u = "focus", l = tr;
							break;
						case "focusout":
							u = "blur", l = tr;
							break;
						case "beforeblur":
						case "afterblur":
							l = tr;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = $n;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = er;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = pr;
							break;
						case pi:
						case mi:
						case hi:
							l = nr;
							break;
						case yi:
							l = mr;
							break;
						case "scroll":
						case "scrollend":
							l = Jn;
							break;
						case "wheel":
							l = hr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = rr;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = dr;
							break;
						case "submit":
							l = fr;
							break;
						case "toggle":
						case "beforetoggle": l = gr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Nn(m, p), g != null && d.push(qf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== En && (u = n.relatedTarget || n.fromElement) && (zt(u) || u[Mt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? zt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = $n, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = dr, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Vt(c), h = l == null ? u : Vt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, zt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? C(c, l, Yf) : null, c !== null && Xf(s, u, c, d, !1), l !== null && f !== null && Xf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Ir;
					else if (Ar(c)) {
						if (Lr) _ = Kr;
						else {
							_ = Wr;
							var v = Ur;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && xn(r.elementType) && (_ = Ir) : _ = Gr;
					if (_ &&= _(e, r)) {
						jr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Vt(r) : window, e) {
					case "focusin":
						(Ar(v) || v.contentEditable === "true") && (ri = v, ii = r, ai = null);
						break;
					case "focusout":
						ai = ii = ri = null;
						break;
					case "mousedown":
						oi = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						oi = !1, si(s, n, i);
						break;
					case "selectionchange": if (ni) break;
					case "keydown":
					case "keyup": si(s, n, i);
				}
				var y;
				if (vr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else Er ? wr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (xr && n.locale !== "ko" && (Er || b !== "onCompositionStart" ? b === "onCompositionEnd" && Er && (y = Bn()) : (Ln = i, Rn = "value" in Ln ? Ln.value : Ln.textContent, Er = !0)), v = Jf(r, b), 0 < v.length && (b = new ir(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = Tr(n), y !== null && (b.data = y)))), (y = br ? Dr(e, n) : Or(e, n)) && (b = Jf(r, "onBeforeInput"), 0 < b.length && (v = new ir("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), If(s, e, r, n, i);
			}
			Vf(s, t);
		});
	}
	function qf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Jf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Nn(e, n), i != null && r.unshift(qf(e, i, a)), i = Nn(e, t), i != null && r.push(qf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Yf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Xf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Nn(n, a), l != null && o.unshift(qf(n, l, c))) : i || (l = Nn(n, a), l != null && o.push(qf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Zf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
	function $f(e) {
		return (typeof e == "string" ? e : "" + e).replace(Zf, "\n").replace(Qf, "");
	}
	function ep(e, t) {
		return t = $f(t), $f(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || _n(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && _n(e, "" + r);
				else return;
				break;
			case "className":
				tn(e, "class", r);
				break;
			case "tabIndex":
				tn(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				tn(e, n, r);
				break;
			case "style":
				bn(e, r, o);
				return;
			case "data": if (t !== "object") {
				tn(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = wn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = wn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Tn);
				return;
			case "onScroll":
				r != null && Q("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = wn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), en(e, "popover", r);
				break;
			case "xlinkActuate":
				nn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				nn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				nn(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				nn(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				nn(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				nn(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				nn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				nn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				nn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				en(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = Sn.get(n) || n, en(e, n, r);
			else return;
		}
		M = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				bn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") _n(e, r);
				else if (typeof r == "number" || typeof r == "bigint") _n(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = Tn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Kt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[jt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					M = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : en(e, n, r);
				}
				return;
		}
		M = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				fn(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && mn(e, !!r, n, !0) : mn(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				gn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < zf.length; r++) Q(zf[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (xn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (M = !0), o = m;
							break;
						case "name":
							m !== f && (M = !0), a = m;
							break;
						case "checked":
							m !== f && (M = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (M = !0), d = m;
							break;
						case "value":
							m !== f && (M = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (M = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				dn(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (M = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (M = !0), c = o;
						break;
					case "multiple": o !== l && (M = !0), s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? mn(e, !!n, n ? [] : "", !1) : mn(e, !!n, t, !0)) : mn(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (M = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (M = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				hn(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (M = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (xn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[At] = r, n[jt] = t, np(n, e, t), Ut(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[It] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : w({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), f(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return _(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), f(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return _(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return !0;
		t = _(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		f(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = _(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		f(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = p(this._fragmentFiber);
		e !== null && (e = _(e), e = lp(e).activeElement, e !== null && f(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = _(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), f(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = _(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), f(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = _(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return f(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = _(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = p(this._fragmentFiber);
		return t === null ? this : _(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		f(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = _(t);
		if (n.length === 0) {
			if (n = r, m(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = h(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = _(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = _(n[0]), i = _(n[n.length - 1]);
		var a = m(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = zt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = p(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = C(n, a, S), t === null ? t = !1 : (f(t, !0, b, a, n), a = v, v = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = C(r, a, S), t === null ? t = !1 : (f(t, !0, x, a, r), a = v, y = v = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		f(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = h(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || p(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = _(r), Zp(e, n);
				return;
			}
			if (r = _(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = _(a), Zp(a, n)) : _(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = _(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), Rt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[It]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && $(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Tn && (e.onclick = null), Rt(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Rt(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = O.d;
	O.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = zd();
		return e || t;
	}
	function Cm(e) {
		var t = Bt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ic(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = un(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), Ut(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + un(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + un(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + un(n.imageSizes) + "\"]")) : i += "[href=\"" + un(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = w({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[Lt] = !0, o.onload = o.onerror = function() {
					Wt(o);
				}), Ut(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + un(r) + "\"][href=\"" + un(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = w({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), Ut(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Ht(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = w({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					Ut(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Ht(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = w({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Ut(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Ht(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = w({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Ut(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = Ae.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Ht(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Ht(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Ht(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + un(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return w({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[Lt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Lt] = !0, t.onload = t.onerror = Wt.bind(null, t), np(t, "link", n), Ut(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + un(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + un(n.href) + "\"]");
				if (r) return t.instance = r, Ut(r), r;
				var a = w({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ut(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ut(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), Ut(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, Ut(a), a) : (r = n, (a = vm.get(o)) && (r = w({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ut(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[It] || a[At] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ut(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), Ut(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: E,
		Provider: null,
		Consumer: null,
		_currentValue: we,
		_currentValue2: we,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = yt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yt(0), this.hiddenUpdates = yt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = zi(3, null, null, t), e.current = a, a.stateNode = e, t = Ra(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, vo(a), e;
	}
	function uh(e) {
		return e ? (e = Li, e) : Li;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = bo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = xo(e, r, t), n !== null && (Pd(n, e, t), So(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Pi(e, 67108864);
			t !== null && Pd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = jd();
			t = Tt(t);
			var n = Pi(e, t);
			n !== null && Pd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = D.T;
		D.T = null;
		var a = O.p;
		try {
			O.p = 2, yh(e, t, n, r);
		} finally {
			O.p = a, D.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = D.T;
		D.T = null;
		var a = O.p;
		try {
			O.p = 8, yh(e, t, n, r);
		} finally {
			O.p = a, D.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Kf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Bt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = pt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - ot(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Ef(a), !(G & 6) && (_d = Je() + 500, Df(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Pi(a, 2), s !== null && Pd(s, a, 2), zd(), ph(a, 2);
					}
					if (a = bh(r), a === null && Kf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Kf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = Dn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = zt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ye()) {
				case Xe: return 2;
				case Ze: return 8;
				case Qe:
				case $e: return 32;
				case et: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Bt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = zt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Ot(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ot(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				En = r, n.target.dispatchEvent(r), En = null;
			} else return t = Bt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Bt(n);
				a !== null && (e.splice(t, 3), t -= 3, nc(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[jt] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[jt] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, jd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), zd(), t[Mt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Dt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	O.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: D,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			rt = Jh.inject(qh), it = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Tc, s = Ec, c = Dc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[Mt] = t.current, Wf(e), new Wh(t);
	};
})), me = /* @__PURE__ */ le(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = pe();
})), he = {
	area: !0,
	base: !0,
	br: !0,
	col: !0,
	embed: !0,
	hr: !0,
	img: !0,
	input: !0,
	link: !0,
	meta: !0,
	param: !0,
	source: !0,
	track: !0,
	wbr: !0,
	"!doctype": !0,
	"!DOCTYPE": !0
}, ge = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?("[^"]*"|'[^']*')/g;
function _e(e) {
	let t = {
		type: "tag",
		name: "",
		voidElement: !1,
		attrs: {},
		children: []
	}, n = e.match(/<\/?([^\s]+?)[/\s>]/);
	if (n && (t.name = n[1], (he[n[1]] || e.charAt(e.length - 2) === "/") && (t.voidElement = !0), t.name.startsWith("!--"))) {
		let t = e.indexOf("-->");
		return {
			type: "comment",
			comment: t === -1 ? "" : e.slice(4, t)
		};
	}
	let r = new RegExp(ge), i = null;
	for (; i = r.exec(e), i !== null;) if (i[0].trim()) {
		if (i[1]) {
			let e = i[1].trim(), n = [e, null], a = e.indexOf("=");
			a > -1 && (n = [e.slice(0, a), e.slice(a + 1)]), t.attrs[n[0]] = n[1], r.lastIndex--;
		} else i[2] && (t.attrs[i[2]] = i[3].trim().substring(1, i[3].length - 1));
	}
	return t;
}
var ve = /<!--[\s\S]*?-->|<[a-zA-Z0-9\-!/](?:"[^"]*"|'[^']*'|[^'">])*>/g, ye = /<\/?([^\s]+?)[/\s>]/, be = /^\s*$/, xe = /^(script|style)$/i, Se = "\0", Ce = Object.create(null);
function D(e) {
	e.forEach(function(e) {
		if (e.type === "text") e.content = e.content.split(Se).join("<");
		else if (e.type === "comment") e.comment = e.comment.split(Se).join("<");
		else {
			for (let t in e.attrs) {
				let n = e.attrs[t];
				typeof n == "string" && n.indexOf(Se) > -1 && (e.attrs[t] = n.split(Se).join("<"));
			}
			e.children.length && D(e.children);
		}
	});
}
function O(e, t) {
	let n = t && t.components || Ce, r = t && t.allowedTags, i = !1;
	if (r) {
		let t = typeof r == "function" ? r : function(e) {
			return r.indexOf(e) > -1;
		}, n = "", a = 0;
		ve.lastIndex = 0;
		let o;
		for (; o = ve.exec(e);) {
			let r = o[0];
			n += e.slice(a, o.index);
			let s = r.match(ye);
			r.startsWith("<!--") || s && t(s[1]) ? (n += r, a = o.index + r.length) : (i = !0, n += Se, a = o.index + 1, ve.lastIndex = a);
		}
		e = n + e.slice(a);
	}
	let a = [], o = [], s, c = -1, l = !1, u = 0, d;
	if (e.indexOf("<") !== 0) {
		let t = e.indexOf("<");
		a.push({
			type: "text",
			content: t === -1 ? e : e.substring(0, t)
		});
	}
	let f = [], p;
	for (; p = ve.exec(e);) f.push(p);
	return f.forEach(function(e, t) {
		let n = e[0];
		if (!n || n.startsWith("<!--")) return;
		let r = 0, i = 0, a = -1, o = null;
		for (let e = 0; e < n.length; e++) {
			let t = n.charAt(e);
			o ? t === o && (o = null) : t === "\"" || t === "'" ? o = t : t === "<" ? (r++, r === 2 && (a = e)) : t === ">" && i++;
		}
		let s = a > -1 && /[a-zA-Z0-9\-!/]/.test(n.charAt(a + 1));
		if (r > i && s) {
			let e = n.substring(0, a), r = n.substring(e.length);
			f[t][0] = r, f[t].index += e.length;
		}
	}), f.forEach(function(t, r) {
		let i = t[0];
		if (!i) return;
		let p = t.index;
		if (p < u) return;
		if (l) {
			if (i !== "</" + s.name + ">") return;
			l = !1;
		}
		let m = i.charAt(1) !== "/", h = i.startsWith("<!--"), g = p + i.length, _ = e.charAt(g), v = f[r + 1], y;
		if (_ === "<" && v) {
			let t = e.substring(g, v.index);
			y = t.split("<").length > t.split(">").length;
		}
		let b;
		if (h) {
			let t = _e(i);
			if (c < 0) return a.push(t), a;
			b = o[c], b.children.push(t);
			let n = e.slice(g, v ? v.index : void 0);
			return n.length > 0 && b.children.push({
				type: "text",
				content: n
			}), a;
		}
		if (m) {
			c++, s = _e(i), s.type === "tag" && n[s.name] && (s.type = "component", l = !0);
			let t = !1;
			if (!l && !s.voidElement && xe.test(s.name)) {
				t = !0, d ||= e.toLowerCase();
				let n = d.indexOf("</" + s.name.toLowerCase() + ">", g), r = n === -1 ? e.length : n, i = e.slice(g, r);
				i && s.children.push({
					type: "text",
					content: i
				}), u = r;
			}
			!s.voidElement && !l && !t && _ && _ !== "<" && s.children.push({
				type: "text",
				content: e.slice(g, v ? v.index : void 0)
			}), c === 0 && a.push(s), b = o[c - 1], b && b.children.push(s), o[c] = s;
		}
		if ((!m || s.voidElement) && (c > -1 && (s.voidElement || s.name === i.slice(2, -1)) && (c--, s = c === -1 ? a : o[c]), !l && (_ !== "<" || y) && _)) {
			b = c === -1 ? a : o[c].children;
			let t = v ? v.index : -1, n = e.slice(g, t === -1 ? void 0 : t);
			be.test(n) && (n = " "), (t > -1 && c + b.length >= 0 || n !== " ") && b.push({
				type: "text",
				content: n
			});
		}
	}), i && D(a), a;
}
function we(e) {
	let t = [];
	for (let n in e) e[n] === null ? t.push(n) : t.push(n + "=\"" + String(e[n]).replace(/"/g, "&quot;") + "\"");
	return t.length ? " " + t.join(" ") : "";
}
function Te(e, t) {
	switch (t.type) {
		case "text": return e + t.content;
		case "tag": {
			let n = t.voidElement && t.name.toLowerCase() !== "!doctype" ? "/>" : ">";
			return e += "<" + t.name + (t.attrs ? we(t.attrs) : "") + n, t.voidElement ? e : e + t.children.reduce(Te, "") + "</" + t.name + ">";
		}
		case "comment": return e += "<!--" + t.comment + "-->", e;
	}
}
function Ee(e) {
	return e.reduce(function(e, t) {
		return e + Te("", t);
	}, "");
}
var De = {
	parse: O,
	stringify: Ee
}, k = /* @__PURE__ */ se(ce()), A = (e, t) => {
	if (!e) return !1;
	let n = e.props?.children ?? e.children;
	return t ? n.length > 0 : !!n;
}, Oe = (e) => {
	if (!e) return [];
	let t = e.props?.children ?? e.children;
	return e.props?.i18nIsDynamicList ? Ae(t) : t;
}, ke = (e) => Ae(e).every(k.isValidElement), Ae = (e) => Array.isArray(e) ? e : [e], je = (e, t) => {
	let n = { ...t };
	return n.props = {
		...t.props,
		...e.props
	}, n;
}, Me = (e) => {
	let t = {};
	if (!e) return t;
	let n = (e) => {
		Ae(e).forEach((e) => {
			o(e) || (A(e) ? n(Oe(e)) : x(e) && !(0, k.isValidElement)(e) && Object.assign(t, e));
		});
	};
	return n(e), t;
}, Ne = (e, t, n, r) => {
	if (!e) return "";
	let i = "", a = Ae(e), c = t?.transSupportBasicHtmlNodes ? t.transKeepBasicHtmlNodesFor ?? [] : [];
	return a.forEach((e, a) => {
		if (o(e)) i += `${e}`;
		else if ((0, k.isValidElement)(e)) {
			let { props: s, type: l } = e, u = Object.keys(s).length, d = c.indexOf(l) > -1, f = s.children;
			if (!f && d && !u) {
				i += `<${l}/>`;
				return;
			}
			if (!f && (!d || u) || s.i18nIsDynamicList) {
				i += `<${a}></${a}>`;
				return;
			}
			if (d && u <= 1) {
				let e = o(f) ? f : Ne(f, t, n, r);
				i += `<${l}>${e}</${l}>`;
				return;
			}
			let p = Ne(f, t, n, r);
			i += `<${a}>${p}</${a}>`;
		} else if (e === null) s(n, "TRANS_NULL_VALUE", "Passed in a null value as child", { i18nKey: r });
		else if (x(e)) {
			let { format: t, ...a } = e, o = Object.keys(a);
			if (o.length === 1) {
				let e = t ? `${o[0]}, ${t}` : o[0];
				i += `{{${e}}}`;
				return;
			}
			if (!o.length && Object.keys(e).length === 1 && "format" in e) {
				i += "{{format}}";
				return;
			}
			s(n, "TRANS_INVALID_OBJ", "Invalid child - Object should only have keys {{ value, format }} (format is optional).", {
				i18nKey: r,
				child: e
			});
		} else s(n, "TRANS_INVALID_VAR", "Passed in a variable like {number} - pass variables for interpolation as full objects like {{number}}.", {
			i18nKey: r,
			child: e
		});
	}), i;
}, Pe = (e, t, r, i, a, s, l, u) => {
	if (r === "") return [];
	let d = a.transKeepBasicHtmlNodesFor || [], f = r && new RegExp(d.map((e) => `<${e}`).join("|")).test(r), p = typeof a.unescape == "function" ? a.unescape : n().unescape;
	if (!e && !t && !f && !l) return [u && o(r) ? p(r) : r];
	let m = l || u, h = t ?? {}, g = (e) => {
		Ae(e).forEach((e) => {
			o(e) || (A(e) ? g(Oe(e)) : x(e) && !(0, k.isValidElement)(e) && Object.assign(h, e));
		});
	};
	g(e);
	let _ = Object.keys(h), v = De.parse(`<0>${r}</0>`, { allowedTags: (e) => /^\d+$/.test(e) || d.indexOf(e) > -1 || _.indexOf(e) > -1 }), y = {
		...h,
		...s
	}, b = (e, t, n) => {
		let r = Oe(e), i = C(r, t.children, n);
		return ke(r) && i.length === 0 || e.props?.i18nIsDynamicList ? r : i;
	}, S = (e, t, n, r, i) => {
		e.dummy ? (e.children = t, n.push((0, k.cloneElement)(e, { key: r }, i ? void 0 : t))) : n.push(...k.Children.map([e], (e) => {
			if (e.type === k.Fragment || e.props?.i18nIsDynamicList !== void 0) {
				let n = { key: r };
				return e && e.props && Object.keys(e.props).forEach((t) => {
					t !== "children" && t !== "i18nIsDynamicList" && (n[t] = e.props[t]);
				}), (0, k.createElement)(e.type, n, i ? null : t);
			}
			let n = { key: r };
			return e && e.props && Object.keys(e.props).forEach((t) => {
				t !== "ref" && t !== "children" && (n[t] = e.props[t]);
			}), (0, k.cloneElement)(e, n, i ? null : t);
		}));
	}, C = (e, n, r) => {
		let s = Ae(e), l = Ae(n), u = {};
		return l.reduce((e, n, l) => {
			let h = n.children?.[0]?.content && i.services.interpolator.interpolate(n.children[0].content, y, i.language), g = m && h ? p(h) : h;
			if (n.type === "tag") {
				let p = s[parseInt(n.name, 10)];
				!p && t && (p = t[n.name]), r.length === 1 && !p && x(r[0]) && (p = r[0][n.name]), p ||= {};
				let h = { ...n.attrs };
				m && Object.keys(h).forEach((e) => {
					let t = h[e];
					o(t) && (h[e] = c(t));
				});
				let _ = Object.keys(h).length === 0 ? p : je({ props: h }, p), v = (0, k.isValidElement)(_), w = v && A(n, !0) && !n.voidElement, ee = f && x(_) && _.dummy && !v, te = x(t) && Object.hasOwnProperty.call(t, n.name);
				if (o(_)) {
					let t = i.services.interpolator.interpolate(_, y, i.language);
					e.push(t);
				} else if (A(_) || w) {
					let t = b(_, n, r);
					S(_, t, e, l);
				} else if (ee) {
					let t = C(s, n.children, r);
					S(_, t, e, l);
				} else if (Number.isNaN(parseFloat(n.name))) {
					if (te) {
						let t = b(_, n, r);
						S(_, t, e, l, n.voidElement);
					} else if (a.transSupportBasicHtmlNodes && d.indexOf(n.name) > -1) {
						if (n.voidElement) e.push((0, k.createElement)(n.name, { key: `${n.name}-${l}` }));
						else {
							let t = u[n.name] || 0;
							u[n.name] = t + 1;
							let i, a = 0;
							for (let e = 0; e < s.length; e += 1) {
								let r = s[e];
								if ((0, k.isValidElement)(r) && r.type === n.name) {
									if (a === t) {
										i = r;
										break;
									}
									a += 1;
								}
							}
							let o = i ? Ae(Oe(i)) : s, c = C(o, n.children, r);
							e.push((0, k.createElement)(n.name, { key: `${n.name}-${l}` }, c));
						}
					} else if (n.voidElement) e.push(`<${n.name} />`);
					else {
						let t = C(s, n.children, r);
						e.push(`<${n.name}>${t}</${n.name}>`);
					}
				} else if (x(_) && !v) {
					let t = n.children[0] ? g : null;
					t && e.push(t);
				} else S(_, g, e, l, n.children.length !== 1 || !g);
			} else if (n.type === "text") {
				let t = a.transWrapTextNodes, r = m ? p(i.services.interpolator.interpolate(n.content, y, i.language)) : i.services.interpolator.interpolate(n.content, y, i.language);
				t ? e.push((0, k.createElement)(t, { key: `${n.name}-${l}` }, r)) : e.push(r);
			}
			return e;
		}, []);
	};
	return Oe(C([{
		dummy: !0,
		children: e || []
	}], v, Ae(e || []))[0]);
}, Fe = (e, t, n) => {
	let r = e.key || t, i = (0, k.cloneElement)(e, { key: r });
	if (!i.props || !i.props.children || n.indexOf(`${t}/>`) < 0 && n.indexOf(`${t} />`) < 0) return i;
	function a() {
		return (0, k.createElement)(k.Fragment, null, i);
	}
	return (0, k.createElement)(a, { key: r });
}, Ie = (e, t) => e.map((e, n) => Fe(e, n, t)), Le = (e, t) => {
	let n = {};
	return Object.keys(e).forEach((r) => {
		Object.assign(n, { [r]: Fe(e[r], r, t) });
	}), n;
}, Re = (e, t, n, r) => e ? Array.isArray(e) ? Ie(e, t) : x(e) ? Le(e, t) : (l(n, "TRANS_INVALID_COMPONENTS", "<Trans /> \"components\" prop expects an object or array", { i18nKey: r }), null) : null, ze = (e) => !x(e) || Array.isArray(e) ? !1 : Object.keys(e).reduce((e, t) => e && Number.isNaN(Number.parseFloat(t)), !0);
function Be({ children: t, count: i, parent: s, i18nKey: c, context: u, tOptions: d = {}, values: f, defaults: p, components: m, ns: h, i18n: g, t: _, shouldUnescape: v, ...y }) {
	let b = g || r();
	if (!b) return l(b, "NO_I18NEXT_INSTANCE", "Trans: You need to pass in an i18next instance using initReactI18next or by passing it via props or context. In monorepo setups, make sure there is only one instance of react-i18next.", { i18nKey: c }), t;
	let x = _ || b.t.bind(b) || ((e) => e), C = {
		...n(),
		...b.options?.react
	}, w = h || (x.ns ? void 0 : b.options?.defaultNS || "translation");
	o(w) && (w = [w]);
	let { transDefaultProps: ee } = C, te = ee?.tOptions ? {
		...ee.tOptions,
		...d
	} : d, ne = v ?? ee?.shouldUnescape, re = ee?.values ? {
		...ee.values,
		...f
	} : f, ie = ee?.components ? {
		...ee.components,
		...m
	} : m, T = Ne(t, C, b, c), ae = Array.isArray(c) ? c[c.length - 1] : c, E = p || te?.defaultValue || T || C.transEmptyNodeValue || (typeof ae == "function" ? a(ae) : ae), { hashTransKey: oe } = C, se = c || (oe ? oe(T || E) : T || E);
	f = b.options?.interpolation?.defaultVariables ? {
		...b.options.interpolation.defaultVariables,
		...re
	} : re;
	let ce = Me(t);
	ce && typeof ce.count == "number" && i === void 0 && (i = ce.count), i === void 0 && (i = te?.count);
	let le = f || i !== void 0 && !b.options?.interpolation?.alwaysFormat || !t, ue = e(b), de = le && (ue ? !ue.options?.escapeVariables : (te.interpolation?.escapeValue ?? b.options?.interpolation?.escapeValue) === !1), fe = le ? te.interpolation : { interpolation: {
		...te.interpolation,
		prefix: "#$?",
		suffix: "?$#"
	} };
	de && !ue && (fe = { interpolation: {
		...te.interpolation,
		escapeValue: !0
	} });
	let pe = {
		...b.options?.interpolation,
		...te.interpolation
	}, me = pe.escape || b.services?.interpolator?.escape, he = Object.keys(ce).map((e) => `${pe.prefix ?? "{{"}${e}${pe.suffix ?? "}}"}`), ge = le && !ue && he.length > 0 && pe.skipOnVariables !== !1 && !te.missingInterpolationHandler && !b.options?.missingInterpolationHandler && typeof me == "function" && he.every((e) => me(e) === e), _e = de && ue ? S : (e) => e, ve = {
		..._e(te),
		context: u || te.context,
		count: i,
		..._e(f),
		...ge && { missingInterpolationHandler: (e, t, n) => n && Object.prototype.hasOwnProperty.call(n, t[1].trim()) ? "" : t[0] },
		...fe,
		defaultValue: E,
		ns: w
	}, ye = se ? x(se, ve) : E;
	ye === se && E && (ye = E);
	let be = Re(ie, ye, b, c), xe = be || t, Se = null;
	ze(be) ? (Se = be, xe = t) : be && !Array.isArray(be) && (Se = be, xe = void 0);
	let Ce = Pe(xe, Se, ye, b, C, ve, ne, de), D = s ?? C.defaultTransParent;
	return D ? (0, k.createElement)(D, y, Ce) : Ce;
}
// node_modules/react-i18next/dist/es/Trans.js
function Ve({ children: e, count: t, parent: n, i18nKey: i, context: a, tOptions: o = {}, values: s, defaults: c, components: l, ns: u, i18n: f, t: p, shouldUnescape: m, ...h }) {
	let { i18n: g, defaultNS: _ } = (0, k.useContext)(d) || {}, v = f || g || r(), y = p || v?.t.bind(v);
	return Be({
		children: e,
		count: t,
		parent: n,
		i18nKey: i,
		context: a,
		tOptions: o,
		values: s,
		defaults: c,
		components: l,
		ns: u || (y?.ns ? void 0 : _ || v?.options?.defaultNS),
		i18n: v,
		t: p,
		shouldUnescape: m,
		...h
	});
}
// web/src/plugins/scope.ts
var He = me(), Ue = (0, k.createContext)(null), We = {
	name: "arrow-left",
	size: 24,
	node: [["path", {
		d: "m12 19-7-7 7-7",
		key: "1l729n"
	}], ["path", {
		d: "M19 12H5",
		key: "x3x0zl"
	}]]
};
We.node;
var Ge = T(We), Ke = {
	name: "arrow-right",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "m12 5 7 7-7 7",
		key: "xquz4c"
	}]]
};
Ke.node;
var qe = T(Ke), Je = {
	name: "bell",
	size: 24,
	node: [["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}], ["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}]]
};
Je.node;
var Ye = T(Je), Xe = {
	name: "bookmark",
	size: 24,
	node: [["path", {
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
		key: "oz39mx"
	}]]
};
Xe.node;
var Ze = T(Xe), Qe = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
Qe.node;
var $e = T(Qe), et = {
	name: "download",
	size: 24,
	node: [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]
};
et.node;
var tt = T(et), nt = {
	name: "external-link",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]
};
nt.node;
var rt = T(nt), it = {
	name: "eye-off",
	size: 24,
	node: [
		["path", {
			d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
			key: "ct8e1f"
		}],
		["path", {
			d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
			key: "151rxh"
		}],
		["path", {
			d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
			key: "13bj9a"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]
};
it.node;
var at = T(it), ot = {
	name: "eye",
	size: 24,
	node: [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
ot.node;
var st = T(ot), ct = {
	name: "flag",
	size: 24,
	node: [["path", {
		d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
		key: "1jaruq"
	}]]
};
ct.node;
var lt = T(ct), ut = {
	name: "hand",
	size: 24,
	node: [
		["path", {
			d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
			key: "1fvzgz"
		}],
		["path", {
			d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
			key: "1kc0my"
		}],
		["path", {
			d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
			key: "10h0bg"
		}],
		["path", {
			d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
			key: "1s1gnw"
		}]
	]
};
ut.node;
var dt = T(ut), ft = {
	name: "house",
	size: 24,
	node: [["path", {
		d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
		key: "5wwlr5"
	}], ["path", {
		d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
		key: "r6nss1"
	}]],
	aliases: ["home"]
};
ft.node;
var pt = T(ft), mt = {
	name: "inbox",
	size: 24,
	node: [["polyline", {
		points: "22 12 16 12 14 15 10 15 8 12 2 12",
		key: "o97t9d"
	}], ["path", {
		d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
		key: "oot6mr"
	}]]
};
mt.node;
var ht = T(mt), gt = {
	name: "loader-circle",
	size: 24,
	node: [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]],
	aliases: ["loader-2"]
};
gt.node;
var _t = T(gt), vt = {
	name: "lock",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2",
		key: "1w4ew1"
	}], ["path", {
		d: "M7 11V7a5 5 0 0 1 10 0v4",
		key: "fwvmzm"
	}]]
};
vt.node;
var yt = T(vt), bt = {
	name: "mail",
	size: 24,
	node: [["path", {
		d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
		key: "132q7q"
	}], ["rect", {
		x: "2",
		y: "4",
		width: "20",
		height: "16",
		rx: "2",
		key: "izxlao"
	}]]
};
bt.node;
var xt = T(bt), St = {
	name: "pencil",
	size: 24,
	node: [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]
};
St.node;
var Ct = T(St), wt = {
	name: "plus",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]
};
wt.node;
var Tt = T(wt), Et = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
Et.node;
var Dt = T(Et), Ot = {
	name: "trash",
	size: 24,
	node: [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	],
	aliases: ["trash-2"]
};
Ot.node;
var kt = T(Ot), At = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
At.node;
var jt = T(At), Mt = {
	button: "_button_jc9xd_3",
	withIcon: "_withIcon_jc9xd_26",
	wide: "_wide_jc9xd_30",
	compact: "_compact_jc9xd_34",
	neutral: "_neutral_jc9xd_68",
	primary: "_primary_jc9xd_74",
	danger: "_danger_jc9xd_80",
	ai: "_ai_jc9xd_86",
	glass: "_glass_jc9xd_92",
	busy: "_busy_jc9xd_137",
	spin: "_spin_jc9xd_1"
}, j = /* @__PURE__ */ se(ee(), 1), Nt = ({ children: e, look: t = "neutral", icon: n, busy: r = !1, wide: i = !1, compact: a = !1, href: o, external: s = !1, className: c = "", disabled: l, ...u }) => {
	let d = [
		Mt.button,
		Mt[t],
		n || r ? Mt.withIcon : "",
		i ? Mt.wide : "",
		a ? Mt.compact : "",
		c
	].join(" "), f = /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [r ? /* @__PURE__ */ (0, j.jsx)(_t, {
		size: a ? 14 : 16,
		className: Mt.busy,
		"aria-hidden": "true"
	}) : n && /* @__PURE__ */ (0, j.jsx)(n, {
		size: a ? 14 : 16,
		"aria-hidden": "true"
	}), e] });
	return o ? /* @__PURE__ */ (0, j.jsx)("a", {
		className: d,
		href: o,
		"aria-label": u["aria-label"],
		"aria-current": u["aria-current"],
		...s ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: f
	}) : /* @__PURE__ */ (0, j.jsx)("button", {
		type: "button",
		className: d,
		disabled: l || r,
		"aria-busy": r || void 0,
		...u,
		children: f
	});
}, Pt = {
	chip: "_chip_136hn_1",
	capsule: "_capsule_136hn_19",
	row: "_row_136hn_26",
	success: "_success_136hn_34",
	warning: "_warning_136hn_41",
	danger: "_danger_136hn_48",
	accent: "_accent_136hn_55"
}, Ft = ({ children: e, label: t, title: n, tone: r, size: i }) => /* @__PURE__ */ (0, j.jsx)("span", {
	className: `${Pt.chip} ${r ? Pt[r] : ""} ${i ? Pt[i] : ""}`,
	"aria-label": t,
	title: n,
	children: e
}), It = { row: "_row_10ahh_2" }, Lt = ({ label: e, onClick: t }) => /* @__PURE__ */ (0, j.jsxs)("button", {
	type: "button",
	className: It.row,
	onClick: t,
	children: [/* @__PURE__ */ (0, j.jsx)("span", { children: e }), /* @__PURE__ */ (0, j.jsx)($e, {
		size: 16,
		"aria-hidden": "true"
	})]
}), Rt = {
	button: "_button_rwhyb_1",
	default: "_default_rwhyb_27",
	size28: "_size28_rwhyb_32",
	card: "_card_rwhyb_37",
	size34: "_size34_rwhyb_41",
	size38: "_size38_rwhyb_46",
	size44: "_size44_rwhyb_51",
	danger: "_danger_rwhyb_57",
	primary: "_primary_rwhyb_74",
	on: "_on_rwhyb_91",
	glass: "_glass_rwhyb_102",
	ai: "_ai_rwhyb_112",
	image: "_image_rwhyb_123",
	busy: "_busy_rwhyb_131",
	spin: "_spin_rwhyb_1"
};
Rt.card;
var zt = ({ icon: e, label: t, variant: n = "default", size: r = 34, filled: i = !1, busy: a = !1, href: o, external: s = !1, className: c = "", ...l }) => {
	let u = [
		Rt.button,
		Rt[n],
		Rt[`size${r}`],
		c
	].join(" "), d = /* @__PURE__ */ (0, j.jsx)(e, {
		size: r === 28 ? 14 : r === 44 ? 18 : 16,
		fill: i ? "currentColor" : "none",
		className: a ? Rt.busy : void 0,
		"aria-hidden": "true"
	});
	return o ? /* @__PURE__ */ (0, j.jsx)("a", {
		className: u,
		href: o,
		"aria-label": t,
		title: t,
		...s ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: d
	}) : /* @__PURE__ */ (0, j.jsx)("button", {
		type: "button",
		className: u,
		"aria-label": t,
		title: t,
		"aria-busy": a || void 0,
		...l,
		children: d
	});
}, Bt = {
	group: "_group_srhka_1",
	wide: "_wide_srhka_11",
	option: "_option_srhka_15"
}, Vt = ({ label: e, value: t, options: n, onChange: r, wide: i = !1 }) => /* @__PURE__ */ (0, j.jsx)("div", {
	className: `${Bt.group} ${i ? Bt.wide : ""}`,
	role: "radiogroup",
	"aria-label": e,
	children: n.map((e) => /* @__PURE__ */ (0, j.jsx)("button", {
		type: "button",
		role: "radio",
		"aria-checked": e.value === t,
		"aria-label": e.title,
		title: e.title,
		className: Bt.option,
		onClick: () => r(e.value),
		children: e.label
	}, e.value))
}), Ht = ({ size: e = 16 }) => /* @__PURE__ */ (0, j.jsx)("svg", {
	width: e,
	height: e,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, j.jsx)("path", { d: "M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" })
}), Ut = {
	field: "_field_sw041_1",
	clearable: "_clearable_sw041_36",
	clear: "_clear_sw041_36"
}, Wt = ({ icon: e, type: t = "text", onClear: n, ...r }) => /* @__PURE__ */ (0, j.jsxs)("label", {
	className: `${Ut.field} ${n ? Ut.clearable : ""}`,
	children: [
		/* @__PURE__ */ (0, j.jsx)(e, {
			size: 16,
			"aria-hidden": "true"
		}),
		/* @__PURE__ */ (0, j.jsx)("input", {
			type: t,
			...r
		}),
		n && r.value !== "" && /* @__PURE__ */ (0, j.jsx)("button", {
			type: "button",
			className: Ut.clear,
			"aria-label": "Effacer",
			onClick: n,
			children: /* @__PURE__ */ (0, j.jsx)(jt, {
				size: 14,
				"aria-hidden": "true"
			})
		})
	]
}), Gt = {
	toggle: "_toggle_i0fxm_1",
	knob: "_knob_i0fxm_16"
}, Kt = ({ checked: e, label: t, disabled: n = !1, onChange: r }) => /* @__PURE__ */ (0, j.jsx)("button", {
	type: "button",
	role: "switch",
	className: Gt.toggle,
	"aria-checked": e,
	"aria-label": t,
	disabled: n,
	onClick: () => r(!e),
	children: /* @__PURE__ */ (0, j.jsx)("span", { className: Gt.knob })
}), qt = {
	reader: "_reader_qb2q2_3",
	bar: "_bar_qb2q2_11",
	barInner: "_barInner_qb2q2_24",
	across: "_across_qb2q2_39",
	progress: "_progress_qb2q2_45",
	scrolled: "_scrolled_qb2q2_51",
	barSource: "_barSource_qb2q2_67",
	barSourceName: "_barSourceName_qb2q2_76",
	barStart: "_barStart_qb2q2_86",
	backRow: "_backRow_qb2q2_94",
	barTitle: "_barTitle_qb2q2_98",
	barTitleText: "_barTitleText_qb2q2_107",
	actions: "_actions_qb2q2_131",
	desktop: "_desktop_qb2q2_146",
	progressFill: "_progressFill_qb2q2_155",
	header: "_header_qb2q2_166",
	title: "_title_qb2q2_177",
	byline: "_byline_qb2q2_186",
	bylineSource: "_bylineSource_qb2q2_195",
	bylineAuthor: "_bylineAuthor_qb2q2_199",
	dateRow: "_dateRow_qb2q2_203",
	body: "_body_qb2q2_219",
	content: "_content_qb2q2_228",
	summary: "_summary_qb2q2_552",
	covered: "_covered_qb2q2_561",
	sectionLabel: "_sectionLabel_qb2q2_565",
	rule: "_rule_qb2q2_577",
	coveredList: "_coveredList_qb2q2_583",
	after: "_after_qb2q2_591",
	attribution: "_attribution_qb2q2_601",
	attributionLinks: "_attributionLinks_qb2q2_633",
	seeOn: "_seeOn_qb2q2_641",
	seeOnDone: "_seeOnDone_qb2q2_666",
	reply: "_reply_qb2q2_682",
	next: "_next_qb2q2_694",
	player: "_player_qb2q2_721",
	playerWait: "_playerWait_qb2q2_754",
	skeleton: "_skeleton_qb2q2_767",
	skeletonBar: "_skeletonBar_qb2q2_772",
	skeletonSource: "_skeletonSource_qb2q2_782",
	skeletonHeader: "_skeletonHeader_qb2q2_788",
	skeletonLines: "_skeletonLines_qb2q2_799",
	shareNote: "_shareNote_qb2q2_817",
	phone: "_phone_qb2q2_833",
	fade: "_fade_qb2q2_918",
	fabs: "_fabs_qb2q2_929",
	aiFab: "_aiFab_qb2q2_944",
	backButton: "_backButton_qb2q2_960"
}, Jt = ({ children: e, icon: t, onClick: n, done: r = !1, label: i }) => /* @__PURE__ */ (0, j.jsxs)("button", {
	type: "button",
	className: `${qt.seeOn} ${r ? qt.seeOnDone : ""}`,
	onClick: n,
	"aria-label": i,
	children: [t, e]
}), Yt = /* @__PURE__ */ se(ue(), 1), Xt = {
	logo: "_logo_1ru7u_3",
	mark: "_mark_1ru7u_10",
	word: "_word_1ru7u_16",
	dot: "_dot_1ru7u_20",
	breathing: "_breathing_1ru7u_26",
	breathe: "_breathe_1ru7u_1"
}, Zt = "M949.8 255.2L951.4 257.0L953.5 258.6L955.8 259.8L958.2 260.5L960.8 260.8L963.3 260.6L965.7 260.0L968.0 258.9L969.9 257.6L971.7 255.8L979.7 245.2L989.1 234.0L995.8 226.7L1002.7 219.9L1010.0 213.1L1019.3 205.2L1027.1 199.2L1037.0 192.2L1045.4 186.8L1056.0 180.7L1066.8 175.1L1075.9 170.9L1087.2 166.3L1098.7 162.3L1108.2 159.4L1120.1 156.3L1129.7 154.3L1141.7 152.4L1151.5 151.2L1161.3 150.4L1171.1 150.0L1180.9 150.0L1190.8 150.4L1202.8 151.4L1212.7 152.7L1224.8 154.8L1234.4 156.9L1246.1 160.0L1255.6 163.0L1267.0 167.2L1276.2 171.0L1286.4 175.7L1288.6 176.4L1291.1 176.8L1293.7 176.7L1296.2 176.2L1298.5 175.2L1301.4 173.1L1303.7 170.4L1305.3 167.2L1305.9 163.7L1306.0 13.8L1306.2 11.6L1306.7 9.6L1307.6 7.6L1308.7 5.8L1310.9 3.4L1313.5 1.6L1316.6 0.4L1319.8 0.0L1412.5 0.0L1415.1 0.3L1417.6 1.2L1419.9 2.4L1422.0 4.2L1423.7 6.3L1425.0 8.7L1425.8 11.4L1426.0 14.0L1426.0 483.9L1425.6 498.6L1424.5 511.0L1422.9 523.0L1421.2 532.8L1419.1 542.4L1416.0 554.1L1413.0 563.6L1409.7 572.9L1405.1 584.1L1400.9 593.1L1396.5 601.9L1390.5 612.4L1385.2 620.9L1379.7 629.0L1372.4 638.7L1366.1 646.4L1359.6 653.7L1351.1 662.4L1342.0 670.9L1330.7 680.4L1319.0 689.0L1308.7 695.9L1296.1 703.3L1285.1 709.0L1271.8 714.9L1260.2 719.4L1246.3 723.9L1234.3 727.1L1219.9 730.1L1205.5 732.3L1193.1 733.4L1178.4 734.0L1163.8 733.7L1151.5 732.8L1139.3 731.3L1124.9 728.7L1112.8 725.9L1101.0 722.5L1087.3 717.7L1075.8 713.0L1064.7 707.8L1051.8 701.0L1041.2 694.5L1029.0 686.2L1017.5 677.3L1008.1 669.2L999.2 660.7L989.2 650.1L981.3 640.8L972.0 628.6L970.0 626.5L967.7 624.9L965.0 623.8L962.3 623.3L959.4 623.3L957.1 623.7L955.0 624.6L952.9 625.8L951.1 627.3L939.3 642.5L929.6 653.6L919.2 664.2L913.9 669.3L906.6 675.6L896.9 683.4L884.9 691.9L872.5 699.6L861.6 705.6L848.4 712.1L834.8 717.7L820.9 722.5L813.8 724.6L804.5 727.1L789.9 730.1L775.3 732.3L760.7 733.6L746.0 734.0L733.7 733.7L721.5 732.8L709.3 731.3L697.2 729.2L685.2 726.5L673.4 723.2L661.7 719.4L650.3 715.0L639.1 710.0L628.1 704.5L617.4 698.4L607.1 691.8L597.0 684.8L587.4 677.2L578.1 669.2L567.6 659.1L560.7 651.9L552.7 642.6L545.2 632.9L538.1 622.9L531.5 612.5L525.5 601.8L520.0 590.9L515.0 579.6L510.6 568.2L506.8 556.5L503.5 544.7L500.8 532.9L499.1 523.1L497.5 510.9L496.4 498.7L496.0 486.4L496.0 400.1L496.4 385.4L497.5 373.0L499.1 360.9L501.3 348.8L504.1 336.8L506.1 329.7L509.0 320.5L514.1 306.6L520.0 293.1L523.3 286.5L527.8 277.9L535.5 265.2L543.8 253.0L548.2 247.1L554.3 239.6L564.1 228.5L574.4 218.2L583.7 209.9L595.1 200.6L607.0 192.2L617.5 185.5L630.4 178.4L643.5 172.0L654.9 167.2L668.7 162.3L680.5 158.7L694.9 155.3L709.2 152.7L721.5 151.2L736.2 150.2L750.8 150.0L763.2 150.6L777.7 152.0L790.0 153.9L804.4 156.9L818.5 160.7L830.3 164.6L844.0 170.0L857.2 176.1L868.2 181.9L880.7 189.4L891.0 196.3L902.7 205.2L913.8 214.7L922.8 223.3L932.9 234.0L942.3 245.2ZM1305.9 395.0L1305.3 386.1L1304.0 377.3L1302.4 369.6L1300.0 361.0L1297.1 352.7L1293.6 344.5L1289.5 336.6L1285.5 329.9L1280.5 322.7L1274.9 315.7L1268.9 309.1L1263.3 303.7L1256.5 297.9L1249.4 292.7L1241.8 287.9L1234.0 283.7L1226.9 280.4L1218.6 277.2L1210.1 274.5L1201.5 272.5L1192.7 271.1L1184.9 270.3L1176.1 270.0L1167.2 270.3L1158.3 271.2L1150.6 272.5L1142.1 274.5L1133.5 277.1L1126.2 279.9L1118.1 283.6L1110.3 287.8L1102.7 292.6L1097.5 296.4L1091.7 301.1L1086.8 305.4L1081.5 310.7L1077.2 315.5L1073.1 320.5L1068.7 326.6L1065.2 332.1L1061.4 338.6L1058.5 344.4L1055.9 350.3L1053.2 357.3L1051.3 363.4L1049.6 369.7L1048.0 377.0L1047.1 383.5L1046.2 392.2L1046.0 400.0L1046.0 485.3L1046.3 492.8L1047.0 500.4L1048.2 508.0L1049.9 515.5L1052.0 523.0L1054.5 530.2L1057.4 537.3L1060.8 544.2L1064.5 550.8L1068.6 557.3L1072.4 562.5L1076.3 567.5L1080.5 572.2L1085.0 576.8L1089.7 581.2L1094.5 585.3L1099.6 589.2L1104.8 592.8L1110.3 596.2L1115.9 599.2L1121.6 602.1L1127.4 604.6L1133.4 606.8L1139.5 608.8L1145.7 610.4L1151.9 611.7L1158.2 612.8L1164.5 613.5L1170.9 613.9L1177.3 614.0L1183.7 613.8L1190.0 613.2L1196.3 612.4L1202.6 611.2L1208.8 609.8L1215.0 608.0L1221.0 606.0L1226.9 603.6L1232.7 601.0L1238.4 598.0L1243.9 594.8L1249.3 591.4L1254.4 587.7L1258.4 584.6L1262.4 581.2L1266.9 576.9L1270.6 573.2L1274.8 568.5L1281.2 560.4L1284.7 555.3L1287.5 550.8L1290.6 545.4L1292.9 540.9L1297.1 531.4L1299.2 525.5L1300.8 520.5L1302.7 513.1L1304.2 505.6L1305.2 498.0L1305.9 489.2ZM875.9 396.3L875.4 387.4L874.2 378.5L872.4 369.8L870.4 362.3L867.5 353.8L864.1 345.7L860.1 337.7L856.2 331.0L851.2 323.6L845.8 316.6L839.8 310.0L833.4 303.8L827.5 298.7L820.3 293.3L812.9 288.6L805.1 284.2L797.0 280.4L789.8 277.6L781.3 274.9L772.7 272.8L765.1 271.4L756.2 270.4L747.3 270.0L738.3 270.2L729.6 271.0L720.8 272.5L712.1 274.5L703.5 277.1L696.2 279.9L688.1 283.6L680.3 287.8L672.8 292.6L667.5 296.4L661.7 301.1L656.8 305.4L652.3 309.9L647.2 315.5L643.1 320.5L638.7 326.6L635.2 332.0L632.0 337.6L629.0 343.3L625.9 350.1L623.6 356.2L621.6 362.3L619.6 369.5L618.3 375.9L617.1 383.3L616.3 391.1L616.0 400.0L616.0 485.3L616.3 492.8L617.0 500.4L618.2 508.0L619.9 515.5L621.9 522.8L624.4 530.1L627.4 537.1L630.7 544.0L634.4 550.7L638.6 557.2L642.3 562.4L646.2 567.4L650.4 572.1L654.9 576.7L659.5 581.1L664.4 585.2L669.5 589.1L674.7 592.7L680.2 596.1L685.7 599.2L691.5 602.0L697.3 604.5L703.3 606.8L709.4 608.7L715.5 610.4L721.8 611.7L728.1 612.8L734.4 613.5L740.8 613.9L747.1 614.0L753.5 613.8L759.9 613.3L766.2 612.4L772.5 611.3L778.7 609.8L784.8 608.1L790.9 606.0L796.8 603.7L802.6 601.0L808.3 598.1L813.8 594.9L819.2 591.4L823.4 588.4L828.4 584.6L836.1 577.7L840.5 573.3L844.0 569.4L848.0 564.6L851.2 560.4L854.7 555.3L857.5 550.8L860.0 546.4L862.9 540.9L865.1 536.1L867.5 530.3L870.8 520.5L872.7 513.1L874.4 504.5L875.4 496.9L875.9 489.2ZM0.0 13.7L0.3 11.2L1.0 8.7L2.2 6.5L3.7 4.5L5.6 2.8L7.7 1.5L10.1 0.6L12.5 0.1L106.2 0.0L108.2 0.2L109.9 0.6L111.7 1.2L113.3 2.0L115.9 4.1L118.0 6.8L119.3 9.8L120.0 13.0L120.0 151.2L120.4 154.1L121.4 156.8L122.8 159.2L124.7 161.3L127.2 163.0L129.8 164.2L132.7 164.7L135.7 164.7L138.3 164.1L148.5 160.6L156.7 158.1L166.8 155.5L175.2 153.7L185.6 152.0L195.9 150.8L204.5 150.3L215.0 150.0L223.5 150.2L231.9 150.7L240.3 151.5L250.6 153.0L259.1 154.6L267.3 156.5L275.4 158.7L283.5 161.2L293.3 164.8L301.2 168.0L310.6 172.4L318.2 176.4L327.3 181.6L334.5 186.3L343.0 192.3L349.8 197.5L357.7 204.2L364.0 210.0L371.4 217.4L377.1 223.8L383.8 231.8L389.0 238.7L394.9 247.2L399.4 254.5L405.6 265.6L408.5 271.2L411.9 278.8L416.7 290.6L420.8 302.6L424.1 314.8L426.7 327.2L428.5 339.8L429.2 346.1L429.7 354.4L430.0 364.9L430.0 708.2L429.5 711.8L428.2 714.9L426.0 717.8L423.2 720.0L420.0 721.4L418.2 721.8L416.3 722.0L323.2 722.0L321.3 721.7L319.6 721.3L317.8 720.6L316.1 719.6L314.6 718.4L313.4 717.1L312.2 715.6L311.3 713.9L310.3 711.0L310.0 708.0L310.0 364.1L309.4 354.8L308.8 350.1L307.8 344.8L305.9 337.4L303.1 329.5L299.7 322.0L296.0 315.4L291.4 308.5L286.6 302.6L280.9 296.6L275.3 291.6L268.7 286.6L262.2 282.6L254.9 278.8L247.1 275.6L239.9 273.3L231.8 271.5L224.3 270.5L216.1 270.0L208.5 270.2L200.3 271.2L192.0 272.8L184.7 274.9L177.0 277.9L169.5 281.6L162.3 285.9L156.2 290.4L149.9 295.8L144.1 301.8L139.2 307.7L134.5 314.6L130.4 321.8L126.9 329.4L124.4 336.5L122.2 344.6L121.3 349.2L120.6 354.6L120.0 364.1L120.0 708.0L119.7 711.1L118.6 714.1L117.7 715.7L116.5 717.3L115.1 718.6L113.6 719.8L111.8 720.8L110.0 721.4L108.1 721.8L106.2 722.0L13.1 722.0L9.8 721.4L6.7 720.0L4.1 717.9L2.0 715.2L1.1 713.5L0.5 711.7L0.1 709.8L0.0 708.0ZM1525.9 452.0L1523.3 451.7L1520.6 450.9L1518.2 449.6L1516.2 448.0L1514.4 445.9L1513.2 443.6L1512.4 441.1L1512.0 438.4L1512.0 14.0L1512.3 11.1L1512.9 9.0L1513.9 7.0L1515.2 5.1L1516.7 3.5L1518.5 2.2L1520.4 1.2L1522.5 0.5L1524.6 0.1L1618.0 0.0L1620.9 0.3L1623.1 1.0L1625.2 2.0L1627.1 3.4L1628.7 5.0L1630.1 6.9L1631.1 9.0L1631.7 11.3L1632.0 13.6L1632.0 438.0L1631.7 440.9L1631.1 443.0L1630.1 445.0L1628.9 446.8L1627.4 448.4L1625.7 449.7L1623.7 450.8L1621.7 451.5L1619.5 451.9Z", Qt = ({ size: e = 34, className: t = "", breathing: n = !1 }) => /* @__PURE__ */ (0, j.jsx)("span", {
	className: `${Xt.logo} ${t}`,
	style: { fontSize: e },
	children: /* @__PURE__ */ (0, j.jsxs)("svg", {
		className: Xt.mark,
		viewBox: "0 0 1646 734",
		role: "img",
		"aria-label": "Hodi",
		children: [/* @__PURE__ */ (0, j.jsx)("path", {
			className: Xt.word,
			d: Zt,
			fillRule: "evenodd"
		}), /* @__PURE__ */ (0, j.jsx)("circle", {
			className: `${Xt.dot} ${n ? Xt.breathing : ""}`,
			cx: "1572",
			cy: "648",
			r: "74"
		})]
	})
}), M = {
	header: "_header_gt6ws_1",
	sticky: "_sticky_gt6ws_6",
	overPicture: "_overPicture_gt6ws_26",
	clear: "_clear_gt6ws_33",
	row: "_row_gt6ws_40",
	title: "_title_gt6ws_53",
	titleGroup: "_titleGroup_gt6ws_64",
	logo: "_logo_gt6ws_82",
	space: "_space_gt6ws_90",
	meta: "_meta_gt6ws_95",
	line: "_line_gt6ws_107"
}, $t = ({ logo: e }) => {
	let { t } = ae();
	return typeof e == "string" ? /* @__PURE__ */ (0, j.jsx)("a", {
		className: M.logo,
		href: e,
		"aria-label": t("nav.home"),
		children: /* @__PURE__ */ (0, j.jsx)(Qt, {})
	}) : e ? /* @__PURE__ */ (0, j.jsx)("span", {
		className: M.logo,
		children: /* @__PURE__ */ (0, j.jsx)(Qt, {})
	}) : null;
}, en = ({ title: e, help: t }) => {
	if (!e) return /* @__PURE__ */ (0, j.jsx)("span", { className: M.space });
	let n = /* @__PURE__ */ (0, j.jsx)("h1", {
		className: `${M.title} ${typeof e == "string" ? "screen-title" : ""}`,
		children: e
	});
	return t ? /* @__PURE__ */ (0, j.jsxs)("span", {
		className: M.titleGroup,
		children: [n, t]
	}) : n;
}, tn = ({ back: e, logo: t = !1, title: n, help: r, meta: i, actions: a, sticky: o = !1, line: s = !1, overPicture: c = !1, clear: l = !1, className: u }) => {
	let d = [
		M.header,
		(o || c) && M.sticky,
		c && M.overPicture,
		c && l && M.clear,
		u
	];
	return /* @__PURE__ */ (0, j.jsxs)("header", {
		className: d.filter(Boolean).join(" "),
		children: [/* @__PURE__ */ (0, j.jsxs)("div", {
			className: M.row,
			children: [
				e,
				/* @__PURE__ */ (0, j.jsx)($t, { logo: t }),
				/* @__PURE__ */ (0, j.jsx)(en, {
					title: n,
					help: r
				}),
				i && /* @__PURE__ */ (0, j.jsx)("span", {
					className: M.meta,
					children: i
				}),
				a
			]
		}), !(c && l) && s && (s === !0 ? /* @__PURE__ */ (0, j.jsx)("div", {
			className: M.line,
			"aria-hidden": "true"
		}) : s)]
	});
}, nn = (0, k.createContext)(null), rn = ({ children: e }) => {
	let t = (0, k.use)(nn);
	return t ? (0, Yt.createPortal)(e, t) : null;
}, an = {
	page: "_page_fq08m_3",
	phonePage: "_phonePage_fq08m_12",
	aside: "_aside_fq08m_18",
	header: "_header_fq08m_26",
	title: "_title_fq08m_34",
	intro: "_intro_fq08m_41",
	label: "_label_fq08m_49",
	card: "_card_fq08m_59",
	row: "_row_fq08m_69",
	choice: "_choice_fq08m_106",
	rowActions: "_rowActions_fq08m_107",
	stackedRow: "_stackedRow_fq08m_118",
	rowText: "_rowText_fq08m_122",
	rowLabel: "_rowLabel_fq08m_138",
	rowTitle: "_rowTitle_fq08m_143",
	rowHint: "_rowHint_fq08m_150",
	rowValue: "_rowValue_fq08m_155",
	figure: "_figure_fq08m_164",
	dim: "_dim_fq08m_177",
	note: "_note_fq08m_181",
	mono: "_mono_fq08m_187",
	tile: "_tile_fq08m_197",
	quietRow: "_quietRow_fq08m_212",
	emptyCard: "_emptyCard_fq08m_218",
	emptyTile: "_emptyTile_fq08m_223",
	rustTile: "_rustTile_fq08m_229",
	fieldRow: "_fieldRow_fq08m_235",
	choiceRow: "_choiceRow_fq08m_252"
}, on = ({ title: e, intro: t, aside: n, layout: r, children: i }) => {
	let a = _();
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: r === "phone" ? `${an.page} ${an.phonePage}` : an.page,
		children: [
			r === "phone" && !a && n && /* @__PURE__ */ (0, j.jsx)(rn, { children: n }),
			(r === "desktop" || t) && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: an.header,
				children: [/* @__PURE__ */ (0, j.jsxs)("div", { children: [r === "desktop" && /* @__PURE__ */ (0, j.jsx)("h1", {
					className: `${an.title} screen-title`,
					children: e
				}), t && /* @__PURE__ */ (0, j.jsx)("p", {
					className: an.intro,
					children: t
				})] }), r === "desktop" && n]
			}),
			r === "phone" && a && n && /* @__PURE__ */ (0, j.jsx)("div", {
				className: an.aside,
				children: n
			}),
			i
		]
	});
}, sn = ({ label: e, children: t }) => /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [e && /* @__PURE__ */ (0, j.jsx)("h2", {
	className: an.label,
	children: e
}), /* @__PURE__ */ (0, j.jsx)("div", {
	className: an.card,
	children: t
})] }), cn = ({ label: e, ariaLabel: t, icon: n, look: r = "neutral", onClick: i, disabled: a, busy: o, href: s, external: c }) => _() ? /* @__PURE__ */ (0, j.jsx)(zt, {
	icon: n,
	label: t ?? e,
	variant: r === "neutral" ? "default" : r,
	size: 38,
	onClick: i,
	disabled: a,
	busy: o,
	href: s,
	external: c
}) : /* @__PURE__ */ (0, j.jsx)(Nt, {
	look: r,
	icon: n,
	"aria-label": t,
	onClick: i,
	disabled: a,
	busy: o,
	href: s,
	external: c,
	children: e
}), ln = ({ label: e, value: t, hint: n, lead: r, action: i, choice: a, as: o = "div", className: s = "", children: c }) => /* @__PURE__ */ (0, j.jsxs)(o, {
	className: `${an.row} ${a ? an.choiceRow : ""} ${s}`,
	children: [
		r,
		/* @__PURE__ */ (0, j.jsxs)("span", {
			className: an.rowText,
			children: [/* @__PURE__ */ (0, j.jsx)("span", {
				className: an.rowLabel,
				children: e
			}), t === void 0 ? n !== void 0 && /* @__PURE__ */ (0, j.jsx)("span", {
				className: an.rowHint,
				children: n
			}) : /* @__PURE__ */ (0, j.jsx)("span", {
				className: an.rowValue,
				children: t
			})]
		}),
		c,
		i && (Array.isArray(i) ? /* @__PURE__ */ (0, j.jsx)("span", {
			className: an.rowActions,
			children: i.map((e) => /* @__PURE__ */ (0, j.jsx)(cn, { ...e }, e.label))
		}) : /* @__PURE__ */ (0, j.jsx)(cn, { ...i })),
		a && /* @__PURE__ */ (0, j.jsx)("span", {
			className: an.choice,
			children: a
		})
	]
}), un = {
	page: "_page_1sd5u_2",
	head: "_head_1sd5u_11",
	board: "_board_1sd5u_18",
	plugins: "_plugins_1sd5u_19",
	kpis: "_kpis_1sd5u_29",
	card: "_card_1sd5u_36",
	kpi: "_kpi_1sd5u_29",
	label: "_label_1sd5u_73",
	kpiLine: "_kpiLine_1sd5u_88",
	figure: "_figure_1sd5u_96",
	spark: "_spark_1sd5u_110",
	cardHead: "_cardHead_1sd5u_115",
	cardTitle: "_cardTitle_1sd5u_123",
	count: "_count_1sd5u_128",
	activity: "_activity_1sd5u_136",
	side: "_side_1sd5u_140",
	third: "_third_1sd5u_147",
	narrow: "_narrow_1sd5u_148",
	slot: "_slot_1sd5u_153",
	pluginCard: "_pluginCard_1sd5u_159",
	wide: "_wide_1sd5u_163",
	full: "_full_1sd5u_167",
	legend: "_legend_1sd5u_171",
	lineKey: "_lineKey_1sd5u_188",
	dashKey: "_dashKey_1sd5u_195",
	chart: "_chart_1sd5u_201",
	tick: "_tick_1sd5u_206",
	cursor: "_cursor_1sd5u_214",
	periods: "_periods_1sd5u_220",
	dates: "_dates_1sd5u_228"
}, dn = ({ title: e, count: t, aside: n, children: r }) => /* @__PURE__ */ (0, j.jsxs)("section", {
	className: `${un.card} ${un.pluginCard}`,
	"aria-label": e,
	children: [/* @__PURE__ */ (0, j.jsxs)("div", {
		className: un.cardHead,
		children: [/* @__PURE__ */ (0, j.jsxs)("h2", {
			className: un.cardTitle,
			children: [e, t !== void 0 && /* @__PURE__ */ (0, j.jsx)("span", {
				className: un.count,
				children: t.toLocaleString()
			})]
		}), n]
	}), r]
}), fn = { copyright: "_copyright_1nuhb_2" }, pn = ({ className: e = "" }) => {
	let { t } = ae();
	return /* @__PURE__ */ (0, j.jsxs)("p", {
		className: `${fn.copyright} ${e}`,
		children: [
			"© ",
			(/* @__PURE__ */ new Date()).getFullYear(),
			" Hodi · ",
			t("common.licence")
		]
	});
}, mn = { actions: "_actions_1ddev_3" }, hn = ({ className: e = "", children: t }) => /* @__PURE__ */ (0, j.jsx)("div", {
	className: `${mn.actions} ${e}`,
	children: t
}), gn = Math.min, _n = Math.max, vn = Math.round, yn = Math.floor, bn = (e) => ({
	x: e,
	y: e
}), xn = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Sn(e, t, n) {
	return _n(e, gn(t, n));
}
function Cn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function wn(e) {
	return e.split("-")[0];
}
function Tn(e) {
	return e.split("-")[1];
}
function En(e) {
	return e === "x" ? "y" : "x";
}
function Dn(e) {
	return e === "y" ? "height" : "width";
}
function On(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function kn(e) {
	return En(On(e));
}
function An(e, t, n) {
	n === void 0 && (n = !1);
	let r = Tn(e), i = kn(e), a = Dn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = zn(o)), [o, zn(o)];
}
function jn(e) {
	let t = zn(e);
	return [
		Mn(e),
		t,
		Mn(t)
	];
}
function Mn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Nn = ["left", "right"], Pn = ["right", "left"], Fn = ["top", "bottom"], In = ["bottom", "top"];
function Ln(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Pn : Nn : t ? Nn : Pn;
		case "left":
		case "right": return t ? Fn : In;
		default: return [];
	}
}
function Rn(e, t, n, r) {
	let i = Tn(e), a = Ln(wn(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Mn)))), a;
}
function zn(e) {
	let t = wn(e);
	return xn[t] + e.slice(t.length);
}
function Bn(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Vn(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Bn(e);
}
function Hn(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Un(e, t, n) {
	let { reference: r, floating: i } = e, a = On(t), o = kn(t), s = Dn(o), c = wn(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Tn(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Wn(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Cn(t, e), p = Vn(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Hn(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Hn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Gn = 50, Kn = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Wn
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Un(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Gn && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Un(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, qn = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Cn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = wn(r), _ = On(o), v = wn(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [zn(o)] : jn(o)), x = p !== "none";
			!d && x && b.push(...Rn(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], ee = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = An(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (ee = [...ee, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === On(t) || ee.every((e) => On(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: ee
					},
					reset: { placement: t }
				};
				let n = ee.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = ee.filter((e) => {
							if (x) {
								let t = On(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, Jn = /*#__PURE__*/ new Set(["left", "top"]);
async function Yn(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = wn(n), s = Tn(n), c = On(n) === "y", l = Jn.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Cn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Xn = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Yn(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Zn = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Cn(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = On(i), p = En(f), m = u[p], h = u[f], g = (e, t) => Sn(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Qn = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Cn(e, t), c = await i.detectOverflow(t, s), l = wn(n), u = Tn(n), d = On(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = gn(p - c[m], g), y = gn(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * _n(c.left, c.right) : S = p - 2 * _n(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function $n() {
	return typeof window < "u";
}
function er(e) {
	return rr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function tr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function nr(e) {
	return ((rr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function rr(e) {
	return $n() ? e instanceof Node || e instanceof tr(e).Node : !1;
}
function ir(e) {
	return $n() ? e instanceof Element || e instanceof tr(e).Element : !1;
}
function ar(e) {
	return $n() ? e instanceof HTMLElement || e instanceof tr(e).HTMLElement : !1;
}
function or(e) {
	return !$n() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof tr(e).ShadowRoot;
}
function sr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = vr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function cr(e) {
	return /^(table|td|th)$/.test(er(e));
}
function lr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var ur = /transform|translate|scale|rotate|perspective|filter/, dr = /paint|layout|strict|content/, fr = (e) => !!e && e !== "none", pr;
function mr(e) {
	let t = ir(e) ? vr(e) : e;
	return fr(t.transform) || fr(t.translate) || fr(t.scale) || fr(t.rotate) || fr(t.perspective) || !gr() && (fr(t.backdropFilter) || fr(t.filter)) || ur.test(t.willChange || "") || dr.test(t.contain || "");
}
function hr(e) {
	let t = br(e);
	for (; ar(t) && !_r(t);) {
		if (mr(t)) return t;
		if (lr(t)) return null;
		t = br(t);
	}
	return null;
}
function gr() {
	return pr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), pr;
}
function _r(e) {
	return /^(html|body|#document)$/.test(er(e));
}
function vr(e) {
	return tr(e).getComputedStyle(e);
}
function yr(e) {
	return ir(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function br(e) {
	if (er(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || or(e) && e.host || nr(e);
	return or(t) ? t.host : t;
}
function xr(e) {
	let t = br(e);
	return _r(t) ? (e.ownerDocument || e).body : ar(t) && sr(t) ? t : xr(t);
}
function Sr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = xr(e), i = r === e.ownerDocument?.body, a = tr(r);
	if (i) {
		let e = Cr(a);
		return t.concat(a, a.visualViewport || [], sr(r) ? r : [], e && n ? Sr(e) : []);
	}
	return t.concat(r, Sr(r, [], n));
}
function Cr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function wr(e) {
	let t = vr(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = ar(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = vn(n) !== a || vn(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Tr(e) {
	return ir(e) ? e : e.contextElement;
}
function Er(e) {
	let t = Tr(e);
	if (!ar(t)) return bn(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = wr(t), o = (a ? vn(n.width) : n.width) / r, s = (a ? vn(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var Dr = /*#__PURE__*/ bn(0);
function Or(e) {
	let t = tr(e);
	return !gr() || !t.visualViewport ? Dr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function kr(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === tr(e);
}
function Ar(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Tr(e), o = bn(1);
	t && (r ? ir(r) && (o = Er(r)) : o = Er(e));
	let s = kr(a, n, r) ? Or(a) : bn(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = tr(a), t = ir(r) ? tr(r) : r, n = e, i = Cr(n);
		for (; i && t !== n;) {
			let e = Er(i), t = i.getBoundingClientRect(), r = vr(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = tr(i), i = Cr(n);
		}
	}
	return Hn({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function jr(e, t) {
	let n = yr(e).scrollLeft;
	return t ? t.left + n : Ar(nr(e)).left + n;
}
function Mr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - jr(e, n),
		y: n.top + t.scrollTop
	};
}
function Nr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = nr(r), s = t ? lr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = bn(1), u = bn(0), d = ar(r);
	if ((d || !a) && ((er(r) !== "body" || sr(o)) && (c = yr(r)), d)) {
		let e = Ar(r);
		l = Er(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Mr(o, c) : bn(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Pr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Fr(e) {
	let t = yr(e), n = e.ownerDocument.body, r = _n(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = _n(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + jr(e), o = -t.scrollTop;
	return vr(n).direction === "rtl" && (a += _n(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Ir = 25;
function Lr(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = tr(e), a = nr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !gr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (jr(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Ir && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Rr(e, t) {
	let n = Ar(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Er(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function zr(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Lr(e, n, t);
	else if (t === "document") r = Fr(nr(e));
	else if (ir(t)) r = Rr(t, n);
	else {
		let n = Or(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Hn(r);
}
function Br(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Sr(e, [], !1).filter((e) => ir(e) && er(e) !== "body"), i = null, a = vr(e).position === "fixed", o = a ? br(e) : e;
	for (; ir(o) && !_r(o);) {
		let e = vr(o), t = mr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = br(o);
	}
	return t.set(e, r), r;
}
function Vr(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? lr(t) ? [] : Br(t, this._c) : [].concat(n), r], o = zr(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = zr(t, a[e], i);
		s = _n(n.top, s), c = gn(n.right, c), l = gn(n.bottom, l), u = _n(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Hr(e) {
	let { width: t, height: n } = wr(e);
	return {
		width: t,
		height: n
	};
}
function Ur(e, t, n) {
	let r = ar(t), i = nr(t), a = n === "fixed", o = Ar(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = bn(0);
	if ((r || !a) && ((er(t) !== "body" || sr(i)) && (s = yr(t)), r)) {
		let e = Ar(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = jr(i));
	let l = i && !r && !a ? Mr(i, s) : bn(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Wr(e) {
	return vr(e).position === "static";
}
function Gr(e, t) {
	if (!ar(e) || vr(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return nr(e) === n && (n = n.ownerDocument.body), n;
}
function Kr(e, t) {
	let n = tr(e);
	if (lr(e)) return n;
	if (!ar(e)) {
		let t = br(e);
		for (; t && !_r(t);) {
			if (ir(t) && !Wr(t)) return t;
			t = br(t);
		}
		return n;
	}
	let r = Gr(e, t);
	for (; r && cr(r) && Wr(r);) r = Gr(r, t);
	return r && _r(r) && Wr(r) && !mr(r) ? n : r || hr(e) || n;
}
var qr = async function(e) {
	let t = this.getOffsetParent || Kr, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Ur(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Jr(e) {
	return vr(e).direction === "rtl";
}
var Yr = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Nr,
	getDocumentElement: nr,
	getClippingRect: Vr,
	getOffsetParent: Kr,
	getElementRects: qr,
	getClientRects: Pr,
	getDimensions: Hr,
	getScale: Er,
	isElement: ir,
	isRTL: Jr
};
function Xr(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Zr(e, t, n) {
	let r = null, i, a = nr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = yn(d), h = yn(a.clientWidth - (u + f)), g = yn(a.clientHeight - (d + p)), _ = yn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: _n(0, gn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Xr(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = tr(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Qr(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Tr(e), u = i || a ? [...l ? Sr(l) : [], ...t ? Sr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Zr(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ar(e) : null;
	c && g();
	function g() {
		let t = Ar(e);
		h && !Xr(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var $r = Xn, ei = Zn, ti = qn, ni = Qn, ri = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Yr,
		...i.platform,
		_c: r
	};
	return Kn(e, t, {
		...i,
		platform: a
	});
}, ii = typeof document < "u" ? k.useLayoutEffect : function() {};
function ai(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!ai(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !ai(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function oi(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function si(e, t) {
	let n = oi(e);
	return Math.round(t * n) / n;
}
function ci(e) {
	let t = k.useRef(e);
	return ii(() => {
		t.current = e;
	}), t;
}
function li(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = k.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = k.useState(r);
	ai(f, r) || p(r);
	let [m, h] = k.useState(null), [g, _] = k.useState(null), v = k.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = k.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = k.useRef(null), C = k.useRef(null), w = k.useRef(u), ee = c != null, te = ci(c), ne = ci(i), re = ci(l), ie = k.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		ne.current && (e.platform = ne.current), ri(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: re.current !== !1
			};
			T.current && !ai(w.current, t) && (w.current = t, Yt.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		ne,
		re
	]);
	ii(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let T = k.useRef(!1);
	ii(() => (T.current = !0, () => {
		T.current = !1;
	}), []), ii(() => {
		if (b && (S.current = b), x && (C.current = x), b && x) {
			if (te.current) return te.current(b, x, ie);
			ie();
		}
	}, [
		b,
		x,
		ie,
		te,
		ee
	]);
	let ae = k.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), E = k.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), oe = k.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!E.floating) return e;
		let t = si(E.floating, u.x), r = si(E.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...oi(E.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		E.floating,
		u.x,
		u.y
	]);
	return k.useMemo(() => ({
		...u,
		update: ie,
		refs: ae,
		elements: E,
		floatingStyles: oe
	}), [
		u,
		ie,
		ae,
		E,
		oe
	]);
}
var ui = (e, t) => {
	let n = $r(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, di = (e, t) => {
	let n = ei(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, fi = (e, t) => {
	let n = ti(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, pi = (e, t) => {
	let n = ni(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, mi = 8, hi = 120, gi = (e, { placement: t = "bottom-start", stretch: n = !1, maxHeight: r, gap: i = 6, cross: a = 0, anchor: o } = {}) => {
	let { refs: s, floatingStyles: c, isPositioned: l } = li({
		open: e,
		placement: t,
		strategy: "fixed",
		transform: !1,
		whileElementsMounted: Qr,
		middleware: [
			ui({
				mainAxis: i,
				crossAxis: a
			}),
			fi({ padding: mi }),
			pi({
				padding: mi,
				apply({ availableHeight: e, rects: t, elements: i }) {
					let a = window.innerHeight - 16, o = Math.min(a, Math.max(hi, e));
					i.floating.style.maxHeight = `${r ? Math.min(r, o) : o}px`, n && (i.floating.style.width = `${t.reference.width}px`);
				}
			}),
			di({
				padding: mi,
				crossAxis: !0
			})
		]
	}), { setFloating: u, setReference: d } = s;
	return {
		attach: (0, k.useCallback)((e) => {
			if (u(e), !e) return;
			let t = e.parentElement;
			t && d(o ? o(t) : t), e.matches(":popover-open") || e.showPopover?.();
		}, [
			u,
			d,
			o
		]),
		style: {
			...c,
			visibility: l ? void 0 : "hidden"
		}
	};
}, _i = function() {
	return _i = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, _i.apply(this, arguments);
};
function vi(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function yi(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
// node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var bi = "right-scroll-bar-position", xi = "width-before-scroll-bar", Si = "with-scroll-bars-hidden", Ci = "--removed-body-scroll-bar-size";
// node_modules/use-callback-ref/dist/es2015/assignRef.js
function wi(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
// node_modules/use-callback-ref/dist/es2015/useRef.js
function Ti(e, t) {
	var n = (0, k.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
// node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Ei = typeof window < "u" ? k.useLayoutEffect : k.useEffect, Di = /* @__PURE__ */ new WeakMap();
function Oi(e, t) {
	var n = Ti(t || null, function(t) {
		return e.forEach(function(e) {
			return wi(e, t);
		});
	});
	return Ei(function() {
		var t = Di.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || wi(e, null);
			}), i.forEach(function(e) {
				r.has(e) || wi(e, a);
			});
		}
		Di.set(n, e);
	}, [e]), n;
}
// node_modules/use-sidecar/dist/es2015/medium.js
function ki(e) {
	return e;
}
function Ai(e, t) {
	t === void 0 && (t = ki);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function ji(e) {
	e === void 0 && (e = {});
	var t = Ai(null);
	return t.options = _i({
		async: !0,
		ssr: !1
	}, e), t;
}
// node_modules/use-sidecar/dist/es2015/exports.js
var Mi = function(e) {
	var t = e.sideCar, n = vi(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return k.createElement(r, _i({}, n));
};
Mi.isSideCarExport = !0;
function Ni(e, t) {
	return e.useMedium(t), Mi;
}
// node_modules/react-remove-scroll/dist/es2015/medium.js
var Pi = ji(), Fi = function() {}, Ii = k.forwardRef(function(e, t) {
	var n = k.useRef(null), r = k.useState({
		onScrollCapture: Fi,
		onWheelCapture: Fi,
		onTouchMoveCapture: Fi
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, m = e.noIsolation, h = e.inert, g = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, y = e.gapMode, b = vi(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), x = f, S = Oi([n, t]), C = _i(_i({}, b), i);
	return k.createElement(k.Fragment, null, u && k.createElement(x, {
		sideCar: Pi,
		removeScrollBar: l,
		shards: d,
		noRelative: p,
		noIsolation: m,
		inert: h,
		setCallbacks: a,
		allowPinchZoom: !!g,
		lockRef: n,
		gapMode: y
	}), o ? k.cloneElement(k.Children.only(s), _i(_i({}, C), { ref: S })) : k.createElement(v, _i({}, C, {
		className: c,
		ref: S
	}), s));
});
Ii.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Ii.classNames = {
	fullWidth: xi,
	zeroRight: bi
};
// node_modules/get-nonce/dist/es2015/index.js
var Li = function() {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
// node_modules/react-style-singleton/dist/es2015/singleton.js
function Ri() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = Li();
	return t && e.setAttribute("nonce", t), e;
}
function zi(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Bi(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Vi = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Ri()) && (zi(t, n), Bi(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Hi = function() {
	var e = Vi();
	return function(t, n) {
		k.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Ui = function() {
	var e = Hi();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Wi = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, Gi = function(e) {
	return parseInt(e || "", 10) || 0;
}, Ki = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		Gi(n),
		Gi(r),
		Gi(i)
	];
}, qi = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Wi;
	var t = Ki(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Ji = Ui(), Yi = "data-scroll-locked", Xi = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Si} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Yi}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${bi} {
    right: ${s}px ${r};
  }
  
  .${xi} {
    margin-right: ${s}px ${r};
  }
  
  .${bi} .${bi} {
    right: 0 ${r};
  }
  
  .${xi} .${xi} {
    margin-right: 0 ${r};
  }
  
  body[${Yi}] {
    ${Ci}: ${s}px;
  }
`;
}, Zi = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Qi = function() {
	k.useEffect(function() {
		return document.body.setAttribute(Yi, (Zi() + 1).toString()), function() {
			var e = Zi() - 1;
			e <= 0 ? document.body.removeAttribute(Yi) : document.body.setAttribute(Yi, e.toString());
		};
	}, []);
}, $i = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	Qi();
	var a = k.useMemo(function() {
		return qi(i);
	}, [i]);
	return k.createElement(Ji, { styles: Xi(a, !t, i, n ? "" : "!important") });
}, ea = !1;
if (typeof window < "u") try {
	var ta = Object.defineProperty({}, "passive", { get: function() {
		return ea = !0, !0;
	} });
	window.addEventListener("test", ta, ta), window.removeEventListener("test", ta, ta);
} catch {
	ea = !1;
}
var na = ea ? { passive: !1 } : !1, ra = function(e) {
	return e.tagName === "TEXTAREA";
}, ia = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ra(e) && n[t] === "visible");
}, aa = function(e) {
	return ia(e, "overflowY");
}, oa = function(e) {
	return ia(e, "overflowX");
}, sa = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), ua(e, r)) {
			var i = N(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, ca = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, la = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, ua = function(e, t) {
	return e === "v" ? aa(t) : oa(t);
}, N = function(e, t) {
	return e === "v" ? ca(t) : la(t);
}, P = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, da = function(e, t, n, r, i) {
	var a = P(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = N(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && ua(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, fa = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, pa = function(e) {
	return [e.deltaX, e.deltaY];
}, ma = function(e) {
	return e && "current" in e ? e.current : e;
}, ha = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, ga = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, _a = 0, va = [];
function ya(e) {
	var t = k.useRef([]), n = k.useRef([0, 0]), r = k.useRef(), i = k.useState(_a++)[0], a = k.useState(Ui)[0], o = k.useRef(e);
	k.useEffect(function() {
		o.current = e;
	}, [e]), k.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = yi([e.lockRef.current], (e.shards || []).map(ma), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = k.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = fa(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = sa(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = sa(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return da(h, t, e, h === "h" ? s : c, !0);
	}, []), c = k.useCallback(function(e) {
		var n = e;
		if (va.length && va[va.length - 1] === a) {
			var r = "deltaY" in n ? pa(n) : fa(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && ha(e.delta, r);
			})[0];
			if (i && i.should) n.cancelable && n.preventDefault();
			else if (!i) {
				var c = (o.current.shards || []).map(ma).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = k.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: ba(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), u = k.useCallback(function(e) {
		n.current = fa(e), r.current = void 0;
	}, []), d = k.useCallback(function(t) {
		l(t.type, pa(t), t.target, s(t, e.lockRef.current));
	}, []), f = k.useCallback(function(t) {
		l(t.type, fa(t), t.target, s(t, e.lockRef.current));
	}, []);
	k.useEffect(function() {
		return va.push(a), e.setCallbacks({
			onScrollCapture: d,
			onWheelCapture: d,
			onTouchMoveCapture: f
		}), document.addEventListener("wheel", c, na), document.addEventListener("touchmove", c, na), document.addEventListener("touchstart", u, na), function() {
			va = va.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, na), document.removeEventListener("touchmove", c, na), document.removeEventListener("touchstart", u, na);
		};
	}, []);
	var p = e.removeScrollBar, m = e.inert;
	return k.createElement(k.Fragment, null, m ? k.createElement(a, { styles: ga(i) }) : null, p ? k.createElement($i, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function ba(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
// node_modules/react-remove-scroll/dist/es2015/sidecar.js
var xa = Ni(Pi, ya), Sa = k.forwardRef(function(e, t) {
	return k.createElement(Ii, _i({}, e, {
		ref: t,
		sideCar: xa
	}));
});
Sa.classNames = Ii.classNames;
// web/src/lib/dialog-stack.ts
var Ca = [], wa = /* @__PURE__ */ new Set(), Ta = (e) => {
	Ca = e, wa.forEach((e) => e());
}, Ea = (e) => (wa.add(e), () => wa.delete(e)), Da = (e) => Ta([...Ca.filter((t) => t.id !== e.id), e]), Oa = (e) => {
	Ca.some((t) => t.id === e) && Ta(Ca.filter((t) => t.id !== e));
}, ka = (e) => {
	let t = Ca.findIndex((t) => t.id === e);
	t !== -1 && Ca.slice(t + 1).forEach((e) => e.raise());
}, Aa = () => [...Ca].reverse().forEach((e) => e.close()), ja = (e) => {
	let t = (0, k.useSyncExternalStore)(Ea, () => Ca.findIndex((t) => t.id === e)), n = (0, k.useSyncExternalStore)(Ea, () => Ca.length);
	return {
		covered: t !== -1 && t < n - 1,
		hasPrevious: t > 0
	};
}, Ma = {
	dialog: "_dialog_7z2t8_5 _panel_14j7l_3",
	covered: "_covered_7z2t8_34",
	stacked: "_stacked_7z2t8_40",
	"card-in": "_card-in_7z2t8_1",
	compact: "_compact_7z2t8_68",
	wide: "_wide_7z2t8_72",
	header: "_header_7z2t8_77 _band_14j7l_14",
	lead: "_lead_7z2t8_93",
	withBack: "_withBack_7z2t8_101",
	title: "_title_7z2t8_106 _title_14j7l_20",
	body: "_body_7z2t8_115",
	intro: "_intro_7z2t8_132 _intro_14j7l_29"
}, Na = "input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"hidden\"]):not([type=\"range\"]):not([type=\"file\"]):not(:disabled), textarea:not(:disabled)", Pa = (e, t, n, r) => {
	(0, k.useEffect)(() => {
		let r = e.current;
		if (r) {
			if (t && !r.open) {
				r.showModal(), re(), Da({
					id: n,
					close: () => r.close(),
					raise: () => {
						r.removeAttribute("open"), r.showModal();
					}
				});
				let e = ie() ? r.querySelector(Na) : null;
				e ? e.focus() : r.focus();
			}
			!t && r.open && r.close(), t || Oa(n);
		}
	}, [
		e,
		t,
		n
	]), (0, k.useEffect)(() => () => Oa(n), [n]), (0, k.useEffect)(() => {
		let i = e.current;
		t && !r && i?.open && !i.matches(":modal") && (i.removeAttribute("open"), i.showModal(), ka(n));
	});
}, Fa = ({ open: e, onClose: t, size: n = "compact", title: r, onBack: i, labelledBy: a, describedBy: o, intro: s, className: c = "", children: l }) => {
	let { t: u } = ae(), d = (0, k.useRef)(null), f = (0, k.useId)(), p = (0, k.useId)(), m = (0, k.useId)(), { covered: h, hasPrevious: g } = ja(m), v = _();
	return Pa(d, e, m, h), /* @__PURE__ */ (0, j.jsx)(Sa, {
		enabled: e,
		ref: d,
		forwardProps: !0,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ (0, j.jsxs)("dialog", {
			className: `${Ma.dialog} ${Ma[n]} ${g ? Ma.stacked : ""} ${h ? Ma.covered : ""} ${c}`,
			"aria-labelledby": r ? f : a,
			"aria-describedby": o ?? (s ? p : void 0),
			tabIndex: -1,
			onClose: (e) => {
				e.target === d.current && (Oa(m), t());
			},
			onClick: (e) => e.target === d.current && Aa(),
			children: [e && r && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: `${Ma.header} ${i || g ? Ma.withBack : ""}`,
				children: [/* @__PURE__ */ (0, j.jsxs)("span", {
					className: Ma.lead,
					children: [(i || g) && /* @__PURE__ */ (0, j.jsx)(zt, {
						icon: Ge,
						label: u("common.back"),
						size: v ? 44 : 34,
						onClick: i ?? (() => d.current?.close())
					}), /* @__PURE__ */ (0, j.jsx)("h2", {
						id: f,
						className: Ma.title,
						children: r
					})]
				}), /* @__PURE__ */ (0, j.jsx)(zt, {
					icon: jt,
					label: u("common.close"),
					size: v ? 44 : 34,
					onClick: Aa
				})]
			}), e && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: Ma.body,
				children: [s && /* @__PURE__ */ (0, j.jsx)("p", {
					id: p,
					className: Ma.intro,
					children: s
				}), l]
			})]
		})
	});
}, Ia = {
	wrapper: "_wrapper_4yvgh_3",
	button: "_button_4yvgh_16",
	seen: "_seen_4yvgh_53",
	bubble: "_bubble_4yvgh_72",
	rise: "_rise_4yvgh_1",
	title: "_title_4yvgh_97",
	text: "_text_4yvgh_104",
	dialog: "_dialog_4yvgh_119"
}, La = "hodi:help-seen", Ra = () => {
	try {
		let e = JSON.parse(localStorage.getItem(La) ?? "[]");
		return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
	} catch {
		return [];
	}
}, za = (e) => {
	try {
		localStorage.setItem(La, JSON.stringify([.../* @__PURE__ */ new Set([...Ra(), e])]));
	} catch {}
}, Ba = ({ id: e, title: t, layout: n, children: r }) => {
	let { t: i } = ae(), [a, o] = (0, k.useState)(!1), [s, c] = (0, k.useState)(() => Ra().includes(e)), l = (0, k.useRef)(null), u = (0, k.useId)(), { attach: d, style: f } = gi(a && n === "desktop", {
		gap: 10,
		cross: -12
	});
	return (0, k.useEffect)(() => {
		if (!a || n !== "desktop") return;
		let e = (e) => {
			(e instanceof KeyboardEvent ? e.key === "Escape" : !l.current?.contains(e.target)) && o(!1);
		};
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", e), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", e);
		};
	}, [a, n]), /* @__PURE__ */ (0, j.jsxs)("span", {
		ref: l,
		className: Ia.wrapper,
		"data-help": !0,
		children: [/* @__PURE__ */ (0, j.jsx)("button", {
			type: "button",
			className: `${Ia.button} ${s ? Ia.seen : ""}`,
			"aria-label": i("common.help", { title: t }),
			"aria-expanded": n === "desktop" ? a : void 0,
			"aria-controls": n === "desktop" && a ? u : void 0,
			onClick: () => {
				o(!a), s || (za(e), c(!0));
			},
			children: /* @__PURE__ */ (0, j.jsx)(y, { "aria-hidden": "true" })
		}), n === "desktop" ? a && /* @__PURE__ */ (0, j.jsxs)("div", {
			ref: d,
			popover: "manual",
			style: f,
			id: u,
			className: Ia.bubble,
			role: "dialog",
			"aria-label": t,
			children: [/* @__PURE__ */ (0, j.jsx)("strong", {
				className: Ia.title,
				children: t
			}), /* @__PURE__ */ (0, j.jsx)("div", {
				className: Ia.text,
				children: r
			})]
		}) : a && /* @__PURE__ */ (0, j.jsxs)(Fa, {
			open: !0,
			onClose: () => o(!1),
			title: t,
			className: Ia.dialog,
			children: [/* @__PURE__ */ (0, j.jsx)("div", {
				className: Ia.text,
				children: r
			}), /* @__PURE__ */ (0, j.jsx)(hn, { children: /* @__PURE__ */ (0, j.jsx)(Nt, {
				look: "primary",
				onClick: () => o(!1),
				children: i("common.gotIt")
			}) })]
		})]
	});
}, Va = {
	host: "_host_r9cdy_3",
	glows: "_glows_r9cdy_10",
	orbit: "_orbit_r9cdy_1"
}, Ha = () => /* @__PURE__ */ (0, j.jsxs)("div", {
	className: Va.glows,
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, j.jsx)("i", {}),
		/* @__PURE__ */ (0, j.jsx)("i", {}),
		/* @__PURE__ */ (0, j.jsx)("i", {}),
		/* @__PURE__ */ (0, j.jsx)("i", {}),
		/* @__PURE__ */ (0, j.jsx)("i", {})
	]
}), Ua = {
	page: "_page_15whg_3 _host_r9cdy_3",
	top: "_top_15whg_14",
	main: "_main_15whg_20",
	form: "_form_15whg_31 _panel_14j7l_3",
	header: "_header_15whg_50 _band_14j7l_14",
	stepper: "_stepper_15whg_65",
	bars: "_bars_15whg_71",
	done: "_done_15whg_84",
	count: "_count_15whg_88",
	titleRow: "_titleRow_15whg_96",
	title: "_title_15whg_96 _title_14j7l_20",
	intro: "_intro_15whg_117 _intro_14j7l_29",
	profileForm: "_profileForm_15whg_122",
	choices: "_choices_15whg_141",
	choice: "_choice_15whg_141",
	aiChoice: "_aiChoice_15whg_173",
	choiceMark: "_choiceMark_15whg_191",
	choiceHint: "_choiceHint_15whg_210",
	choiceText: "_choiceText_15whg_214",
	choiceCheck: "_choiceCheck_15whg_221",
	choiceLabel: "_choiceLabel_15whg_241",
	spacer: "_spacer_15whg_257",
	copyright: "_copyright_15whg_262",
	actions: "_actions_15whg_293",
	memberRow: "_memberRow_15whg_313",
	memberName: "_memberName_15whg_323"
}, Wa = ({ children: e }) => {
	let { t: n } = ae(), r = u();
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: Ua.page,
		children: [
			/* @__PURE__ */ (0, j.jsx)(Ha, {}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: Ua.top,
				children: [/* @__PURE__ */ (0, j.jsx)(Qt, { size: 34 }), /* @__PURE__ */ (0, j.jsx)(Vt, {
					label: n("language.label"),
					value: r,
					onChange: m,
					options: t.map((e) => ({
						value: e,
						title: oe[e],
						label: e.toUpperCase()
					}))
				})]
			}),
			/* @__PURE__ */ (0, j.jsx)("main", {
				className: Ua.main,
				children: e
			}),
			/* @__PURE__ */ (0, j.jsx)("footer", { children: /* @__PURE__ */ (0, j.jsx)(pn, { className: Ua.copyright }) })
		]
	});
}, Ga = ({ step: e = 0, total: t = 0, title: n, intro: r, help: i }) => {
	let a = g();
	return /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [/* @__PURE__ */ (0, j.jsxs)("header", {
		className: Ua.header,
		children: [e > 0 && t > 0 && /* @__PURE__ */ (0, j.jsxs)("div", {
			className: Ua.stepper,
			children: [/* @__PURE__ */ (0, j.jsx)("div", {
				className: Ua.bars,
				"aria-hidden": "true",
				children: Array.from({ length: t }, (t, n) => /* @__PURE__ */ (0, j.jsx)("span", { className: n < e ? Ua.done : void 0 }, n))
			}), /* @__PURE__ */ (0, j.jsxs)("span", {
				className: Ua.count,
				children: [
					e,
					" / ",
					t
				]
			})]
		}), /* @__PURE__ */ (0, j.jsxs)("div", {
			className: Ua.titleRow,
			children: [/* @__PURE__ */ (0, j.jsx)("h1", {
				className: Ua.title,
				children: n
			}), i && /* @__PURE__ */ (0, j.jsx)(Ba, {
				id: i.id,
				title: i.title,
				layout: a ? "desktop" : "phone",
				children: i.body
			})]
		})]
	}), /* @__PURE__ */ (0, j.jsx)("p", {
		className: Ua.intro,
		children: r
	})] });
}, Ka = ({ onBack: e, start: t, children: n }) => {
	let { t: r } = ae(), i = _() && t != null;
	return /* @__PURE__ */ (0, j.jsxs)(hn, {
		className: Ua.actions,
		children: [
			e && (i ? /* @__PURE__ */ (0, j.jsx)(zt, {
				icon: Ge,
				label: r("common.back"),
				size: 44,
				onClick: e
			}) : /* @__PURE__ */ (0, j.jsx)(Nt, {
				icon: Ge,
				onClick: e,
				children: r("common.back")
			})),
			t,
			/* @__PURE__ */ (0, j.jsx)("span", { className: Ua.spacer }),
			n
		]
	});
}, qa = ({ step: e, total: t, title: n, intro: r, onSubmit: i, onBack: a, start: o, actions: s, children: c }) => {
	let l = /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [
		/* @__PURE__ */ (0, j.jsx)(Ga, {
			step: e,
			total: t,
			title: n,
			intro: r
		}),
		c,
		/* @__PURE__ */ (0, j.jsx)(Ka, {
			onBack: a,
			start: o,
			children: s
		})
	] });
	return /* @__PURE__ */ (0, j.jsx)(Wa, { children: i ? /* @__PURE__ */ (0, j.jsx)("form", {
		className: Ua.form,
		onSubmit: (e) => {
			e.preventDefault(), i?.();
		},
		children: l
	}) : /* @__PURE__ */ (0, j.jsx)("div", {
		className: Ua.form,
		children: l
	}) });
}, Ja = {
	page: "_page_1j3dz_3",
	header: "_header_1j3dz_12",
	content: "_content_1j3dz_19",
	title: "_title_1j3dz_27",
	grid: "_grid_1j3dz_34",
	tile: "_tile_1j3dz_42",
	avatar: "_avatar_1j3dz_54",
	opening: "_opening_1j3dz_90",
	pulse: "_pulse_1j3dz_1",
	add: "_add_1j3dz_100",
	round: "_round_1j3dz_112",
	intro: "_intro_1j3dz_128",
	name: "_name_1j3dz_136",
	wideGrid: "_wideGrid_1j3dz_148",
	wideTile: "_wideTile_1j3dz_152",
	fullName: "_fullName_1j3dz_156",
	error: "_error_1j3dz_163",
	actions: "_actions_1j3dz_170",
	formBox: "_formBox_1j3dz_182",
	lock: "_lock_1j3dz_193",
	pinBox: "_pinBox_1j3dz_208",
	password: "_password_1j3dz_218",
	unlockActions: "_unlockActions_1j3dz_223",
	pill: "_pill_1j3dz_230",
	primary: "_primary_1j3dz_255",
	ways: "_ways_1j3dz_274",
	single: "_single_1j3dz_285"
}, Ya = {
	status: "_status_ydzdp_2",
	mark: "_mark_ydzdp_11",
	info: "_info_ydzdp_18",
	error: "_error_ydzdp_26"
}, Xa = ({ tone: e, children: t, className: n = "" }) => {
	let r = e === "info" ? w : v;
	return /* @__PURE__ */ (0, j.jsxs)("p", {
		className: `${Ya.status} ${Ya[e]} ${n}`,
		role: e === "error" ? "alert" : "status",
		children: [/* @__PURE__ */ (0, j.jsx)("span", {
			className: Ya.mark,
			children: /* @__PURE__ */ (0, j.jsx)(r, {
				size: 16,
				"aria-hidden": "true"
			})
		}), t]
	});
}, Za = ({ title: e, intro: t, tiles: n, opening: r = null, error: i, onBack: a, actions: o }) => {
	let { t: s } = ae();
	return /* @__PURE__ */ (0, j.jsxs)("main", {
		className: Ja.page,
		children: [
			/* @__PURE__ */ (0, j.jsx)(tn, {
				logo: !0,
				className: Ja.header
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: Ja.content,
				children: [
					/* @__PURE__ */ (0, j.jsx)("h1", {
						className: Ja.title,
						children: e
					}),
					t && /* @__PURE__ */ (0, j.jsx)("p", {
						className: Ja.intro,
						children: t
					}),
					/* @__PURE__ */ (0, j.jsx)("ul", {
						className: `${Ja.grid} ${Ja.wideGrid}`,
						"aria-busy": r !== null,
						children: n.map(({ key: e, label: t, icon: n, onClick: i }) => /* @__PURE__ */ (0, j.jsx)("li", { children: /* @__PURE__ */ (0, j.jsxs)("button", {
							type: "button",
							className: `${Ja.tile} ${Ja.wideTile}`,
							onClick: i,
							disabled: r !== null,
							children: [/* @__PURE__ */ (0, j.jsx)("span", {
								className: `${Ja.avatar} ${r === e ? Ja.opening : ""}`,
								children: /* @__PURE__ */ (0, j.jsx)("span", {
									className: Ja.round,
									"aria-hidden": "true",
									children: n ? /* @__PURE__ */ (0, j.jsx)(n, { size: 36 }) : t.trim().charAt(0).toUpperCase()
								})
							}), /* @__PURE__ */ (0, j.jsx)("span", {
								className: `${Ja.name} ${Ja.fullName}`,
								children: t
							})]
						}) }, e))
					}),
					i && /* @__PURE__ */ (0, j.jsx)(Xa, {
						tone: "error",
						className: Ja.error,
						children: i
					}),
					(a || o) && /* @__PURE__ */ (0, j.jsxs)("div", {
						className: Ja.actions,
						children: [a && /* @__PURE__ */ (0, j.jsx)(Nt, {
							icon: Ge,
							onClick: a,
							children: s("common.back")
						}), o]
					})
				]
			}),
			/* @__PURE__ */ (0, j.jsx)(pn, {})
		]
	});
}, Qa = (0, k.createContext)(null), $a = ({ start: e, children: t }) => {
	let n = (0, k.use)(Qa);
	return /* @__PURE__ */ (0, j.jsx)(Ka, {
		onBack: n ?? void 0,
		start: e,
		children: t
	});
}, eo = (e, t) => ({
	fr: e,
	en: t
}), to = (e, t, n) => {
	let r = t.map((e) => typeof e == "string" ? [e, e] : e);
	return {
		kind: "seg",
		key: e,
		options: r,
		value: n ?? r[0][0]
	};
};
to("icon", [
	"Mail",
	"Search",
	"Hand"
]), to("length", ["6", "8"]), to("state", [
	"idle",
	"wrong",
	"right"
]), to("align", ["start", "center"]);
var no = [
	["morning", eo("Matin", "Morning")],
	["noon", eo("Midi", "Noon")],
	["evening", eo("Soir", "Evening")]
], ro = (e) => no.map(([t, n]) => ({
	value: t,
	label: typeof n == "string" ? n : n[e]
}));
to("value", [...no.map(([e, t]) => [e, t])]);
// web/docs-demo/week-chart.tsx
var io = [
	12,
	18,
	9,
	22,
	16,
	27,
	24
], ao = {
	fr: [
		"L",
		"M",
		"M",
		"J",
		"V",
		"S",
		"D"
	],
	en: [
		"M",
		"T",
		"W",
		"T",
		"F",
		"S",
		"S"
	]
}, oo = ({ lang: e }) => /* @__PURE__ */ (0, j.jsx)("div", {
	className: "week-chart",
	role: "img",
	"aria-label": io.join(", "),
	children: io.map((t, n) => /* @__PURE__ */ (0, j.jsxs)("div", {
		className: `week-day${n === io.length - 1 ? " today" : ""}`,
		children: [/* @__PURE__ */ (0, j.jsx)("span", {
			className: "week-bar",
			title: String(t)
		}), /* @__PURE__ */ (0, j.jsx)("span", {
			className: "week-label",
			children: ao[e][n]
		})]
	}, n))
}), F = () => {}, I = (e) => (t, n) => e === "en" ? n : t, so = {
	Check: f,
	Download: tt,
	Trash2: kt,
	Plus: Tt,
	Pencil: Ct,
	Bookmark: Ze,
	Flag: lt
}, co = (e) => so[e], L = (e, t) => String(e[t] ?? ""), lo = (e, t) => /* @__PURE__ */ (0, j.jsx)(ln, {
	label: t,
	value: I(e)("Salut", "Hi"),
	action: {
		label: I(e)("Changer", "Change"),
		icon: Ct,
		onClick: F
	}
}), uo = (e, t) => {
	let n = I(t);
	if (e.action === "one") return {
		label: n("Changer", "Change"),
		icon: Ct,
		onClick: F
	};
	if (e.action === "two") return [{
		label: n("Exporter", "Export"),
		icon: tt,
		onClick: F
	}, {
		label: n("Vider", "Clear"),
		icon: kt,
		look: "danger",
		onClick: F
	}];
}, fo = {
	button: (e) => /* @__PURE__ */ (0, j.jsx)(Nt, {
		look: L(e, "look"),
		icon: co(e.icon),
		compact: e.compact === !0,
		busy: e.busy === !0,
		wide: e.wide === !0,
		children: L(e, "label") || " "
	}),
	roundbutton: (e) => /* @__PURE__ */ (0, j.jsx)(zt, {
		icon: co(e.icon) ?? Ct,
		label: L(e, "label"),
		size: Number(e.size),
		variant: L(e, "variant"),
		filled: e.filled === !0
	}),
	aibutton: (e) => /* @__PURE__ */ (0, j.jsx)(Nt, {
		look: "ai",
		icon: Ht,
		compact: e.compact === !0,
		wide: e.wide === !0,
		disabled: e.disabled === !0,
		children: L(e, "label") || " "
	}),
	readerbutton: (e) => {
		let t = co(e.icon);
		return /* @__PURE__ */ (0, j.jsx)(Jt, {
			icon: t ? /* @__PURE__ */ (0, j.jsx)(t, { size: 12 }) : void 0,
			onClick: F,
			done: e.done === !0,
			children: L(e, "label") || " "
		});
	},
	sectionpage: (e, t) => /* @__PURE__ */ (0, j.jsx)(on, {
		title: L(e, "title"),
		intro: L(e, "intro") || void 0,
		layout: L(e, "layout"),
		aside: e.aside === !0 ? /* @__PURE__ */ (0, j.jsx)(Ft, {
			tone: "success",
			children: I(t)("Actif", "Active")
		}) : void 0,
		children: /* @__PURE__ */ (0, j.jsx)(sn, { children: lo(t, I(t)("Salutation", "Greeting")) })
	}),
	settingscard: (e, t) => /* @__PURE__ */ (0, j.jsx)(sn, {
		label: L(e, "label") || void 0,
		children: lo(t, I(t)("Texte", "Text"))
	}),
	settingrow: (e, t) => /* @__PURE__ */ (0, j.jsx)(sn, { children: /* @__PURE__ */ (0, j.jsx)(ln, {
		label: L(e, "label"),
		value: L(e, "value") || void 0,
		hint: L(e, "hint") || void 0,
		action: uo(e, t),
		choice: e.choice === !0 ? /* @__PURE__ */ (0, j.jsx)(Vt, {
			label: "Moment",
			value: "morning",
			options: ro(t),
			onChange: F
		}) : void 0,
		children: e.toggle === !0 && /* @__PURE__ */ (0, j.jsx)(Kt, {
			checked: !0,
			label: L(e, "label"),
			onChange: F
		})
	}) }),
	morerow: (e, t) => /* @__PURE__ */ (0, j.jsxs)(sn, { children: [/* @__PURE__ */ (0, j.jsx)(ln, {
		label: "Anna",
		value: I(t)("Salut !", "Hi!")
	}), /* @__PURE__ */ (0, j.jsx)(Lt, {
		label: L(e, "label"),
		onClick: F
	})] }),
	overviewcard: (e, t) => /* @__PURE__ */ (0, j.jsx)(dn, {
		title: L(e, "title"),
		count: e.count === !0 ? 128 : void 0,
		aside: e.aside === !0 ? /* @__PURE__ */ (0, j.jsx)(Ft, {
			tone: "success",
			children: I(t)("+12 cette semaine", "+12 this week")
		}) : void 0,
		children: e.chart === !0 && /* @__PURE__ */ (0, j.jsx)(oo, { lang: t })
	}),
	steppage: (e, t) => {
		let n = I(t);
		return /* @__PURE__ */ (0, j.jsxs)(qa, {
			step: e.progress === !0 ? 2 : void 0,
			total: e.progress === !0 ? 3 : void 0,
			title: L(e, "title") || " ",
			intro: L(e, "intro"),
			onBack: e.back === !0 ? F : void 0,
			start: e.later === !0 ? /* @__PURE__ */ (0, j.jsx)(Nt, { children: n("Plus tard", "Later") }) : void 0,
			actions: /* @__PURE__ */ (0, j.jsxs)(Nt, {
				look: "primary",
				children: [n("Continuer", "Continue"), /* @__PURE__ */ (0, j.jsx)(qe, {
					size: 16,
					"aria-hidden": "true"
				})]
			}),
			children: [e.body === "field" && /* @__PURE__ */ (0, j.jsx)(Wt, {
				icon: dt,
				"aria-label": n("Prénom", "First name"),
				placeholder: "Anna"
			}), e.body === "toggle" && /* @__PURE__ */ (0, j.jsx)(Kt, {
				checked: !0,
				label: n("Saluer le matin", "Say hello in the morning"),
				onChange: F
			})]
		});
	},
	tilespage: (e, t) => /* @__PURE__ */ (0, j.jsx)(Za, {
		title: L(e, "title"),
		intro: L(e, "intro") || void 0,
		tiles: [{
			key: "a",
			label: I(t)("Les Dupont", "The Smiths"),
			icon: pt,
			onClick: F
		}, {
			key: "b",
			label: I(t)("Mamie", "Grandma"),
			onClick: F
		}],
		opening: e.opening === !0 ? "a" : null,
		error: e.error === !0 ? I(t)("Ce foyer ne répond pas.", "This household does not answer.") : null,
		onBack: e.back === !0 ? F : void 0
	}),
	setupactions: (e, t) => /* @__PURE__ */ (0, j.jsx)($a, {
		start: e.later === !0 ? /* @__PURE__ */ (0, j.jsx)(Nt, { children: I(t)("Plus tard", "Later") }) : void 0,
		children: /* @__PURE__ */ (0, j.jsx)(Nt, {
			look: "primary",
			children: L(e, "label") || " "
		})
	})
}, po = {
	row: "_row_61nhp_4",
	check: "_check_61nhp_18",
	on: "_on_61nhp_31",
	label: "_label_61nhp_37"
}, mo = ({ checked: e, onChange: t, children: n, disabled: r = !1 }) => /* @__PURE__ */ (0, j.jsxs)("button", {
	type: "button",
	role: "checkbox",
	"aria-checked": e,
	disabled: r,
	className: po.row,
	onClick: () => t(!e),
	children: [/* @__PURE__ */ (0, j.jsx)("span", {
		className: `${po.check} ${e ? po.on : ""}`,
		"aria-hidden": "true",
		children: e && /* @__PURE__ */ (0, j.jsx)(f, {
			size: 12,
			strokeWidth: 3
		})
	}), /* @__PURE__ */ (0, j.jsx)("span", {
		className: po.label,
		children: n
	})]
}), ho = {
	wrap: "_wrap_1hgj8_1",
	compact: "_compact_1hgj8_19",
	state: "_state_1hgj8_24",
	icon: "_icon_1hgj8_32",
	danger: "_danger_1hgj8_51",
	title: "_title_1hgj8_55",
	text: "_text_1hgj8_63",
	actions: "_actions_1hgj8_70"
}, go = ({ icon: e, title: t, children: n, actions: r, tone: i = "default", compact: a = !1 }) => /* @__PURE__ */ (0, j.jsx)("div", {
	className: `${ho.wrap} ${a ? ho.compact : ""}`,
	children: /* @__PURE__ */ (0, j.jsxs)("div", {
		className: ho.state,
		role: i === "danger" ? "alert" : void 0,
		children: [
			/* @__PURE__ */ (0, j.jsx)("span", {
				className: `${ho.icon} ${ho[i]}`,
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ (0, j.jsx)("h2", {
				className: ho.title,
				children: t
			}),
			n && /* @__PURE__ */ (0, j.jsx)("p", {
				className: ho.text,
				children: n
			}),
			r && /* @__PURE__ */ (0, j.jsx)("div", {
				className: ho.actions,
				children: r
			})
		]
	})
}), _o = {
	chip: "_chip_1v7ik_2",
	selected: "_selected_1v7ik_30"
}, vo = ({ selected: e, onClick: t, href: n, count: r, icon: i, disabled: a = !1, children: o }) => {
	let s = `${_o.chip} ${e ? _o.selected : ""}`, c = /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [
		i && /* @__PURE__ */ (0, j.jsx)(i, {
			size: 14,
			"aria-hidden": "true"
		}),
		o,
		r !== void 0 && ` · ${r}`
	] });
	return n ? /* @__PURE__ */ (0, j.jsx)("a", {
		className: s,
		href: n,
		"aria-current": e ? "page" : void 0,
		children: c
	}) : /* @__PURE__ */ (0, j.jsx)("button", {
		type: "button",
		className: s,
		"aria-pressed": e,
		disabled: a,
		onClick: t,
		children: c
	});
}, yo = {
	avatar: "_avatar_f80jw_3",
	face: "_face_f80jw_12",
	initial: "_initial_f80jw_33"
}, bo = ({ name: e, photo: t, size: n, preview: r }) => {
	let i = r === void 0 ? t : r;
	return /* @__PURE__ */ (0, j.jsx)("span", {
		className: yo.avatar,
		style: {
			width: n,
			height: n
		},
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, j.jsx)("span", {
			className: yo.face,
			style: { fontSize: Math.round(n * .38) },
			children: i ? /* @__PURE__ */ (0, j.jsx)("img", {
				src: i,
				alt: "",
				width: n,
				height: n
			}) : /* @__PURE__ */ (0, j.jsx)("span", {
				className: yo.initial,
				children: (e.trim()[0] ?? "?").toUpperCase()
			})
		})
	});
}, xo = {
	notice: "_notice_k1u8b_3",
	info: "_info_k1u8b_15",
	warning: "_warning_k1u8b_23",
	error: "_error_k1u8b_31",
	linked: "_linked_k1u8b_39",
	cover: "_cover_k1u8b_48",
	main: "_main_k1u8b_54",
	side: "_side_k1u8b_58",
	mark: "_mark_k1u8b_63",
	title: "_title_k1u8b_83",
	text: "_text_k1u8b_92",
	roundAction: "_roundAction_k1u8b_120",
	wideAction: "_wideAction_k1u8b_138"
}, So = ({ title: e, icon: t, tone: n = "info", action: r, side: i, href: a, children: o }) => /* @__PURE__ */ (0, j.jsxs)("aside", {
	className: `${xo.notice} ${xo[n]} ${a ? xo.linked : ""}`,
	children: [
		a && /* @__PURE__ */ (0, j.jsx)("a", {
			className: xo.cover,
			href: a,
			target: "_blank",
			rel: "noopener noreferrer",
			tabIndex: -1,
			"aria-hidden": "true"
		}),
		/* @__PURE__ */ (0, j.jsx)("span", {
			className: xo.mark,
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, j.jsx)(t, { size: 20 })
		}),
		/* @__PURE__ */ (0, j.jsxs)("div", {
			className: xo.main,
			children: [/* @__PURE__ */ (0, j.jsx)("h3", {
				className: xo.title,
				children: e
			}), /* @__PURE__ */ (0, j.jsx)("div", {
				className: xo.text,
				children: o
			})]
		}),
		r && /* @__PURE__ */ (0, j.jsxs)("div", {
			className: xo.side,
			children: [/* @__PURE__ */ (0, j.jsx)(Nt, {
				className: xo.wideAction,
				icon: r.icon,
				onClick: r.onClick,
				href: r.href,
				children: r.label
			}), /* @__PURE__ */ (0, j.jsx)(zt, {
				className: xo.roundAction,
				icon: r.icon,
				label: r.label,
				size: 38,
				onClick: r.onClick,
				href: r.href
			})]
		}),
		i && /* @__PURE__ */ (0, j.jsx)("div", {
			className: xo.side,
			children: i
		})
	]
}), Co = {
	field: "_field_1vgq1_1",
	invalid: "_invalid_1vgq1_18",
	input: "_input_1vgq1_23",
	eye: "_eye_1vgq1_48"
}, wo = ({ icon: e = yt, invalid: t = !1, lead: n, className: r = "", ...i }) => {
	let { t: a } = ae(), [o, s] = (0, k.useState)(!1);
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: `${Co.field} ${t ? Co.invalid : ""} ${r}`,
		children: [
			n ?? /* @__PURE__ */ (0, j.jsx)(e, {
				size: 16,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, j.jsx)("input", {
				className: Co.input,
				type: o ? "text" : "password",
				maxLength: 256,
				"aria-invalid": t,
				...i
			}),
			/* @__PURE__ */ (0, j.jsx)("button", {
				type: "button",
				className: Co.eye,
				onClick: () => s(!o),
				"aria-label": a(o ? "password.hide" : "password.show"),
				"aria-pressed": o,
				children: o ? /* @__PURE__ */ (0, j.jsx)(at, {
					size: 16,
					"aria-hidden": "true"
				}) : /* @__PURE__ */ (0, j.jsx)(st, {
					size: 16,
					"aria-hidden": "true"
				})
			})
		]
	});
};
navigator.onLine;
// web/src/plugins/registry.ts
var To = ({ plugins: e, web: t }, n) => e.filter((e) => e.enabled && !e.error).flatMap((e) => {
	let r = t.get(e.id)?.[n];
	return r == null ? [] : [{
		id: e.id,
		value: r
	}];
}), Eo = (e) => To(Ao(), e), Do = {
	ready: !1,
	plugins: [],
	web: /* @__PURE__ */ new Map()
}, Oo = /* @__PURE__ */ new Set(), ko = (e) => (Oo.add(e), () => Oo.delete(e)), Ao = () => (0, k.useSyncExternalStore)(ko, () => Do), jo = (e) => `plugin.${e}`, Mo = class extends Error {
	status;
	code;
	retryAfterSeconds;
	refusal;
	constructor(e, t, n, r = null) {
		super(`Request failed with status ${e}${t ? ` (${t})` : ""}`), this.status = e, this.code = t, this.retryAfterSeconds = n, this.refusal = r;
	}
}, No = "hodi:user-state", Po = "hodi:user-outbox", Fo = {
	preferences: "hodi:preferences",
	saved: "hodi:saved",
	read: "hodi:read",
	readings: "hodi:reading-stats"
}, Io = (e) => {
	try {
		let t = localStorage.getItem(e);
		return t === null ? void 0 : JSON.parse(t);
	} catch {
		return;
	}
}, Lo = (e) => Array.isArray(e) ? e : [];
(() => {
	let e = Io(Fo.preferences), t = Lo(Io(Fo.saved)), n = Lo(Io(Fo.read)).filter((e) => typeof e == "string"), r = Lo(Io(Fo.readings));
	return e === void 0 && t.length === 0 && n.length === 0 && r.length === 0 ? null : {
		revision: 0,
		preferences: typeof e == "object" && e ? e : null,
		saved: t.filter((e) => typeof e?.item?.id == "string"),
		read: [...n].reverse(),
		readings: r.map((e) => ({
			...e,
			topicId: e.topicId ?? null
		}))
	};
})(), Io(No), Io(Po);
// web/src/api/news.ts
var Ro = (e) => `/api/sources/${encodeURIComponent(e)}/icon`, zo = (e) => [
	E("password.levels.tooShort"),
	E("password.levels.weak"),
	E("password.levels.fair"),
	E("password.levels.strong"),
	E("password.levels.excellent")
][e] ?? "", Bo = null, Vo = null, Ho = () => Vo ??= Promise.all([
	import("./play-DwW_2AOV.js"),
	import("./play-mmKeabF0.js"),
	import("./play-DKBTFtGL.js"),
	import("./play-BnnjBDTj.js")
]).then(([{ ZxcvbnFactory: e }, t, n, r]) => {
	Bo = new e({
		dictionary: {
			...t.dictionary,
			...n.dictionary,
			...r.dictionary
		},
		graphs: t.adjacencyGraphs
	});
}), Uo = {
	straightRow: "keyboard",
	keyPattern: "keyboard",
	simpleRepeat: "repeat",
	extendedRepeat: "repeat",
	sequences: "repeat",
	recentYears: "dates",
	dates: "dates",
	topTen: "common",
	topHundred: "common",
	common: "common",
	similarToCommon: "common",
	pwned: "common",
	wordByItself: "word",
	namesByThemselves: "word",
	commonNames: "word",
	userInputs: "word"
}, Wo = (e, t) => {
	let n = e ? Uo[e] : void 0;
	return n ? E(`password.tips.${n}`) : E("password.another", { level: t });
}, Go = (e) => {
	if (e.length < 8) {
		let t = 8 - e.length;
		return {
			score: 0,
			label: zo(0),
			hint: e.length === 0 ? E("password.minimum", { count: 8 }) : E("password.missing", { count: t })
		};
	}
	if (!Bo) return {
		score: 1,
		label: zo(1),
		hint: E("password.another", { level: zo(2) })
	};
	let { score: t, feedback: n } = Bo.check(e), r = Math.max(1, t);
	return {
		score: r,
		label: zo(r),
		hint: r === 4 ? null : Wo(n.warning, zo(r + 1))
	};
}, R = (e) => {
	let [t, n] = (0, k.useState)(Bo !== null);
	return (0, k.useEffect)(() => {
		t || Ho().then(() => n(!0));
	}, [t]), Go(e);
}, z = {
	ring: "_ring_1t8d0_3",
	weak: "_weak_1t8d0_12",
	fair: "_fair_1t8d0_16",
	strong: "_strong_1t8d0_20",
	track: "_track_1t8d0_24",
	arc: "_arc_1t8d0_32",
	hint: "_hint_1t8d0_44",
	level: "_level_1t8d0_52"
}, Ko = [
	"weak",
	"weak",
	"fair",
	"strong",
	"strong"
], qo = 10, Jo = 2 * Math.PI * qo, Yo = ({ password: e }) => {
	let { t } = ae(), { score: n, label: r } = R(e), i = n === 0 ? Math.min(1, e.length / 8) / 4 : n / 4;
	return /* @__PURE__ */ (0, j.jsx)("span", {
		className: `${z.ring} ${e ? z[Ko[n]] : ""}`,
		role: "meter",
		"aria-label": t("password.gauge"),
		"aria-valuemin": 0,
		"aria-valuemax": 4,
		"aria-valuenow": n,
		"aria-valuetext": r,
		title: e ? r : void 0,
		children: /* @__PURE__ */ (0, j.jsxs)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, j.jsx)("circle", {
				className: z.track,
				cx: "12",
				cy: "12",
				r: qo
			}), /* @__PURE__ */ (0, j.jsx)("circle", {
				className: z.arc,
				cx: "12",
				cy: "12",
				r: qo,
				strokeDasharray: Jo,
				strokeDashoffset: Jo * (1 - i)
			})]
		})
	});
}, Xo = ({ password: e }) => {
	let { score: t, label: n, hint: r } = R(e);
	return !e || t >= 3 ? null : /* @__PURE__ */ (0, j.jsxs)("p", {
		className: `${z.hint} ${z[Ko[t]]}`,
		children: [/* @__PURE__ */ (0, j.jsx)("span", {
			className: z.level,
			children: n
		}), r && ` · ${r}`]
	});
}, Zo = {
	field: "_field_1pd6t_3",
	start: "_start_1pd6t_11",
	label: "_label_1pd6t_15",
	boxes: "_boxes_1pd6t_23",
	grouped: "_grouped_1pd6t_31",
	box: "_box_1pd6t_23",
	input: "_input_1pd6t_44",
	filled: "_filled_1pd6t_79",
	shown: "_shown_1pd6t_88",
	wrong: "_wrong_1pd6t_98",
	next: "_next_1pd6t_103",
	caret: "_caret_1pd6t_1",
	shake: "_shake_1pd6t_1",
	right: "_right_1pd6t_131"
}, Qo = ({ label: e, value: t, onChange: n, onComplete: r, state: i = "idle", disabled: a = !1, align: o = "center", autoFocus: s, length: c, masked: l = !0, characters: u }) => {
	let d = (0, k.useRef)(null);
	return /* @__PURE__ */ (0, j.jsxs)("label", {
		className: `${Zo.field} ${Zo[i]} ${o === "start" ? Zo.start : ""} ${l ? "" : Zo.shown}`,
		children: [/* @__PURE__ */ (0, j.jsx)("span", {
			className: Zo.label,
			children: e
		}), /* @__PURE__ */ (0, j.jsxs)("span", {
			className: `${Zo.boxes} ${u ? Zo.grouped : ""}`,
			children: [/* @__PURE__ */ (0, j.jsx)("input", {
				ref: d,
				className: Zo.input,
				type: "text",
				inputMode: u ? "text" : "numeric",
				pattern: u ? void 0 : "[0-9]*",
				autoCapitalize: u ? "characters" : "off",
				maxLength: u ? void 0 : c,
				autoComplete: "off",
				autoCorrect: "off",
				spellCheck: !1,
				"data-1p-ignore": "",
				"data-lpignore": "true",
				"data-bwignore": "",
				"data-form-type": "other",
				autoFocus: s,
				disabled: a,
				"aria-invalid": i === "wrong" || void 0,
				value: t,
				onChange: (e) => {
					let t = e.target.value, i = (u ? (t.toUpperCase().match(u) ?? []).join("") : t.replace(/\D/g, "")).slice(0, c);
					n(i), i.length === c && r?.(i);
				},
				onSelect: (e) => {
					let t = e.currentTarget.value.length;
					e.currentTarget.setSelectionRange(t, t);
				}
			}), Array.from({ length: c }, (e, n) => /* @__PURE__ */ (0, j.jsx)("span", {
				className: `${Zo.box} ${n < t.length ? Zo.filled : ""} ${n === Math.min(t.length, c - 1) ? Zo.next : ""}`,
				"aria-hidden": "true",
				children: l ? null : t[n]
			}, n))]
		})]
	});
}, $o = {
	avatar: "_avatar_1fhyd_1",
	size18: "_size18_1fhyd_27",
	size20: "_size20_1fhyd_34",
	size22: "_size22_1fhyd_41",
	size26: "_size26_1fhyd_49",
	size44: "_size44_1fhyd_57"
}, B = (e) => e.replace(/^the\s+/i, "").split(/[\s_-]+/).filter((e) => /[\p{L}\p{N}]/u.test(e)).slice(0, 2).map((e) => [...e][0]).join("").toUpperCase(), es = /* @__PURE__ */ new Set(), ts = ({ sourceId: e, sourceName: t, size: n = 18 }) => {
	let [r, i] = (0, k.useState)(() => !e || es.has(e));
	return /* @__PURE__ */ (0, j.jsx)("span", {
		className: `${$o.avatar} ${$o[`size${n}`]}`,
		"aria-hidden": "true",
		children: r ? B(t) : /* @__PURE__ */ (0, j.jsx)("img", {
			src: Ro(e),
			alt: "",
			width: n,
			height: n,
			loading: "lazy",
			decoding: "async",
			onError: () => {
				es.add(e), i(!0);
			}
		})
	});
}, ns = class extends k.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e) {
		console.error(`Plugin ${this.props.id} failed:`, e);
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
}, rs = ({ id: e, component: t, props: n, fallback: r = null }) => /* @__PURE__ */ (0, j.jsx)(Ue.Provider, {
	value: e,
	children: /* @__PURE__ */ (0, j.jsx)(ns, {
		id: e,
		fallback: r,
		children: /* @__PURE__ */ (0, j.jsx)(t, { ...n })
	})
}), is = /^(?:\/(?!\/)|#|https:\/\/)/, as = (e) => is.test(e) ? /* @__PURE__ */ (0, j.jsx)("a", {
	href: e,
	target: "_blank",
	rel: "noreferrer",
	onClick: (e) => e.stopPropagation()
}) : /* @__PURE__ */ (0, j.jsx)("span", {}), os = ({ id: e, consent: t }) => {
	let { text: n, links: r } = typeof t == "string" ? {
		text: t,
		links: {}
	} : t, i = Object.fromEntries(Object.entries(r).map(([e, t]) => [e, as(t)]));
	return /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [" ", /* @__PURE__ */ (0, j.jsx)(Ve, {
		ns: jo(e),
		i18nKey: n,
		components: i
	})] });
}, ss = () => /* @__PURE__ */ (0, j.jsx)(j.Fragment, { children: Eo("ageConsent").map(({ id: e, value: t }) => /* @__PURE__ */ (0, j.jsx)(rs, {
	id: e,
	component: os,
	props: {
		id: e,
		consent: t
	}
}, e)) }), cs = ({ checked: e, onChange: t }) => {
	let { t: n } = ae();
	return /* @__PURE__ */ (0, j.jsxs)(mo, {
		checked: e,
		onChange: t,
		children: [n("join.age"), /* @__PURE__ */ (0, j.jsx)(ss, {})]
	});
}, ls = {
	Mail: xt,
	Search: Dt,
	Hand: dt
}, V = (e, t) => String(e[t] ?? ""), us = {
	textfield: (e, t) => /* @__PURE__ */ (0, j.jsx)(Wt, {
		icon: ls[V(e, "icon")] ?? xt,
		"aria-label": V(e, "label"),
		placeholder: V(e, "placeholder"),
		defaultValue: e.clear === !0 ? I(t)("bonjour", "hello") : void 0,
		onClear: e.clear === !0 ? F : void 0
	}),
	passwordfield: (e) => /* @__PURE__ */ (0, j.jsxs)(j.Fragment, { children: [/* @__PURE__ */ (0, j.jsx)(wo, {
		"aria-label": V(e, "label"),
		value: V(e, "password"),
		onChange: F,
		invalid: e.invalid === !0,
		lead: e.ring === !0 ? /* @__PURE__ */ (0, j.jsx)(Yo, { password: V(e, "password") }) : void 0
	}), /* @__PURE__ */ (0, j.jsx)(Xo, { password: V(e, "password") })] }),
	pinfield: (e) => /* @__PURE__ */ (0, j.jsx)(Qo, {
		label: V(e, "label"),
		value: "482",
		onChange: F,
		length: Number(e.length),
		state: V(e, "state"),
		align: V(e, "align"),
		masked: e.masked === !0,
		disabled: e.disabled === !0
	}),
	toggle: (e) => /* @__PURE__ */ (0, j.jsx)(Kt, {
		checked: e.checked === !0,
		label: V(e, "label"),
		onChange: F,
		disabled: e.disabled === !0
	}),
	checkbox: (e) => /* @__PURE__ */ (0, j.jsx)(mo, {
		checked: e.checked === !0,
		onChange: F,
		disabled: e.disabled === !0,
		children: V(e, "label")
	}),
	agecheckbox: (e) => /* @__PURE__ */ (0, j.jsx)(cs, {
		checked: e.checked === !0,
		onChange: F
	}),
	segmented: (e, t) => /* @__PURE__ */ (0, j.jsx)(Vt, {
		label: V(e, "label"),
		value: V(e, "value"),
		options: ro(t),
		onChange: F,
		wide: e.wide === !0
	}),
	statusline: (e) => /* @__PURE__ */ (0, j.jsx)(Xa, {
		tone: V(e, "tone"),
		children: V(e, "message")
	}),
	notice: (e, t) => /* @__PURE__ */ (0, j.jsx)(So, {
		title: V(e, "title"),
		icon: w,
		tone: V(e, "tone"),
		action: e.action === !0 ? {
			label: I(t)("Voir", "See"),
			icon: rt,
			onClick: F
		} : void 0,
		children: V(e, "body")
	}),
	emptystate: (e, t) => /* @__PURE__ */ (0, j.jsx)(go, {
		icon: /* @__PURE__ */ (0, j.jsx)(ht, { size: 28 }),
		title: V(e, "title"),
		tone: V(e, "tone"),
		compact: e.compact === !0,
		actions: e.actions === !0 ? /* @__PURE__ */ (0, j.jsx)(Nt, { children: I(t)("Ajouter", "Add") }) : void 0,
		children: V(e, "body") || void 0
	}),
	chip: (e) => /* @__PURE__ */ (0, j.jsx)(Ft, {
		tone: e.tone === "none" ? void 0 : V(e, "tone"),
		size: V(e, "size"),
		children: V(e, "label") || " "
	}),
	filterchip: (e) => /* @__PURE__ */ (0, j.jsx)(vo, {
		selected: e.selected === !0,
		count: e.count === !0 ? 12 : void 0,
		icon: e.icon === !0 ? Ye : void 0,
		disabled: e.disabled === !0,
		onClick: F,
		children: V(e, "label") || " "
	}),
	sourceavatar: (e) => /* @__PURE__ */ (0, j.jsx)(ts, {
		sourceId: "",
		sourceName: V(e, "name") || " ",
		size: Number(e.size)
	}),
	householdavatar: (e) => /* @__PURE__ */ (0, j.jsx)(bo, {
		name: V(e, "name") || " ",
		photo: null,
		size: Number(e.size)
	})
}, ds = null, fs = /* @__PURE__ */ new Set(), ps = (e) => {
	ds = e, fs.forEach((e) => e());
}, ms = (e) => (fs.add(e), () => fs.delete(e)), hs = (e) => ps(e), gs = () => ps(null), _s = () => {
	let e = ds;
	ps(null), e?.onCancel?.();
}, vs = () => (0, k.useSyncExternalStore)(ms, () => ds), ys = !1, bs = /* @__PURE__ */ new Set(), xs = () => ys, Ss = (e) => (bs.add(e), () => bs.delete(e)), Cs = () => (0, k.useSyncExternalStore)(Ss, xs), ws = {
	message: "_message_11tuh_3",
	form: "_form_11tuh_14",
	fields: "_fields_11tuh_21",
	field: "_field_11tuh_21",
	label: "_label_11tuh_33"
}, Ts = () => {
	let e = vs();
	return /* @__PURE__ */ (0, j.jsx)(Fa, {
		open: e !== null,
		onClose: _s,
		title: e?.title,
		describedBy: "confirm-message",
		children: e && /* @__PURE__ */ (0, j.jsx)(Os, { confirmation: e }, e.title)
	});
}, Es = /* @__PURE__ */ new Map([["invalid_password", "wrongPassword"], ["invalid_code", "wrongCode"]]), Ds = ({ askPassword: e, askCode: t, error: n, password: r, code: i, onPassword: a, onCode: o }) => {
	let { t: s } = ae();
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: ws.fields,
		children: [e && /* @__PURE__ */ (0, j.jsxs)("label", {
			className: ws.field,
			children: [/* @__PURE__ */ (0, j.jsx)("span", {
				className: ws.label,
				children: s("confirm.proof.password")
			}), /* @__PURE__ */ (0, j.jsx)(wo, {
				"aria-label": s("confirm.proof.password"),
				autoComplete: "current-password",
				autoFocus: !0,
				required: !0,
				invalid: n === "wrongPassword",
				value: r,
				onChange: (e) => a(e.target.value)
			})]
		}), t && /* @__PURE__ */ (0, j.jsx)(Qo, {
			label: s("confirm.proof.code"),
			length: 6,
			masked: !1,
			align: "start",
			autoFocus: !e,
			state: n === "wrongCode" ? "wrong" : "idle",
			value: i,
			onChange: o
		})]
	});
}, Os = ({ confirmation: e }) => {
	let { t } = ae(), [n, r] = (0, k.useState)(""), [i, a] = (0, k.useState)(""), [o, s] = (0, k.useState)(!1), [c, l] = (0, k.useState)(null), { proof: u } = e, d = Cs(), f = u !== void 0 && u.noPassword !== !0 && u.codeOnly !== !0, p = u !== void 0 && (d || u.codeOnly === !0), m = async (t) => {
		if (t.preventDefault(), !u) e.onConfirm({
			password: "",
			code: ""
		}), gs();
		else {
			s(!0), l(null);
			try {
				await e.onConfirm({
					password: n,
					code: i
				}), gs();
			} catch (e) {
				let t = e instanceof Mo ? e.code : null;
				l(Es.get(t) ?? "failed"), s(!1);
			}
		}
	};
	return /* @__PURE__ */ (0, j.jsxs)("form", {
		className: ws.form,
		onSubmit: (e) => void m(e),
		children: [
			/* @__PURE__ */ (0, j.jsx)("p", {
				id: "confirm-message",
				className: ws.message,
				children: e.message
			}),
			u && /* @__PURE__ */ (0, j.jsx)(Ds, {
				askPassword: f,
				askCode: p,
				error: c,
				password: n,
				code: i,
				onPassword: r,
				onCode: (e) => {
					a(e), c === "wrongCode" && l(null);
				}
			}),
			c && /* @__PURE__ */ (0, j.jsx)(Xa, {
				tone: "error",
				children: t(`confirm.proof.${c}`)
			}),
			/* @__PURE__ */ (0, j.jsxs)(hn, { children: [/* @__PURE__ */ (0, j.jsx)(Nt, {
				type: "button",
				onClick: _s,
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, j.jsx)(Nt, {
				type: "submit",
				look: e.look ?? "danger",
				busy: o,
				disabled: f && !n || p && i.length !== 6,
				children: e.label
			})] })
		]
	});
}, ks = (0, k.lazy)(C), As = () => ne() && /* @__PURE__ */ (0, j.jsx)(k.Suspense, { children: /* @__PURE__ */ (0, j.jsx)(ks, {}) }), js = (e, t) => String(e[t] ?? ""), Ms = {
	dialog: (e, t) => {
		let n = I(t);
		return /* @__PURE__ */ (0, j.jsxs)(Fa, {
			open: !0,
			onClose: F,
			size: js(e, "size"),
			title: js(e, "title") || void 0,
			intro: js(e, "intro") || void 0,
			onBack: e.back === !0 ? F : void 0,
			children: [/* @__PURE__ */ (0, j.jsx)(Wt, {
				icon: dt,
				"aria-label": n("Salutation", "Greeting"),
				placeholder: n("Coucou", "Hey")
			}), /* @__PURE__ */ (0, j.jsxs)(hn, { children: [/* @__PURE__ */ (0, j.jsx)(Nt, { children: n("Annuler", "Cancel") }), /* @__PURE__ */ (0, j.jsx)(Nt, {
				look: "primary",
				children: n("Enregistrer", "Save")
			})] })]
		});
	},
	asktoconfirm: () => /* @__PURE__ */ (0, j.jsx)(Ts, {}),
	toasts: () => /* @__PURE__ */ (0, j.jsx)(As, {})
}, Ns = {
	asktoconfirm: (e) => hs({
		title: js(e, "title"),
		message: js(e, "message"),
		label: js(e, "label") || " ",
		look: js(e, "look"),
		onConfirm: F
	}),
	toasts: (e) => {
		h().then(({ toast: t }) => {
			t.dismiss(), e.error === !0 ? b(js(e, "message")) : e.saved === !0 ? p() : te(js(e, "message"));
		});
	}
}, Ps = {
	...fo,
	...us,
	...Ms
}, Fs = /* @__PURE__ */ new WeakMap(), Is = (e) => i.language === e ? Promise.resolve() : new Promise((t) => {
	let n = (r) => {
		r === e && (i.off("languageChanged", n), t());
	};
	i.on("languageChanged", n);
});
window.HodiPlay = { draw: (e, t, n, r) => {
	m(r);
	let i = Fs.get(t);
	i || Fs.set(t, i = (0, He.createRoot)(t)), i.render(/* @__PURE__ */ (0, j.jsx)(Ue.Provider, {
		value: "hello-world",
		children: Ps[e]?.(n, r)
	}));
	let a = Ns[e];
	a && Is(r).then(() => a(n, r));
} };

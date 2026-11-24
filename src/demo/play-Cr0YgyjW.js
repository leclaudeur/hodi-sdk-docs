import { i as e, n as t, r as n } from "./play-0uCLndnB.js";
// node_modules/i18next/dist/esm/i18next.js
var r = (e) => typeof e == "string", i = () => {
	let e, t, n = new Promise((n, r) => {
		e = n, t = r;
	});
	return n.resolve = e, n.reject = t, n;
}, a = (e) => e == null ? "" : String(e), o = (e) => r(e) && /^[A-Za-z0-9_@.-]{1,128}$/.test(e) && !e.includes("..") && ![
	"__proto__",
	"constructor",
	"prototype"
].includes(e), s = (e) => e?.callbackApi ?? e?.constructor?.callbackApi, c = (e, t, n) => {
	e.forEach((e) => {
		t[e] && (n[e] = t[e]);
	});
}, l = /###/g, u = (e) => e && e.includes("###") ? e.replace(l, ".") : e, d = (e) => !e || r(e), f = (e, t, n) => {
	let i = r(t) ? t.split(".") : t, a = 0;
	for (; a < i.length - 1;) {
		if (d(e)) return {};
		let t = u(i[a]);
		!e[t] && n && (e[t] = new n()), e = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : {}, ++a;
	}
	return d(e) ? {} : {
		obj: e,
		k: u(i[a])
	};
}, p = (e, t, n) => {
	let { obj: r, k: i } = f(e, t, Object);
	if (r !== void 0 || t.length === 1) {
		r[i] = n;
		return;
	}
	let a = t[t.length - 1], o = t.slice(0, t.length - 1), s = f(e, o, Object);
	for (; s.obj === void 0 && o.length;) a = `${o[o.length - 1]}.${a}`, o = o.slice(0, o.length - 1), s = f(e, o, Object), s?.obj && s.obj[`${s.k}.${a}`] !== void 0 && (s.obj = void 0);
	s.obj[`${s.k}.${a}`] = n;
}, m = (e, t, n, r) => {
	let { obj: i, k: a } = f(e, t, Object);
	i[a] = i[a] || [], i[a].push(n);
}, h = (e, t) => {
	let { obj: n, k: r } = f(e, t);
	if (n && Object.prototype.hasOwnProperty.call(n, r)) return n[r];
}, g = (e, t, n) => {
	let r = h(e, n);
	return r === void 0 ? h(t, n) : r;
}, _ = (e, t, n) => {
	for (let i in t) i !== "__proto__" && i !== "constructor" && (Object.prototype.hasOwnProperty.call(e, i) ? r(e[i]) || e[i] instanceof String || r(t[i]) || t[i] instanceof String ? n && (e[i] = t[i]) : _(e[i], t[i], n) : e[i] = t[i]);
	return e;
}, v = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), y = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;",
	"/": "&#x2F;"
}, b = (e) => r(e) ? e.replace(/[&<>"'\/]/g, (e) => y[e]) : e, x = class {
	constructor(e) {
		this.capacity = e, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
	}
	getRegExp(e) {
		let t = this.regExpMap.get(e);
		if (t !== void 0) return t;
		let n = new RegExp(e);
		return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, n), this.regExpQueue.push(e), n;
	}
}, S = [
	" ",
	",",
	"?",
	"!",
	";"
], C = new x(20), w = (e, t, n) => {
	t ||= "", n ||= "";
	let r = S.filter((e) => !t.includes(e) && !n.includes(e));
	if (r.length === 0) return !0;
	let i = C.getRegExp(`(${r.map((e) => e === "?" ? "\\?" : e).join("|")})`), a = !i.test(e);
	if (!a) {
		let t = e.indexOf(n);
		t > 0 && !i.test(e.substring(0, t)) && (a = !0);
	}
	return a;
}, T = (e, t, n = ".") => {
	if (!e) return;
	if (e[t]) return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
	let r = t.split(n), i = e;
	for (let e = 0; e < r.length;) {
		if (!i || typeof i != "object") return;
		let t, a = "";
		for (let o = e; o < r.length; ++o) if (o !== e && (a += n), a += r[o], t = i[a], typeof t != "function" && a !== "__proto__" || Object.prototype.hasOwnProperty.call(i, a) || (t = void 0), t !== void 0) {
			if ([
				"string",
				"number",
				"boolean"
			].includes(typeof t) && o < r.length - 1) continue;
			e += o - e + 1;
			break;
		}
		i = t;
	}
	return i;
}, E = (e) => e?.replace(/_/g, "-"), D = {
	type: "logger",
	log(e) {
		this.output("log", e);
	},
	warn(e) {
		this.output("warn", e);
	},
	error(e) {
		this.output("error", e);
	},
	output(e, t) {
		console?.[e]?.apply?.(console, t);
	}
}, O = new class e {
	constructor(e, t = {}) {
		this.init(e, t);
	}
	init(e, t = {}) {
		this.prefix = t.prefix || "i18next:", this.logger = e || D, this.options = t, this.debug = t.debug, this.seen = /* @__PURE__ */ new Set();
	}
	log(...e) {
		return this.forward(e, "log", "", !0);
	}
	warn(...e) {
		return this.forward(e, "warn", "", !0);
	}
	error(...e) {
		return this.forward(e, "error", "");
	}
	deprecate(...e) {
		return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
	}
	once(e, t, ...n) {
		return !this.debug || this.seen.has(e) || this.seen.size >= 1e3 ? null : (this.seen.add(e), this[t](...n));
	}
	forward(e, t, n, i) {
		return i && !this.debug ? null : (e = e.map((e) => r(e) ? e.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : e), r(e[0]) && (e[0] = `${n}${this.prefix} ${e[0]}`), this.logger[t](e));
	}
	create(t) {
		return new e(this.logger, {
			prefix: `${this.prefix}:${t}:`,
			...this.options
		});
	}
	clone(t) {
		return t ||= this.options, t.prefix = t.prefix || this.prefix, new e(this.logger, t);
	}
}(), k = class {
	constructor() {
		this.observers = {};
	}
	on(e, t) {
		return e.split(" ").forEach((e) => {
			this.observers[e] || (this.observers[e] = /* @__PURE__ */ new Map());
			let n = this.observers[e].get(t) || 0;
			this.observers[e].set(t, n + 1);
		}), this;
	}
	off(e, t) {
		(typeof e == "string" ? e.split(" ") : [e]).forEach((e) => {
			this.observers[e] && (t ? this.observers[e].delete(t) : delete this.observers[e]);
		});
	}
	once(e, t) {
		let n = (...r) => {
			t(...r), this.off(e, n);
		};
		return this.on(e, n), this;
	}
	emit(e, ...t) {
		this.observers[e] && Array.from(this.observers[e].entries()).forEach(([e, n]) => {
			for (let r = 0; r < n; r++) e(...t);
		}), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(([n, r]) => {
			for (let i = 0; i < r; i++) n(e, ...t);
		});
	}
}, ee = /* @__PURE__ */ new WeakSet(), te = class extends k {
	constructor(e, t = {
		ns: ["translation"],
		defaultNS: "translation"
	}) {
		super(), this.data = e || {}, this.options = t, this.logger = O.create("resourceStore"), this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
	}
	addNamespaces(e) {
		this.options.ns.includes(e) || this.options.ns.push(e);
	}
	removeNamespaces(e) {
		let t = this.options.ns.indexOf(e);
		t > -1 && this.options.ns.splice(t, 1);
	}
	deprecateDottedLng(e) {
		this.logger.once(e, "deprecate", `${e}: a dotted language ('en.translation.key') that carries the namespace and key is removed in v27; pass language, namespace and key as separate arguments`);
	}
	getResource(e, t, n, i = {}) {
		let a = i.keySeparator === void 0 ? this.options.keySeparator : i.keySeparator, o = i.ignoreJSONStructure === void 0 ? this.options.ignoreJSONStructure : i.ignoreJSONStructure, s;
		e.includes(".") ? (this.deprecateDottedLng("getResource"), s = e.split(".")) : (s = [e, t], n && (Array.isArray(n) ? s.push(...n) : r(n) && a ? s.push(...n.split(a)) : s.push(n)));
		let c = h(this.data, s);
		return c == null && !t && !n && e.includes(".") && (e = s[0], t = s[1], n = s.slice(2).join(".")), c != null || !o || !r(n) ? c : T(this.data?.[e]?.[t], n, a);
	}
	addResource(e, t, n, r, i = { silent: !1 }) {
		let a = i.keySeparator === void 0 ? this.options.keySeparator : i.keySeparator, o = [e, t];
		n && (o = o.concat(a ? n.split(a) : n)), e.includes(".") && (this.deprecateDottedLng("addResource"), o = e.split("."), r = t, t = o[1]), this.addNamespaces(t), p(this.data, o, r), i.silent || this.emit("added", e, t, n, r);
	}
	addResources(e, t, n, i = { silent: !1 }) {
		for (let i in n) (r(n[i]) || Array.isArray(n[i])) && this.addResource(e, t, i, n[i], { silent: !0 });
		i.silent || this.emit("added", e, t, n);
	}
	addResourceBundle(e, t, n, r, i, a = {
		silent: !1,
		skipCopy: !1
	}) {
		let o = [e, t];
		e.includes(".") && (this.deprecateDottedLng("addResourceBundle"), o = e.split("."), r = n, n = t, t = o[1]), this.addNamespaces(t);
		let s = h(this.data, o) || {};
		a.skipCopy || (n = JSON.parse(JSON.stringify(n))), r ? _(s, n, i) : s = {
			...s,
			...n
		}, p(this.data, o, s), a.silent || this.emit("added", e, t, n);
	}
	removeResourceBundle(e, t) {
		this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
	}
	hasResourceBundle(e, t) {
		return this.getResource(e, t) !== void 0;
	}
	getResourceBundle(e, t) {
		return t ||= this.options.defaultNS, this.getResource(e, t);
	}
	getDataByLanguage(e) {
		return this.data[e];
	}
	hasLanguageSomeTranslations(e) {
		let t = this.getDataByLanguage(e);
		return !!(t && Object.keys(t) || []).find((e) => {
			let n = t[e];
			return ee.has(n) ? !0 : !n || Object.keys(n).length === 0 ? !1 : (typeof n == "object" && ee.add(n), !0);
		});
	}
	toJSON() {
		return this.data;
	}
}, A = {
	processors: {},
	addPostProcessor(e) {
		this.processors[e.name] = e;
	},
	handle(e, t, n, r, i) {
		return e.forEach((e) => {
			t = this.processors[e]?.process(t, n, r, i) ?? t;
		}), t;
	}
}, ne = Symbol("i18next/PATH_KEY");
function re() {
	let e = [], t = Object.create(null), n;
	return t.get = (r, i) => (n?.revoke?.(), i === ne ? e : (e.push(i), n = Proxy.revocable(r, t), n.proxy)), Proxy.revocable(Object.create(null), t).proxy;
}
function j(e, t) {
	let { [ne]: n } = e(re()), r = t?.keySeparator ?? ".", i = t?.nsSeparator ?? ":", a = t?.enableSelector === "strict";
	if (n.length > 1 && i) {
		let e = t?.ns, o = a ? Array.isArray(e) ? e : e ? [e] : null : Array.isArray(e) ? e : null;
		if (o && (a ? o : o.length > 1 ? o.slice(1) : []).includes(n[0])) return `${n[0]}${i}${n.slice(1).join(r)}`;
	}
	return n.join(r);
}
var M = (e) => !r(e) && typeof e != "boolean" && typeof e != "number", ie = class e extends k {
	constructor(e, t = {}) {
		super(), c([
			"resourceStore",
			"languageUtils",
			"pluralResolver",
			"interpolator",
			"backendConnector",
			"i18nFormat",
			"utils",
			"ownPostProcessors"
		], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = O.create("translator"), this.checkedLoadedFor = {};
	}
	changeLanguage(e) {
		e && (this.language = e);
	}
	exists(e, t = { interpolation: {} }) {
		let n = { ...t };
		if (e == null) return !1;
		let r = this.resolve(e, n);
		if (r?.res === void 0) return !1;
		let i = M(r.res);
		return !(n.returnObjects === !1 && i);
	}
	extractFromKey(e, t) {
		let n = t.nsSeparator === void 0 ? this.options.nsSeparator : t.nsSeparator;
		n === void 0 && (n = ":");
		let i = t.keySeparator === void 0 ? this.options.keySeparator : t.keySeparator, a = t.ns || this.options.defaultNS || [], o = n && e.includes(n), s = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !w(e, n, i);
		if (o && !s) {
			let t = e.match(this.interpolator.nestingRegexp);
			if (t && t.length > 0) return {
				key: e,
				namespaces: r(a) ? [a] : a
			};
			let o = e.split(n);
			(n !== i || n === i && this.options.ns.includes(o[0])) && (a = o.shift()), e = o.join(i);
		}
		return {
			key: e,
			namespaces: r(a) ? [a] : a
		};
	}
	translate(t, n, i) {
		let a = typeof n == "object" ? { ...n } : n;
		if (typeof a != "object" && this.options.overloadTranslationOptionHandler && (a = this.options.overloadTranslationOptionHandler(arguments)), typeof a == "object" && (a = { ...a }), a ||= {}, t == null) return "";
		typeof t == "function" && (t = j(t, {
			...this.options,
			...a
		})), Array.isArray(t) || (t = [String(t)]), t = t.map((e) => typeof e == "function" ? j(e, {
			...this.options,
			...a
		}) : String(e));
		let o = a.returnDetails === void 0 ? this.options.returnDetails : a.returnDetails, s = a.keySeparator === void 0 ? this.options.keySeparator : a.keySeparator, { key: c, namespaces: l } = this.extractFromKey(t[t.length - 1], a), u = l[l.length - 1], d = a.nsSeparator === void 0 ? this.options.nsSeparator : a.nsSeparator;
		d === void 0 && (d = ":");
		let f = a.lng || this.language, p = a.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
		if (f?.toLowerCase() === "cimode") return p ? o ? {
			res: `${u}${d}${c}`,
			usedKey: c,
			exactUsedKey: c,
			usedLng: f,
			usedNS: u,
			usedParams: this.getUsedParamsDetails(a)
		} : `${u}${d}${c}` : o ? {
			res: c,
			usedKey: c,
			exactUsedKey: c,
			usedLng: f,
			usedNS: u,
			usedParams: this.getUsedParamsDetails(a)
		} : c;
		let m = this.resolve(t, a), h = m?.res, g = m?.usedKey || c, _ = m?.exactUsedKey || c, v = [
			"[object Number]",
			"[object Function]",
			"[object RegExp]"
		], y = a.joinArrays === void 0 ? this.options.joinArrays : a.joinArrays, b = !this.i18nFormat || this.i18nFormat.handleAsObject, x = a.count !== void 0 && !r(a.count), S = e.hasDefaultValue(a), C = x ? this.pluralResolver.getSuffix(f, a.count, a) : "", w = a.ordinal && x ? this.pluralResolver.getSuffix(f, a.count, { ordinal: !1 }) : "", T = x && !a.ordinal && a.count === 0, E = T && a[`defaultValue${this.options.pluralSeparator}zero`] || a[`defaultValue${C}`] || a[`defaultValue${w}`] || a.defaultValue, D = h;
		b && !h && S && (D = E);
		let O = M(D), k = Object.prototype.toString.apply(D);
		if (b && D && O && !v.includes(k) && !(r(y) && Array.isArray(D))) {
			if (!a.returnObjects && !this.options.returnObjects) {
				this.options.returnedObjectHandler || (this.logger.warn("accessing an object - but returnObjects options is not enabled!"), this.logger.once("returnedObject", "deprecate", "accessing an object without returnObjects returns a sentence about it today; from v27 t() returns the key, as for a missing key (returnedObjectHandler can keep today's text)"));
				let e = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(g, D, {
					...a,
					ns: l
				}) : `key '${c} (${this.language})' returned an object instead of string.`;
				return o ? (m.res = e, m.usedParams = this.getUsedParamsDetails(a), m) : e;
			}
			if (s) {
				let e = Array.isArray(D), t = e ? [] : {}, n = e ? _ : g;
				for (let e in D) if (Object.prototype.hasOwnProperty.call(D, e)) {
					let r = `${n}${s}${e}`;
					t[e] = S && !h ? this.translate(r, {
						...a,
						defaultValue: M(E) ? E[e] : void 0,
						joinArrays: !1,
						ns: l
					}) : this.translate(r, {
						...a,
						joinArrays: !1,
						ns: l
					}), t[e] === r && (t[e] = D[e]);
				}
				h = t;
			}
		} else if (b && r(y) && Array.isArray(h)) h = h.join(y), h &&= this.extendTranslation(h, t, a, m, i);
		else {
			let e = !1, n = !1;
			!this.isValidLookup(h) && S && (e = !0, h = E), this.isValidLookup(h) || (n = !0, h = c);
			let r = (a.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && n ? void 0 : h, o = S && E !== h && this.options.updateMissing;
			if (n || e || o) {
				if (this.logger.log(o ? "updateKey" : "missingKey", f, u, x && !o ? `${c}${this.pluralResolver.getSuffix(f, a.count, a)}` : c, o ? E : h), s) {
					let e = this.resolve(c, {
						...a,
						keySeparator: !1
					});
					e && e.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
				}
				let e = [], t = this.languageUtils.getFallbackCodes(this.options.fallbackLng, a.lng || this.language);
				if (this.options.saveMissingTo === "fallback" && t && t[0]) for (let n = 0; n < t.length; n++) e.push(t[n]);
				else this.options.saveMissingTo === "all" ? e = this.languageUtils.toResolveHierarchy(a.lng || this.language) : e.push(a.lng || this.language);
				let n = (e, t, n) => {
					let i = S && n !== h ? n : r;
					this.options.missingKeyHandler ? this.options.missingKeyHandler(e, u, t, i, o, a) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(e, u, t, i, o, a, void 0, this.utils?.hasLoadedNamespace), this.emit("missingKey", e, u, t, h);
				};
				this.options.saveMissing && (this.options.saveMissingPlurals && x ? e.forEach((e) => {
					let t = this.pluralResolver.getSuffixes(e, a);
					T && a[`defaultValue${this.options.pluralSeparator}zero`] && !t.includes(`${this.options.pluralSeparator}zero`) && t.push(`${this.options.pluralSeparator}zero`), t.forEach((t) => {
						n([e], c + t, a[`defaultValue${t}`] || E);
					});
				}) : n(e, c, E));
			}
			h = this.extendTranslation(h, t, a, m, i), n && h === c && this.options.appendNamespaceToMissingKey && (h = `${u}${d}${c}`), (n || e) && this.options.parseMissingKeyHandler && (h = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${u}${d}${c}` : c, e ? h : void 0, a));
		}
		return o ? (m.res = h, m.usedParams = this.getUsedParamsDetails(a), m) : h;
	}
	extendTranslation(e, t, n, i, a) {
		if (this.i18nFormat?.parse) e = this.i18nFormat.parse(e, {
			...this.options.interpolation.defaultVariables,
			...n
		}, n.lng || this.language || i.usedLng, i.usedNS, i.usedKey, { resolved: i });
		else if (!n.skipInterpolation) {
			n.interpolation && this.interpolator.init({
				...n,
				interpolation: {
					...this.options.interpolation,
					...n.interpolation
				}
			});
			let o = r(e) && (n?.interpolation?.skipOnVariables === void 0 ? this.options.interpolation.skipOnVariables : n.interpolation.skipOnVariables), s;
			if (o) {
				let t = e.match(this.interpolator.nestingRegexp);
				s = t && t.length;
			}
			let c = n.replace && !r(n.replace) ? n.replace : n;
			if (this.options.interpolation.defaultVariables && (c = {
				...this.options.interpolation.defaultVariables,
				...c
			}), e = this.interpolator.interpolate(e, c, n.lng || this.language || i.usedLng, n), o) {
				let t = e.match(this.interpolator.nestingRegexp), r = t && t.length;
				s < r && (n.nest = !1);
			}
			!n.lng && i && i.res && (n.lng = this.language || i.usedLng), n.nest !== !1 && (e = this.interpolator.nest(e, (...e) => a?.[0] === e[0] && !n.context ? (this.logger.warn(`It seems you are nesting recursively key: ${e[0]} in key: ${t[0]}`), null) : this.translate(...e, t), n)), n.interpolation && this.interpolator.reset();
		}
		let o = n.postProcess || this.options.postProcess, s = r(o) ? [o] : o;
		return e != null && s?.length && n.applyPostProcessor !== !1 && (s.forEach((e) => {
			this.logger.debug && A.processors[e] && this.ownPostProcessors && !this.ownPostProcessors.has(e) && this.logger.once(e, "deprecate", `postProcess: '${e}' was registered with use() on another i18next instance; from v27 post-processors are per instance, so call use() with it on this instance too`);
		}), e = A.handle(s, e, t, this.options && this.options.postProcessPassResolved ? {
			i18nResolved: {
				...i,
				usedParams: this.getUsedParamsDetails(n)
			},
			...n
		} : n, this)), e;
	}
	resolve(e, t = {}) {
		let n, i, a, o, s;
		return r(e) && (e = [e]), Array.isArray(e) && (e = e.map((e) => typeof e == "function" ? j(e, {
			...this.options,
			...t
		}) : e)), e.forEach((e) => {
			if (this.isValidLookup(n)) return;
			let c = this.extractFromKey(e, t), l = c.key;
			i = l;
			let u = c.namespaces;
			this.options.fallbackNS && (u = u.concat(this.options.fallbackNS));
			let d = t.count !== void 0 && !r(t.count), f = d && !t.ordinal && t.count === 0, p = t.context !== void 0 && (r(t.context) || typeof t.context == "number") && t.context !== "", m = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
			u.forEach((e) => {
				this.isValidLookup(n) || (s = e, !this.checkedLoadedFor[`${m[0]}-${e}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(s) && (this.checkedLoadedFor[`${m[0]}-${e}`] = !0, this.logger.warn(`key "${i}" for languages "${m.join(", ")}" won't get resolved as namespace "${s}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), m.forEach((r) => {
					if (this.isValidLookup(n)) return;
					o = r;
					let i = [l];
					if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(i, l, r, e, t);
					else {
						let e;
						d && (e = this.pluralResolver.getSuffix(r, t.count, t));
						let n = `${this.options.pluralSeparator}zero`, a = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
						if (d && (t.ordinal && e.startsWith(a) && i.push(l + e.replace(a, this.options.pluralSeparator)), i.push(l + e), f && i.push(l + n)), p) {
							let r = `${l}${this.options.contextSeparator || "_"}${t.context}`;
							i.push(r), d && (t.ordinal && e.startsWith(a) && i.push(r + e.replace(a, this.options.pluralSeparator)), i.push(r + e), f && i.push(r + n));
						}
					}
					let s;
					for (; s = i.pop();) this.isValidLookup(n) || (a = s, n = this.getResource(r, e, s, t));
				}));
			});
		}), {
			res: n,
			usedKey: i,
			exactUsedKey: a,
			usedLng: o,
			usedNS: s
		};
	}
	isValidLookup(e) {
		return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
	}
	getResource(e, t, n, r = {}) {
		return this.i18nFormat?.getResource ? this.i18nFormat.getResource(e, t, n, r) : this.resourceStore.getResource(e, t, n, r);
	}
	getUsedParamsDetails(e = {}) {
		let t = [
			"defaultValue",
			"ordinal",
			"context",
			"replace",
			"lng",
			"lngs",
			"fallbackLng",
			"ns",
			"keySeparator",
			"nsSeparator",
			"returnObjects",
			"returnDetails",
			"joinArrays",
			"postProcess",
			"interpolation"
		], n = e.replace && !r(e.replace), i = n ? e.replace : e;
		if (n && e.count !== void 0 && (i = {
			...i,
			count: e.count
		}), this.options.interpolation.defaultVariables && (i = {
			...this.options.interpolation.defaultVariables,
			...i
		}), !n) {
			i = { ...i };
			for (let e of t) delete i[e];
		}
		return i;
	}
	static hasDefaultValue(e) {
		for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t) && t.startsWith("defaultValue") && e[t] !== void 0) return !0;
		return !1;
	}
}, ae = class {
	constructor(e) {
		this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = O.create("languageUtils"), this.resolveHierarchyCache = {};
	}
	clearCache() {
		this.resolveHierarchyCache = {};
	}
	getScriptPartFromCode(e) {
		if (e = E(e), !e || !e.includes("-")) return null;
		let t = e.split("-");
		return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
	}
	getLanguagePartFromCode(e) {
		if (e = E(e), !e || !e.includes("-")) return e;
		let t = e.split("-");
		return this.formatLanguageCode(t[0]);
	}
	formatLanguageCode(e) {
		if (r(e) && e.includes("-")) {
			let t;
			try {
				t = Intl.getCanonicalLocales(e)[0];
			} catch {}
			return t && this.options.lowerCaseLng && (t = t.toLowerCase()), t || (this.options.lowerCaseLng ? e.toLowerCase() : e);
		}
		let t = this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
		return this.logger.debug && r(e) && this.deprecateBareCode(e, t), t;
	}
	deprecateBareCode(e, t) {
		let n;
		try {
			n = Intl.getCanonicalLocales(e)[0];
		} catch {
			return;
		}
		let r = n.toLowerCase() === e.toLowerCase() ? n : e.toLowerCase();
		this.options.lowerCaseLng && (r = r.toLowerCase()), r !== t && this.logger.once(e, "deprecate", `language code '${e}' is used as '${t}'; i18next v27 gives it the canonical casing '${r}', use '${r}' in lng, fallbackLng, supportedLngs and the resources`);
	}
	isSupportedCode(e) {
		return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(e);
	}
	getBestMatchFromCodes(e) {
		if (!e) return null;
		let t;
		return e.forEach((e) => {
			if (t) return;
			let n = this.formatLanguageCode(e);
			(!this.options.supportedLngs || this.isSupportedCode(n)) && (t = n);
		}), !t && this.options.supportedLngs && e.forEach((e) => {
			if (t) return;
			let n = this.getScriptPartFromCode(e);
			if (this.isSupportedCode(n)) return t = n;
			let r = this.getLanguagePartFromCode(e);
			if (this.isSupportedCode(r)) return t = r;
			t = this.options.supportedLngs.find((e) => e === r ? !0 : !e.includes("-") && !r.includes("-") ? !1 : !(!e.includes("-") || r.includes("-") || e.slice(0, e.indexOf("-")) !== r));
		}), t ||= this.getFallbackCodes(this.options.fallbackLng)[0], t;
	}
	getFallbackCodes(e, t) {
		if (!e) return [];
		if (typeof e == "function" && (e = e(t)), r(e) && (e = [e]), Array.isArray(e)) return e;
		if (!t) return e.default || [];
		let n = e[t];
		return n ||= e[this.getScriptPartFromCode(t)], n ||= e[this.formatLanguageCode(t)], n ||= e[this.getLanguagePartFromCode(t)], n ||= e.default, n || [];
	}
	toResolveHierarchy(e, t) {
		let n = this.options.fallbackLng, i = Array.isArray(n) ? n.join("|") : n;
		i !== this._cachedFallbackLng && (this.resolveHierarchyCache = {}, this._cachedFallbackLng = i);
		let a = t === void 0 || t === !1 || r(t), o = t === void 0 && typeof this.options.fallbackLng == "function", s = r(e) && a && !o, c = null;
		if (s) {
			let n;
			n = t === void 0 ? "undefined" : t === !1 ? "boolean:false" : `string:${t}`, c = `${e.length}:${e}|${n}`;
		}
		if (c !== null) {
			let e = this.resolveHierarchyCache[c];
			if (e !== void 0) return e.slice();
		}
		let l = this.getFallbackCodes((t === !1 ? [] : t) || this.options.fallbackLng || [], e), u = [], d = (e) => {
			e && (this.isSupportedCode(e) ? u.push(e) : this.logger.warn(`rejecting language code not found in supportedLngs: ${e}`));
		};
		return r(e) && (e.includes("-") || e.includes("_")) ? (this.options.load !== "languageOnly" && d(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && d(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && d(this.getLanguagePartFromCode(e))) : r(e) && d(this.formatLanguageCode(e)), l.forEach((e) => {
			let t = this.formatLanguageCode(e);
			u.includes(t) || d(t);
		}), c === null ? u : (this.resolveHierarchyCache[c] = u, u.slice());
	}
}, oe = {
	zero: 0,
	one: 1,
	two: 2,
	few: 3,
	many: 4,
	other: 5
}, se = {
	select: (e) => e === 1 ? "one" : "other",
	resolvedOptions: () => ({ pluralCategories: ["one", "other"] })
}, ce = class {
	constructor(e, t = {}) {
		this.languageUtils = e, this.options = t, this.logger = O.create("pluralResolver"), this.pluralRulesCache = {};
	}
	clearCache() {
		this.pluralRulesCache = {};
	}
	getRule(e, t = {}) {
		let n = E(e === "dev" ? "en" : e), r = t.ordinal ? "ordinal" : "cardinal", i = JSON.stringify({
			cleanedCode: n,
			type: r
		});
		if (i in this.pluralRulesCache) return this.pluralRulesCache[i];
		let a;
		try {
			a = new Intl.PluralRules(n, { type: r });
		} catch {
			if (typeof Intl > "u") return this.logger.error("No Intl support, please use an Intl polyfill!"), se;
			if (!e.match(/-|_/)) return se;
			let n = this.languageUtils.getLanguagePartFromCode(e);
			a = this.getRule(n, t);
		}
		return this.pluralRulesCache[i] = a, a;
	}
	needsPlural(e, t = {}) {
		let n = this.getRule(e, t);
		return n ||= this.getRule("dev", t), n?.resolvedOptions().pluralCategories.length > 1;
	}
	getPluralFormsOfKey(e, t, n = {}) {
		return this.getSuffixes(e, n).map((e) => `${t}${e}`);
	}
	getSuffixes(e, t = {}) {
		let n = this.getRule(e, t);
		return n ||= this.getRule("dev", t), n ? n.resolvedOptions().pluralCategories.sort((e, t) => oe[e] - oe[t]).map((e) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${e}`) : [];
	}
	getSuffix(e, t, n = {}) {
		let r = this.getRule(e, n);
		return r ? `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${r.select(t)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", t, n));
	}
}, le = (e, t, n, i = ".", a = !0) => {
	let o = g(e, t, n);
	return o == null && a && r(n) && (o = T(e, n, i), o === void 0 && (o = T(t, n, i))), o;
}, ue = class {
	constructor(e = {}) {
		this.logger = O.create("interpolator"), this.options = e, this.format = e?.interpolation?.format || ((e) => e), this.init(e);
	}
	init(e = {}) {
		e.interpolation ||= { escapeValue: !0 };
		let { escape: t, escapeValue: n, useRawValueToEscape: r, prefix: i, prefixEscaped: a, suffix: o, suffixEscaped: s, formatSeparator: c, unescapeSuffix: l, unescapePrefix: u, nestingPrefix: d, nestingPrefixEscaped: f, nestingSuffix: p, nestingSuffixEscaped: m, nestingOptionsSeparator: h, maxReplaces: g, alwaysFormat: _ } = e.interpolation;
		if (a || s || f || m) {
			let e = Object.entries({
				prefixEscaped: a,
				suffixEscaped: s,
				nestingPrefixEscaped: f,
				nestingSuffixEscaped: m
			}).filter(([, e]) => e).map(([e]) => e);
			this.logger.once(e.join(), "deprecate", `interpolation.${e.join(", interpolation.")}: the regex-escaped delimiter options are removed in v27; pass the literal delimiters as prefix, suffix, nestingPrefix and nestingSuffix`);
		}
		this.escape = t === void 0 ? b : t, this.escapeValue = n === void 0 || n, this.useRawValueToEscape = r !== void 0 && r, this.prefix = i ? v(i) : a || "{{", this.suffix = o ? v(o) : s || "}}", this.formatSeparator = c || ",", this.unescapePrefix = l ? "" : u ? v(u) : "-", this.unescapeSuffix = this.unescapePrefix ? "" : l ? v(l) : "", this.nestingPrefix = d ? v(d) : f || v("$t("), this.nestingSuffix = p ? v(p) : m || v(")"), this.nestingOptionsSeparator = h || ",", this.maxReplaces = g || 1e3, this.alwaysFormat = _ !== void 0 && _, this.resetRegExp();
	}
	reset() {
		this.options && this.init(this.options);
	}
	resetRegExp() {
		let e = (e, t) => e?.source === t ? (e.lastIndex = 0, e) : new RegExp(t, "g");
		this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']|"[^"]*"|'[^']*'|\\((?:[^()"']|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
	}
	interpolate(e, t, n, i) {
		let o, s, c, l = e, u = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, d = (e) => {
			if (!e.includes(this.formatSeparator)) {
				let r = le(t, u, e, this.options.keySeparator, this.options.ignoreJSONStructure);
				return this.alwaysFormat ? this.format(r, void 0, n, {
					...i,
					...t,
					interpolationkey: e
				}) : r;
			}
			let r = e.split(this.formatSeparator), a = r.shift().trim(), o = r.join(this.formatSeparator).trim();
			return this.format(le(t, u, a, this.options.keySeparator, this.options.ignoreJSONStructure), o, n, {
				...i,
				...t,
				interpolationkey: a
			});
		};
		this.resetRegExp(), !this.escapeValue && typeof e == "string" && /\$t\([^)]*\{[^}]*\{\{/.test(e) && this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
		let f = i?.missingInterpolationHandler || this.options.missingInterpolationHandler, p = i?.interpolation?.skipOnVariables === void 0 ? this.options.interpolation.skipOnVariables : i.interpolation.skipOnVariables, m = [{
			regex: this.regexpUnescape,
			safeValue: (e) => e
		}, {
			regex: this.regexp,
			safeValue: (e) => this.escapeValue ? (this.escape === b && this.options?.interpolation?.escapeValue !== !1 && r(e) && e.includes("/") && this.logger.once("/", "deprecate", "escapeValue renders '/' in a value as '&#x2F;' today; from v27 the default escape leaves '/' as it is"), this.escape(e)) : e
		}], h = [], g = 0;
		return m.forEach((t) => {
			for (c = 0; o = t.regex.exec(e);) {
				let n = o.index - g, u = h.find(([e, t]) => n >= e && n < t);
				if (u) {
					t.regex.lastIndex = u[1] + g;
					continue;
				}
				let m = o[1].trim();
				if (s = d(m), s === void 0) {
					if (typeof f == "function") {
						let t = f(e, o, i);
						s = r(t) ? t : "";
					} else if (i && Object.prototype.hasOwnProperty.call(i, m)) s = "";
					else if (p) {
						this.logger.debug && this.logger.once(`${l}\u0000${o[0]}`, "warn", `missed to pass in variable ${m} for interpolating ${l}`), s = o[0];
						continue;
					} else this.logger.warn(`missed to pass in variable ${m} for interpolating ${e}`), s = "";
				} else !r(s) && !this.useRawValueToEscape && (s = a(s));
				let _ = a(t.safeValue(s));
				if (e = e.slice(0, o.index) + _ + e.slice(o.index + o[0].length), p ? (t.regex === this.regexpUnescape ? h.push([o.index, o.index + _.length]) : g += _.length - o[0].length, t.regex.lastIndex += _.length, t.regex.lastIndex -= o[0].length) : t.regex.lastIndex = 0, c++, c >= this.maxReplaces) break;
			}
		}), e;
	}
	nest(e, t, n = {}) {
		let i, o, s, c = (e, t) => {
			let n = this.nestingOptionsSeparator;
			if (!e.includes(n)) return e;
			let r = e.split(RegExp(`${v(n)}[ ]*{`)), i = `{${r[1]}`;
			e = r[0], i = this.interpolate(i, s);
			let a = i.match(/'/g), o = i.match(/"/g);
			((a?.length ?? 0) % 2 == 0 && !o || (o?.length ?? 0) % 2 != 0) && (i = i.replace(/'/g, "\""));
			try {
				s = JSON.parse(i), t && (s = {
					...t,
					...s
				});
			} catch (t) {
				return this.logger.warn(`failed parsing options string in nesting for key ${e}`, t), `${e}${n}${i}`;
			}
			return s.defaultValue && s.defaultValue.includes(this.prefix) && delete s.defaultValue, e;
		}, l = new RegExp(this.nestingRegexp), u = "", d = 0;
		for (; i = l.exec(e);) {
			let f = [];
			s = { ...n }, s = s.replace && !r(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
			let p = /{.*}/s.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
			if (p !== -1 && (f = i[1].slice(p).split(this.formatSeparator).map((e) => e.trim()).filter(Boolean), i[1] = i[1].slice(0, p)), o = t(c.call(this, i[1].trim(), s), s), o && i[0] === e && !r(o)) return o;
			r(o) || (o = a(o)), o ||= (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), ""), f.length && (o = f.reduce((e, t) => this.format(e, t, n.lng, {
				...n,
				interpolationkey: i[1].trim()
			}), o.trim())), u += e.slice(d, i.index) + a(o), d = l.lastIndex, this.regexp.lastIndex = 0;
		}
		return d ? u + e.slice(d) : e;
	}
}, de = (e) => {
	let t = e.toLowerCase().trim(), n = {};
	if (e.includes("(")) {
		let r = e.split("(");
		t = r[0].toLowerCase().trim();
		let i = r[1].slice(0, -1);
		t === "currency" && !i.includes(":") ? n.currency ||= i.trim() : t === "relativetime" && !i.includes(":") ? n.range ||= i.trim() : i.split(";").forEach((e) => {
			if (e) {
				let [t, ...r] = e.split(":"), i = r.join(":").trim().replace(/^'+|'+$/g, ""), a = t.trim();
				n[a] || (n[a] = i), i === "false" && (n[a] = !1), i === "true" && (n[a] = !0), isNaN(i) || (n[a] = parseInt(i, 10));
			}
		});
	}
	return {
		formatName: t,
		formatOptions: n
	};
}, fe = (e) => {
	let t = {};
	return (n, r, i) => {
		let a = i;
		i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (a = {
			...a,
			[i.interpolationkey]: void 0
		});
		let o;
		try {
			o = r + JSON.stringify(a);
		} catch {
			return e(E(r), i)(n);
		}
		let s = t[o];
		return s || (s = e(E(r), i), t[o] = s), s(n);
	};
}, pe = (e) => (t, n, r) => e(E(n), r)(t), me = class {
	constructor(e = {}) {
		this.logger = O.create("formatter"), this.options = e, this.init(e);
	}
	init(e, t = { interpolation: {} }) {
		this.formatSeparator = t.interpolation.formatSeparator || ",";
		let n = t.cacheInBuiltFormats ? fe : pe;
		this.formats = {
			number: n((e, t) => {
				let n = new Intl.NumberFormat(e, { ...t });
				return (e) => n.format(e);
			}),
			currency: n((e, t) => {
				let n = new Intl.NumberFormat(e, {
					...t,
					style: "currency"
				});
				return (e) => n.format(e);
			}),
			datetime: n((e, t) => {
				let n = new Intl.DateTimeFormat(e, { ...t });
				return (e) => n.format(e);
			}),
			relativetime: n((e, t) => {
				let n = new Intl.RelativeTimeFormat(e, { ...t });
				return (e) => n.format(e, t.range || "day");
			}),
			list: n((e, t) => {
				let n = new Intl.ListFormat(e, { ...t });
				return (e) => n.format(e);
			})
		};
	}
	add(e, t) {
		this.formats[e.toLowerCase().trim()] = t;
	}
	addCached(e, t) {
		this.formats[e.toLowerCase().trim()] = fe(t);
	}
	format(e, t, n, r = {}) {
		if (!t || e == null) return e;
		let i = t.split(this.formatSeparator), a = [];
		for (let e = 0; e < i.length; e++) {
			let t = i[e];
			for (; t.indexOf("(") > -1 && !t.includes(")") && e + 1 < i.length;) t = `${t}${this.formatSeparator}${i[++e]}`;
			a.push(t);
		}
		return a.reduce((e, t) => {
			let { formatName: i, formatOptions: a } = de(t);
			if (this.formats[i]) {
				let t = e;
				try {
					let o = r?.formatParams?.[r.interpolationkey] || {}, s = o.locale || o.lng || r.locale || r.lng || n;
					t = this.formats[i](e, s, {
						...a,
						...r,
						...o
					});
				} catch (e) {
					this.logger.warn(e);
				}
				return t;
			}
			return this.logger.warn(`there was no format function for ${i}`), e;
		}, e);
	}
}, he = (e, t) => {
	e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}, ge = class extends k {
	constructor(e, t, n, r = {}) {
		super(), this.backend = e, this.store = t, this.services = n, this.languageUtils = n.languageUtils, this.options = r, this.logger = O.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = r.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = r.maxRetries >= 0 ? r.maxRetries : 5, this.retryTimeout = r.retryTimeout >= 1 ? r.retryTimeout : 350, this.state = {}, this.queue = [], this.backend?.init?.(n, r.backend, r), this.callbackApi = s(this.backend), this.backend && this.callbackApi === void 0 && (this.backend.read || this.backend.create) && this.logger.deprecate("backend: set callbackApi to declare the calling convention (true: read(language, namespace, callback) and create(languages, namespace, key, fallbackValue, callback, options); false: both return a promise or a value); guessing it from the number of parameters is deprecated");
	}
	queueLoad(e, t, n, r) {
		let i = {}, a = {}, o = {}, s = {};
		return e.forEach((e) => {
			let r = !0;
			t.forEach((t) => {
				let o = `${e}|${t}`;
				!n.reload && this.store.hasResourceBundle(e, t) ? this.state[o] = 2 : !n.reload && this.state[o] < 0 || (this.state[o] === 1 ? a[o] === void 0 && (a[o] = !0) : (this.state[o] = 1, r = !1, a[o] === void 0 && (a[o] = !0), i[o] === void 0 && (i[o] = !0), s[t] === void 0 && (s[t] = !0)));
			}), r || (o[e] = !0);
		}), (Object.keys(i).length || Object.keys(a).length) && this.queue.push({
			pending: a,
			pendingCount: Object.keys(a).length,
			loaded: {},
			errors: [],
			callback: r
		}), {
			toLoad: Object.keys(i),
			pending: Object.keys(a),
			toLoadLanguages: Object.keys(o),
			toLoadNamespaces: Object.keys(s)
		};
	}
	loaded(e, t, n) {
		let r = e.split("|"), i = r[0], a = r[1];
		t && this.emit("failedLoading", i, a, t), !t && n && this.store.addResourceBundle(i, a, n, void 0, void 0, { skipCopy: !0 }), this.state[e] = t ? -1 : 2, t && n && (this.state[e] = 0);
		let o = {};
		this.queue.forEach((n) => {
			m(n.loaded, [i], a), he(n, e), t && n.errors.push(t), n.pendingCount === 0 && !n.done && (Object.keys(n.loaded).forEach((e) => {
				o[e] || (o[e] = {});
				let t = n.loaded[e];
				t.length && t.forEach((t) => {
					o[e][t] === void 0 && (o[e][t] = !0);
				});
			}), n.done = !0, n.errors.length ? n.callback(n.errors) : n.callback());
		}), this.emit("loaded", o), this.queue = this.queue.filter((e) => !e.done);
	}
	read(e, t, n, r = 0, i = this.retryTimeout, a) {
		if (!e.length) return a(null, {});
		if (this.readingCalls >= this.maxParallelReads) {
			this.waitingReads.push({
				lng: e,
				ns: t,
				fcName: n,
				tried: r,
				wait: i,
				callback: a
			});
			return;
		}
		this.readingCalls++;
		let o = (o, s) => {
			if (this.readingCalls--, this.waitingReads.length > 0) {
				let e = this.waitingReads.shift();
				this.read(e.lng, e.ns, e.fcName, e.tried, e.wait, e.callback);
			}
			o && s && r < this.maxRetries ? setTimeout(() => {
				this.read(e, t, n, r + 1, i * 2, a);
			}, i) : a(o, s);
		}, s = this.backend[n].bind(this.backend);
		if (this.callbackApi === !1 || this.callbackApi === void 0 && s.length === 2) try {
			let n = s(e, t);
			n && typeof n.then == "function" ? n.then((e) => o(null, e)).catch(o) : o(null, n);
		} catch (e) {
			o(e);
		}
		else return s(e, t, o);
	}
	prepareLoading(e, t, n = {}, i) {
		if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
		r(e) && (e = this.languageUtils.toResolveHierarchy(e)), r(t) && (t = [t]);
		let a = this.queueLoad(e, t, n, i);
		if (!a.toLoad.length) return a.pending.length || i(), null;
		a.toLoad.forEach((e) => {
			this.loadOne(e);
		});
	}
	load(e, t, n) {
		this.prepareLoading(e, t, {}, n);
	}
	reload(e, t, n) {
		this.prepareLoading(e, t, { reload: !0 }, n);
	}
	noticeDevFallback(e) {
		e === "dev" && this.devIsDefaultFallback && this.logger.once("dev", "warn", "language 'dev' is requested because fallbackLng is not set (its default is ['dev']); i18next v27 defaults to fallbackLng: false and loads and saves missing keys in the requested language instead. Set fallbackLng to your source language, or to 'dev' to keep this behavior");
	}
	loadOne(e, t = "") {
		let n = e.split("|"), r = n[0], i = n[1];
		this.noticeDevFallback(r), this.read(r, i, "read", void 0, void 0, (n, a) => {
			n && this.logger.warn(`${t}loading namespace ${i} for language ${r} failed`, n), !n && a && this.logger.log(`${t}loaded namespace ${i} for language ${r}`, a), this.loaded(e, n, a);
		});
	}
	saveMissing(e, t, n, r, i, a = {}, o = () => {}, s = this.newestCloneHasLoadedNamespace || this.services?.utils?.hasLoadedNamespace) {
		if (s && !s(t)) this.logger.warn(`did not save key "${n}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
		else if (n != null && n !== "") {
			if (this.backend?.create) {
				e?.forEach?.((e) => this.noticeDevFallback(e));
				let s = {
					...a,
					isUpdate: i
				}, c = this.backend.create.bind(this.backend);
				if (this.callbackApi === !1 || this.callbackApi === void 0 && c.length < 6) try {
					let i;
					i = this.callbackApi === !1 || c.length === 5 ? c(e, t, n, r, s) : c(e, t, n, r), i && typeof i.then == "function" ? i.then((e) => o(null, e)).catch(o) : o(null, i);
				} catch (e) {
					o(e);
				}
				else c(e, t, n, r, o, s);
			}
			e && e[0] && this.store.addResource(e[0], t, n, r);
		}
	}
}, N = () => ({
	debug: !1,
	initAsync: !0,
	ns: ["translation"],
	defaultNS: ["translation"],
	fallbackLng: ["dev"],
	fallbackNS: !1,
	supportedLngs: !1,
	nonExplicitSupportedLngs: !1,
	load: "all",
	preload: !1,
	keySeparator: ".",
	nsSeparator: ":",
	pluralSeparator: "_",
	contextSeparator: "_",
	enableSelector: !1,
	partialBundledLanguages: !1,
	saveMissing: !1,
	updateMissing: !1,
	saveMissingTo: "fallback",
	saveMissingPlurals: !0,
	missingKeyHandler: !1,
	missingInterpolationHandler: !1,
	postProcess: !1,
	postProcessPassResolved: !1,
	returnNull: !1,
	returnEmptyString: !0,
	returnObjects: !1,
	joinArrays: !1,
	returnedObjectHandler: !1,
	parseMissingKeyHandler: !1,
	appendNamespaceToMissingKey: !1,
	appendNamespaceToCIMode: !1,
	overloadTranslationOptionHandler: (e) => {
		let t = {};
		if (typeof e[1] == "object" && (t = e[1]), r(e[1]) && (t.defaultValue = e[1]), r(e[2]) && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
			let n = e[3] || e[2];
			Object.keys(n).forEach((e) => {
				t[e] = n[e];
			});
		}
		return t;
	},
	interpolation: {
		escapeValue: !0,
		prefix: "{{",
		suffix: "}}",
		formatSeparator: ",",
		unescapePrefix: "-",
		nestingPrefix: "$t(",
		nestingSuffix: ")",
		nestingOptionsSeparator: ",",
		maxReplaces: 1e3,
		skipOnVariables: !0
	},
	cacheInBuiltFormats: !0
}), _e = (e) => (r(e.ns) && (e.ns = [e.ns]), r(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]), r(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && !e.supportedLngs.includes("cimode") && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e), P = () => {}, F, ve = (e) => {
	Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((t) => {
		typeof e[t] == "function" && (e[t] = e[t].bind(e));
	});
}, I = class e extends k {
	constructor(e = {}, t) {
		if (super(), this.options = _e(e), this.services = { ownPostProcessors: /* @__PURE__ */ new Set() }, this.logger = O, this.modules = { external: [] }, ve(this), t && !this.isInitialized && !e.isClone) {
			if (!this.options.initAsync) return this.init(e, t), this;
			setTimeout(() => {
				this.init(e, t);
			}, 0);
		}
	}
	init(e = {}, t) {
		this.isInitializing = !0, typeof e == "function" && (t = e, e = {}), e.defaultNS == null && e.ns && (r(e.ns) ? e.defaultNS = e.ns : e.ns.includes("translation") || (e.defaultNS = e.ns[0]));
		let n = e.fallbackLng === void 0 && this.options.fallbackLng === void 0, a = N();
		this.options = {
			...a,
			...this.options,
			..._e(e)
		}, this.options.interpolation = {
			...a.interpolation,
			...this.options.interpolation
		}, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = a.overloadTranslationOptionHandler);
		let o = (e) => e ? typeof e == "function" ? new e() : e : null;
		if (!this.options.isClone) {
			F && F !== this && F.modules.logger !== this.modules.logger && O.deprecate("init: this init() replaces the logger another i18next instance set with use(), as the logger is shared in v26; from v27 each instance keeps its own logger"), F = this.modules.logger ? this : void 0, this.modules.logger ? O.init(o(this.modules.logger), this.options) : O.init(null, this.options), this.pendingWarnings?.forEach((e) => this.logger.warn(e)), this.pendingWarnings = void 0;
			let e;
			e = this.modules.formatter ? this.modules.formatter : me;
			let t = new ae(this.options);
			this.store = new te(this.options.resources, this.options);
			let r = this.services;
			r.logger = O, r.resourceStore = this.store, r.languageUtils = t, r.pluralResolver = new ce(t, { prepend: this.options.pluralSeparator }), e && (r.formatter = o(e), r.formatter.init && r.formatter.init(r, this.options), this.options.interpolation.format = r.formatter.format.bind(r.formatter)), r.interpolator = new ue(this.options), r.utils = {
				hasLoadedNamespace: this.hasLoadedNamespace.bind(this),
				reloadResources: this.reloadResources.bind(this)
			}, r.backendConnector = new ge(o(this.modules.backend), r.resourceStore, r, this.options), r.backendConnector.devIsDefaultFallback = n, r.backendConnector.on("*", (e, ...t) => {
				this.emit(e, ...t);
			}), this.modules.languageDetector && (r.languageDetector = o(this.modules.languageDetector), r.languageDetector.init && r.languageDetector.init(r, this.options.detection, this.options), r.languageDetector.async && s(r.languageDetector) === void 0 && this.logger.deprecate("languageDetector: set callbackApi to declare how the async detect() answers (true: detect(callback); false: detect() returns a promise); guessing it from the number of parameters is deprecated")), this.modules.i18nFormat && (r.i18nFormat = o(this.modules.i18nFormat), r.i18nFormat.init && r.i18nFormat.init(this)), this.translator = new ie(this.services, this.options), this.translator.on("*", (e, ...t) => {
				this.emit(e, ...t);
			}), this.modules.external.forEach((e) => {
				e.init && e.init(this);
			});
		}
		if (this.format = this.options.interpolation.format, t ||= P, this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
			let e = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
			e.length > 0 && e[0] !== "dev" && (this.options.lng = e[0]);
		}
		!this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), [
			"getResource",
			"hasResourceBundle",
			"getResourceBundle",
			"getDataByLanguage"
		].forEach((e) => {
			this[e] = (...t) => this.store[e](...t);
		}), [
			"addResource",
			"addResources",
			"addResourceBundle",
			"removeResourceBundle"
		].forEach((e) => {
			this[e] = (...t) => (this.store[e](...t), this);
		});
		let c = i(), l = () => {
			let e = (e, n) => {
				this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), c.resolve(n), t(e, n);
			};
			if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return e(null, this.t.bind(this));
			this.changeLanguage(this.options.lng, e);
		};
		return this.options.resources || !this.options.initAsync ? l() : setTimeout(l, 0), c;
	}
	loadResources(e, t = P) {
		let n = t, i = r(e) ? e : this.language;
		if (typeof e == "function" && (n = e), !this.options.resources || this.options.partialBundledLanguages) {
			if (i?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return n();
			let e = [], t = (t) => {
				t && t !== "cimode" && this.services.languageUtils.toResolveHierarchy(t).forEach((t) => {
					t !== "cimode" && (e.includes(t) || e.push(t));
				});
			};
			i ? t(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((e) => t(e)), this.options.preload?.forEach?.((e) => t(e)), this.services.backendConnector.load(e, this.options.ns, (e) => {
				!e && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), n(e);
			});
		} else n(null);
	}
	reloadResources(e, t, n) {
		let r = i();
		if (typeof e == "function" && (n = e, e = void 0), typeof t == "function" && (n = t, t = void 0), !e) {
			let t = Object.keys(this.services.backendConnector.state).map((e) => e.split("|")[0]);
			e = [.../* @__PURE__ */ new Set([...this.languages || [], ...t])].filter((e) => e !== "cimode");
		}
		return t ||= this.options.ns, n ||= P, this.services.backendConnector.reload(e, t, (e) => {
			r.resolve(), n(e);
		}), r;
	}
	use(e) {
		if (!e) throw Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
		if (!e.type) throw Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
		let t = (t) => {
			if (this.modules[t] && this.modules[t] !== e) {
				let e = `use: this ${t} replaces the ${t} passed to an earlier use() call; only one ${t} is used per instance`;
				this.isInitializing || this.isInitialized ? this.logger.warn(e) : (this.pendingWarnings = this.pendingWarnings || []).push(e);
			}
			this.modules[t] = e;
		};
		return e.type === "backend" && t("backend"), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && t("languageDetector"), e.type === "i18nFormat" && t("i18nFormat"), e.type === "postProcessor" && (A.addPostProcessor(e), this.services.ownPostProcessors?.add(e.name)), e.type === "formatter" && t("formatter"), e.type === "3rdParty" && this.modules.external.push(e), this;
	}
	hydrate(e, t) {
		return this.options.isClone ? this : this.services.resourceStore ? (e && !this.initializedStoreOnce && (this.services.resourceStore.data = e, Object.values(e).forEach((e) => {
			Object.keys(e).forEach((e) => {
				this.options.ns.includes(e) || this.options.ns.push(e);
			});
		}), this.initializedStoreOnce = !0, this.isInitialized = !0), t && !this.initializedLanguageOnce && (this.changeLanguage(t), this.initializedLanguageOnce = !0), this) : (this.logger.warn("hydrate: call init() first, the instance has no resource store yet"), this);
	}
	setResolvedLanguage(e) {
		if (e && this.languages && !["cimode", "dev"].includes(e)) {
			for (let e = 0; e < this.languages.length; e++) {
				let t = this.languages[e];
				if (!["cimode", "dev"].includes(t) && this.store.hasLanguageSomeTranslations(t)) {
					this.resolvedLanguage = t;
					break;
				}
			}
			!this.resolvedLanguage && !this.languages.includes(e) && this.store.hasLanguageSomeTranslations(e) && (this.resolvedLanguage = e, this.languages.unshift(e));
		}
	}
	changeLanguage(e, t) {
		this.isLanguageChangingTo = e;
		let n = i();
		this.emit("languageChanging", e);
		let a = (e) => {
			this.language = e, this.languages = this.services.languageUtils.toResolveHierarchy(e), this.resolvedLanguage = void 0, this.setResolvedLanguage(e);
		}, c = (r, i) => {
			i ? this.isLanguageChangingTo === e && (a(i), this.translator.changeLanguage(i), this.isLanguageChangingTo = void 0, this.emit("languageChanged", i), this.logger.log("languageChanged", i)) : this.isLanguageChangingTo = void 0, n.resolve((...e) => this.t(...e)), t && t(r, (...e) => this.t(...e));
		}, l = (t) => {
			!e && !t && this.services.languageDetector && (t = []);
			let n = r(t) ? t : t && t[0], i = this.store.hasLanguageSomeTranslations(n) ? n : this.services.languageUtils.getBestMatchFromCodes(r(t) ? [t] : t);
			i && this.logger.debug && !o(i) && ![].concat(this.options.supportedLngs || [], this.services.languageUtils.getFallbackCodes(this.options.fallbackLng, i), this.options.preload || []).includes(i) && !Object.prototype.hasOwnProperty.call(this.store.data, i) && this.logger.once(`lng:${i}`, "deprecate", `changeLanguage: the language code '${i.slice(0, 64)}' comes from lng, changeLanguage() or the language detector and is not configured; from v27 such a code is refused unless it has only letters, digits, '-', '_', '@' and '.' (no '..'), at most 128 characters. Set supportedLngs, or check the code before passing it on`), i && (this.language || a(i), this.translator.language || this.translator.changeLanguage(i), this.services.languageDetector?.cacheUserLanguage?.(i)), this.loadResources(i, (e) => {
				c(e, i);
			});
		};
		if (!e && this.services.languageDetector && !this.services.languageDetector.async) l(this.services.languageDetector.detect());
		else if (!e && this.services.languageDetector && this.services.languageDetector.async) {
			let e = s(this.services.languageDetector);
			e === !1 || e === void 0 && this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l);
		} else l(e);
		return n;
	}
	getFixedT(e, t, n, i) {
		let a = i?.scopeNs, o = (e, t, ...r) => {
			let i;
			i = typeof t == "object" ? { ...t } : this.options.overloadTranslationOptionHandler([e, t].concat(r)), i.lng = i.lng || o.lng, i.lngs = i.lngs || o.lngs;
			let s = i.ns !== void 0 && i.ns !== null;
			i.ns = i.ns || o.ns, i.keyPrefix !== "" && (i.keyPrefix = i.keyPrefix || n || o.keyPrefix);
			let c = {
				...this.options,
				...i
			};
			Array.isArray(a) && !s && (c.ns = a), typeof i.keyPrefix == "function" && (i.keyPrefix = j(i.keyPrefix, c));
			let l = this.options.keySeparator || ".", u;
			return i.keyPrefix && Array.isArray(e) ? u = e.map((e) => (typeof e == "function" && (e = j(e, c)), `${i.keyPrefix}${l}${e}`)) : (typeof e == "function" && (e = j(e, c)), u = i.keyPrefix ? `${i.keyPrefix}${l}${e}` : e), this.t(u, i);
		};
		return r(e) ? o.lng = e : o.lngs = e, o.ns = t, o.keyPrefix = n, o;
	}
	t(...e) {
		return this.translator ? this.translator.translate(...e) : (this.logger.warn("t: called before init(); returning an empty string"), "");
	}
	exists(...e) {
		return this.translator?.exists(...e);
	}
	setDefaultNamespace(e) {
		this.options.defaultNS = e;
	}
	hasLoadedNamespace(e, t = {}) {
		if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
		if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
		let n = t.lng || this.resolvedLanguage || this.languages[0], r = this.options ? this.options.fallbackLng : !1, i = this.languages[this.languages.length - 1];
		if (n.toLowerCase() === "cimode") return !0;
		let a = (e, t) => {
			let n = this.services.backendConnector.state[`${e}|${t}`];
			return n === -1 || n === 0 || n === 2;
		};
		if (t.precheck) {
			let e = t.precheck(this, a);
			if (e !== void 0) return e;
		}
		if (this.hasResourceBundle(n, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return !0;
		let { languageUtils: o } = this.services, s = t.lng ? o.isSupportedCode(n) && o.toResolveHierarchy(n, !1)[0] : n;
		return !(s && !a(s, e) || r && !a(i, e));
	}
	loadNamespaces(e, t) {
		let n = i();
		return this.options.ns ? (r(e) && (e = [e]), e.forEach((e) => {
			this.options.ns.includes(e) || this.options.ns.push(e);
		}), this.loadResources((e) => {
			n.resolve(), t && t(e);
		}), n) : (t && t(), Promise.resolve());
	}
	loadLanguages(e, t) {
		let n = i();
		r(e) && (e = [e]);
		let a = this.options.preload || [], o = e.filter((e) => !a.includes(e) && this.services.languageUtils.isSupportedCode(e));
		return o.length ? (this.options.preload = a.concat(o), this.loadResources((e) => {
			n.resolve(), t && t(e);
		}), n) : (t && t(), Promise.resolve());
	}
	dir(e) {
		if (e ||= this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language), !e) return "ltr";
		try {
			let t = new Intl.Locale(e);
			if (t && t.getTextInfo) {
				let e = t.getTextInfo();
				if (e && e.direction) return e.direction;
			}
		} catch {}
		let t = /* @__PURE__ */ "ar.shu.sqr.ssh.xaa.yhd.yud.aao.abh.abv.acm.acq.acw.acx.acy.adf.ads.aeb.aec.afb.ajp.apc.apd.arb.arq.ars.ary.arz.auz.avl.ayh.ayl.ayn.ayp.bbz.pga.he.iw.ps.pbt.pbu.pst.prp.prd.ug.ur.ydd.yds.yih.ji.yi.hbo.men.xmn.fa.jpr.peo.pes.prs.dv.sam.ckb".split("."), n = this.services?.languageUtils || new ae(N());
		return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : t.includes(n.getLanguagePartFromCode(e)) || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
	}
	static createInstance(t = {}, n) {
		let r = new e(t, n);
		return r.createInstance = e.createInstance, r;
	}
	cloneInstance(t = {}, n = P) {
		let r = t.forkResourceStore;
		r && (t = { ...t }, delete t.forkResourceStore);
		let i = {
			...this.options,
			preload: !1,
			...t,
			isClone: !0
		}, a = new e(i);
		if ((t.debug !== void 0 || t.prefix !== void 0) && (a.logger = a.logger.clone(t)), [
			"store",
			"services",
			"language"
		].forEach((e) => {
			a[e] = this[e];
		}), a.services = { ...this.services }, a.services.utils = {
			...a.services.utils,
			hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
			reloadResources: a.reloadResources.bind(a)
		}, r) {
			let e = (t) => {
				let n = Array.isArray(t) ? [...t] : { ...t };
				return Object.keys(n).forEach((t) => {
					n[t] && typeof n[t] == "object" && (n[t] = e(n[t]));
				}), n;
			};
			a.store = new te(e(this.store.data), i), a.services.resourceStore = a.store;
		}
		if (t.interpolation) {
			let e = {
				...N().interpolation,
				...this.options.interpolation,
				...t.interpolation
			}, n = {
				...i,
				interpolation: e
			};
			a.services.interpolator = new ue(n);
		}
		return a.translator = new ie(a.services, i), a.translator.on("*", (e, ...t) => {
			a.emit(e, ...t);
		}), a.init(i, n), a.translator.options = i, a.translator.backendConnector.newestCloneHasLoadedNamespace = a.hasLoadedNamespace.bind(a), a;
	}
	toJSON() {
		return {
			options: this.options,
			store: this.store,
			language: this.language,
			languages: this.languages,
			resolvedLanguage: this.resolvedLanguage
		};
	}
}.createInstance();
I.createInstance, I.dir, I.init, I.loadResources, I.reloadResources, I.use, I.changeLanguage, I.getFixedT, I.t, I.exists, I.setDefaultNamespace, I.hasLoadedNamespace, I.loadNamespaces, I.loadLanguages;
// node_modules/react-i18next/dist/es/utils.js
var L = /* @__PURE__ */ e(t()), ye = (e, t, n, r) => {
	let i = [n, {
		code: t,
		...r || {}
	}];
	if (e?.services?.logger?.forward) return e.services.logger.forward(i, "warn", "react-i18next::", !0);
	B(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), e?.services?.logger?.warn ? e.services.logger.warn(...i) : console?.warn && console.warn(...i);
}, be = {}, R = (e, t, n, r) => {
	B(n) && be[n] || (B(n) && (be[n] = /* @__PURE__ */ new Date()), ye(e, t, n, r));
}, xe = (e, t) => () => {
	if (e.isInitialized) t();
	else {
		let n = () => {
			setTimeout(() => {
				e.off("initialized", n);
			}, 0), t();
		};
		e.on("initialized", n);
	}
}, z = (e, t, n) => {
	e.loadNamespaces(t, xe(e, n));
}, Se = (e, t, n, r) => {
	if (B(n) && (n = [n]), e.options.preload && e.options.preload.indexOf(t) > -1) return z(e, n, r);
	n.forEach((t) => {
		e.options.ns.indexOf(t) < 0 && e.options.ns.push(t);
	}), e.loadLanguages(t, xe(e, r));
}, Ce = (e, t, n = {}) => !t.languages || !t.languages.length ? (R(t, "NO_LANGUAGES", "i18n.languages were undefined or empty", { languages: t.languages }), !0) : t.hasLoadedNamespace(e, {
	lng: n.lng,
	precheck: (t, r) => {
		if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !r(t.isLanguageChangingTo, e)) return !1;
	}
}), B = (e) => typeof e == "string", we = (e) => typeof e == "object" && !!e, Te = (e) => {
	let t = e?.services?.i18nFormat;
	return typeof t?.parse == "function" ? t : void 0;
}, Ee = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, De = (e) => {
	if (!e) return e;
	let t = {};
	return Object.keys(e).forEach((n) => {
		let r = e[n];
		t[n] = B(r) ? r.replace(/[&<>"']/g, (e) => Ee[e]) : r;
	}), t;
}, Oe = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, ke = {
	"&amp;": "&",
	"&#38;": "&",
	"&lt;": "<",
	"&#60;": "<",
	"&gt;": ">",
	"&#62;": ">",
	"&apos;": "'",
	"&#39;": "'",
	"&quot;": "\"",
	"&#34;": "\"",
	"&nbsp;": "\xA0",
	"&#160;": "\xA0",
	"&copy;": "©",
	"&#169;": "©",
	"&reg;": "®",
	"&#174;": "®",
	"&hellip;": "…",
	"&#8230;": "…",
	"&#x2F;": "/",
	"&#47;": "/"
}, Ae = (e) => ke[e], je = (e) => e.replace(Oe, Ae), V = {
	bindI18n: "languageChanged",
	bindI18nStore: "",
	transEmptyNodeValue: "",
	transSupportBasicHtmlNodes: !0,
	transWrapTextNodes: "",
	transKeepBasicHtmlNodesFor: [
		"br",
		"strong",
		"i",
		"p"
	],
	useSuspense: !0,
	unescape: je,
	transDefaultProps: void 0
}, Me = (e = {}) => {
	V = {
		...V,
		...e
	};
}, Ne = () => V, Pe, Fe = (e) => {
	Pe = e;
}, Ie = () => Pe, Le = {
	type: "3rdParty",
	init(e) {
		Me(e.options.react), Fe(e);
	}
}, Re = (0, L.createContext)(), ze = class {
	constructor() {
		this.usedNamespaces = {};
	}
	addUsedNamespaces(e) {
		e.forEach((e) => {
			this.usedNamespaces[e] || (this.usedNamespaces[e] = !0);
		});
	}
	getUsedNamespaces() {
		return Object.keys(this.usedNamespaces);
	}
}, Be = /* @__PURE__ */ n(((e) => {
	var n = t();
	function r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : r, a = n.useState, o = n.useEffect, s = n.useLayoutEffect, c = n.useDebugValue;
	function l(e, t) {
		var n = t(), r = a({ inst: {
			value: n,
			getSnapshot: t
		} }), i = r[0].inst, l = r[1];
		return s(function() {
			i.value = n, i.getSnapshot = t, u(i) && l({ inst: i });
		}, [
			e,
			n,
			t
		]), o(function() {
			return u(i) && l({ inst: i }), e(function() {
				u(i) && l({ inst: i });
			});
		}, [e]), c(n), n;
	}
	function u(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !i(e, n);
		} catch {
			return !0;
		}
	}
	function d(e, t) {
		return t();
	}
	var f = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? d : l;
	e.useSyncExternalStore = n.useSyncExternalStore === void 0 ? f : n.useSyncExternalStore;
})), Ve = (/* @__PURE__ */ n(((e, t) => {
	t.exports = Be();
})))(), He = {
	t: (e, t) => {
		if (B(t)) return t;
		if (we(t) && B(t.defaultValue)) return t.defaultValue;
		if (typeof e == "function") return "";
		if (Array.isArray(e)) {
			let t = e[e.length - 1];
			return typeof t == "function" ? "" : t;
		}
		return e;
	},
	ready: !1
}, Ue = () => () => {}, We = (e, t = {}) => {
	let { i18n: n } = t, { i18n: r, defaultNS: i } = (0, L.useContext)(Re) || {}, a = n || r || Ie();
	a && !a.reportNamespaces && (a.reportNamespaces = new ze()), a || R(a, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next or by passing it via props or context. In monorepo setups, make sure there is only one instance of react-i18next.");
	let o = (0, L.useMemo)(() => ({
		...Ne(),
		...a?.options?.react,
		...t
	}), [a, t]), { useSuspense: s, keyPrefix: c, bindI18n: l, bindI18nStore: u } = o, d = e || i || a?.options?.defaultNS, f = B(d) ? [d] : d || ["translation"], p = JSON.stringify(f), m = (0, L.useMemo)(() => f, [p]);
	a?.reportNamespaces?.addUsedNamespaces?.(m);
	let h = (0, L.useRef)(0), g = (0, L.useCallback)((e) => {
		if (!a) return Ue;
		let t = () => {
			h.current += 1, e();
		};
		return l && a.on(l, t), u && a.store.on(u, t), () => {
			l && l.split(" ").forEach((e) => a.off(e, t)), u && u.split(" ").forEach((e) => a.store.off(e, t));
		};
	}, [
		a,
		l,
		u
	]), _ = (0, L.useRef)(), v = (0, L.useCallback)(() => {
		if (!a) return He;
		let e = !!(a.isInitialized || a.initializedStoreOnce) && m.every((e) => Ce(e, a, o)), n = t.lng || a.language, r = h.current, i = typeof c == "function" ? j(c, {
			...a.options,
			ns: m
		}) : c, s = _.current;
		if (s && s.i18n === a && s.ready === e && s.lng === n && s.namespaces === m && s.keyPrefix === i && s.revision === r) return s;
		let l = {
			t: a.getFixedT(n, o.nsMode === "fallback" ? m : m[0], c, { scopeNs: m }),
			i18n: a,
			ready: e,
			lng: n,
			namespaces: m,
			keyPrefix: i,
			revision: r
		};
		return _.current = l, l;
	}, [
		a,
		m,
		c,
		o,
		t.lng
	]), [y, b] = (0, L.useState)(0), { t: x, ready: S } = (0, Ve.useSyncExternalStore)(g, v, v), C;
	a && s && !S && (C = new Promise((e) => {
		let n = () => e();
		t.lng ? Se(a, t.lng, m, n) : z(a, m, n);
	}), {t: x, ready: S} = v()), (0, L.useEffect)(() => {
		if (a && !S && !s) {
			let e = () => b((e) => e + 1);
			t.lng ? Se(a, t.lng, m, e) : z(a, m, e);
		}
	}, [
		a,
		t.lng,
		m,
		S,
		s,
		y
	]);
	let w = a || {}, T = (0, L.useRef)(null), E = (0, L.useRef)(), D = (e) => `${e.language}|${e.resolvedLanguage}|${e.languages?.join(",")}`, O = (e) => {
		let t = Object.getOwnPropertyDescriptors(e);
		t.__original && delete t.__original;
		let n = Object.create(Object.getPrototypeOf(e), t);
		if (!Object.prototype.hasOwnProperty.call(n, "__original")) try {
			Object.defineProperty(n, "__original", {
				value: e,
				writable: !1,
				enumerable: !1,
				configurable: !1
			});
		} catch {}
		return n;
	}, k = (0, L.useMemo)(() => {
		let e = w, t = e && D(e), n = e;
		e && (T.current && T.current.__original === e && E.current === t ? n = T.current : (n = O(e), T.current = n, E.current = t));
		let r = !S && !s ? (...e) => (R(a, "USE_T_BEFORE_READY", "useTranslation: t was called before ready. When using useSuspense: false, make sure to check the ready flag before using t."), x(...e)) : x, i = [
			r,
			n,
			S
		];
		return i.t = r, i.i18n = n, i.ready = S, i;
	}, [
		x,
		w,
		S,
		w.resolvedLanguage,
		w.language,
		w.languages
	]);
	if (a && s && !S) {
		let e = !1;
		try {
			e = !1;
		} catch {}
		throw e && R(a, "SUSPENDED_WHILE_LOADING", "useTranslation: suspended while translations are loading (useSuspense is true by default). Add a <Suspense> boundary above this component, or set react.useSuspense: false in the i18next init options. https://react.i18next.com/latest/usetranslation-hook"), C;
	}
	return k;
}, Ge = {
	common: {
		back: "Retour",
		continue: "Continuer",
		cancel: "Annuler",
		save: "Enregistrer",
		close: "Fermer",
		gotIt: "Compris",
		retry: "Réessayer",
		none: "Aucun",
		tryAgainSoon: "Réessaie dans un instant.",
		tooManyAttempts: "Trop de tentatives. Réessaie dans {{minutes}} min.",
		unreachable: "Impossible de joindre Hodi pour le moment.",
		help: "Aide : {{title}}",
		licence: "Logiciel libre (AGPL-3.0)",
		noResult: "Aucun résultat.",
		loading: "Chargement…",
		serverDown: "Le serveur ne répond pas pour le moment.",
		saving: "Enregistrement…",
		change: "Changer"
	},
	language: {
		label: "Langue",
		profileHint: "Celle de l’interface ; les articles restent dans la leur",
		in: {
			fr: "En français",
			en: "En anglais"
		}
	},
	app: {
		preRelease: "BETA",
		unreachableTitle: "Impossible de joindre Hodi",
		unreachableText: "Le serveur ne répond pas pour le moment."
	},
	login: {
		tagline: "L’actu, rien que pour toi.",
		email: "E-mail",
		emailOrHandle: "E-mail ou identifiant",
		password: "Mot de passe",
		wrongCredentials: "E-mail ou mot de passe incorrect, réessaie.",
		failed: "Une erreur est survenue. Réessaie dans un instant.",
		signingIn: "Connexion…",
		enter: "Entrer",
		haveCode: "J’ai un code",
		forgot: "Mot de passe oublié",
		refused: "La connexion a été refusée. Si ça dure, demande à la personne qui gère le serveur.",
		blocked: "Ce compte a été bloqué sur ce serveur."
	},
	join: {
		code: {
			title: "Entre le code",
			intro: "Les 8 caractères que l’admin du serveur t’a donnés, ou le lien qui va avec.",
			label: "Code",
			helpTitle: "D’où vient ce code ?",
			help: "L’admin du serveur le crée dans <i>Serveur › Comptes</i>, pour inviter quelqu’un ou pour un mot de passe oublié. Il sert une seule fois, pendant 24 h.",
			wrong: "Ce code ne marche pas : il a peut-être déjà servi, ou ses 24 h sont passées. Demandes-en un nouveau."
		},
		invite: {
			title: "Bienvenue sur Hodi",
			intro: "<b>{{name}}</b> t’invite. Crée un compte : avec un e-mail et un mot de passe, tu te connectes sur chacun des appareils.",
			introNoName: "Crée un compte : avec un e-mail et un mot de passe, tu te connectes sur chacun des appareils."
		},
		profile: {
			title: "Dernière étape : le profil",
			intro: "Crée un compte : ce profil y sera lié, avec ses lectures."
		},
		who: { intro: "Un prénom et une couleur, que les autres verront. Tu pourras les changer dans <i>Mon compte</i>." },
		age: "J’ai au moins 13 ans",
		create: "Créer mon compte",
		emailTaken: "Cette adresse a déjà un compte : connecte-toi avec elle.",
		failed: "Le compte n’a pas pu être créé. Réessaie dans un instant.",
		reset: {
			title: "Nouveau mot de passe",
			intro: "Choisis le nouveau mot de passe du compte de <b>{{name}}</b>. Les autres appareils se déconnectent\xA0: tu t’y reconnecteras avec lui.",
			button: "Valider"
		}
	},
	password: {
		show: "Afficher le mot de passe",
		hide: "Masquer le mot de passe",
		levels: {
			tooShort: "Trop court",
			weak: "Faible",
			fair: "Moyen",
			strong: "Solide",
			excellent: "Excellent"
		},
		minimum: "{{count}} caractères minimum.",
		missing_one: "Encore {{count}} caractère.",
		missing_other: "Encore {{count}} caractères.",
		another: "Ajoute un mot pour atteindre {{level}}.",
		tips: {
			keyboard: "Évite les suites du clavier (azerty, 1234).",
			repeat: "Évite les répétitions et les suites (aaa, abc).",
			dates: "Évite les dates et les années, faciles à deviner.",
			common: "Ce mot de passe est trop courant : choisis-en un autre.",
			word: "Un seul mot se devine vite : ajoutes-en d’autres."
		},
		gauge: "Sécurité du mot de passe"
	},
	aiKey: {
		ok: "Clé vérifiée : l’IA est prête.",
		invalid: "Cette clé est refusée. Vérifie qu’elle est complète et toujours active.",
		unreachable: "Le fournisseur ne répond pas. Réessaie dans un instant.",
		failed: "La vérification a échoué. Réessaie dans un instant.",
		label: "Clé d’API {{provider}}",
		check: "Vérifier",
		console: "Créer une clé sur la console {{provider}}"
	},
	regions: {
		timeZone: "Fuseau horaire",
		searchTimeZone: "Chercher un fuseau horaire",
		timeZonePlaceholder: "Une ville : Paris, Tokyo…",
		country: "Pays",
		searchCountry: "Chercher un pays",
		countryPlaceholder: "Belgique, Canada…",
		noCountry: "Aucun en particulier"
	},
	profileForm: {
		colors: {
			belgium: "Ocre",
			world: "Bleu",
			tech: "Turquoise",
			science: "Vert",
			"film-tv": "Rose",
			gaming: "Corail",
			ai: "Olive",
			broadcast: "Lavande",
			sport: "Orange",
			music: "Violet"
		},
		photoTooBig: "Cette photo dépasse 20 Mo. Choisis-en une plus légère.",
		photoUnreadable: "Cette image ne peut pas être lue. Essaie une autre photo.",
		saveFailed: "Le profil n’a pas pu être enregistré. Réessaie dans un instant.",
		changePhoto: "Changer la photo",
		addPhoto: "Ajouter une photo",
		photoMax: "20 Mo max",
		removePhoto: "Retirer la photo",
		name: "Prénom",
		namePlaceholder: "Ex. Léa",
		color: "Couleur",
		deleteProfile: "Supprimer le profil",
		delete: "Supprimer",
		create: "Créer le profil",
		type: "Type",
		kinds: {
			adult: "Adulte",
			teen: "Ado",
			child: "Enfant"
		},
		kindHints: {
			adult: "Toute l’app. Gère aussi les profils des jeunes.",
			teen: "La même app, sources et temps réglés par ses parents.",
			child: "App simple, sources de ses parents."
		},
		avatar: "Avatar",
		avatars: {
			fox: "Renard",
			pirate: "Pirate",
			astronaut: "Astronaute",
			robot: "Robot",
			dragon: "Dragon",
			panda: "Panda",
			owl: "Chouette",
			kitten: "Chaton",
			trex: "T-rex",
			koala: "Koala",
			reporter: "Reporter",
			scientist: "Scientifique"
		},
		childSoon: {
			title: "Bientôt, une app rien que pour lui",
			text: "Le profil Enfant est en préparation. En attendant, choisis Ado ou Adulte."
		},
		connect: "Connecter un appareil",
		handle: "Identifiant",
		handleFree: "@{{handle}} est libre.",
		handleTaken: "@{{handle}} est déjà pris. Essaie @{{other}}.",
		handleRules: "De 3 à 20 caractères : lettres, chiffres, point ou tiret bas.",
		handleLocked: "Tu pourras le changer le {{date}}.",
		handleEvery: "Tu peux le changer une fois tous les 30 jours."
	},
	setup: {
		step: "Étape {{step}} sur {{total}}",
		codeWrong: "Ce code ne correspond pas.",
		restarted: "Hodi a redémarré : entre le nouveau code de son journal.",
		codeCheckFailed: "Impossible de vérifier le code. Réessaie dans un instant.",
		setupFailed: "L’installation n’a pas abouti. Réessaie dans un instant.",
		start: {
			kicker: "Bienvenue dans Hodi",
			title: "L’actu de toute la maison",
			lead: "Les sites d’info que tu préfères, <b>rangés par thème</b>, et lus <b>sans pub ni pistage</b>. Chacun a son compte, et on se partage ce qui vaut la peine d’être lu.",
			codeNoticeTitle: "Le code est dans le journal du serveur",
			codeNoticeText: "Prends la dernière ligne <i>Setup code</i> de <code>docker compose logs app</code>.",
			code: "Code d’installation",
			button: "Installer Hodi",
			length: "Quelques minutes · tout dans le navigateur"
		},
		account: {
			title: "Compte",
			intro: "Il est à toi seul : chaque personne que tu inviteras aura le sien. Tu deviens l’admin de ce serveur.",
			helpTitle: "E-mail et mot de passe",
			help: "Tu te connectes avec eux sur chacun des appareils, qui s’en souvient 90 jours. 8 caractères minimum : plus le mot de passe est long et mélange majuscules, chiffres et symboles, plus il est solide.",
			email: "E-mail",
			emailPlaceholder: "Ex. toi@exemple.be",
			password: "Mot de passe",
			confirm: "Confirme le mot de passe",
			mismatch: "Les deux mots de passe ne sont pas identiques."
		},
		ready: {
			title: "Le serveur est prêt",
			intro: "Crée maintenant le profil avec lequel tu liras Hodi. L’espace <i>Serveur</i> t’attend juste après.",
			household: "Créer mon profil"
		},
		plugins: {
			title: "Plugins trouvés",
			intro: "Ces plugins étaient déjà dans le dossier de Hodi. Garde ceux que tu veux utiliser : les autres restent installés, éteints, et s’allument plus tard dans l’espace <i>Serveur</i>.",
			use: "Utiliser {{name}}",
			broken: "Ce plugin ne peut pas se charger. L’espace Serveur dit pourquoi.",
			unsigned: "Non vérifié : ses pages ne s’afficheront pas.",
			failed: "Le choix des plugins n’a pas pu être enregistré. Réessaie."
		},
		pluginStep: { failed: "Cette étape de {{name}} n’a pas pu s’afficher. Continue : elle se règle aussi dans l’espace Serveur." },
		mail: {
			title: "E-mail du serveur",
			intro: "Hodi s’en sert pour envoyer les liens <i>Mot de passe oublié</i> et les e-mails des plugins. Il se règle aussi plus tard, dans <i>Serveur › E-mail</i>.",
			later: "Plus tard"
		},
		profile: {
			title: "Et toi, c’est qui ?",
			intro: "Le prénom et la couleur que les autres verront. Tu pourras les changer dans <i>Mon compte</i>."
		},
		ai: {
			title: "L’IA, si tu veux",
			intro: "Résumer un article, lui poser des questions, le <i>Résumé du jour</i> : avec une clé d’API à soi, payée à l’usage. Sans IA, tout le reste marche pareil.",
			helpTitle: "Rien ne part sans un clic",
			help: "Chaque bouton violet est un appel payé sur les crédits de cette clé, jamais automatique. Fixe une limite de dépense mensuelle sur la console du fournisseur. Tu pourras ajouter, changer ou retirer la clé dans Mon compte › IA et crédits.",
			label: "IA",
			providerHint: "Avec une clé d’API, facturée à l’usage",
			none: "Sans IA",
			noneHint: "Les boutons violets restent cachés"
		},
		done: {
			title: "Tout est prêt",
			intro: "Hodi a deviné la région depuis ce navigateur. Corrige si besoin, puis entre dans Hodi.",
			account: "Compte",
			serverAdmin: "{{email}} · Admin du serveur",
			household: "Profil",
			ai: "IA",
			keyChecked: "{{provider}} · clé vérifiée",
			enter: "Entrer dans Hodi"
		}
	},
	nav: {
		label: "Navigation",
		main: "Navigation principale",
		home: "Hodi, Le fil",
		backHome: "Retour à l’accueil",
		search: "Rechercher",
		topics: "Thèmes",
		newReaction: "Nouvelle réaction",
		newReactionOn: "{{label}}, nouvelle réaction {{reaction}}",
		savedCount_one: "{{label}}, {{count}} article",
		savedCount_other: "{{label}}, {{count}} articles",
		newCount_one: "{{label}}, {{count}} nouveau",
		newCount_other: "{{label}}, {{count}} nouveaux",
		today: "Le fil",
		saved: "Enregistrés",
		followed: "Suivis",
		shares: "Partages",
		watch: "Vidéos",
		history: "Historique",
		settings: "Réglages",
		backToFeed: "Retour au fil",
		backToSettings: "Retour aux réglages"
	},
	profiles: {
		pending: "Des changements faits hors ligne n’ont pas encore été envoyés. Reconnecte-toi avant de changer de profil.",
		openFailed: "Impossible d’ouvrir ce profil pour le moment.",
		switch: "Changer de profil",
		switchFrom: "{{name}}, changer de profil",
		create: "Créer un profil",
		yours: "{{name}}, mon profil",
		of: "Profil de {{name}}",
		loadFailed: "Impossible de charger les profils. Recharge la page dans un instant.",
		who: "Qui lit ?",
		locked: "Protégé par un mot de passe",
		add: "Ajouter",
		admin: "Admin",
		code: {
			invite: "Inviter quelqu’un",
			inviteTitle: "Inviter quelqu’un",
			inviteIntro: "Avec ce code, la personne crée son compte sur ce serveur. Sur son appareil, la personne ouvre Hodi, choisit <i>J’ai un code</i> sur la page <i>Connexion</i> et tape ces 8 caractères. Elle choisit ensuite son e-mail et son mot de passe.",
			connectTitle: "Connecter {{name}}",
			connectIntro: "Avec ce code, {{name}} se connecte à son profil avec son propre compte. Sur son appareil, {{name}} ouvre Hodi, choisit <i>J’ai un code</i> sur la page Connexion et tape ces 8 caractères, puis choisit son e-mail et son mot de passe. <b>Le profil devient le sien</b>, avec toutes ses lectures.",
			label: "Code",
			qr: "QR du lien d’invitation",
			scan: "Ou scanne ce QR avec l’appareil photo du téléphone : Hodi s’ouvre avec le code déjà rempli. Valable 24 h, une seule fois.",
			copy: "Copier le lien",
			copied: "Lien copié",
			copiedButton: "Copié",
			copyFailed: "Le lien n’a pas pu être copié.",
			done: "Terminé",
			failed: "Le code n’a pas pu être créé. Réessaie dans un instant.",
			resetTitle: "Nouveau mot de passe",
			resetIntro: "Avec ce code, {{name}} choisit un nouveau mot de passe. Sur son appareil, {{name}} ouvre Hodi, choisit <i>J’ai un code</i> sur la page Connexion et tape ces 8 caractères, puis son nouveau mot de passe. <b>Ses autres appareils se déconnectent</b> : il faudra s’y reconnecter avec le nouveau."
		},
		wrongPassword: "Ce mot de passe n’est pas le bon.",
		yourPassword: "Mot de passe",
		open: "Ouvrir",
		noAccount: "{{name}} n’a pas encore de compte. Son profil s’ouvrira quand {{name}} l’aura créé avec son code.",
		loginOnly: "{{name}} se connecte sans mot de passe : continue avec le même bouton qu'à la connexion pour ouvrir son profil.",
		loginOnlyNoWay: "{{name}} se connecte sans mot de passe, par un plugin qui n'est plus là. L’admin du serveur peut lui donner un code pour choisir un mot de passe.",
		parentalCode: "Code parental",
		wrongCode: "Ce code n’est pas le bon.",
		trustDevice: "Ne plus demander sur cet appareil",
		addAccount: {
			title: "Ajouter mon compte",
			intro: "Connecte-toi pour ajouter un compte à cet appareil. Les comptes déjà ajoutés à <i>Qui lit ?</i> restent comme ils sont.",
			submit: "Se connecter",
			recovery: "Code de secours",
			app: "Code de l’app"
		},
		forgotCode: "Code oublié ? Le mot de passe du compte"
	},
	limits: {
		fiveMinutes: "Plus que 5 minutes de lecture aujourd’hui",
		byeChild: "À demain, {{name}} !",
		byeTeen: "À demain, {{name}}",
		laterChild: "À tout à l’heure, {{name}} !",
		laterTeen: "À tout à l’heure, {{name}}",
		timeUp: "Le temps de lecture du jour est fini. Tu pourras relire demain à {{time}}.",
		after: "C’est l’heure de faire une pause. Tu pourras relire demain à {{time}}.",
		before: "Tu pourras lire à partir de {{time}}.",
		switch: "Changer de profil",
		timeUpTomorrow: "Le temps de lecture du jour est fini. Tu pourras relire demain.",
		meHint: "Nom, photo, langue, temps du jour",
		meIntro: "Le prénom, la photo, la langue et le temps de lecture du jour. Tu peux aussi revoir la visite guidée, ou remettre les réglages à zéro.",
		today: "Aujourd’hui",
		readingTime: "Temps d’écran restant",
		readingHint: "{{time}} / jour · réglé par les parents",
		left: "Temps restant aujourd’hui : {{time}}",
		quietHint: "Réglé par les parents",
		quietNone: "Aucune"
	},
	young: {
		manage: "Gérer",
		manageLabel: "Gérer {{name}}",
		edit: "Modifier",
		perDay: "{{time}} par jour",
		noLimit: "Temps illimité",
		hm: "{{h}} h {{m}}",
		range: "{{start}} – {{end}}",
		notFound: "Ce profil n’existe plus.",
		loadFailed: "Ses réglages n’ont pas pu être chargés. Réessaie dans un instant.",
		saveFailed: "Ça n’a pas pu être enregistré. Réessaie dans un instant.",
		saved: "Enregistré",
		reading: "Lecture",
		sources: "Sources",
		sourcesHint: "{{sources}} sur {{topics}}",
		sourcesNone: "Aucune source pour l’instant",
		topicCount_one: "{{count}} thème",
		topicCount_other: "{{count}} thèmes",
		sourcesTitle: "Sources du profil",
		sourceToggle: "{{name}} pour {{profile}}",
		topics: "Thèmes",
		topicsHint: "Ceux que {{name}} voit dans son fil",
		visible_one: "{{count}} visible",
		visible_other: "{{count}} visibles",
		topicsTitle: "Thèmes du profil",
		time: "Temps",
		daily: "Temps par jour",
		dailyHint: "Une fois écoulé, l’app se met en pause jusqu’à demain",
		dailyTitle: "Temps d’écran",
		dailyToggle: "Limiter le temps",
		dailyToggleHint: "Compté seulement quand l’app est à l’écran",
		less: "Moins",
		more: "Plus",
		noLimitShort: "Illimité",
		window: "Horaires",
		windowHint: "{{name}} peut lire seulement entre ces heures",
		windowAll: "Toute la journée",
		windowToggle: "Limiter les horaires",
		windowToggleHint: "En dehors, l’app dit à quelle heure elle rouvre",
		windowWrong: "L’heure de fin doit venir après l’heure de début.",
		start: "Début",
		end: "Fin",
		quiet: "Ne pas déranger",
		quietHint: "Aucune notification pendant ces heures",
		quietNone: "Jamais",
		quietToggle: "Ne pas déranger",
		quietToggleHint: "Par exemple de {{start}} à {{end}}",
		ai: "IA",
		explain: "Explications IA par jour",
		explainHint: "Quand {{name}} demande à l’IA d’expliquer un article ou un mot",
		explainTitle: "Explications IA par jour",
		explainNone: "Aucune",
		followUp: "Suivi",
		week: "Sa semaine",
		weekHint: "{{time}} · {{articles}}",
		weekNone: "Rien lu cette semaine",
		weekTitle: "Bilan de la semaine",
		weekTime: "À l’écran",
		weekThemes: "Ses thèmes",
		weekThemesNone: "Pas encore de thème lu cette semaine",
		see: "Voir",
		profile: "Profil",
		delete: "Supprimer le profil",
		deleteHint: "Ses lectures, ses statistiques et ses badges sont effacés",
		deleteButton: "Supprimer",
		editTitle: "Modifier {{name}}",
		profileSaved: "Profil enregistré",
		deleted: "{{name}} supprimé",
		deleteFailed: "La suppression a échoué. Réessaie dans un instant.",
		backToProfiles: "Retour aux profils",
		perDayCount: "{{count}} / jour",
		channels: "Chaînes YouTube",
		devices: "Appareils",
		removeDevice: "Retirer",
		removeDeviceLabel: "Retirer {{device}}",
		deviceRemoved: "{{device}} retiré",
		deviceRemoveFailed: "Impossible de retirer cet appareil.",
		deleteTwoParents: "{{name}} a deux parents : l’un des deux doit d’abord ne plus être parent."
	},
	requests: {
		push: "{{name}} demande {{source}}",
		ask: "Demander une source",
		link: "Lien du site ou de la chaîne",
		placeholder: "Ex. numerama.com",
		send: "Demander",
		sent: "Demande envoyée",
		mine: "Mes demandes",
		pending: "En attente",
		pendingLabel: "En attente des parents",
		byParents: "Ajoutées par les parents",
		count_one: "{{count}} demande",
		count_other: "{{count}} demandes",
		errors: {
			invalid: "Ce n’est pas un lien. Colle l’adresse d’un site.",
			blocked: "Cette adresse n’est pas publique.",
			none: "Aucun flux trouvé à cette adresse. Essaie la page d’accueil du site.",
			empty: "Ce flux est vide pour le moment.",
			failed: "Le site ne répond pas. Réessaie dans un instant.",
			reddit: "Reddit ne se suit plus : il ferme ses flux.",
			channel: "Les podcasts ne se demandent pas : seulement les sites et les chaînes YouTube.",
			following: "Tu lis déjà cette source.",
			pending: "Tu as déjà demandé cette source.",
			full: "Déjà 3 demandes en attente : attends les parents.",
			other: "La demande n’a pas pu être envoyée. Réessaie dans un instant.",
			unavailable: "Source indisponible sur ce serveur."
		},
		title: "Demandes",
		waiting_one: "{{count}} en attente",
		waiting_other: "{{count}} en attente",
		asks: "{{name}} demande {{source}}",
		dialogTitle: "Demande de source",
		topic: "Thème",
		accept: "Accepter",
		refuse: "Refuser",
		accepted: "{{source}} ajoutée pour {{name}}",
		refused: "Demande refusée",
		answerFailed: "La réponse n’a pas pu être envoyée. Réessaie dans un instant.",
		gone: "Cette demande a déjà reçu une réponse.",
		fiche: "Demandes",
		ficheNone: "Aucune en attente",
		see: "Voir",
		changeTopic: "Changer",
		asksRow: "<b>{{name}}</b> demande une source",
		answerAccepted: "<b>Les parents</b> ont accepté",
		answerRefused: "<b>Les parents</b> ont refusé",
		answers: "Demandes traitées",
		waitingTitle: "Demandes en attente",
		more_one: "Voir l’autre demande",
		more_other: "Voir les {{count}} autres",
		asksChannelRow: "<b>{{name}}</b> demande une chaîne",
		intro: "Les parents choisissent les sources. Tu peux masquer celles qui ne t’intéressent pas, et en demander une nouvelle : elle arrive dans le fil s’ils l’acceptent."
	},
	shortcuts: {
		title: "Raccourcis clavier",
		intro: "Sur ordinateur, Hodi se parcourt au clavier : passer d’un article à l’autre, changer de thème, enregistrer, masquer ou chercher. Appuie sur <b>?</b> n’importe où pour revoir cette liste.",
		aiNote: "R affiche le bouton du résumé, il ne lance jamais l’IA tout seul.",
		escape: "Échap",
		groups: {
			navigate: "Naviguer",
			article: "Article"
		},
		next: "Article suivant",
		previous: "Article précédent",
		open: "Ouvrir",
		previousTopic: "Thème précédent",
		nextTopic: "Thème suivant",
		search: "Rechercher",
		save: "Enregistrer",
		hide: "Masquer l’article",
		summary: "Résumé IA",
		nextArticle: "Article suivant",
		back: "Retour à la liste",
		help: "Cette aide",
		close: "Fermer"
	},
	tour: {
		skip: "Passer",
		adding: "Hodi ajoute les sources choisies",
		profile: {
			title: "Mon profil",
			points: "Chaque article lu te rapporte des points.",
			open: "Ouvre Mon profil pour voir le grade.",
			via: "Passe par le fil pour ouvrir Mon profil."
		},
		level: {
			title: "Grades et badges",
			grades: "Lis pour monter de grade, jusqu’à Légende.",
			badges: "Les badges passent du bronze à l’or.",
			wear: "Touche un badge gagné pour le porter."
		},
		welcome: {
			title: "Bienvenue sur Hodi",
			ask: "Qu’est-ce qui t’intéresse ?",
			pick: "Choisis un ou plusieurs thèmes."
		},
		first: {
			title: "Première source",
			together: "Ajoutons-en une ensemble, pour {{topic}}.",
			settings: "Commence par ouvrir les réglages."
		},
		sources: {
			title: "Les sources",
			what: "Les sites et les chaînes que Hodi lit pour toi.",
			open: "Ouvre <i>Sources</i>."
		},
		topic: {
			suggestions: "Chaque thème a ses sources.",
			pick: "Choisis <i>{{topic}}</i>.",
			via: "Ouvre la liste des thèmes, puis choisis {{topic}}."
		},
		site: {
			title: "Choisis une source",
			feed: "Chacune est prête à lire.",
			add: "Ajoute celle qui te plaît."
		},
		direction: {
			title: "Direction {{topic}}",
			filed: "La source est rangée dans {{topic}}.",
			open: "Ouvre ce thème pour lire ses articles.",
			via: "Passe par le fil pour ouvrir ce thème."
		},
		end: {
			title: "C’est tout bon !",
			here: "Voici {{topic}}, avec la nouvelle source.",
			others: "Les autres thèmes sont aussi dans le fil.",
			feed: "Elle arrive aussi dans le fil.",
			enjoy: "Profite bien de Hodi.",
			go: "C’est parti"
		},
		next: "Suivant",
		teen: {
			welcome: {
				title: "Bienvenue sur Hodi",
				yours: "Un journal rien qu’à toi, avec l’actu qui t’intéresse.",
				how: "Voici comment ça marche."
			},
			feed: {
				title: "Le fil",
				chosen: "Ici, l’actu choisie avec les parents.",
				open: "Appuie sur un article pour l’ouvrir."
			},
			ask: {
				title: "Demander une source",
				missing: "Un site te manque ? Tu peux le demander.",
				settings: "Appuie sur Réglages.",
				sources: "Puis sur Sources.",
				paste: "Ici, colle le lien d’un site que tu aimes.",
				parents: "Les parents reçoivent la demande et décident.",
				press: "Appuie sur Demander une source."
			},
			end: {
				title: "C’est parti !",
				enjoy: "Bonne lecture.",
				go: "C’est parti"
			}
		},
		catalogue: {
			title: "Le catalogue",
			what: "Les sources du serveur, rangées par thème.",
			open: "Ouvre le catalogue."
		}
	},
	offline: {
		title: "Hors ligne",
		withUnread_one: "Hors ligne · {{count}} article à lire",
		withUnread_other: "Hors ligne · {{count}} articles à lire",
		since: "Dernière mise à jour à {{time}}"
	},
	card: {
		save: "Enregistrer",
		unsave: "Retirer",
		hide: "Masquer",
		undoLabel: "{{label}} :",
		ofReading: "de lecture",
		alsoOn_one: "Aussi sur {{count}} source",
		alsoOn_other: "Aussi sur {{count}} sources",
		offline: "Dispo hors ligne",
		onSite: "Sur le site",
		hideKind: {
			article: "Masquer l’article",
			video: "Masquer la vidéo",
			podcast: "Masquer l’épisode"
		},
		saved: "Ajouté aux Enregistrés",
		unsaved: "Retiré des Enregistrés"
	},
	notFound: {
		title: "Cette page n’existe pas, ou plus",
		text_one: "Le lien est peut-être cassé, ou l’article a quitté le fil après {{count}} jour.",
		text_other: "Le lien est peut-être cassé, ou l’article a quitté le fil après {{count}} jours.",
		error: "ERREUR 404"
	},
	time: {
		minutes_one: "{{count}} MIN",
		minutes_other: "{{count}} MIN",
		hours_one: "{{count}} H",
		hours_other: "{{count}} H",
		days_one: "{{count}} J",
		days_other: "{{count}} J",
		day: "{{weekday}}. {{numbers}}",
		today: "Aujourd’hui",
		yesterday: "Hier · {{day}}"
	},
	count: {
		article_one: "{{count}} article",
		article_other: "{{count}} articles",
		video_one: "{{count}} vidéo",
		video_other: "{{count}} vidéos",
		episode_one: "{{count}} épisode",
		episode_other: "{{count}} épisodes",
		day_one: "{{count}} jour",
		day_other: "{{count}} jours",
		item_one: "{{count}} élément",
		item_other: "{{count}} éléments",
		source_one: "{{count}} source",
		source_other: "{{count}} sources",
		read_one: "{{count}} lu",
		read_other: "{{count}} lus",
		view_one: "{{count}} vue",
		view_other: "{{count}} vues",
		subject_one: "{{count}} sujet",
		subject_other: "{{count}} sujets",
		search_one: "{{count}} recherche",
		search_other: "{{count}} recherches",
		result_one: "{{count}} résultat",
		result_other: "{{count}} résultats",
		word_one: "{{count}} mot",
		word_other: "{{count}} mots",
		profile_one: "{{count}} profil",
		profile_other: "{{count}} profils",
		device_one: "{{count}} appareil",
		device_other: "{{count}} appareils"
	},
	state: {
		read: {
			article: "Lu",
			video: "Vu",
			podcast: "Écouté"
		},
		hidden: {
			article: "Masqué",
			video: "Masquée",
			podcast: "Masqué"
		},
		undo: {
			article: "Article masqué",
			video: "Vidéo masquée",
			podcast: "Épisode masqué"
		}
	},
	pull: {
		refreshing: "Actualisation…",
		release: "Relâche pour actualiser",
		pull: "Tire pour actualiser",
		updated: "MAJ {{age}}"
	},
	feed: {
		loadDay: "Charger {{day}}",
		loadFailed: "Impossible de charger le fil",
		loadTopicFailed: "Impossible de charger {{topic}}",
		savedOffline: "Les articles enregistrés se lisent hors ligne.",
		savedOfflineLabel: "Enregistrés, disponibles hors ligne",
		allRead: "Tout est lu",
		nothingNew: "Rien de neuf",
		allReadText: "Les articles lus sont masqués dans Réglages.",
		nothingNewDesktop: "Les jours précédents sont en dessous.",
		nothingNewPhone: "Tire vers le bas pour actualiser.",
		nothingInTopic: "Rien dans ce thème pour l’instant.",
		all: "TOUT",
		allTopics: "Tout",
		allOf_one: "Tout {{topic}}, {{count}} article",
		allOf_other: "Tout {{topic}}, {{count}} articles",
		title: "Le fil",
		topicsFailed: "Impossible de charger les thèmes"
	},
	lists: {
		filter: "Filtrer par thème",
		nothingFor: "Rien pour « {{query}} »",
		nothingHere: "Rien ici"
	},
	resume: {
		title: "Reprendre",
		left_one: "Il reste {{count}} min",
		left_other: "Il reste {{count}} min",
		remove: "Retirer de Reprendre"
	},
	saved: {
		empty: "Rien d’enregistré",
		emptyText: "Garde un article avec son marque-page.",
		noMatch: "Aucun article enregistré ne correspond.",
		search: "Chercher dans Enregistrés"
	},
	history: {
		unread: {
			article: "Marquer comme non lu",
			video: "Marquer comme non vue",
			podcast: "Marquer comme non écouté"
		},
		cleared: "Historique effacé",
		clear: "Effacer l’historique",
		loadFailed: "Impossible de charger l’historique",
		empty: "Rien lu ni vu ces 7 derniers jours",
		emptyText: "Ce que tu lis et regardes arrive ici.",
		noMatch: "Rien de lu ni de vu ne correspond.",
		search: "Chercher dans Historique"
	},
	help: {
		followed: {
			title: "Suivis",
			desktop: ["Les articles de tous les thèmes qui parlent des sujets que tu suis, le plus récent en haut. Un article qui parle de deux sujets apparaît sous les deux. Ajoute ou retire des sujets dans Réglages › Sujets suivis."],
			phone: ["Les articles de tous les thèmes qui parlent des sujets que tu suis, le plus récent en haut. Glisse une carte vers la droite pour l’enregistrer, vers la gauche pour la masquer. Les sujets se gèrent dans Réglages › Sujets suivis."]
		},
		shares: {
			title: "Partages",
			desktop: ["Ce que d’autres personnes t’ont envoyé avec <i>Pour…</i>, pendant 7 jours. Un article lu ou masqué s’en va. En fin d’article, réagis d’un emoji : l’expéditeur le voit en haut de ses Partages."],
			phone: ["Ce que d’autres personnes t’ont envoyé avec <i>Pour…</i>, pendant 7 jours. Un article lu, ou glissé vers la gauche, s’en va. En fin d’article, réagis d’un emoji : l’expéditeur le voit en haut de ses Partages."]
		},
		videos: {
			title: "Vidéos",
			desktop: ["Les vidéos et épisodes des chaînes que tu suis, une semaine à la fois, sans les Shorts. Elles se lisent ici, à côté de la liste. Une vidéo vue en entier quitte la liste ; commencée, elle t’attend dans <i>Reprendre</i> sur Le fil. Ajoute des chaînes dans Réglages › Sources."],
			phone: ["Les vidéos et épisodes des chaînes que tu suis, une semaine à la fois, sans les Shorts. Une vidéo vue en entier quitte la liste ; commencée, elle t’attend dans <i>Reprendre</i> sur l’accueil. Ajoute des chaînes dans Réglages › Sources."]
		}
	},
	pane: {
		article: "Choisis un article",
		articleText: "Il s’ouvre ici, à côté de la liste.",
		video: "Choisis une vidéo",
		videoText: "Elle se lit ici, sans quitter Hodi.",
		keys: "↑ ↓ pour naviguer · Entrée pour ouvrir",
		result: "Choisis un résultat",
		resultText: "Il s’ouvre ici, à côté des résultats."
	},
	reader: {
		alsoCovered: "Aussi couvert par",
		next: "Article suivant",
		loadFailed: "Impossible de charger l’article",
		openOn: "Ouvrir sur {{site}}",
		by: "par {{author}}",
		sourceDown: "{{source}} ne répond pas pour le moment",
		notInHodi: "{{source}} ne se lit pas dans Hodi",
		readOn: "Lire sur {{source}}",
		attribution: "Article de <b>{{source}}</b>, remis en page par Hodi pour une lecture sans publicité. Le texte n’est pas réécrit, et les commentaires restent sur le site.",
		readOriginal: "Lire l’original",
		externalText: "Le résumé vient du flux. L’article complet s’ouvre sur le site.",
		embed: {
			seeOn: "Voir sur {{network}}",
			watchOn: "Regarder sur {{network}}",
			quote: "Citation"
		}
	},
	speech: {
		pause: "Mettre la lecture en pause",
		resume: "Reprendre la lecture",
		preparing: "Préparation de la voix… (toucher pour annuler)",
		listenArticle: "Écouter l’article",
		stopLabel: "Arrêter la lecture",
		player: "Lecture à voix haute",
		preparingShort: "Préparation…",
		pauseShort: "Pause",
		resumeShort: "Reprendre",
		stop: "Arrêter"
	},
	summary: {
		summarizeArticle: "Résumer l’article",
		offer: "L’essentiel de l’article.",
		summarize: "Résumer",
		title: "L’essentiel",
		writing: "Résumé en cours…",
		note: "Écrit par l’IA · peut contenir des erreurs",
		errors: {
			refused: "L’IA n’a pas pu résumer cet article.",
			unreadable: "Cet article ne peut pas être résumé.",
			unknown: "Cet article n’est plus dans les flux.",
			unavailable: "Les résumés IA ne sont pas activés sur le serveur.",
			failed: "Le résumé n’a pas pu être généré.",
			limited: "Trop de demandes à l’IA en une minute. Réessaie dans un instant."
		}
	},
	questions: {
		ask: "Poser une question",
		sources: "Sources",
		answering: "Réponse en cours…",
		placeholder: "Une question sur cet article ?",
		yours: "Question",
		send: "Envoyer la question",
		errors: {
			refused: "L’IA n’a pas pu répondre à cette question.",
			unreadable: "Cet article ne peut pas être analysé.",
			unknown: "Cet article n’est plus dans les flux.",
			unavailable: "Les questions IA ne sont pas activées sur le serveur.",
			noAnswer: "Pas de réponse pour le moment. Réessaie.",
			limited: "Trop de demandes à l’IA en une minute. Réessaie dans un instant."
		}
	},
	shareMenu: {
		share: "Partager",
		copyPrompt: "Copie le lien :",
		copied: "Copié",
		copy: "Copier le lien",
		email: "E-mail",
		heading: {
			article: "Partager l’article",
			video: "Partager la vidéo",
			podcast: "Partager l’épisode"
		}
	},
	shareTo: {
		sent: "Envoyé à {{names}}",
		failed: "L’article n’a pas pu être envoyé.",
		label: "Envoyer à quelqu’un",
		title: "Envoyer à…",
		nobody: "Personne d’autre ne reçoit de partages pour l’instant.",
		noteLabel: "Un mot avec l’article",
		notePlaceholder: "Ajouter un mot…",
		send: "Envoyer",
		handle: "Son identifiant",
		handlePlaceholder: "identifiant",
		add: "Ajouter",
		unknown: "Ce compte n’existe pas.",
		findFailed: "La recherche n’a pas abouti. Réessaie."
	},
	share: {
		sentBy: "Envoyé par {{name}}",
		sentYouArticle: "<b>{{name}}</b> t’a envoyé cet article",
		sentYouVideo: "<b>{{name}}</b> t’a envoyé cette vidéo",
		opinionFor: "Avis pour {{name}}",
		opinion: "Un avis pour <b>{{name}}</b> ?",
		reactFor: "Réagir pour {{name}}"
	},
	videos: {
		loadFailed: "Impossible de charger les vidéos",
		empty: "Rien cette semaine",
		emptyText: "Les semaines précédentes sont en dessous.",
		previousWeek: "Semaine précédente",
		loadPreviousWeek: "Charger la semaine précédente",
		gone: "Cette vidéo n’est plus là",
		goneText_one: "Elle a plus de {{count}} jour, ou sa chaîne ne fait plus partie des sources du profil.",
		goneText_other: "Elle a plus de {{count}} jours, ou sa chaîne ne fait plus partie des sources du profil.",
		openYouTube: "Ouvrir sur YouTube",
		openSite: "Ouvrir le site",
		backToList: "Retour à la liste",
		play: "Lire",
		resume: "Reprendre",
		replay: "Revoir"
	},
	dailySummary: {
		bubble: "Résumé",
		errors: {
			failed: "Le Résumé du jour n’a pas pu être écrit.",
			refused: "L’IA a refusé d’écrire le Résumé du jour.",
			limited: "Trop de demandes à l’IA en une minute. Réessaie dans un instant."
		},
		yesterdayAt: "HIER {{time}}",
		writingShort: "Écriture…",
		regenerate: "Régénérer",
		writeNew: "Écrire un nouveau résumé (1 appel)",
		upToDate: "Déjà à jour : un nouveau résumé est possible dès {{time}}",
		listen: "Écouter tout le résumé",
		writing: "L’IA écrit le Résumé du jour…",
		none: "Pas de Résumé du jour",
		unavailable: "Les fonctions IA ne sont pas activées sur le serveur.",
		pitch: "L’essentiel de la journée, en 3 minutes",
		nothingLost: "Rien n’a été perdu : réessaie dans un instant.",
		pitchText: "Un paragraphe par sujet, thème par thème, écrit par l’IA d’après la une. 1 clic = 1 appel.",
		generate: "Générer le Résumé du jour",
		meta: "PAR L’IA · {{time}} · {{minutes}} MIN",
		articles: "Les articles",
		name: "Résumé du jour",
		of: "Résumé du jour : {{topic}}",
		bubbleWriting: "Résumé du jour, en cours d’écriture",
		bubbleSeen: "Résumé du jour, déjà lu"
	},
	stories: {
		headlines: "À la une",
		previous: "Précédente",
		next: "Suivante",
		of: "À la une : {{topic}}",
		bubbleSeen: "À la une : {{topic}}, déjà vu",
		published: "PUBLIÉ {{age}}",
		read: "Lire",
		site: "SITE"
	},
	followed: {
		filter: "Filtrer par sujet",
		none: "Aucun sujet suivi",
		add: "Ajouter un sujet",
		noneText: "Suis un sujet pour voir ses articles ici.",
		loadFailed: "Impossible de charger les sujets suivis",
		nothingNew: "Rien sur ce sujet ces trois derniers jours."
	},
	shares: {
		filter: "Filtrer par profil",
		loadFailed: "Impossible de charger les partages",
		empty: "Rien pour l’instant",
		emptyText: "Ce qu’on t’envoie arrive ici.",
		reactions: "Réactions aux partages",
		reacted: "<b>{{name}}</b> a réagi {{reaction}}",
		dismiss: "Effacer"
	},
	search: {
		title: "Recherche",
		close: "Fermer la recherche",
		placeholder: "Sujet, source, mot…",
		clear: "Effacer",
		recent: "Récentes",
		forget: "Oublier « {{query}} »",
		trends: "Tendances",
		filter: "Filtrer les résultats",
		failed: "La recherche ne répond pas. Réessaie dans un instant.",
		searching: "Recherche en cours…",
		more: "d’autres arrivent",
		following: "Sujet suivi",
		follow: "Suivre ce sujet",
		nothing: "Rien pour « {{query}} » dans les trois derniers jours.",
		nothingText: "Essaie un autre mot, ou suis ce sujet pour être prévenu."
	},
	stats: {
		yours: "Mes statistiques",
		articles: "Articles",
		favourites: "Favoris",
		topTopics: "Thèmes les plus lus",
		topSources: "Sources préférées",
		nothing: "Rien {{period}}.",
		period: {
			week: "cette semaine",
			month: "en 30 jours",
			label: "Période"
		},
		split: {
			started: "En cours",
			article: {
				title: "Lus ou survolés",
				intro_one: "{{count}} article ouvert {{period}}, {{percent}} % lus",
				intro_other: "{{count}} articles ouverts {{period}}, {{percent}} % lus",
				read: "Lus",
				skimmed: "Survolés"
			},
			video: {
				title: "Vues ou survolées",
				intro_one: "{{count}} vidéo ouverte {{period}}, {{percent}} % vues",
				intro_other: "{{count}} vidéos ouvertes {{period}}, {{percent}} % vues",
				read: "Vues",
				skimmed: "Survolées"
			}
		},
		chart: {
			article: "Articles lus par jour",
			video: "Vidéos vues par jour",
			same: "autant que la période d’avant",
			versus: "par rapport à la période d’avant",
			average: "Moy. {{value}}"
		},
		tiles: {
			readingTime: "de lecture",
			watchTime: "de visionnage",
			streak_one: "jour d’affilée",
			streak_other: "jours d’affilée",
			article: {
				read_one: "lu",
				read_other: "lus",
				skimmed_one: "survolé",
				skimmed_other: "survolés"
			},
			video: {
				read_one: "vue",
				read_other: "vues",
				skimmed_one: "survolée",
				skimmed_other: "survolées"
			}
		},
		loading: "Chargement des statistiques",
		intro: "Ce que tu as lu, sur tous les appareils. Un article est lu quand tu l’as parcouru jusqu’à 80 % et que tu y as passé au moins un tiers de son temps de lecture ; une vidéo, vue à 80 %. Au-delà de 15 %, il reste en cours et t’attend dans <i>Reprendre</i> ; en dessous, il est survolé."
	},
	game: {
		tiers: {
			1: "Bronze",
			2: "Argent",
			3: "Or",
			bronze: "Bronze",
			silver: "Argent",
			gold: "Or"
		},
		yourProfile: "Mon profil",
		profile: "Profil",
		loadFailed: "Le profil n’a pas pu être chargé. Réessaie dans un instant.",
		wearFailed: "Le badge n’a pas pu être changé. Réessaie dans un instant.",
		level: "Niv. {{level}}",
		pts: "pts",
		badgeWorn: "{{name}}, {{tier}}, porté",
		badgeWear: "{{name}}, {{tier}}, le porter",
		badgeLocked: "{{name}}, à gagner",
		thisWeek: "Cette semaine",
		rankLabel_one: "{{rank}}. {{name}}, {{grade}}, {{count}} point",
		rankLabel_other: "{{rank}}. {{name}}, {{grade}}, {{count}} points",
		back: "Retour",
		stars_other: "{{count}} étoiles sur 3",
		badgesHint: "Des défis à part du niveau, en trois paliers",
		wear: "Porter ce badge",
		unwear: "Ne plus le porter",
		worn: "Porté",
		open: "Voir {{name}}",
		stars_one: "{{count}} étoile sur 3",
		badges: {
			"early-bird": {
				rule: "Lu avant 7 h",
				text: "Les articles que tu lis avant 7 h du matin.",
				unit_one: "lecture",
				unit_other: "lectures"
			},
			"night-owl": {
				rule: "Lu après 23 h",
				text: "Les articles que tu lis après 23 h.",
				unit_one: "lecture",
				unit_other: "lectures"
			},
			faithful: {
				rule: "Jours de lecture",
				text: "Les jours où tu as lu, depuis le tout premier.",
				unit_one: "jour",
				unit_other: "jours"
			},
			globetrotter: {
				rule: "Lu dans Monde",
				text: "Les articles que tu lis dans le thème Monde.",
				unit_one: "lecture",
				unit_other: "lectures"
			},
			"all-rounder": {
				rule: "Dans chaque thème",
				text: "Les articles lus dans chacun des thèmes. C’est le thème que tu lis le moins qui compte.",
				unit_one: "par thème",
				unit_other: "par thème"
			},
			postman: {
				rule: "Partagés avec un mot",
				text: "Les articles que tu envoies à quelqu’un avec un mot.",
				unit_one: "partage",
				unit_other: "partages"
			},
			"crowd-pleaser": {
				rule: "Réactions reçues",
				text: "Les réactions reçues sur les articles que tu as partagés.",
				unit_one: "réaction",
				unit_other: "réactions"
			},
			sleuth: {
				rule: "Alertes ouvertes",
				text: "Les notifications des sujets suivis que tu ouvres.",
				unit_one: "alerte",
				unit_other: "alertes"
			},
			encyclopedia: {
				rule: "Articles lus",
				text: "Tous les articles que tu lis, quel que soit le thème.",
				unit_one: "lecture",
				unit_other: "lectures"
			},
			"team-player": {
				rule: "Défis en famille",
				text: "Les défis de la semaine que la famille réussit ensemble.",
				unit_one: "défi",
				unit_other: "défis"
			}
		},
		newGrade: "Nouveau grade",
		newBadge: "Nouveau badge",
		levelN: "Niveau {{level}}",
		gradeText: "Tu passes au grade <b>{{name}}</b>. Le prochain, <b>{{next}}</b>, est dans {{points}} pts.",
		gradeTop: "Tu atteins <b>{{name}}</b>, le plus haut grade.",
		next: "Suivant",
		great: "Super !",
		wearIt: "Le porter"
	},
	sync: {
		offline: "Hors ligne : les changements partiront au retour du réseau.",
		refused: "Un changement n’a pas pu être enregistré sur le serveur."
	},
	toast: { saved: "Réglage enregistré" },
	settings: /* @__PURE__ */ JSON.parse("{\"logout\":\"Se déconnecter\",\"groups\":{\"reading\":\"Lecture\",\"subjects\":\"Sujets\",\"you\":\"Toi\",\"household\":\"Famille\",\"device\":\"Cet appareil\",\"about\":\"Hodi\"},\"nav\":{\"reading\":\"Lecture et affichage\",\"themes\":\"Thèmes\",\"sources\":\"Sources\",\"followed\":\"Sujets suivis\",\"muted\":\"Sujets masqués\",\"stats\":\"Statistiques\",\"sharing\":\"Partage\",\"profiles\":\"Ados et enfants\",\"ai\":\"IA et crédits\",\"notifications\":\"Notifications\",\"account\":\"Mon compte\",\"shortcuts\":\"Raccourcis clavier\",\"server\":\"Serveur\",\"about\":\"À propos\",\"general\":\"Général\"},\"hints\":{\"history\":\"Lus et vus, 7 jours\",\"reading\":\"Apparence, taille du texte\",\"themes\":\"Ordre et visibilité\",\"sources\":\"État des flux\",\"failing\":\"{{count}} en erreur\",\"none\":\"Aucun\",\"stats\":\"Lectures et vidéos\",\"on\":\"Activé\",\"off\":\"Désactivé\",\"callsUsed_one\":\"{{count}} appel sur 24 heures\",\"callsUsed_other\":\"{{count}} appels sur 24 heures\",\"aiOff\":\"Non activée\",\"ai\":\"Appels du jour\",\"onPlural\":\"Activées\",\"offPlural\":\"Désactivées\",\"account\":\"Profil, connexion, région, données\",\"shortcuts\":\"Touche ?\",\"server\":\"Plugins, pour tout le serveur\",\"about\":\"Version, code source, crédits\",\"plugins\":\"Ajouter des fonctions\",\"general\":\"Visite guidée, remise à zéro\"},\"titles\":{\"reading\":\"Lecture\",\"themes\":\"Thèmes\",\"sources\":\"Sources\",\"followed\":\"Sujets suivis\",\"muted\":\"Sujets masqués\",\"notifications\":\"Notifications\",\"stats\":\"Statistiques\",\"ai\":\"IA et crédits\",\"profiles\":\"Ados et enfants\",\"sharing\":\"Partage\",\"account\":\"Mon compte\",\"shortcuts\":\"Raccourcis\",\"about\":\"À propos\",\"plugins\":\"Plugins\",\"plugin\":\"Plugin\",\"general\":\"Général\"},\"themes\":{\"intro\":\"Les rubriques du fil, dans l’ordre du menu. Glisse-les pour changer cet ordre. Un thème masqué quitte le fil et le menu, mais reste visible pour les autres profils. Un thème sans aucune source n’apparaît pas.\",\"move\":\"Déplacer {{name}} (flèches haut et bas)\",\"hidden\":\"masqué\",\"show\":\"Afficher {{name}}\"},\"reading\":{\"intro\":\"La langue de Hodi, ses couleurs et la taille du texte des articles. Ces réglages sont à toi seul et te suivent sur tous les appareils. Masquer ce que tu as lu garde le fil court : tout reste dans la recherche, les stats et l’<i>Historique</i>.\",\"appearance\":\"Apparence\",\"appearanceHint\":\"Poudré : le thème sombre, en rose\",\"themes\":{\"system\":\"Système\",\"light\":\"Clair\",\"dark\":\"Sombre\",\"powder\":\"Poudré\"},\"accent\":\"Couleur d’accent\",\"accentHint\":\"Logo, onglet actif, compteurs, progression\",\"accents\":{\"auto\":\"Rouille (celle du thème)\",\"autoPowder\":\"Rose poudré (celle du thème)\",\"rose\":\"Rose\",\"corail\":\"Corail\",\"ocre\":\"Ocre\",\"vert\":\"Vert\",\"turquoise\":\"Turquoise\",\"bleu\":\"Bleu\",\"lavande\":\"Lavande\"},\"textSize\":\"Taille du texte\",\"textSizeHint\":\"S’applique au texte des articles\",\"sizes\":[\"Très petit\",\"Normal\",\"Grand\",\"Très grand\",\"Énorme\"],\"hideRead\":\"Masquer les articles lus et les vidéos vues\",\"hideReadHint\":\"Ils restent dans les recherches, les stats et l’historique\",\"history\":\"Historique\"},\"followed\":{\"intro\":\"Un mot ou une expression. Les articles et les vidéos qui en parlent prennent une étoile et vont dans <i>Suivis</i>. Avec son alerte, un sujet t’envoie une notification quand un nouvel article en parle, au plus une toutes les 3 heures.\",\"placeholder\":\"Ajouter un sujet, ex. « Silksong »\",\"field\":\"Sujet à suivre\",\"add\":\"Suivre\",\"emptyTitle\":\"Aucun sujet suivi\",\"emptyHint\":\"Ajoute un mot au-dessus : ses articles iront dans Suivis.\",\"searching\":\"Recherche…\",\"nothingThisWeek\":\"Rien cette semaine\",\"thisWeek\":\"{{count}} cette semaine\",\"alert\":\"Alerte\",\"alertFor\":\"Alerte pour « {{word}} »\",\"unfollow\":\"Ne plus suivre « {{word}} »\",\"pausedTitle\":\"Alertes en pause\",\"paused\":\"Les alertes demandent d’activer les notifications sur cet appareil : <link>Notifications</link>.\"},\"muted\":{\"intro\":\"Les articles et les vidéos dont le titre ou le résumé contient un de ces mots disparaissent du fil, des stories et de <i>Vidéos</i>, mais restent dans la recherche. <i>foot</i> masque aussi <i>football</i>.\",\"placeholder\":\"Ajouter un mot, ex. « Kardashian »\",\"field\":\"Mot à masquer\",\"add\":\"Masquer\",\"emptyTitle\":\"Aucun sujet masqué\",\"emptyHint\":\"Ajoute un mot au-dessus : ses articles quitteront le fil.\",\"hiddenToday_zero\":\"Aucun article masqué aujourd’hui\",\"hiddenToday_one\":\"{{count}} article masqué aujourd’hui\",\"hiddenToday_other\":\"{{count}} articles masqués aujourd’hui\",\"unmute\":\"Ne plus masquer « {{word}} »\"},\"sharing\":{\"intro\":\"Envoie des articles aux autres comptes, et reçois les leurs. Dans le lecteur, <i>Pour…</i> envoie l’article à quelqu’un, avec un mot si tu veux. Ce qu’on t’envoie arrive dans <i>Partages</i>, jamais dans le fil.\",\"toggle\":\"Partager avec les autres\",\"onHint\":\"Tu envoies et tu reçois des articles\",\"offHint\":\"Ni envoi ni réception, Partages est caché\",\"receiveFrom\":\"Recevoir de\",\"mutedHint\":\"Tu ne reçois plus ses articles\",\"receivingHint\":\"Tu reçois ses articles\",\"receive\":\"Recevoir les partages de {{name}}\"},\"account\":{\"browser\":\"Navigateur\",\"sessionHint\":\"Connecté pour 90 jours, puis le mot de passe est redemandé\",\"thisDevice\":\"Cet appareil\",\"offline\":\"Hors ligne\",\"offlineReading\":\"Lecture hors ligne\",\"ready_one\":\"{{count}} prêt ici\",\"ready_other\":\"{{count}} prêts ici\",\"offlineHint\":\"Le texte des articles du fil pas encore lus, gardé quand l’app est ouverte\",\"deviceIntro\":\"Ce que cet appareil garde de Hodi, et pour combien de temps. La connexion dure 90 jours, puis le mot de passe est redemandé. Le texte des articles pas encore lus est gardé ici, pour les lire sans réseau.\",\"timeZone\":\"Fuseau horaire\",\"timeZoneValue\":\"{{zone}} · {{offset}}\",\"regionFailed\":\"Le fuseau horaire n’a pas pu être enregistré. Réessaie dans un instant.\",\"email\":\"E-mail\",\"password\":\"Mot de passe\",\"passwordChanged\":\"Changé le {{date}}\",\"change\":\"Changer\",\"devices\":\"Appareils\",\"used\":\"Utilisé {{when}}\",\"signOut\":\"Déconnecter\",\"signOutLabel\":\"Déconnecter {{device}}\",\"signedOut\":\"{{device}} déconnecté\",\"signOutFailed\":\"L’appareil n’a pas pu être déconnecté. Réessaie dans un instant.\",\"yourData\":\"Données\",\"copy\":\"Télécharger une copie\",\"copyHint\":\"Le compte, le profil, les sources, enregistrés, lus, partages et statistiques, dans un fichier JSON\",\"download\":\"Télécharger\",\"delete\":\"Supprimer mon compte\",\"deleteHint\":\"Effacé tout de suite, avec tout ce qu’il contient\",\"deleteHandOver\":\"Nomme d’abord un autre admin du serveur dans Serveur › Comptes\",\"deleteButton\":\"Supprimer\",\"deleteFailed\":\"Le compte n’a pas pu être supprimé. Réessaie dans un instant.\",\"emailTitle\":\"Changer d’e-mail\",\"emailIntro\":\"La nouvelle adresse remplace l’ancienne dès que tu l’enregistres.\",\"newEmail\":\"Nouvelle adresse\",\"yourPassword\":\"Mot de passe\",\"emailTaken\":\"Cette adresse a déjà un compte.\",\"emailFailed\":\"L’e-mail n’a pas pu être changé. Réessaie dans un instant.\",\"emailSaved\":\"E-mail changé\",\"passwordIntro\":\"Les autres appareils devront se reconnecter, celui-ci reste connecté.\",\"passwordSaved\":\"Mot de passe changé\",\"wrongPassword\":\"Ce mot de passe n’est pas le bon.\",\"loadFailed\":\"Le compte n’a pas pu être chargé.\",\"noPassword\":\"Aucun, tu te connectes sans\",\"choose\":\"Choisir\",\"choosePasswordTitle\":\"Choisir un mot de passe\",\"choosePasswordIntro\":\"Tu pourras te connecter avec l’e-mail du compte et ce mot de passe, en plus de l’autre façon.\",\"signInAgain\":\"Pour confirmer que c’est toi, reconnecte-toi juste avant (il y a moins de 5 minutes), puis reviens ici.\",\"noWayIn\":\"Pour confirmer que c’est toi, il faut t’être connecté il y a moins de 5 minutes, mais la façon de te connecter n’est plus là. Utilise <i>Mot de passe oublié</i> ou demande un code à l’admin du serveur.\",\"sessionHintNoPassword\":\"Connecté pour 90 jours, puis il faut se reconnecter\",\"moreDevices_one\":\"Voir l’autre\",\"moreDevices_other\":\"Voir les {{count}} autres\",\"private\":\"Profil privé\",\"privateHint\":\"Le mot de passe du compte, pour ouvrir ce profil\",\"trusted\":\"S’ouvre sans mot de passe\",\"askAgain\":\"Redemander\",\"trustedDevices\":\"Appareils de confiance\",\"privateFailed\":\"Le profil privé n’a pas pu être changé. Réessaie dans un instant.\"},\"edit\":\"Modifier\",\"editName\":\"Modifier {{name}}\",\"editProfileTitle\":\"Modifier le profil\",\"profileSaved\":\"Profil enregistré\",\"me\":{\"intro\":\"Revoir la visite guidée, ou remettre les réglages par défaut. Le prénom, la photo, la langue et les statistiques sont dans <i>Mon compte</i>.\",\"help\":\"Aide\",\"tour\":\"Visite guidée\",\"tourHint\":\"Ajouter une source pas à pas, comme au premier jour\",\"replay\":\"Revoir\",\"reset\":\"Remise à zéro\",\"resetSettingsHint\":\"Thèmes, sources, sujets, apparence : tout revient par défaut\",\"resetSettingsTitle\":\"Réinitialiser mes réglages ?\",\"resetSettingsMessage\":\"Thèmes, sources, sujets et apparence reviennent par défaut.\",\"resetAction\":\"Réinitialiser\",\"resetSettingsDone\":\"Réglages réinitialisés\",\"clearStats\":\"Statistiques de lecture\",\"clearStatsHint\":\"Avec les badges et les niveaux, sur tous les appareils\",\"clearStatsTitle\":\"Effacer les stats de lecture ?\",\"clearStatsMessage\":\"Les lectures sont effacées sur tous les appareils. Ça ne se récupère pas.\",\"clearAction\":\"Effacer\",\"clearStatsDone\":\"Statistiques effacées\",\"tourHintTeen\":\"Le fil et comment demander une source, pas à pas\"},\"profiles\":{\"intro\":\"Les ados et les enfants, chacun avec ses sources, ses horaires et son temps par jour. Chacun a son compte, géré par ses parents dans <i>Mon compte › Mes enfants</i>.\",\"deleteTitle\":\"Supprimer {{name}} ?\",\"deleteMessage\":\"Ses enregistrés, ses lectures et ses réglages sont supprimés aussi. Impossible d’annuler.\",\"active\":\"Actif\",\"groups\":{\"teens\":\"Ados\",\"children\":\"Enfants\"}},\"notifications\":{\"errors\":{\"denied\":\"Les notifications sont refusées pour Hodi. Autorise-les dans les réglages de l’appareil, puis réessaie.\",\"unavailable\":\"Les notifications ne sont pas encore activées sur le serveur.\",\"brave\":\"Brave bloque les notifications par défaut. Dans brave://settings/privacy, active « Utiliser les services Google pour la messagerie push », relance Brave puis réessaie.\",\"failed\":\"L’activation n’a pas marché. Réessaie dans un instant.\"},\"disabled\":\"Notifications désactivées\",\"enabled\":\"Notifications activées\",\"unsupportedTitle\":\"Pas disponibles dans ce navigateur\",\"unsupported\":\"Sur iPhone, ajoute Hodi à l’écran d’accueil (iOS 16.4 ou plus) et ouvre-le de là.\",\"onHere\":\"Activées sur cet appareil\",\"offHere\":\"Désactivées sur cet appareil\",\"perDevice\":\"Chaque appareil s’active séparément.\",\"toggle\":\"Notifications sur cet appareil\",\"intro\":\"Hodi peut te prévenir d’un nouvel article sur un sujet suivi avec alerte, d’un article qu’on t’envoie, ou d’une réaction aux partages. Chaque appareil s’active à part, rien n’est envoyé sans accord, et rien n’arrive pendant les heures de silence.\",\"test\":\"Notification de test\",\"testHint\":\"Pour vérifier qu’elles arrivent bien.\",\"testAction\":\"Tester\",\"triggers\":\"Ce qui déclenche une notification\",\"noSubject\":\"Tu ne suis encore aucun sujet.\",\"subjects\":\"Un nouvel article sur un sujet avec alerte : {{alerts}} sur {{total}}. Une par sujet toutes les 3 heures, 12 par jour au plus.\",\"shares\":\"Articles partagés\",\"sharesHint\":\"Quand quelqu’un t’envoie un article ou une vidéo avec <i>Pour…</i>.\",\"reactions\":\"Réactions aux partages\",\"reactionsHint\":\"Quand quelqu’un réagit d’un emoji à un article que tu lui as envoyé.\",\"badge\":\"Pastille sur l’icône\",\"badgeHint\":\"Le nombre de nouveaux articles. Revient à zéro à l’ouverture de Suivis.\",\"silence\":\"Silence\",\"dnd\":\"Ne pas déranger\",\"dndHint\":\"Aucune notification pendant ces heures.\",\"hours\":\"Plage horaire\",\"start\":\"Début du silence\",\"end\":\"Fin du silence\",\"testBody\":\"Les notifications arrivent bien sur cet appareil.\",\"plugins\":\"Plugins\",\"pluginsHint\":\"Ce que les plugins t’envoient, comme la réponse à une demande.\"},\"data\":{\"kb\":\"{{value}} Ko\",\"mb\":\"{{value}} Mo\",\"clearedFreed\":\"Textes vidés ({{size}} libérés)\",\"cleared\":\"Textes vidés\",\"clearFailed\":\"Impossible de vider les textes. Réessaie dans un instant.\",\"server\":\"Serveur\",\"database\":\"Base de données\",\"articles_one\":\"{{total}} article, dont {{texts}} avec son texte\",\"articles_other\":\"{{total}} articles, dont {{texts}} avec leur texte\",\"databaseHint\":\"Articles, réglages, lectures et résumés IA\",\"texts\":\"Texte des articles\",\"textsHint\":\"Gardé pour les relire hors des flux ; au-delà, le titre et le lien restent\",\"days_one\":\"{{count}} jour\",\"days_other\":\"{{count}} jours\",\"kept\":\"Textes gardés\",\"keptHint\":\"Sauf ceux des Enregistrés ; un article rouvert est relu sur son site\",\"clearTitle\":\"Vider les textes ?\",\"clearMessage\":\"Les textes d’articles gardés sur le serveur sont effacés. Les Enregistrés gardent les leurs.\",\"clear\":\"Vider\",\"clearing\":\"Vidage…\",\"backups\":\"Sauvegardes\",\"backupsHint\":\"Une copie de la base chaque nuit, les 7 dernières gardées\",\"backupsCount_one\":\"{{count}} copie\",\"backupsCount_other\":\"{{count}} copies\",\"sevenKept\":\"7 gardées\"},\"household\":{\"wrongPassword\":\"Le mot de passe actuel n’est pas le bon.\",\"passwordFailed\":\"Le mot de passe n’a pas pu être changé. Réessaie dans un instant.\",\"passwordTitle\":\"Changer le mot de passe\",\"currentPassword\":\"Mot de passe actuel\",\"newPassword\":\"Nouveau mot de passe\",\"game\":\"Jeu\",\"gameToggle\":\"Niveaux et badges\",\"gameHint\":\"Des points pour chaque lecture, des niveaux et des badges\"},\"proposals\":{\"inLanguage\":{\"fr\":\"En français\",\"en\":\"En anglais\"}},\"addSource\":{\"replace\":\"Remplacer {{name}}\",\"replaceTitle\":\"Remplacer la source\",\"title\":\"Ajouter une source\",\"how\":\"Comment ajouter\",\"byLink\":\"Par un lien\",\"forTopic\":\"Pour un thème\",\"pickTopic\":\"Choisis un thème\",\"changeTopic\":\"Changer de thème\"},\"about\":{\"intro\":\"Hodi est un logiciel libre, sous licence AGPL-3.0 : son code est ouvert à tous, et chacun peut l’installer chez lui. Ici, la version de cette installation et les crédits de ceux qui l’ont rendu possible.\",\"app\":\"Hodi\",\"version\":\"Version\",\"versionHint\":\"Le numéro de cette installation\",\"licence\":\"Licence\",\"licenceHint\":\"Logiciel libre, sous licence AGPL-3.0\",\"source\":\"Code source\",\"support\":\"Soutenir Hodi\",\"supportHint\":\"Gratuit et sans pub, grâce à ceux qui donnent\",\"supportButton\":\"Patreon\",\"credits\":\"Crédits\",\"people\":{\"antho\":{\"name\":\"Antho\",\"role\":\"Idée, design et direction du projet\"},\"claude\":{\"name\":\"Claude, d’Anthropic\",\"role\":\"L’IA qui a écrit le code avec Antho\"},\"gptImage\":{\"name\":\"GPT Image, d’OpenAI\",\"role\":\"Les avatars des profils Enfant\"},\"lucide\":{\"name\":\"Lucide\",\"role\":\"Les icônes, sous licence ISC\"},\"fonts\":{\"name\":\"Bebas Neue, Archivo et Geist\",\"role\":\"Les polices, sous licence SIL OFL\"}}}}"),
	addSource: {
		videos: "Ses vidéos arrivent dans Vidéos.",
		readable_one: "{{count}} article sur {{tried}} s’ouvre dans Hodi.",
		readable_other: "{{count}} articles sur {{tried}} s’ouvrent dans Hodi.",
		notReadable: "Ses articles ne s’ouvrent pas dans Hodi : leur résumé s’affiche, avec un lien vers le site.",
		seeSite: "Voir le site de {{name}}",
		added: "Ajoutée",
		removeTopic: "Retirer {{name}}",
		anotherTopic: "Un autre thème ?",
		typeTopic: "Tape un thème, ex. « Sport »",
		errors: {
			invalid: "Ce n’est pas un lien. Colle l’adresse d’un site, d’un flux, ou d’une chaîne YouTube.",
			blocked: "Cette adresse n’est pas publique : Hodi ne va pas la chercher.",
			none: "Aucun flux trouvé à cette adresse. Essaie la page d’accueil du site ou l’adresse de son flux RSS.",
			empty: "Ce flux est vide pour le moment.",
			failed: "Le site ne répond pas. Réessaie dans un instant.",
			reddit: "Hodi ne suit plus Reddit, qui ferme ses flux.",
			limit: "Le serveur suit déjà autant de sources que son admin le permet.",
			followed: "Cette source est déjà suivie.",
			bad_section: "Choisis un autre thème pour cette source.",
			unavailable: "Source indisponible sur ce serveur."
		},
		origins: {
			feed: "Flux",
			youtube: "YouTube"
		},
		placeholder: "Lien d’un site, d’un flux RSS, d’une chaîne YouTube…",
		field: "Lien de la source à ajouter",
		searching: "Recherche…",
		search: "Chercher",
		trying: "Hodi cherche le flux et essaie trois articles. Ça prend quelques secondes.",
		followedAs: "Déjà suivie sous le nom « {{name}} ».",
		whichTopics: "Dans quels thèmes ?",
		whichSection: "Dans quelle section de Vidéos ?",
		topics: "Thèmes de la source",
		count: "{{added}} / {{limit}} sources sur le serveur",
		adding: "Ajout…",
		countAll_one: "{{count}} source sur le serveur",
		countAll_other: "{{count}} sources sur le serveur"
	},
	suggest: {
		add: {
			limit: "Le serveur suit déjà autant de sources que son admin le permet.",
			followed: "Déjà suivie.",
			failed: "La source n’a pas pu être ajoutée. Réessaie dans un instant."
		},
		offer: "Des sources pour {{topic}}, trouvées par l’IA.",
		pickTopic: "Choisis un thème, l’IA te propose des sources.",
		button: "Suggérer",
		loading: "L’IA propose des sites, puis Hodi cherche leur flux et essaie leurs articles.",
		errors: {
			unavailable: "L’IA n’est pas activée sur ce serveur.",
			not_found: "Ce thème n’existe plus.",
			refused: "L’IA n’a pas pu proposer de sources pour ce thème.",
			failed: "Les suggestions n’ont pas pu être faites. Réessaie dans un instant.",
			limited: "Trop de demandes à l’IA en une minute. Réessaie dans un instant."
		},
		noFeed: "Aucun site proposé n’a de flux lisible. Réessaie plus tard.",
		last: "Dernier article : {{title}}"
	},
	sources: {
		deleted: "{{name}} supprimée",
		deleteFailed: "La source n’a pas pu être supprimée. Réessaie dans un instant.",
		hideLowTitle_one: "Masquer la source peu ouverte ?",
		hideLowTitle_other: "Masquer les {{count}} sources peu ouvertes ?",
		hideOneTitle: "Masquer {{name}} ?",
		hideLowMessage: "Leurs articles quittent le fil et les thèmes de ce profil. Tu peux les réafficher ici une par une.",
		hideAll: "Tout retirer",
		hidden_one: "Source retirée de Mes sources",
		hidden_other: "{{count}} sources retirées de Mes sources",
		replaced: "Source ajoutée, {{name}} retirée de Mes sources",
		added: "Source ajoutée",
		topicsSaved: "Thèmes enregistrés",
		topicsFailed: "Les thèmes n’ont pas pu être enregistrés. Réessaie dans un instant.",
		groups: {
			mine: "Mes sources",
			base: "Sources de base"
		},
		status: { error: "Erreur" },
		errorTitle: "Erreur : {{error}}",
		readers_one: "{{formatted}} lecteurs",
		readers_other: "{{formatted}} lecteurs",
		changeTopicsOf: "Changer les thèmes de {{name}}",
		changeTopics: "Changer les thèmes",
		intro: "Les sites et les chaînes qui remplissent le fil, vérifiés toutes les 15 minutes. Une source ajoutée ici ne va que dans les sources de ce compte. Les sources de base se retirent mais ne se suppriment pas.",
		search: "Chercher une source ou un thème",
		searchLabel: "Chercher une source",
		filter: "Filtrer les sources",
		filters: {
			all: "Toutes",
			low: "Peu ouvertes",
			error: "En erreur"
		},
		filterTopic: "Filtrer par thème",
		allTopics: "Tous les thèmes",
		loadFailed: "Impossible de charger les sources. Réessaie dans un instant.",
		noMatch: "Aucune source ne correspond.",
		topicsOf: "Thèmes de {{name}}",
		replace: "Remplacer par une autre",
		delete: "Supprimer la source",
		filterValue: "Filtrer les sources : {{value}}",
		replaceOf: "Remplacer {{name}} par une autre",
		deleteOf: "Supprimer {{name}}"
	},
	ai: {
		kinds: {
			summary: "Résumés d’articles",
			question: "Questions sur un article",
			dailySummary: "Résumé du jour",
			sources: "Suggestions de sources",
			plugin: "Plugins"
		},
		replaceKey: "Remplacer la clé",
		turnOn: "Activer l’IA",
		keyFailed: "La clé n’a pas pu être enregistrée. Réessaie dans un instant.",
		countryFailed: "Le pays n’a pas pu être enregistré. Réessaie dans un instant.",
		on: "IA activée",
		removed: "IA retirée",
		remove: "Retirer",
		removeFailed: "La clé n’a pas pu être retirée. Réessaie dans un instant.",
		provider: "Fournisseur",
		model: "Modèle {{model}}",
		key: "Clé d’API",
		replace: "Remplacer",
		off: "IA non activée",
		offAdmin: "Ajoute une clé d’API pour les résumés, les questions et le Résumé du jour.",
		addKey: "Ajouter une clé",
		yours: "Appels · 24 heures",
		plugins: {
			title: "Plugins",
			calls_one: "{{count}} appel sur 24 heures",
			calls_other: "{{count}} appels sur 24 heures",
			toggle: "IA pour {{name}}",
			failed: "Le changement n’a pas été enregistré. Réessaie dans un instant."
		},
		calls_one: "appel",
		calls_other: "appels"
	},
	push: {
		someone: "Quelqu’un",
		shared: {
			article: "{{name}} t’envoie un article",
			video: "{{name}} t’envoie une vidéo",
			podcast: "{{name}} t’envoie un épisode"
		},
		note: "« {{note}} » · {{title}}",
		reacted: "{{name}} a réagi {{reaction}}"
	},
	passwordChange: { confirm: "Confirme le nouveau mot de passe" },
	hourCycle: {
		label: "Format des heures",
		hint: "Réglages, notifications, horaires",
		option24: "24 h",
		option12: "12 h",
		example24: "21:00",
		example12: "9:00 PM"
	},
	confirm: {
		history: {
			title: "Effacer mon historique ?",
			message: "Les articles que tu as <b>lus</b> ou <b>masqués</b> réapparaissent dans le fil, sur <b>tous les appareils</b>. Les statistiques de lecture et les points ne changent pas.",
			button: "Effacer l’historique"
		},
		deleteProfile: {
			title: "Supprimer ce profil ?",
			message: "Le profil de <b>{{name}}</b> est supprimé avec ses enregistrés, ses lectures, ses points et ses réglages. <b>Il n’y a pas de retour en arrière.</b>",
			button: "Supprimer le profil"
		},
		deleteSource: {
			title: "Supprimer la source ?",
			message: "La source <b>{{name}}</b> est supprimée <b>pour tout le serveur</b> : ses articles quittent le fil de chaque profil. Elle ne reviendra que si quelqu’un l’ajoute à nouveau.",
			button: "Supprimer la source"
		},
		hideSource: {
			title: "Retirer la source ?",
			message: "Les articles de <b>{{name}}</b> quittent le fil et les thèmes. Tu pourras la reprendre dans le <i>Catalogue</i>.",
			button: "Retirer la source"
		},
		hideSources: {
			title: "Retirer {{count}} sources ?",
			message: "Les articles de ces {{count}} sources quittent le fil et les thèmes. Tu pourras les reprendre dans le <i>Catalogue</i>.",
			button: "Retirer les {{count}} sources"
		},
		clearTexts: {
			title: "Libérer de l’espace ?",
			message: "Hodi garde sur son serveur une copie des articles déjà ouverts, pour les afficher plus vite. Ces copies sont effacées <b>pour tout le serveur</b>, sauf celles des articles <b>enregistrés</b>. Un article rouvert se rechargera depuis son site.",
			button: "Libérer de l’espace"
		},
		resetSettings: {
			title: "Réinitialiser mes réglages ?",
			message: "Les thèmes, les sources, les sujets et l’apparence reviennent aux réglages de départ, <b>pour ce profil seulement</b>. Les enregistrés, les lectures et les points ne changent pas.",
			button: "Réinitialiser les réglages"
		},
		clearStats: {
			title: "Effacer mes statistiques ?",
			message: "Les statistiques de lecture sont effacées sur <b>tous les appareils</b> et ne se récupèrent pas. Les points et les badges du jeu, eux, restent.",
			button: "Effacer les statistiques"
		},
		removeKey: {
			title: "Retirer la clé de l’IA ?",
			message: "Les boutons violets disparaissent <b>pour ce compte</b>, jusqu’à ce qu’une nouvelle clé soit ajoutée. Les résumés et les réponses déjà écrits restent.",
			button: "Retirer la clé"
		},
		deleteAccount: {
			title: "Supprimer le compte\xA0?",
			message: "<b>{{email}}</b> et tout ce qu’il contient sont effacés tout de suite\xA0: le profil, les enregistrés, les lectures, les partages et les statistiques. Les copies de sauvegarde l’oublient au plus tard dans {{days}}.",
			messageServer: "<b>{{email}}</b> et tout ce qu’il contient sont effacés tout de suite\xA0: le profil, les enregistrés, les lectures, les partages et les statistiques. <b>Aucun autre adulte n’a de compte sur ce serveur\xA0: tout le serveur est effacé, avec tous les profils, et repart de zéro.</b> Les copies de sauvegarde l’oublient au plus tard dans {{days}}.",
			messageServerWith: "<b>{{email}}</b> et tout ce qu’il contient sont effacés tout de suite\xA0: le profil, les enregistrés, les lectures, les partages et les statistiques. <b>Aucun autre adulte n’a de compte sur ce serveur\xA0: tout le serveur est effacé, avec les profils de {{profiles}}, et repart de zéro.</b> Les copies de sauvegarde l’oublient au plus tard dans {{days}}.",
			button: "Supprimer",
			messageChildren: "<b>{{email}}</b> et tout ce qu’il contient sont effacés tout de suite : le profil, les enregistrés, les lectures, les partages et les statistiques. <b>Tu es le seul parent de {{children}} : leurs comptes partent aussi.</b> Les copies de sauvegarde l’oublient au plus tard dans {{days}}."
		},
		signOutDevice: {
			title: "Déconnecter {{device}}\xA0?",
			message: "Cet appareil devra se reconnecter avec l’e-mail et le mot de passe du compte.",
			button: "Déconnecter"
		},
		removeYoungDevice: {
			title: "Retirer {{device}}\xA0?",
			message: "Cet appareil n’ouvrira plus le profil de <b>{{name}}</b>. Pour le relier à nouveau, il faudra un nouveau code.",
			button: "Retirer"
		},
		removeMail: {
			title: "Ne plus envoyer d’e-mails ?",
			message: "Hodi oublie le serveur d’envoi et son mot de passe. Il n’envoie plus aucun e-mail tant qu’un autre n’est pas réglé.",
			button: "Retirer"
		},
		proof: {
			password: "Mon mot de passe",
			wrongPassword: "Ce mot de passe n’est pas le bon.",
			failed: "Ça n’a pas marché. Réessaie dans un instant.",
			code: "Code de l’app d’authentification",
			wrongCode: "Ce code ne marche pas\xA0: prends celui que l’app affiche maintenant."
		},
		makeServerAdmin: {
			title: "Nommer {{name}} admin du serveur ?",
			message: "<b>{{name}}</b> gérera tout <i>Serveur</i> comme toi : les comptes, les sauvegardes, les plugins et l’e-mail. Confirme avec ton mot de passe.",
			button: "Nommer"
		},
		resetPassword: {
			title: "Nouveau mot de passe\xA0?",
			message: "Le code qui suit permet de choisir un nouveau mot de passe pour le compte de <b>{{name}}</b>, et donc d’y entrer. Confirme avec le mot de passe pour le créer.",
			button: "Créer le code"
		},
		cancelInvitation: {
			title: "Annuler l’invitation ?",
			message: "Le code de <b>{{name}}</b> ne marchera plus. Tu pourras l’inviter à nouveau.",
			button: "Annuler l’invitation"
		},
		privateOn: {
			title: "Rendre ce profil privé ?",
			message: "Le mot de passe du compte sera demandé pour ouvrir ce profil depuis <i>Qui lit ?</i>, sur tous les appareils. Sur ceux qui sont à toi, coche <i>Ne plus demander sur cet appareil</i>.",
			button: "Rendre privé"
		},
		signOut: {
			title: "Se déconnecter de cet appareil ?",
			message_one: "Le profil part de <i>Qui lit ?</i> sur cet appareil, mais le compte et les lectures restent intacts. <b>{{others}}</b> reste ici. Pour revenir plus tard, touche <i>Ajouter</i> et entre l’e-mail et le mot de passe du compte.",
			message_other: "Le profil part de <i>Qui lit ?</i> sur cet appareil, mais le compte et les lectures restent intacts. <b>{{others}}</b> restent ici. Pour revenir plus tard, touche <i>Ajouter</i> et entre l’e-mail et le mot de passe du compte.",
			messageAlone: "Cet appareil revient à la connexion. Le compte et les lectures restent intacts.",
			messageLast_one: "Plus aucun adulte ne sera connecté sur cet appareil : <b>{{young}}</b> quitte aussi <i>Qui lit ?</i>, faute de compte. L’appareil revient à la connexion, et les lectures restent intactes. Un adulte pourra le reconnecter quand il veut.",
			messageLast_other: "Plus aucun adulte ne sera connecté sur cet appareil : <b>{{young}}</b> quittent aussi <i>Qui lit ?</i>, faute de compte. L’appareil revient à la connexion, et les lectures restent intactes. Un adulte pourra le reconnecter quand il veut.",
			button: "Se déconnecter"
		}
	},
	dialogIntro: {
		codeOpen: "Tape le <b>code parental</b> pour ouvrir ce profil.",
		ownOpen: "Tape <b>le mot de passe du compte</b> pour ouvrir ce profil.",
		shortcuts: "Sur ordinateur, sans quitter le clavier. Appuie sur <b>?</b> n’importe où pour les revoir.",
		timeZone: "Il fixe <b>le début de chaque jour</b> : nouveau fil, <i>Résumé du jour</i>, heures calmes et temps d’écran des jeunes.",
		country: "Il situe les <b>recherches web de l’IA</b> : <i>il fera beau demain ?</i> cherche près de chez toi.",
		share: "Le <b>lien d’origine</b>, vers le site qui l’a publié, à envoyer où tu veux.",
		addSource: "Colle le <b>lien d’un site</b>, ou choisis un thème pour que l’IA te propose des sites. La source arrive dans <i>Mes sources</i>.",
		addSourceLink: "Colle le <b>lien d’un site</b>, d’un flux RSS ou d’une chaîne YouTube. La source arrive dans <i>Mes sources</i>.",
		replaceSource: "Trouve une autre source pour remplacer <b>{{name}}</b>. Elle est masquée dès que la nouvelle est ajoutée.",
		aiTurnOn: "Colle une <b>clé d’API</b> du fournisseur. Elle est vérifiée sans dépenser de crédits, puis gardée sur ce serveur.",
		aiReplace: "La nouvelle clé remplace l’ancienne <b>pour ce compte</b>. Elle est vérifiée sans dépenser de crédits.",
		sourceTopics: "Choisis où ranger <b>{{name}}</b>. Ses articles apparaissent dans <b>chaque thème</b> coché.",
		daily: "Le temps de lecture permis chaque jour. Une fois écoulé, l’app se met en pause <b>jusqu’à demain</b>.",
		window: "Les heures où l’app s’ouvre. En dehors, elle reste fermée et dit <b>à quelle heure elle rouvre</b>.",
		quiet: "Pendant ces heures, <b>aucune notification</b> n’arrive sur ses appareils. L’app reste ouverte.",
		explain: "Chaque fois que <b>{{name}}</b> demande à l’IA d’expliquer un article ou un mot. Compté sur les <b>crédits de son compte</b>.",
		week: "Son temps à l’écran et ses lectures des 7 derniers jours, <b>jamais les titres</b>.",
		topics: "Choisis les thèmes visibles dans son fil. Un thème coupé disparaît <b>avec ses sources</b>, sans rien supprimer : tu peux le rallumer quand tu veux.",
		sources: "Le catalogue jeunesse, rangé par thème. Les sources de base sont allumées au départ : garde celles qui lui conviennent. <b>Seules les sources allumées</b> arrivent dans son fil.",
		shareTo: "Choisis une ou plusieurs personnes. L’article arrive dans leurs <i>Partages</i>, avec un mot si tu en écris un.",
		ask: "Colle le lien d’un site ou d’une chaîne YouTube. <b>Les parents</b> reçoivent la demande : s’ils l’acceptent, elle arrive dans le fil ou dans <i>Vidéos</i>.",
		request: "<b>{{name}}</b> aimerait ajouter cette source à son fil. Acceptée, elle n’apparaît <b>que pour {{name}}</b>, rangée dans le thème ci-dessous.",
		requestChannel: "<b>{{name}}</b> aimerait suivre cette chaîne. Acceptée, elle n’apparaît <b>que pour {{name}}</b>, dans ses <i>Vidéos</i>.",
		passwordOpen: "<b>{{name}}</b> a son propre compte. Tape son mot de passe pour ouvrir son profil sur cet appareil.",
		shareToHandle: "Choisis une ou plusieurs personnes, ou ajoute quelqu’un par son <b>@identifiant</b>. L’article arrive dans leurs <i>Partages</i>, avec un mot si tu en écris un."
	},
	plugins: {
		count_one: "{{count}} plugin",
		count_other: "{{count}} plugins",
		emptyTitle: "Aucun plugin",
		emptyText: "Installe-en un depuis la liste ci-dessous ou depuis un fichier.",
		manage: "Gérer",
		manageLabel: "Gérer {{name}}",
		back: "Plugins",
		brokenChip: "En erreur",
		brokenTitle: "{{name}} n’a pas pu démarrer",
		broken: "Hodi a reçu cette erreur : {{error}}",
		version: "Version",
		versionHint: "Celle du paquet installé",
		enabled: "Activé",
		enabledHint: "Ses pages et ses fonctions sont là pour tout le monde",
		disabledHint: "Il garde ses réglages et ses données",
		options: "Options",
		remove: "Supprimer le plugin",
		saveFailed: "Le réglage n’a pas été enregistré.",
		removeFailed: "Le plugin n’a pas été supprimé.",
		loadFailed: "La liste des plugins n’a pas pu être chargée.",
		confirmRemove: {
			title: "Supprimer ce plugin ?",
			message: "Hodi redémarre pour retirer <b>{{name}}</b>. <b>Ses réglages et ses données restent 30 jours</b>, au cas où tu le réinstalles.",
			button: "Supprimer"
		},
		confirmRemoveAll: {
			title: "Tout supprimer ?",
			message: "Hodi redémarre pour retirer <b>{{name}}</b>, avec <b>ses réglages et toutes ses données</b>. Ça ne peut pas être annulé.",
			button: "Tout supprimer"
		},
		add: {
			title: "Ajouter un plugin",
			intro: "Envoie un fichier .hodi-plugin. Hodi te montre ce qu’il contient avant de l’installer.",
			choose: "Choisis ou dépose un fichier",
			reading: "Lecture du fichier…",
			signed: "Vérifié",
			signedHint: "Signé par une clé que Hodi connaît",
			unsigned: "Code non vérifié",
			unsignedHint: "Personne n’a vérifié ce code : ses pages ne s’afficheront pas.",
			signedOnlyHint: "Il demande des accès réservés aux plugins vérifiés : comptes, connexions, e-mails ou notifications.",
			signedOnly: "Pas installable sans signature",
			forAll: "Pour tout le monde",
			forAdmin: "Pour l’admin seulement",
			replaces: "Remplace la version {{version}}",
			install: "Autoriser et installer",
			installAnyway: "Installer quand même",
			errors: {
				too_big: "Ce fichier est trop gros (50 Mo au plus).",
				not_a_package: "Ce fichier n’est pas un plugin Hodi.",
				invalid_manifest: "Ce plugin est mal décrit, il ne peut pas être installé.",
				not_found: "Le fichier a expiré, choisis-le à nouveau.",
				failed: "L’envoi a échoué. Réessaie.",
				signed_only: "Ce plugin n’est pas vérifié et demande des accès réservés aux plugins vérifiés."
			},
			forAllHint: "Tous les profils peuvent s’en servir",
			forAdminHint: "Les autres profils ne le voient pas",
			dropHere: "Dépose le fichier ici",
			dropHint: ".hodi-plugin · 50 Mo max",
			update: "Mise à jour",
			fromFile: "Installer depuis un fichier"
		},
		restart: {
			title: "Hodi redémarre",
			text: "Ça prend quelques secondes. La page se recharge toute seule.",
			installing: "Installation de {{name}}",
			removing: "Suppression de {{name}}",
			slowTitle: "Hodi ne répond pas encore",
			slowText: "Le redémarrage prend plus de temps que prévu."
		},
		brokenHint: "Pas chargé : ouvre-le pour voir pourquoi",
		outdatedChip: "Désactivé",
		outdatedTitle: "{{name}} est désactivé",
		outdated: "Il a été écrit pour une ancienne version de Hodi. Installe sa nouvelle version pour l’utiliser.",
		outdatedHint: "Trop ancien pour cette version de Hodi",
		outdatedToggleHint: "Impossible tant qu’il n’est pas à jour",
		installUpdate: "Mettre à jour",
		unsignedChip: "Non vérifié",
		unsignedTitle: "Personne n’a vérifié ce plugin",
		unsigned: "Il tourne, mais ses pages ne s’affichent pas dans Hodi.",
		devChip: "En développement",
		devTitle: "En développement",
		dev: "Installé par <code>npx hodi-plugin dev</code> : ses pages s’affichent tant que le mode développeur est actif.",
		devMode: {
			group: "Pour écrire un plugin",
			label: "Mode développeur",
			hint: "Lance <code>npx hodi-plugin dev</code> pour installer le plugin à chaque sauvegarde, pages comprises.",
			onHint: "Coupe-le quand tu as fini : personne ne vérifie ces plugins.",
			newCode: "Nouveau code",
			newCodeHint: "L’ancien code ne marche plus.",
			newCodeButton: "Nouveau code",
			confirm: {
				title: "Activer le mode développeur ?",
				message: "Avec son code, n’importe qui pourra installer du code <b>que personne n’a vérifié</b> sur ce serveur, et ses pages s’afficheront dans Hodi. Active-le seulement sur un serveur de test.",
				button: "Activer"
			},
			codeTitle: "Code de développeur",
			onceTitle: "Il ne s’affiche qu’une fois",
			once: "Garde-le pour toi. Lance cette commande dans le dossier du plugin :",
			copy: "Copier la commande",
			done: "C’est noté",
			failed: "Le mode développeur n’a pas pu changer. Réessaie.",
			restarting: "Hodi redémarre sans les plugins en développement…"
		},
		removeHint: "Ses réglages et ses données restent.",
		removeButton: "Supprimer",
		removeAll: "Supprimer le plugin et ses données",
		removeAllHint: "Rien ne reste, ni ses réglages ni ses données.",
		removeAllButton: "Tout supprimer",
		plugin: "Plugin",
		confirmUnsigned: {
			title: "Installer ce code ?",
			message: "Personne n’a vérifié le code de <b>{{name}}</b>. Il tourne à part et ne touche qu’à ses propres données et à ce qu’il annonce. <b>Ses pages ne s’afficheront pas</b> : seuls les plugins vérifiés en ajoutent à Hodi.",
			button: "Installer quand même"
		},
		pageMissingTitle: "Page introuvable",
		pageMissingText: "Ce plugin est éteint ou n’a pas de page.",
		pageFailedTitle: "Page en panne",
		pageFailedText: "Ce plugin n’a pas pu afficher sa page.",
		permissions: {
			title: "Ce que ce plugin pourra faire",
			data: "Garder ses propres données",
			dataHint: "Dans une base à lui, à part de celle de Hodi",
			network_one: "Joindre {{count}} site",
			network_other: "Joindre {{count}} sites",
			networkHint: "{{hosts}}",
			articles: "Lire les articles",
			articlesHint: "Ceux que les sources de Hodi ont listés",
			accounts: "Créer et vérifier des comptes",
			accountsHint: "Il ne lit jamais les mots de passe enregistrés",
			signIn: "Connecter des appareils",
			signInHint: "Avec un compte qu’il vient de créer ou de vérifier, et refuser une connexion",
			publicRoutes: "Ouvrir des pages sans connexion",
			publicRoutesHint: "Pour s’inscrire, rejoindre une liste d’attente ou montrer sa page avant la connexion",
			mail: "Envoyer des e-mails",
			mailHint: "Par Serveur › E-mail, 50 par heure au plus",
			notify: "Envoyer des notifications",
			notifyHint: "Aux personnes de tout le serveur, sur leurs appareils, 10 par jour au plus pour chacune",
			ai: "IA de chaque compte",
			aiHint: "Un clic sur son bouton violet pose une question à l’IA, payée sur les crédits du compte qui clique. Seulement s’il est Vérifié.",
			feeds_one: "Proposer {{count}} source",
			feeds_other: "Proposer {{count}} sources",
			feedsHint: "Dans <i>Ajouter une source</i> : {{names}}"
		},
		aiButton: {
			unavailable: "L’IA n’est pas activée pour ce compte.",
			off: "L’admin du serveur a coupé l’IA de ce plugin.",
			limited: "Trop de demandes à l’IA pour l’instant. Réessaie plus tard.",
			refused: "L’IA n’a pas voulu répondre à cette demande.",
			failed: "La demande n’a pas abouti. Réessaie dans un instant."
		},
		confirmInstall: {
			title: "Installer {{name}}\xA0?",
			message: "<b>{{name}}</b> est vérifié. Il pourra lire et changer ce que ses autorisations annoncent, pour <b>tous les comptes du serveur</b>. Confirme avec le mot de passe pour l’installer.",
			button: "Installer"
		},
		catalog: {
			title: "Disponibles",
			install: "Installer",
			installLabel: "Installer {{name}}",
			failed: "La liste des plugins de Hodi ne répond pas. Réessaie plus tard.",
			downloading: "Téléchargement…",
			updateTitle: "{{name}} {{version}} est disponible",
			update: "Tu as la version {{version}}. La nouvelle s’installe avec les mêmes questions qu’un fichier.",
			updateChip: "{{version}} disponible",
			errors: {
				download_failed: "Le plugin n’a pas pu être téléchargé. Réessaie.",
				checksum_mismatch: "Le fichier téléchargé n’est pas celui de la liste : Hodi ne l’installe pas.",
				not_a_package: "Ce fichier n’est pas un plugin Hodi.",
				invalid_manifest: "Ce plugin est mal décrit, il ne peut pas être installé.",
				signed_only: "Ce plugin n’est pas vérifié et demande des accès réservés aux plugins vérifiés.",
				failed: "Le téléchargement a échoué. Réessaie."
			}
		}
	},
	server: /* @__PURE__ */ JSON.parse("{\"title\":\"Serveur\",\"nav\":\"Les sections du serveur\",\"backToApp\":\"Retour à Hodi\",\"support\":\"Soutenir Hodi\",\"supportHint\":\"Gratuit et sans pub\",\"backToServer\":\"Retour au serveur\",\"groups\":{\"settings\":\"Réglages\"},\"titles\":{\"overview\":\"Vue d’ensemble\",\"accounts\":\"Comptes\",\"general\":\"Général\",\"content\":\"Contenu\",\"backups\":\"Sauvegardes\",\"mail\":\"E-mail\",\"plugins\":\"Plugins\",\"notifications\":\"Alertes\",\"inbox\":\"À traiter\",\"blocks\":\"Blocages\"},\"pluginsIntro\":\"Des fonctions en plus, pour tout le serveur, depuis le registre de Hodi ou un fichier. Chaque plugin tourne à part, avec ses propres données. Seuls les plugins vérifiés ajoutent des pages à Hodi.\",\"hints\":{\"overview\":\"Totaux, qui est en ligne\",\"accounts\":\"Les e-mails et leurs profils\",\"general\":\"L’adresse de Hodi et la page d’accueil\",\"content\":\"Durées et sources\",\"backups\":\"Copies de toute la base de données\",\"mail\":\"Le serveur d’envoi des e-mails\",\"notifications\":\"E-mail et push, pour chaque type\",\"inbox\":\"Les demandes à régler\",\"inboxWaiting_one\":\"{{count}} demande à traiter\",\"inboxWaiting_other\":\"{{count}} demandes à traiter\",\"blocks\":\"Sources bloquées, adresses\"},\"overview\":{\"intro\":\"Le serveur en totaux, comparé à la période d’avant. Le serveur compte, il ne regarde pas : jamais ce qu’une personne lit.\",\"period\":\"Période\",\"span\":{\"days\":\"{{count}} j\",\"yearShort\":\"1 an\",\"all\":\"Tout\",\"year\":\"1 an\"},\"metrics\":{\"visits\":\"Visites / jour\",\"articles\":\"Articles lus\",\"hours\":\"Heures de lecture\",\"videos\":\"Vidéos vues\",\"shares\":\"Partages\"},\"hoursUnit\":\"h\",\"byDay\":\"{{metric}}, jour par jour\",\"legend\":{\"days_one\":\"Ce jour\",\"days_other\":\"Ces {{count}} jours\",\"daysBefore_one\":\"Le jour d’avant\",\"daysBefore_other\":\"Les {{count}} jours d’avant\",\"year\":\"Ces 12 mois\",\"yearBefore\":\"Les 12 mois d’avant\",\"all\":\"Depuis le début\"},\"online\":\"En ligne maintenant\",\"live\":\"Direct\",\"onlineEmpty\":\"Personne en ce moment\",\"device\":{\"phone\":\"Téléphone\",\"tablet\":\"Tablette\",\"computer\":\"Ordinateur\"},\"profiles_one\":\"Profil\",\"profiles_other\":\"Profils\",\"adults\":\"Adultes\",\"young\":\"Ados et enfants\",\"added\":\"+{{count}} en {{span}}\",\"addedAll\":\"+{{count}} au total\",\"top\":{\"topics\":\"Thèmes les plus lus\",\"sources\":\"Sources les plus lues\",\"share\":\"Part des lectures\",\"read\":\"Articles lus\"},\"nothing\":\"Rien de lu sur cette période\",\"health\":{\"title\":\"Santé du serveur\",\"sources\":\"Flux des sources\",\"sourcesOk\":\"{{count}} sur {{count}} à jour\",\"sourcesFailing\":\"{{failing}} en erreur sur {{count}}\",\"backup\":\"Dernière sauvegarde\",\"noBackup\":\"Aucune\",\"mail\":\"E-mail\",\"mailOn\":\"Configuré\",\"mailOff\":\"Pas configuré\",\"plugins\":\"Plugins\",\"pluginsOn_one\":\"{{count}} actif\",\"pluginsOn_other\":\"{{count}} actifs\",\"noPlugins\":\"Aucun\",\"version\":\"Version\"},\"dates\":{\"title\":\"Choisir les dates\",\"from\":\"Du\",\"to\":\"Au\",\"previous\":\"Mois précédent\",\"next\":\"Mois suivant\",\"apply\":\"Appliquer\",\"clear\":\"Revenir à 7 jours\"},\"pluginFailed\":\"Ce plugin n’a pas pu s’afficher.\"},\"people\":{\"searchAccounts\":\"Chercher un compte\",\"accountsMeta_one\":\"{{count}} compte\",\"accountsMeta_other\":\"{{count}} comptes\",\"noProfile\":\"Sans profil\",\"noMatchAccounts\":\"Aucun compte ne correspond.\",\"backToAccounts\":\"Retour aux comptes\",\"failed\":\"Impossible de charger la liste.\",\"account\":{\"intro\":\"Le serveur voit le compte, jamais ce qui y est lu ni ses réglages.\",\"section\":\"Compte\",\"email\":\"E-mail\",\"role\":\"Rôle\",\"roles\":{\"member\":\"Adulte\",\"none\":\"Sans profil\"},\"serverAdmin\":\"Admin du serveur\",\"lastSeen\":\"Dernière connexion\",\"never\":\"Jamais\",\"lastSeenValue\":\"{{date}} · {{time}}\",\"devices\":\"Appareils connectés\",\"created\":\"Créé le\",\"reset\":\"Mot de passe oublié\",\"resetLabel\":\"Faire un code\",\"resetOnRequest\":\"Seulement quand la personne en demande un.\",\"own\":\"Le tien se change dans Réglages › Mon compte\",\"deleteSection\":\"Supprimer ou bloquer\",\"serverAdminSection\":\"Admin du serveur\",\"makeServerAdmin\":\"Nommer admin du serveur\",\"serverAdminHint\":\"Gère Serveur comme toi : les comptes, les sauvegardes, les plugins\",\"serverAdminButton\":\"Nommer\",\"delete\":\"Supprimer ce compte\",\"deleteHint\":\"Son profil et tout ce qu’il contient partent avec lui\",\"deleteButton\":\"Supprimer\",\"confirmDelete\":{\"title\":\"Supprimer ce compte\xA0?\",\"message\":\"<b>{{email}}</b> est effacé tout de suite avec son profil, ses enregistrés, ses lectures, ses partages et ses statistiques. Les copies de sauvegarde l’oublient au plus tard dans {{days}}. <b>Il n’y a pas de retour en arrière.</b>\"},\"codeAsked\":\"Code demandé\",\"codeAskedTitle\":\"Code demandé le {{date}} à {{time}}\",\"codeAskedText\":\"{{name}} a oublié son mot de passe et ce serveur n’envoie pas d’e-mails. Fais-lui un code, puis transmets-le-lui de la main à la main ou par message.\",\"block\":\"Bloquer ce compte\",\"blockHint\":\"Supprimé, et son e-mail ne pourra plus revenir\",\"blockButton\":\"Bloquer\",\"confirmBlock\":{\"title\":\"Bloquer ce compte\xA0?\",\"message\":\"<b>{{email}}</b> est effacé tout de suite, comme avec <i>Supprimer</i>, et cette adresse ne pourra plus créer de compte sur ce serveur. À la connexion, la personne lit <i>Ce compte a été bloqué sur ce serveur</i>. <b>Il n’y a pas de retour en arrière.</b>\"}}},\"general\":{\"intro\":\"L’adresse de Hodi, que les liens des e-mails ouvrent, et la page d’accueil publique. Un navigateur qui n’a jamais ouvert Hodi arrive sur ce site, par exemple une page de présentation ; les autres arrivent sur <i>Connexion</i>.\",\"addresses\":\"Adresses\",\"invalid\":\"Écris une adresse complète, avec https://.\",\"saved\":\"Adresse enregistrée\",\"failed\":\"L’adresse n’a pas pu être enregistrée.\",\"loadFailed\":\"Ces réglages n’ont pas pu être chargés.\",\"appUrl\":{\"label\":\"Adresse de Hodi\",\"none\":\"Pas encore indiquée\",\"intro\":\"L’adresse à laquelle on ouvre Hodi, telle qu’on la tape dans un navigateur. Les liens des e-mails y mènent : sans elle, <i>Mot de passe oublié</i> n’apparaît pas sur <i>Connexion</i>.\",\"field\":\"Adresse de Hodi\",\"placeholder\":\"https://hodi.exemple.be\"},\"publicHome\":{\"label\":\"Page d’accueil publique\",\"none\":\"Aucune : Connexion s’ouvre\",\"intro\":\"Une personne qui n’a jamais ouvert Hodi sur son navigateur arrive sur ce site, par exemple une page de présentation. Laisse vide pour ouvrir <i>Connexion</i>.\",\"field\":\"Adresse du site\",\"placeholder\":\"https://exemple.be\"}},\"content\":{\"intro\":\"Combien de temps le serveur garde ce qu’il récupère, et combien de sources il peut suivre. Des durées courtes gardent la base légère ; un article enregistré garde toujours son texte.\",\"durations\":\"Durées\",\"sources\":\"Sources\",\"less\":\"Moins\",\"more\":\"Plus\",\"saved\":\"Réglage enregistré\",\"failed\":\"Impossible d’enregistrer le réglage.\",\"loadFailed\":\"Impossible de charger les réglages.\",\"bounds\":\"De {{min}} à {{max}} jours, {{byDefault}} par défaut.\",\"articleDays\":{\"label\":\"Articles\",\"title\":\"Durée des articles\",\"intro\":\"Combien de jours un article reste dans le fil, dans la recherche et dans les thèmes.\"},\"videoDays\":{\"label\":\"Vidéos\",\"title\":\"Durée des vidéos\",\"intro\":\"Combien de jours une vidéo ou un épisode reste dans <i>Vidéos</i>. Une vidéo ne prend presque pas de place : son titre et son image.\"},\"textDays\":{\"label\":\"Texte des articles\",\"title\":\"Durée des textes\",\"intro\":\"Combien de jours le serveur garde le texte d’un article lu dans Hodi, et ses images. Un article enregistré garde toujours les siens.\"},\"maxSources\":{\"label\":\"Sources du serveur\",\"title\":\"Sources du serveur\",\"intro\":\"Combien de sources le serveur peut suivre, tous les comptes ensemble : il récupère chacune d’elles. S’il en suit déjà plus, il les garde, mais personne ne peut plus en ajouter.\",\"toggle\":\"Limiter les sources\",\"toggleHint\":\"Sinon, chacun en ajoute autant qu’il veut.\",\"unlimited\":\"Illimité\"},\"validation\":{\"label\":\"Valider les sources\",\"hint\":\"Une source ajoutée attend dans À traiter avant d’entrer dans le catalogue\",\"failed\":\"Le réglage n’a pas pu être enregistré. Réessaie dans un instant.\"}},\"backups\":{\"intro\":\"Chaque nuit, une copie de toute la base et des données des plugins. Elle contient les données de tout le monde : un mot de passe la protège, et mieux vaut en garder une hors du serveur. La copie d’un seul compte est dans <i>Mon compte</i>.\",\"settings\":\"Réglages\",\"kept\":\"Copies gardées\",\"keptValue_one\":\"{{count}} copie\",\"keptValue_other\":\"{{count}} copies\",\"keptIntro\":\"Combien de copies le serveur garde : la plus ancienne part quand une nouvelle arrive. Une donnée supprimée reste au plus ce nombre de jours dans les copies.\",\"keptBounds\":\"De {{min}} à {{max}}, {{byDefault}} par défaut.\",\"now\":\"Sauvegarder maintenant\",\"nowHint\":\"Avant une mise à jour, par exemple\",\"nowButton\":\"Sauvegarder\",\"done\":\"Copie faite\",\"failed\":\"La copie n’a pas pu être faite.\",\"saved\":\"Réglage enregistré\",\"saveFailed\":\"Impossible d’enregistrer le réglage.\",\"loadFailed\":\"Impossible de charger les copies.\",\"list_one\":\"{{count}} copie · {{size}}\",\"list_other\":\"{{count}} copies · {{size}}\",\"empty\":\"Aucune copie pour l’instant\",\"when\":\"{{date}} · {{time}}\",\"download\":\"Télécharger\",\"downloadLabel\":\"Télécharger la copie du {{date}}\",\"downloadTitle\":\"Télécharger la copie\",\"downloadIntro\":\"La copie du <b>{{date}} à {{time}}</b> contient les données de tout le monde. Le mot de passe du compte la protège.\",\"downloadFailed\":\"La copie n’a pas pu être téléchargée.\",\"more_one\":\"Voir l’autre\",\"more_other\":\"Voir les {{count}} autres\",\"less\":\"Moins\",\"more2\":\"Plus\",\"restore\":\"Restaurer\",\"restoreLabel\":\"Restaurer la copie du {{date}}\",\"restoreTitle\":\"Restaurer la copie\",\"restoreIntro\":\"Tout le serveur revient au <b>{{date}} à {{time}}</b> : les comptes, les profils, les lectures, les données des plugins. Ce qui a changé depuis disparaît, mais Hodi garde d’abord une copie de l’état actuel. Ce qui a été supprimé depuis reste supprimé : un compte, un profil. Un plugin retiré depuis ne revient pas : ses données restent 30 jours, le temps de le réinstaller. Puis Hodi redémarre, et chacun se reconnecte si besoin.\",\"restoreFailed\":\"La copie n’a pas pu être restaurée.\",\"restoring\":\"Restauration de la copie du {{date}} à {{time}}\"},\"mail\":{\"intro\":\"Le serveur par lequel Hodi envoie ses e-mails : <i>Mot de passe oublié</i> et ceux des plugins. Tant qu’il n’est pas réglé, Hodi n’en envoie aucun et ce lien n’apparaît pas sur <i>Connexion</i>.\",\"server\":\"Serveur d’envoi\",\"notSet\":\"Pas encore réglé\",\"set\":\"Régler\",\"host\":\"Serveur\",\"hostValue\":\"{{host}}:{{port}} · {{security}}\",\"security\":\"Sécurité\",\"securities\":{\"starttls\":\"STARTTLS\",\"tls\":\"TLS\",\"none\":\"Aucune\"},\"port\":\"Port\",\"user\":\"Identifiant\",\"userPlaceholder\":\"Vide si le serveur n’en demande pas\",\"noUser\":\"Aucun\",\"password\":\"Mot de passe\",\"passwordKept\":\"Inchangé\",\"sender\":\"Expéditeur\",\"dialogTitle\":\"Serveur d’envoi\",\"dialogIntro\":\"Ces réglages viennent de l’hébergeur des e-mails (Gmail, OVH, Infomaniak…). STARTTLS va avec le port 587, TLS avec le 465.\",\"saved\":\"Réglages enregistrés\",\"saveFailed\":\"Impossible d’enregistrer les réglages.\",\"invalid\":\"Un champ n’est pas valable : vérifie le serveur, le port et l’adresse de l’expéditeur.\",\"loadFailed\":\"Impossible de charger les réglages.\",\"test\":\"Envoyer un essai\",\"testHint\":\"Un e-mail à l’adresse de ce compte\",\"testButton\":\"Envoyer\",\"testSent\":\"Essai envoyé à {{email}}\",\"failedUnreachable\":\"Le serveur ne répond pas : vérifie le serveur, le port et la sécurité.\",\"failedAuth\":\"Le serveur refuse l’identifiant ou le mot de passe.\",\"failedRefused\":\"Le serveur refuse l’e-mail : vérifie l’adresse de l’expéditeur.\",\"remove\":\"Ne plus envoyer d’e-mails\",\"removeHint\":\"Hodi oublie ces réglages\",\"removeButton\":\"Retirer\",\"removed\":\"Réglages retirés\",\"serverIntro\":\"L’adresse du serveur d’envoi et sa sécurité, données par l’hébergeur de l’adresse e-mail (Gmail, OVH, Infomaniak…). STARTTLS va avec le port 587, TLS avec le 465.\",\"loginIntro\":\"L’identifiant et le mot de passe du serveur d’envoi, souvent l’adresse e-mail et son mot de passe. Laisse vide si le serveur n’en demande pas. Une fois enregistré, le mot de passe n’est plus jamais affiché.\",\"senderIntro\":\"L’adresse d’où partent les e-mails de Hodi, par exemple no-reply@exemple.be. Le serveur d’envoi doit accepter de l’utiliser.\",\"toFill\":\"À remplir\"},\"notifications\":{\"title\":\"Alertes\",\"intro\":\"Comment le serveur te prévient de chaque chose : par e-mail, en push sur les appareils où tu es connecté, ou les deux. Tout reste aussi dans <i>Notifications</i>.\",\"core\":\"Serveur\",\"thisDevice\":\"Cet appareil\",\"device\":\"Push sur cet appareil\",\"deviceHint\":\"Les notifications en push arrivent ici\",\"email\":\"E-mail\",\"push\":\"Push\",\"choice\":\"{{kind}} : {{way}}\",\"noMailTitle\":\"L’e-mail du serveur n’est pas configuré\",\"noMailText\":\"Les notifications par e-mail restent désactivées jusque-là.\",\"configure\":\"Configurer\",\"emptyTitle\":\"Rien à signaler pour l’instant\",\"emptyText\":\"Les plugins installés ajoutent ici ce qu’ils peuvent te signaler.\",\"denied\":\"Les notifications sont bloquées pour Hodi dans ce navigateur.\",\"unsupported\":\"Ce navigateur ne reçoit pas de notifications. Sur iPhone, ajoute Hodi à l’écran d’accueil.\",\"failed\":\"Impossible d’activer le push sur cet appareil.\",\"loadFailed\":\"Impossible de charger les notifications.\",\"saveFailed\":\"Ce choix n’a pas pu être enregistré.\",\"weeklyReport\":{\"label\":\"Rapport de la semaine\",\"hint\":\"Le lundi à 08:00, les chiffres de la semaine\"},\"codeRequest\":{\"label\":\"Demandes de code\",\"hint\":\"Quand quelqu’un a oublié son mot de passe\"},\"sourceReview\":{\"label\":\"Sources à valider\",\"hint\":\"Quand une source ajoutée attend une décision\"},\"sourceReport\":{\"label\":\"Sources signalées\",\"hint\":\"Quand un compte signale une source\"},\"shareReport\":{\"label\":\"Partages signalés\",\"hint\":\"Quand un compte signale un partage reçu\"}},\"inbox\":{\"intro\":\"Ce que le serveur te demande de faire. Une demande réglée passe dans <i>Traité</i>, où elle reste 7 jours.\",\"emptyTitle\":\"Rien pour l’instant\",\"emptyHint\":\"Ce que le serveur te demande de faire arrive ici.\",\"handledEmptyTitle\":\"Rien de traité\",\"handledEmptyHint\":\"Une demande réglée reste ici 7 jours.\",\"choose\":\"Choisir comment être prévenu\",\"meta_one\":\"{{count}} à traiter\",\"meta_other\":\"{{count}} à traiter\",\"filter\":\"Filtrer par sorte\",\"kinds\":{\"all\":\"Tout\",\"source\":\"Sources\",\"code\":\"Mots de passe\",\"plugin\":\"Plugins\",\"handled\":\"Traité\",\"report\":\"Signalements\"},\"failed\":\"Impossible de charger À traiter\",\"back\":\"Retour à À traiter\",\"noneTitle\":\"Rien à traiter\",\"noneHint\":\"Choisis une demande dans la liste.\",\"handled\":\"Traité le {{date}}\",\"source\":{\"kinds\":{\"article\":\"Articles\",\"video\":\"Vidéos\",\"podcast\":\"Podcasts\"},\"topics\":\"Thèmes de {{name}}\",\"teen\":\"Convient aux ados\",\"teenHint\":\"Les parents peuvent la donner à un ado\",\"child\":\"Convient aux enfants\",\"childHint\":\"Les parents peuvent la donner à un enfant\",\"refuse\":\"Refuser\",\"refuseTitle\":\"Refuser {{name}} ?\",\"refuseText\":\"<b>{{name}}</b> n’entre pas dans le catalogue du serveur. Elle pourra être demandée de nouveau dans 30 jours.\",\"accept\":\"Accepter\",\"accepted\":\"{{name}} acceptée dans le catalogue\",\"refused\":\"{{name}} refusée\",\"failed\":\"La décision n’a pas pu être enregistrée. Réessaie dans un instant.\",\"what\":\"La source\",\"topicsLabel\":\"Ses thèmes\",\"young\":\"Pour les jeunes\"},\"report\":{\"what\":\"La source\",\"why\":\"Les motifs\",\"count_one\":\"{{count}} signalement\",\"count_other\":\"{{count}} signalements\",\"ignore\":\"Ignorer\",\"unlist\":\"Retirer du catalogue\",\"unlistTitle\":\"Retirer {{name}} du catalogue ?\",\"unlistText\":\"<b>{{name}}</b> n’est plus proposée. Ceux qui la lisent la gardent dans <i>Mes sources</i>.\",\"ignored\":\"Signalement ignoré\",\"unlisted\":\"{{name}} est retirée du catalogue\",\"failed\":\"Ce choix n’a pas pu être enregistré\"},\"share\":{\"what\":\"Le partage\",\"note\":\"Son mot\",\"why\":\"Le motif\",\"sender\":\"Envoyé par\",\"senderGone\":\"Compte supprimé depuis\",\"senderHint\":\"Bloque ou supprime son compte depuis sa page\",\"openAccount\":\"Voir le compte\",\"ignore\":\"Ignorer\",\"ignored\":\"Signalement ignoré\",\"failed\":\"Ce choix n’a pas pu être enregistré\"}},\"blocks\":{\"intro\":\"Les sites bloqués pour un contenu illégal, et le retour d’un compte bloqué par erreur.\",\"unblock\":\"Débloquer\",\"sources\":{\"section\":\"Sources bloquées\",\"search\":\"Chercher un domaine\",\"since\":\"Bloqué le {{date}}\",\"emptyTitle\":\"Aucune source bloquée\",\"emptyText\":\"Un site bloqué depuis À traiter arrive ici.\",\"confirmTitle\":\"Débloquer ce domaine\xA0?\",\"confirmText\":\"Quelqu’un pourra de nouveau ajouter <b>{{domain}}</b>. Rien de ce qui a été effacé ne revient.\",\"done\":\"{{domain}} est débloqué\"},\"emails\":{\"section\":\"Comptes bloqués\",\"title\":\"Débloquer une adresse\",\"hint\":\"Pour un compte bloqué par erreur\",\"intro\":\"Le serveur ne garde pas les adresses bloquées : tape celle du compte à laisser revenir.\",\"field\":\"Son e-mail\",\"confirmTitle\":\"Débloquer cette adresse\xA0?\",\"confirmText\":\"<b>{{email}}</b> pourra de nouveau créer un compte sur ce serveur. Le compte effacé ne revient pas.\",\"done\":\"Adresse débloquée\",\"notBlocked\":\"Cette adresse n’était pas bloquée.\"},\"block\":{\"section\":\"Contenu illégal\",\"label\":\"Bloquer ce site\",\"hint\":\"Partout, pour tout le monde\",\"short\":\"Bloquer\",\"button\":\"Bloquer partout\",\"title\":\"Bloquer {{name}}\xA0?\",\"done\":\"{{target}} est bloqué\",\"textDomain\":\"Tout le domaine <b>{{target}}</b> est bloqué : son flux n’est plus lu, et plus personne ne pourra l’ajouter.\",\"textFeed\":\"Ce flux de <b>{{host}}</b> est bloqué, seul : le reste du site n’est pas touché, et plus personne ne pourra l’ajouter.\",\"erased_one\":\"Sa source quitte les listes de tous les comptes, avec tout ce qui en a été lu sur le serveur.\",\"erased_other\":\"Ses {{count}} sources quittent les listes de tous les comptes, avec tout ce qui en a été lu sur le serveur.\",\"account\":\"Le compte qui l’a ajoutée est bloqué, sans que tu saches lequel.\",\"final\":\"<b>Il n’y a pas de retour en arrière.</b>\",\"failed\":\"Impossible de préparer le blocage. Réessaie dans un instant.\"}}}"),
	mail: {
		linkFallback: "Le bouton ne marche pas ? Copie ce lien :",
		sentBy: "Envoyé par Hodi",
		test: {
			subject: "Hodi : e-mail d’essai",
			eyebrow: "Serveur › E-mail",
			title: "Ça marche",
			text: "Cet e-mail vient de Hodi. Le serveur d’envoi est bien réglé : Hodi peut envoyer ses e-mails."
		},
		reset: {
			subject: "Hodi : choisir un nouveau mot de passe",
			eyebrow: "Mon compte",
			title: "Nouveau mot de passe",
			text: "Un nouveau mot de passe a été demandé pour le compte Hodi {{email}}. Entre ce code sur la page Mot de passe oublié, ou ouvre le bouton : il est valable une heure, une seule fois.",
			button: "Choisir un mot de passe",
			note: "Si la demande ne vient pas de toi, ignore cet e-mail : le mot de passe reste le même."
		},
		serverNotice: {
			open: "Ouvrir dans Hodi",
			note: "Tu reçois cet e-mail car tu gères ce serveur. Choisis ce qu’il te signale dans <i>Serveur › Alertes</i>."
		},
		weekly: {
			eyebrow: "Rapport de la semaine",
			title: "Du {{from}} au {{to}}",
			text: "Les chiffres de la semaine sur tout le serveur, comparés à la semaine d’avant.",
			server: "Serveur",
			rows: {
				visits: "Visites",
				articles: "Articles lus",
				videos: "Vidéos vues",
				minutes: "Temps de lecture",
				shares: "Partages",
				profiles: "Nouveaux profils"
			},
			push: "Visites : {{visits}} · Articles lus : {{articles}}"
		},
		codeRequest: {
			eyebrow: "Serveur",
			title: "{{name}} demande un code",
			text: "{{name}} ({{email}}) a oublié son mot de passe. Crée-lui un code dans Serveur › Comptes, puis transmets-le-lui."
		},
		invite: {
			subject: "{{name}} t’invite sur Hodi",
			title: "Invitation sur Hodi",
			text: "{{name}} t’invite sur Hodi. Avec ce code, tu crées un compte à toi. Il est valable 24 heures, une seule fois.",
			code: "Le code : {{code}}",
			button: "Créer mon compte",
			note: "Si tu ne connais pas cette personne, ignore cet e-mail : sans le code, rien ne se passe."
		},
		sourceReview: {
			eyebrow: "Serveur",
			title: "Source à valider : {{name}}",
			text: "{{name}} vient d’être ajoutée. Elle reste hors du catalogue tant qu’elle n’est pas acceptée dans À traiter."
		},
		sourceReport: {
			eyebrow: "Serveur",
			title: "Source signalée : {{name}}",
			text: "Quelqu’un a signalé {{name}}. Garde-la ou retire-la du catalogue dans À traiter."
		},
		shareReport: {
			eyebrow: "Serveur",
			title: "Partage signalé",
			text: "Quelqu’un a signalé un partage reçu. Ignore-le ou agis sur le compte qui l’a envoyé dans À traiter."
		}
	},
	forgot: {
		title: "Mot de passe oublié",
		intro: "Entre l’e-mail du compte. Tu y reçois un code de 8 caractères, puis tu choisis un nouveau mot de passe.",
		send: "Envoyer un code",
		haveCode: "J’ai un code",
		codeTitle: "Entre le code",
		codeIntro: "Si un compte a l’adresse <b>{{email}}</b>, un code vient de partir. Il reste valable une heure. Pas reçu ? Regarde dans les indésirables, ou renvoie-le.",
		codeIntroTyped: "Les 8 caractères reçus par e-mail. Le code reste valable une heure et ne sert qu’une fois.",
		codeLabel: "Code",
		resend: "Renvoyer le code",
		resent: "Code renvoyé à {{email}}",
		confirm: "Confirmer",
		wrongCode: "Ce code ne marche pas : il a peut-être déjà servi, ou son heure est passée. Demandes-en un autre.",
		failed: "Le code n’a pas pu partir. Réessaie dans un instant.",
		newTitle: "Nouveau mot de passe",
		newIntro: "Pour <b>{{email}}</b>. Une fois enregistré, les autres appareils se déconnectent et celui-ci se connecte avec le nouveau.",
		save: "Enregistrer",
		doneTitle: "C’est fait",
		doneIntro: "Le nouveau mot de passe est enregistré. Il sert désormais sur chaque appareil : garde-le dans un gestionnaire de mots de passe pour ne plus avoir à le chercher.",
		doneNotice: "Mot de passe changé",
		doneText: "Les autres appareils sont déconnectés, celui-ci est déjà connecté.",
		enter: "Entrer dans Hodi",
		askIntro: "Ce serveur n’envoie pas d’e-mails : c’est son admin qui te fait un code de 8 caractères. Entre l’e-mail du compte et demande-le : l’admin est prévenu et te transmet le code.",
		ask: "Demander",
		askedIntro: "L’admin du serveur a reçu la demande. Dès qu’il t’a transmis le code, entre-le ici. Il reste valable 24 heures et ne sert qu’une fois.",
		askedIntroTyped: "Les 8 caractères que l’admin du serveur t’a transmis. Le code reste valable 24 heures et ne sert qu’une fois."
	},
	twoFactor: {
		failed: "La validation en deux étapes n’a pas pu démarrer. Réessaie dans un instant.",
		scan: {
			app: "Installe une app d’authentification sur le téléphone\xA0: Google Authenticator, Microsoft Authenticator, 1Password, Aegis…",
			qr: "Dans l’app, ajoute un compte et scanne ce QR. Sans appareil photo, tape la clé à côté.",
			qrLabel: "QR de la validation en deux étapes",
			key: "Clé",
			copyKey: "Copier la clé",
			keyCopied: "Clé copiée",
			type: "Tape le code à 6 chiffres que l’app affiche pour Hodi.",
			code: "Code de l’app",
			wrong: "Ce code ne marche pas\xA0: prends celui que l’app affiche maintenant. S’il ne marche toujours pas, vérifie l’heure du téléphone.",
			link: "Touche le bouton : l’app s’ouvre et ajoute Hodi. Si rien ne s’ouvre, ajoute un compte dans l’app et tape la clé.",
			open: "Ajouter à mon app"
		},
		codes: {
			title: "Garde les codes de secours",
			intro: "Sans le téléphone, chacun de ces codes remplace une fois celui de l’app. Garde-les dans un gestionnaire de mots de passe ou sur papier\xA0: <b>Hodi ne les montrera plus</b>.",
			label: "Codes de secours",
			download: "Télécharger",
			copy: "Copier",
			copied: "Codes copiés",
			fileTitle: "Hodi · codes de secours (chacun sert une seule fois)",
			done: "Je les ai gardés"
		},
		setup: {
			title: "Protège le compte",
			intro: "Ce compte gère tout le serveur. En plus du mot de passe, il demandera un code du téléphone à chaque connexion sur un nouvel appareil.",
			helpTitle: "Pourquoi c’est obligatoire\xA0?",
			help: "Le compte du serveur peut créer et supprimer des comptes, installer des plugins et restaurer des sauvegardes. Un mot de passe volé ne suffit pas à le prendre : il faut aussi le téléphone."
		},
		account: {
			row: "Validation en deux étapes",
			on: "Activée depuis le {{date}}",
			off: "Désactivée",
			required: "Obligatoire pour le compte du serveur",
			newCodes: "Nouveaux codes",
			dialogTitle: "Validation en deux étapes",
			dialogIntro: "En plus du mot de passe, Hodi demandera un code du téléphone à chaque connexion sur un nouvel appareil.",
			done: "Activée\xA0: la prochaine connexion sur un nouvel appareil demandera le code.",
			confirmOff: {
				title: "Désactiver la validation\xA0?",
				message: "Le mot de passe suffira de nouveau pour entrer depuis un nouvel appareil, et les codes de secours ne marcheront plus. Tape le mot de passe et le code de l’app pour confirmer.",
				button: "Désactiver"
			},
			confirmCodes: {
				title: "Nouveaux codes de secours\xA0?",
				message: "Les codes d’avant ne marcheront plus. Tape le mot de passe et le code de l’app pour en avoir 10 nouveaux.",
				button: "Créer"
			},
			confirmOn: {
				title: "Activer la validation\xA0?",
				message: "Tape le mot de passe : Hodi te montre ensuite le QR à scanner avec l’app d’authentification.",
				button: "Continuer"
			},
			codes: "Codes de secours",
			codesLeft: "{{count}} restants sur {{total}}"
		},
		login: {
			title: "Code de l’app",
			intro: "Ouvre l’app d’authentification et tape le code à 6 chiffres de Hodi.",
			code: "Code",
			recovery: "Utiliser un code de secours",
			recoveryLabel: "Code de secours",
			recoveryIntro: "Un des 10 codes gardés quand tu as activé la validation en deux étapes. Chacun sert une seule fois.",
			useApp: "Utiliser le code de l’app",
			wrong: "Ce code ne marche pas. Prends celui que l’app affiche maintenant.",
			back: "Retour",
			signInNow: "C’est fait : connecte-toi avec l’e-mail, le mot de passe, puis le code de l’app."
		},
		server: {
			intro: "Ce compte gère tout le serveur : avant d’ouvrir l’espace <i>Serveur</i>, ajoute un code du téléphone au mot de passe. Tape le mot de passe pour commencer.",
			back: "Retour à l’app"
		},
		pluginSignIn: {
			title: "Validation en deux étapes",
			message: "Ce compte est protégé par la validation en deux étapes. Tape le code à 6 chiffres que l’app affiche pour Hodi.",
			button: "Continuer"
		}
	},
	choiceField: { remove: "Retirer {{name}}" },
	accountPage: {
		title: "Mon compte",
		sectionsButton: "Sections",
		sections: {
			profile: "Profil",
			"sign-in": "Connexion",
			region: "Région",
			ai: "IA et crédits",
			stats: "Statistiques",
			data: "Données",
			children: "Mes enfants"
		},
		intros: {
			profile: "Le prénom, la photo et la couleur que les autres voient, et la langue de Hodi.",
			"sign-in": "Comment tu te connectes, et les appareils où le compte est ouvert.",
			region: "Le fuseau horaire dit quand commence une journée : celle des statistiques, du <i>Résumé du jour</i> et des badges.",
			data: "Une copie de tout ce que Hodi garde du compte, ou sa suppression.",
			ai: "Chaque bouton violet est un appel à l’IA, payé avec la clé d’API de ce compte : rien ne part sans un clic. Les appels se comptent sur 24 heures glissantes, sans plafond : la clé est à toi.",
			children: "Les comptes des ados et des enfants que tu gères : chacun se connecte avec son identifiant et le mot de passe que tu choisis."
		}
	},
	children: {
		create: {
			title: "Ajouter un enfant",
			passwordTitle: "Le mot de passe de {{name}}",
			button: "Créer",
			done: "Compte de {{name}} créé",
			handleTaken: "Cet identifiant est déjà pris : reviens en arrière pour en choisir un autre.",
			failed: "Le compte n’a pas pu être créé. Réessaie."
		},
		addCard: "Un ado ou un enfant, qui se connecte avec son identifiant à lui.",
		addButton: "Ajouter",
		password: {
			label: "Mot de passe",
			hint: "Se connecte avec @{{handle}}",
			none: "Pas encore de mot de passe pour @{{handle}}",
			change: "Changer",
			choose: "Choisir",
			title: "Le mot de passe de {{name}}",
			intro: "Ses appareils se connectent avec <b>@{{handle}}</b> et ce mot de passe. Ceux qui utilisaient l’ancien devront se reconnecter.",
			confirmTitle: "Changer le mot de passe de {{name}} ?",
			confirmText: "Pour confirmer, tape le mot de passe avec lequel tu te connectes.",
			saved: "Mot de passe de {{name}} enregistré",
			actionLabel: "Mot de passe de {{name}}"
		},
		loadFailed: "Impossible de charger les enfants.",
		parents: {
			title: "Parents",
			leave: "Me retirer",
			waiting: "Invitation envoyée, en attente de réponse",
			cancel: "Annuler",
			cancelLabel: "Annuler l’invitation de {{name}}",
			second: "Inviter un second parent",
			inviteTitle: "Inviter un parent",
			inviteIntro: "Son identifiant, d’un compte qui existe déjà sur ce serveur. S’il accepte, il aura les mêmes droits que toi sur <b>{{name}}</b>.",
			handle: "Identifiant",
			handlePlaceholder: "marie",
			send: "Inviter",
			sent: "Invitation envoyée à {{name}}",
			unknown: "Ce compte n’existe pas.",
			already: "Ce compte est déjà parent.",
			full: "Deux parents au plus.",
			tooMany: "Trop d’essais : réessaie dans une minute.",
			failed: "Ça n’a pas marché. Réessaie.",
			leaveTitle: "Ne plus être parent de {{name}} ?",
			leaveText: "Tu ne gères plus <b>{{name}}</b> : son autre parent garde tout. Pour redevenir parent, il faudra qu’il t’invite.",
			left: "Tu n’es plus parent de {{name}}",
			since: "parent depuis le {{date}}",
			leaveLabel: "Ne plus être parent de {{name}}"
		},
		invitations: {
			title: "{{from}} te demande d’être parent de {{name}}",
			text: "Si tu acceptes, tu as les mêmes droits que <b>{{from}}</b> sur <b>{{name}}</b> : ses sources, ses heures et son mot de passe.",
			accept: "Accepter",
			refuse: "Refuser",
			accepted: "Tu es parent de {{name}}",
			refused: "Demande refusée",
			failed: "Ça n’a pas marché. Réessaie.",
			acceptLabel: "Accepter d’être parent de {{name}}",
			refuseLabel: "Refuser d’être parent de {{name}}"
		},
		parentalCode: {
			section: "Sur un appareil partagé",
			title: "Code parental",
			hintOff: "Pas encore choisi",
			hintOn: "Demandé pour ouvrir ce profil sur un appareil partagé",
			code: "Code",
			codeValue: "Oublié ? Le mot de passe du compte le remplace",
			changeLabel: "Changer le code parental",
			dialogTitle: "Le code parental",
			dialogIntro: "Six chiffres, demandés pour ouvrir ce profil depuis <i>Qui lit ?</i> sur un appareil où un ado ou un enfant est connecté. Jamais sur les appareils où il n’y a que toi. En cas d’oubli, le mot de passe du compte le remplace.",
			newCode: "Nouveau code",
			onTitle: "Enregistrer ce code parental ?",
			onText: "Il sera demandé pour ouvrir ce profil depuis <i>Qui lit ?</i>, sur chaque appareil où un ado ou un enfant est connecté.",
			offTitle: "Désactiver le code parental ?",
			offText: "Ce profil s’ouvrira de nouveau sans code depuis <i>Qui lit ?</i>, sur les appareils où un ado ou un enfant est connecté.",
			off: "Désactiver",
			hintAdvised: "Conseillé, pas encore choisi"
		},
		listTitle: "Enfants"
	},
	catalogue: {
		title: "Catalogue",
		parts: "Sections",
		intro: "Les sources de ce thème sur le serveur, toutes validées par l’admin. <i>Ajouter</i> en met une dans <i>Mes sources</i>, où elle reste cochée ici ; <i>Retirer</i> l’en sort.",
		mine: "dans Mes sources",
		add: "Ajouter {{name}} à Mes sources",
		remove: "Retirer {{name}} de Mes sources",
		openSite: "Ouvrir le site",
		added: "{{name}} ajoutée à Mes sources",
		removed: "{{name}} retirée de Mes sources",
		addFailed: "La source n’a pas pu être ajoutée. Réessaie dans un instant.",
		browse: "Parcourir le catalogue",
		empty: {
			title: "Aucune source",
			text: "Rien ne correspond à cette recherche."
		},
		searchIn: "Chercher une source dans {{topic}}",
		sort: {
			title: "Trier les sources",
			label: "Trier : {{sort}}",
			az: "De A à Z",
			za: "De Z à A",
			popular: "Plus populaires",
			unpopular: "Moins populaires"
		}
	},
	sourceCard: {
		add: "Ajouter",
		remove: "Retirer",
		moreTopics_one: "Encore {{count}} thème",
		moreTopics_other: "Encore {{count}} thèmes",
		low: "Peu ouverte",
		addTitle: "Ajouter une source",
		addText: "Par son lien, ou trouvée avec l’IA.",
		ask: "Demander",
		askTitle: "Demander une source",
		askText: "Les parents la valident avant qu’elle arrive."
	},
	report: {
		button: "Signaler",
		label: "Signaler {{name}}",
		title: "Signaler {{name}}",
		intro: "Dis à l’admin du serveur pourquoi <b>{{name}}</b> n’a pas sa place ici. Il ne saura pas que ça vient de toi.",
		reasons: {
			illegal: {
				label: "Illégale",
				hint: "Contenu interdit par la loi"
			},
			hateful: {
				label: "Haineuse",
				hint: "Haine, harcèlement, violence"
			},
			misleading: {
				label: "Trompeuse",
				hint: "Fausses infos, arnaques"
			},
			other: {
				label: "Autre chose",
				hint: "Elle ne convient pas à ce serveur"
			}
		},
		reasonsLabel: "Pourquoi ?",
		send: "Envoyer",
		sent: "Signalement envoyé",
		failed: "Le signalement n’a pas pu partir"
	},
	shareReport: {
		button: "Signaler",
		label: "Signaler le partage de {{name}}",
		title: "Signaler ce partage",
		intro: "Seul l’admin du serveur le voit, sans que ton nom lui soit montré. Rien ne change pour <b>{{name}}</b> avant sa décision.",
		reasonsLabel: "Le motif",
		reasons: {
			harassment: {
				label: "Harcèlement",
				hint: "Insistance, menaces ou humiliation"
			},
			hateful: {
				label: "Haineux",
				hint: "Insulte ou rejette des personnes pour ce qu’elles sont"
			},
			spam: {
				label: "Spam",
				hint: "Des envois en masse ou de la publicité"
			},
			other: {
				label: "Autre",
				hint: "Une autre raison qui mérite l’attention de l’admin"
			}
		},
		send: "Signaler",
		sent: "Partage signalé",
		already: "Tu as déjà signalé ce partage",
		tooMany: "Tu as atteint 5 signalements aujourd’hui. Réessaie demain.",
		failed: "Le signalement n’a pas pu être envoyé",
		mute: "Ne plus recevoir ses partages",
		muteLabel: "Ne plus recevoir les partages de {{name}}",
		muted: "Tu ne reçois plus les partages de {{name}}"
	}
}, H = ["fr", "en"], U = (e) => H.includes(e), Ke = {
	fallbackLng: "fr",
	supportedLngs: H,
	interpolation: { escapeValue: !1 },
	returnNull: !1
}, qe = {
	fr: "Français",
	en: "English"
}, Je = "hodi:language", Ye = () => {
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = e.slice(0, 2).toLowerCase();
		if (U(t)) return t;
	}
	return "fr";
}, Xe = (() => {
	try {
		let e = localStorage.getItem(Je);
		return U(e) ? e : null;
	} catch {
		return null;
	}
})(), Ze = null, Qe = () => Ze ?? Xe ?? Ye(), $e = { en: () => import("./play-CzOswEAn.js") }, W = /* @__PURE__ */ new Map(), et = (e) => {
	if (e === "fr" || I.hasResourceBundle(e, "translation")) return Promise.resolve();
	let t = W.get(e);
	return t || (t = $e[e]().then((t) => {
		I.addResourceBundle(e, "translation", t.default);
	}).finally(() => W.delete(e)), W.set(e, t)), t;
};
I.use(Le).init({
	...Ke,
	resources: { fr: { translation: Ge } },
	partialBundledLanguages: !0,
	lng: "fr",
	initAsync: !1
}), document.documentElement.lang = I.language, I.on("languageChanged", (e) => {
	document.documentElement.lang = e;
});
var tt = () => {
	let e = Qe();
	return e === I.language ? Promise.resolve() : et(e).then(async () => {
		Qe() === e && await I.changeLanguage(e);
	}, () => {});
};
tt();
var nt = (e) => {
	Ze = e, tt();
}, rt = () => {
	let { i18n: e } = We();
	return U(e.language) ? e.language : "fr";
}, G = I.t.bind(I), it = (e) => (e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g) ?? []).join("-").toLowerCase();
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function at(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: it(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var ot = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, st = (e) => {
	let t = ot(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, K = (...e) => {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) if (typeof n == "string") for (let e of n.split(/\s+/)) e && t.add(e);
	return [...t].join(" ");
}, q = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function J(e) {
	return e != null;
}
function ct(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? q.width, a = e.size ?? e.height ?? q.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? K(...c) : K("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? q["stroke-width"]) * Number(e.size ?? e.width ?? q.width) / Number(t.size ?? t.width ?? q.width) : t.strokeWidth ?? q["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(q).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && J(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && J(t.width) && { [r("width")]: t.width },
			..."height" in t && J(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function lt(e, t = {}) {
	return ct(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
// node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var ut = (e) => {
	if (typeof e != "object" || !e) return !1;
	for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t) && (t.startsWith("aria-") || t === "role" || t === "title") && e[t] != null) return !0;
	return !1;
}, dt = (0, L.createContext)({}), ft = () => (0, L.useContext)(dt), pt = (0, L.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = ft() ?? {}, y = !!c || ut(d), [b, x, S = []] = lt(u, {
		color: e ?? _,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: K(v, s),
		hasA11yProp: y,
		attributes: d
	});
	return (0, L.createElement)(b, {
		ref: f,
		...x
	}, [...S.map(([e, t]) => (0, L.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function Y(e, t = [], n = []) {
	let r = typeof e == "string" ? at(e, t, n) : e, i = (0, L.forwardRef)(({ className: e, ...t }, n) => (0, L.createElement)(pt, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = st(r.name)), i;
}
// node_modules/lucide-react/dist/esm/icons/check.mjs
var mt = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
mt.node;
var ht = Y(mt), gt = {
	name: "circle-exclamation-point",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12",
			key: "1pkeuh"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16",
			key: "4dfq90"
		}]
	],
	aliases: ["alert-circle", "circle-alert"]
};
gt.node;
var _t = Y(gt), vt = {
	name: "circle-question-mark",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5",
			key: "1awbb0"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["help-circle", "circle-help"]
};
vt.node;
var yt = Y(vt), bt = {
	name: "info",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]
};
bt.node;
var xt = Y(bt), St = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), Ct = /* @__PURE__ */ n(((e, t) => {
	t.exports = St();
})), wt = "(min-width: 1024px)", Tt = (e) => (0, L.useSyncExternalStore)((t) => {
	let n = window.matchMedia(e);
	return n.addEventListener("change", t), () => n.removeEventListener("change", t);
}, () => window.matchMedia(e).matches), Et = () => Tt(wt), Dt = "(max-width: 600px)", Ot = () => Tt(Dt), kt = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches, At = {
	accounts: {
		emailMaxLength: 254,
		loginMaxLength: 200,
		handleMinLength: 3,
		handleMaxLength: 20,
		handleChangeDays: 30,
		handleChecksPerMinute: 60,
		copiesPerMinute: 5,
		profileDeviceIdle: 7776e6,
		deviceSeenStep: 36e5,
		userAgentMaxLength: 300,
		onlineFor: 3e5
	},
	ai: {
		defaultModel: "claude-haiku-5-5",
		requestTimeout: 6e4,
		maxTokens: 4e3,
		keyCheckTimeout: 1e4,
		callsPerMinute: 30,
		keyChecksPerMinute: 5,
		questionMaxLength: 300,
		summaryPoints: 7,
		summarySearches: 3,
		summaryContinuations: 2,
		summarySuggested: 6,
		summariesCached: 200,
		summaryKeptFor: 2592e5,
		dailySummaryMinAge: 18e5,
		dailySummaryMinStories: 12,
		dailySummaryMaxLength: 500
	},
	app: {
		frontPagePollEvery: 3e3,
		frontPagePolls: 12,
		frontPageStaleAfter: 6e5,
		dayFeedPollEvery: 3e3,
		dayFeedPolls: 12,
		dayFeedStaleAfter: 3e5,
		dailySummaryPollEvery: 4e3,
		dailySummaryPolls: 12,
		followedPollEvery: 3e3,
		followedPolls: 6,
		followedVideoWindow: 2592e5,
		searchPollEvery: 2500,
		searchPolls: 8,
		searchDebounce: 300,
		searchMinLength: 2,
		userStateRefreshAfter: 6e4,
		listenStaleAfter: 6e5,
		offlineKept: 40,
		offlineStartDelay: 5e3,
		savedTexts: 100,
		summaries: 100,
		summariesMaxAge: 2592e5,
		recentSearches: 5,
		seenStories: 200,
		seenStoriesSendAfter: 1500,
		photoSide: 256,
		photoQuality: .85,
		photoPickedMaxSize: 20971520,
		handleCheckDelay: 300,
		warmDelay: 3e3,
		speechKeepAlive: 1e4,
		dailySummaryFreshFor: 3e4,
		restartWait: 6e4
	},
	children: {
		max: 10,
		createsPerMinute: 5,
		parents: 2
	},
	myData: {
		savedMax: 500,
		readMax: 5e3,
		importSaved: 500,
		importRead: 5e3,
		importReadings: 5e3,
		importArticleSize: 409600,
		listMax: 300,
		stringMax: 300
	},
	passwords: {
		minLength: 8,
		maxLength: 256
	},
	plugins: {
		catalogUrl: "https://raw.githubusercontent.com/leclaudeur/hodi-plugin-registry/main/plugins.json",
		catalogCacheFor: 6e5,
		packageMaxSize: 52428800,
		unpackedMaxSize: 157286400,
		packageFiles: 2e3,
		zipEntries: 2e3,
		zipMaxSize: 268435456,
		stagedFor: 9e5,
		dataKeptFor: 2592e6,
		logLines: 200,
		taskTick: 6e4,
		taskEveryMin: 9e5,
		taskEveryMax: 6048e5,
		publicRequestsPerMinute: 30,
		devRequestsPerMinute: 60,
		reportRows: 8,
		loadTimeout: 5e3
	},
	profiles: {
		nameMaxLength: 24,
		photoMaxSize: 204800,
		photoSide: 1024
	},
	reading: {
		historyWindow: 6048e5,
		historyMax: 500,
		resumeWindow: 2592e5,
		resumeMax: 20,
		resumeFrom: .15,
		resumeUntil: .8,
		doneAt: .8,
		doneTime: .35,
		maxTime: 2,
		wordsPerMinute: 230,
		maxMinutesPerDay: 600
	},
	serverSettings: {
		articleDaysMin: 1,
		articleDaysMax: 14,
		articleDaysDefault: 3,
		videoDaysMin: 7,
		videoDaysMax: 180,
		videoDaysDefault: 60,
		textDaysMin: 1,
		textDaysMax: 30,
		textDaysDefault: 7,
		backupCopiesMin: 1,
		backupCopiesMax: 30,
		backupCopiesDefault: 7,
		maxSourcesMin: 10,
		maxSourcesMax: 1e3,
		maxSourcesDefault: 200
	},
	shares: {
		noteMaxLength: 140,
		lookupsPerMinute: 60,
		reportsPerDay: 5,
		reportHandledKeptFor: 2592e6
	},
	sources: {
		linkMaxLength: 500,
		foundKeptFor: 6e5,
		aiSuggestions: 4,
		readerSample: 3,
		nameMaxLength: 60,
		descriptionMaxLength: 200,
		nameSectionWords: 3,
		namePartWords: 6,
		topicsMax: 8,
		readersShownFrom: 10,
		reviewAskAgainAfter: 2592e6,
		reportsPerHour: 10,
		reportIgnoredFor: 2592e6
	},
	twoFactor: {
		recoveryCodes: 10,
		setupLifetime: 9e5
	},
	young: {
		dailyMinutesMin: 5,
		dailyMinutesMax: 240,
		dailyMinutesStep: 5,
		dailyMinutesDefault: 90,
		explainPerDayMax: 20,
		explainPerDayDefault: 5,
		pendingRequests: 3,
		idsMax: 300,
		warningBefore: 3e5
	}
}, jt = () => import("./play-YvGZ8oxx.js"), Mt = () => import("./play-D5mSPrp8.js");
At.app.warmDelay;
// web/src/lib/toast.ts
var X = !1, Z = /* @__PURE__ */ new Set(), Nt = () => {}, Pt = new Promise((e) => Nt = e), Ft = () => {
	X || (X = !0, Z.forEach((e) => e()));
};
window.addEventListener("load", () => window.setTimeout(Ft, 3e3), { once: !0 });
var It = () => (0, L.useSyncExternalStore)((e) => (Z.add(e), () => Z.delete(e)), () => X), Lt = () => Nt(), Q = null, Rt = (e) => {
	Q = e, $();
}, $ = () => {
	Q?.isConnected && (Q.matches(":popover-open") && Q.hidePopover(), Q.showPopover());
}, zt = async () => {
	Ft();
	let [{ toast: e }] = await Promise.all([Mt(), Pt]);
	return $(), e;
}, Bt = 4e3, Vt = 6e3, Ht = 2e3, Ut = (e, t) => void zt().then((n) => n.success(e, {
	duration: t ? Vt : Bt,
	action: t ? {
		label: G("common.cancel"),
		onClick: t
	} : void 0
})), Wt = (e = G("toast.saved")) => void zt().then((t) => t.success(e, {
	id: "saved",
	duration: Ht
})), Gt = (e, t, n) => void zt().then((r) => r.error(e, {
	id: n,
	duration: t ? Vt : Bt,
	action: t
}));
export { De as A, rt as C, Ie as D, Re as E, R as F, I, j as L, we as M, B as N, Ne as O, ye as P, G as S, We as T, _t as _, Wt as a, qe as b, Mt as c, kt as d, Et as f, yt as g, xt as h, Gt as i, Te as j, je as k, jt as l, Ct as m, Rt as n, Lt as o, Ot as p, Ut as r, It as s, $ as t, At as u, ht as v, H as w, nt as x, Y as y };

// node_modules/@zxcvbn-ts/core/dist/utils/helper.mjs
var e = (e, t) => {
	for (let n = 0; n < t.length; n += 1) e.push(t[n]);
}, t = /[\ud800-\udbff][\udc00-\udfff]/g, n = (e) => e >= 55296 && e <= 56319, r = (e) => e >= 56320 && e <= 57343, i = (e, t) => n(e.charCodeAt(t)) && r(e.charCodeAt(t + 1)), a = (e) => e.length - (e.match(t)?.length ?? 0), o = (e, t) => e.startsWith(t) && (e.length === t.length || e[t.length] === "-"), s = (e) => e.replace(/İ/g, "i").toLowerCase(), c = {
	4: [[1, 2], [2, 3]],
	5: [
		[1, 3],
		[2, 3],
		[2, 4]
	],
	6: [
		[1, 2],
		[2, 4],
		[4, 5]
	],
	7: [
		[1, 3],
		[2, 3],
		[4, 5],
		[4, 6]
	],
	8: [[2, 4], [4, 6]]
}, l = 1e4, u = /^[A-Z\xbf-\xdf][^A-Z\xbf-\xdf]+$/, d = /^[^A-Z\xbf-\xdf]+[A-Z\xbf-\xdf]$/, f = /^[A-Z\xbf-\xdf]+$/, p = /^[^a-z\xdf-\xff]+$/, m = /^[a-z\xdf-\xff]+$/, ee = /^[^A-Z\xbf-\xdf]+$/, te = /[a-z\xdf-\xff]/, ne = /[A-Z\xbf-\xdf]/, re = /[^A-Za-z\xbf-\xdf]/gi, ie = /^\d+$/, h = (/* @__PURE__ */ new Date()).getFullYear(), g = { recentYear: /19\d\d|20\d\d/g }, _ = [
	" ",
	",",
	";",
	":",
	"|",
	"/",
	"\\",
	"_",
	".",
	"-"
], ae = _.length, v = /* @__PURE__ */ new Set([
	" ",
	"-",
	"_",
	"."
]), oe = /[.*+?^${}()|[\]\\]/g, y = class {
	constructor(e) {
		this.options = e;
	}
}, se = class extends y {
	match({ password: e }) {
		let t = [...this.getMatchesWithoutSeparator(e), ...this.getMatchesWithSeparator(e)];
		return this.filterNoise(t);
	}
	getMatchesWithSeparator(e) {
		let t = [], n = /^(\d{1,4})([\s/\\_.-])(\d{1,2})\2(\d{1,4})$/;
		for (let r = 0; r <= Math.abs(e.length - 6); r += 1) for (let i = r + 5; i <= r + 9 && !(i >= e.length); i += 1) {
			let a = e.slice(r, i + 1), o = n.exec(a);
			if (o != null) {
				let e = this.mapIntegersToDayMonthYear([
					parseInt(o[1], 10),
					parseInt(o[3], 10),
					parseInt(o[4], 10)
				]);
				e != null && t.push({
					pattern: "date",
					token: a,
					i: r,
					j: i,
					separator: o[2],
					year: e.year,
					month: e.month,
					day: e.day
				});
			}
		}
		return t;
	}
	getMatchesWithoutSeparator(e) {
		let t = [], n = /^\d{4,8}$/, r = (e) => Math.abs(e.year - h);
		for (let i = 0; i <= Math.abs(e.length - 4); i += 1) for (let a = i + 3; a <= i + 7 && !(a >= e.length); a += 1) {
			let o = e.slice(i, a + 1);
			if (n.exec(o)) {
				let e = [];
				if (c[o.length].forEach(([t, n]) => {
					let r = this.mapIntegersToDayMonthYear([
						parseInt(o.slice(0, t), 10),
						parseInt(o.slice(t, n), 10),
						parseInt(o.slice(n), 10)
					]);
					r != null && e.push(r);
				}), e.length > 0) {
					let n = e[0], s = r(e[0]);
					e.slice(1).forEach((e) => {
						let t = r(e);
						t < s && (n = e, s = t);
					}), t.push({
						pattern: "date",
						token: o,
						i,
						j: a,
						separator: "",
						year: n.year,
						month: n.month,
						day: n.day
					});
				}
			}
		}
		return t;
	}
	filterNoise(e) {
		if (e.length === 0) return [];
		let t = [...e].sort((e, t) => e.i === t.i ? t.j - e.j : e.i - t.i), n = [], r = -1;
		for (let e of t) e.j > r && (n.push(e), r = e.j);
		return n;
	}
	mapIntegersToDayMonthYear(e) {
		if (e[1] > 31 || e[1] <= 0) return null;
		let t = 0, n = 0, r = 0;
		for (let i = 0, a = e.length; i < a; i += 1) {
			let a = e[i];
			if (a > 99 && a < 1e3 || a > 2099) return null;
			a > 31 && (n += 1), a > 12 && (t += 1), a <= 0 && (r += 1);
		}
		return n >= 2 || t === 3 || r >= 2 ? null : this.getDayMonth(e);
	}
	getDayMonth(e) {
		let t = [[e[2], e.slice(0, 2)], [e[0], e.slice(1, 3)]], n = t.length;
		for (let e = 0; e < n; e += 1) {
			let [n, r] = t[e];
			if (1e3 <= n && n <= 2099) {
				let e = this.mapIntegersToDayMonth(r);
				return e == null ? null : {
					year: n,
					month: e.month,
					day: e.day
				};
			}
		}
		for (let e = 0; e < n; e += 1) {
			let [n, r] = t[e], i = this.mapIntegersToDayMonth(r);
			if (i != null) return {
				year: this.twoToFourDigitYear(n),
				month: i.month,
				day: i.day
			};
		}
		return null;
	}
	mapIntegersToDayMonth(e) {
		let t = [e, e.slice().reverse()];
		for (let e = 0; e < t.length; e += 1) {
			let n = t[e], r = n[0], i = n[1];
			if (r >= 1 && r <= 31 && i >= 1 && i <= 12) return {
				day: r,
				month: i
			};
		}
		return null;
	}
	twoToFourDigitYear(e) {
		return e > 50 ? e + 1900 : e + 2e3;
	}
}, b = /* @__PURE__ */ new Uint32Array(65536), ce = (e, t) => {
	let n = e.length, r = t.length, i = 1 << n - 1, a = -1, o = 0, s = n, c = n;
	for (; c--;) b[e.charCodeAt(c)] |= 1 << c;
	for (c = 0; c < r; c++) {
		let e = b[t.charCodeAt(c)], n = e | o;
		e |= (e & a) + a ^ a, o |= ~(e | a), a &= e, o & i && s++, a & i && s--, o = o << 1 | 1, a = a << 1 | ~(n | o), o &= n;
	}
	for (c = n; c--;) b[e.charCodeAt(c)] = 0;
	return s;
}, le = (e, t) => {
	let n = t.length, r = e.length, i = [], a = [], o = Math.ceil(n / 32), s = Math.ceil(r / 32);
	for (let e = 0; e < o; e++) a[e] = -1, i[e] = 0;
	let c = 0;
	for (; c < s - 1; c++) {
		let o = 0, s = -1, l = c * 32, u = Math.min(32, r) + l;
		for (let t = l; t < u; t++) b[e.charCodeAt(t)] |= 1 << t;
		for (let e = 0; e < n; e++) {
			let n = b[t.charCodeAt(e)], r = a[e / 32 | 0] >>> e & 1, c = i[e / 32 | 0] >>> e & 1, l = n | o, u = ((n | c) & s) + s ^ s | n | c, d = o | ~(u | s), f = s & u;
			d >>> 31 ^ r && (a[e / 32 | 0] ^= 1 << e), f >>> 31 ^ c && (i[e / 32 | 0] ^= 1 << e), d = d << 1 | r, f = f << 1 | c, s = f | ~(l | d), o = d & l;
		}
		for (let t = l; t < u; t++) b[e.charCodeAt(t)] = 0;
	}
	let l = 0, u = -1, d = c * 32, f = Math.min(32, r - d) + d;
	for (let t = d; t < f; t++) b[e.charCodeAt(t)] |= 1 << t;
	let p = r;
	for (let e = 0; e < n; e++) {
		let n = b[t.charCodeAt(e)], o = a[e / 32 | 0] >>> e & 1, s = i[e / 32 | 0] >>> e & 1, c = n | l, d = ((n | s) & u) + u ^ u | n | s, f = l | ~(d | u), m = u & d;
		p += f >>> r - 1 & 1, p -= m >>> r - 1 & 1, f >>> 31 ^ o && (a[e / 32 | 0] ^= 1 << e), m >>> 31 ^ s && (i[e / 32 | 0] ^= 1 << e), f = f << 1 | o, m = m << 1 | s, u = m | ~(c | f), l = f & c;
	}
	for (let t = d; t < f; t++) b[e.charCodeAt(t)] = 0;
	return p;
}, ue = (e, t) => {
	if (e.length < t.length) {
		let n = t;
		t = e, e = n;
	}
	return t.length === 0 ? e.length : e.length <= 32 ? ce(e, t) : le(e, t);
}, x = "￿", de = (e, t) => {
	let n = Array.from({ length: t.length + 1 }, (e, t) => t);
	return e.forEach((e, r) => {
		let i = [r + 1];
		t.forEach((t, r) => {
			i.push(Math.min(n[r + 1] + 1, i[r] + 1, n[r] + (e === t ? 0 : 1)));
		}), n = i;
	}), n[t.length];
}, fe = (e) => {
	let t = Array.from(e), n = e.length !== t.length, r = n ? t.map((e) => e.length > 1 ? x : e).join("") : e;
	return (e, i) => e.length === i && !(n && e.includes(x)) ? ue(r, e) : de(t, Array.from(e));
}, S = (e) => {
	let t = 0;
	for (let r = 0; r < e.length; r += 1) {
		let i = e.charCodeAt(r);
		n(i) || (t |= 1 << i % 30);
	}
	return t;
}, pe = (e, t) => {
	let n = e;
	for (let e = 0; e < t; e += 1) n &= n - 1;
	return n !== 0;
}, me = /* @__PURE__ */ new WeakMap(), he = (e) => {
	let { entries: t, ranks: n } = e;
	if (n.every((e, t) => t === 0 || n[t - 1] <= e)) return;
	let r = n.map((e, t) => t).sort((e, t) => n[e] - n[t]);
	e.entries = r.map((e) => t[e]), e.ranks = r.map((e) => n[e]);
}, ge = (e) => {
	let t = me.get(e);
	if (t) return t;
	let n = /* @__PURE__ */ new Map(), { entries: r, ranks: i } = e.getEntries();
	return r.forEach((e, t) => {
		if (e === "") return;
		let r = a(e), o = n.get(r);
		o || (o = {
			entries: [],
			ranks: [],
			masks: /* @__PURE__ */ new Int32Array()
		}, n.set(r, o)), o.entries.push(e), o.ranks.push(i[t]);
	}), n.forEach((e) => {
		he(e), e.masks = Int32Array.from(e.entries, S);
	}), me.set(e, n), n;
}, _e = ({ group: { entries: e, ranks: t, masks: n }, entryLength: r, threshold: i, getDistance: a, passwordMask: o, found: s }) => {
	let c = Math.min(Math.floor(i), 30), l = s ? s.rank : Infinity;
	for (let s = 0; s < e.length && t[s] < l; s += 1) {
		let l = n[s];
		if (pe(l & ~o, c) || pe(o & ~l, c)) continue;
		let u = a(e[s], r);
		if (u <= i) return {
			rank: t[s],
			entry: e[s],
			distance: u
		};
	}
	return s;
}, ve = (e, t, n, r) => {
	let i = ge(t), o = a(e), s = fe(e), c = S(e), l = r === void 0 ? void 0 : {
		rank: r,
		entry: e,
		distance: 0
	}, u = (e) => Math.abs(e - o);
	return Array.from(i.keys()).filter((e) => u(e) <= n).sort((e, t) => u(e) - u(t)).forEach((e) => {
		l = _e({
			group: i.get(e),
			entryLength: e,
			threshold: n,
			getDistance: s,
			passwordMask: c,
			found: l
		});
	}), l;
}, C = class {
	constructor(e, t) {
		this.wordIndex = e, this.userInputsWordIndex = t, this.range = /* @__PURE__ */ new Int32Array(2), this.userInputsRange = /* @__PURE__ */ new Int32Array(2);
	}
	reset() {
		this.range[0] = 0, this.range[1] = this.wordIndex.words.length, this.userInputsRange[0] = 0, this.userInputsRange[1] = this.userInputsWordIndex ? this.userInputsWordIndex.words.length : 0;
	}
	copy({ range: e, userInputsRange: t }) {
		this.range[0] = e[0], this.range[1] = e[1], this.userInputsRange[0] = t[0], this.userInputsRange[1] = t[1];
	}
	narrow(e, t) {
		let n = 0;
		return this.range[0] < this.range[1] && (this.wordIndex.narrow(this.range, e, t), n += 1), this.userInputsWordIndex && this.userInputsRange[0] < this.userInputsRange[1] && (this.userInputsWordIndex.narrow(this.userInputsRange, e, t), n += 1), n;
	}
	isEmpty() {
		return this.range[0] >= this.range[1] && this.userInputsRange[0] >= this.userInputsRange[1];
	}
	getWord(e) {
		return this.range[0] < this.range[1] && this.wordIndex.words[this.range[0]].length === e ? this.range[0] : -1;
	}
	getUserInputsRank(e) {
		return this.userInputsWordIndex && this.userInputsRange[0] < this.userInputsRange[1] && this.userInputsWordIndex.words[this.userInputsRange[0]].length === e ? this.userInputsWordIndex.getRank(this.userInputsRange[0], 0) : void 0;
	}
	getUserInput() {
		return this.userInputsWordIndex.words[this.userInputsRange[0]];
	}
}, w = "userInputs", T = (e) => {
	let t = e.dictionaryNames.indexOf(w);
	return t === -1 ? e.dictionaryNames.length : t;
}, E = /* @__PURE__ */ new WeakMap(), ye = (e) => {
	let t = E.get(e);
	return t === void 0 && (t = e.words.reduce((e, t) => Math.max(e, a(t)), 0), E.set(e, t)), t;
}, be = (e, t) => ({
	getEntries: () => {
		let { entries: n, ranks: r } = e.getEntries(), i = new Set(n), a = t.getEntries();
		return a.entries.forEach((e, t) => {
			i.has(e) || (n.push(e), r.push(a.ranks[t]));
		}), {
			entries: n,
			ranks: r
		};
	},
	getRank: (n) => e.getRank(n) ?? t.getRank(n)
}), D = /* @__PURE__ */ new WeakMap(), xe = (e, t) => {
	let n = D.get(e);
	n || (n = /* @__PURE__ */ new WeakMap(), D.set(e, n));
	let r = n.get(t);
	if (!r) {
		let i = t.getLevenshteinDictionary(0), a = e.dictionaryNames.indexOf(w);
		r = a === -1 ? i : be(i, e.getLevenshteinDictionary(a)), n.set(t, r);
	}
	return r;
}, O = class extends y {
	match({ password: e, userInputsOptions: t }) {
		let n = [], r = e.length, i = s(e), { wordIndex: a, useLevenshteinDistance: o } = this.options, c = T(a), l = t?.wordIndex, u = (t, r, a) => {
			let o = i.slice(t, r + 1);
			a.forEach(({ dictionaryName: i, rank: a, ...s }) => {
				n.push({
					pattern: "dictionary",
					i: t,
					j: r,
					token: e.slice(t, r + 1),
					matchedWord: o,
					rank: a,
					dictionaryName: i,
					reversed: !1,
					l33t: !1,
					...s
				});
			});
		}, d = new C(a, l);
		for (let e = 0; e < r; e += 1) {
			d.reset();
			for (let t = e; t < r; t += 1) {
				let n = t - e;
				if (d.narrow(n, i.charCodeAt(t)), d.isEmpty()) break;
				let a = e === 0 && t === r - 1;
				if (o && a) break;
				let s = d.getWord(n + 1), l = d.getUserInputsRank(n + 1);
				(s !== -1 || l !== void 0) && u(e, t, this.getHits(s, l, c));
			}
			e === 0 && o && u(0, r - 1, this.getLevenshteinHits(i, l));
		}
		return n;
	}
	getHits(e, t, n) {
		let { wordIndex: r } = this.options, { dictionaryNames: i, hitStart: a, hitDictionary: o, hitRank: s } = r, c = [], l = t;
		if (e !== -1) for (let t = a[e]; t < a[e + 1]; t += 1) {
			let e = o[t];
			l !== void 0 && e >= n && (c.push({
				dictionaryName: w,
				rank: l
			}), l = void 0, e === n) || c.push({
				dictionaryName: i[e],
				rank: s[t]
			});
		}
		return l !== void 0 && c.push({
			dictionaryName: w,
			rank: l
		}), c;
	}
	getLevenshteinHits(e, t) {
		let { wordIndex: n, dictionaryMaxWordSizes: r, levenshteinThreshold: i } = this.options, { dictionaryNames: o } = n, s = a(e), c = [], l = (t, n, r) => {
			let a = n.getRank(e), o = s - r > i ? void 0 : ve(e, n, i, a);
			o && o.entry !== e ? c.push({
				dictionaryName: t,
				rank: o.rank,
				levenshteinDistance: o.distance,
				levenshteinDistanceEntry: o.entry
			}) : a !== void 0 && c.push({
				dictionaryName: t,
				rank: a
			});
		}, u = T(n);
		for (let e = 0; e <= o.length; e += 1) if (e === u && t) l(w, xe(n, t), Math.max(ye(t), r[w] || 0));
		else if (e < o.length) {
			let t = o[e];
			l(t, n.getLevenshteinDictionary(e), r[t]);
		}
		return c;
	}
}, Se = class {
	constructor({ substr: e, limit: t, trieRoot: n }) {
		this.buffer = [], this.finalPasswords = [], this.substr = e, this.limit = t, this.trieRoot = n;
	}
	getAllPossibleSubsAtIndex(e) {
		let t = [], n = this.trieRoot;
		for (let r = e; r < this.substr.length; r += 1) {
			let e = this.substr.charAt(r);
			if (n = n.getChild(e), !n) break;
			t.push(n);
		}
		return t;
	}
	helper({ index: e, subIndex: t, changes: n, lastSubLetter: r, consecutiveSubCount: i }) {
		if (this.finalPasswords.length >= this.limit) return;
		if (e === this.substr.length) {
			this.finalPasswords.push({
				password: this.buffer.join(""),
				changes: n
			});
			return;
		}
		let a = [...this.getAllPossibleSubsAtIndex(e)], o = !1;
		for (let s = e + a.length - 1; s >= e; --s) {
			let c = a[s - e], l = c.parents.join("");
			if (c.isTerminal()) {
				if (r === l && i >= 3) continue;
				o = !0;
				let a = c.subs;
				for (let o of a) {
					this.buffer.push(o);
					let a = n.concat({
						i: t,
						letter: o,
						substitution: l
					});
					if (this.helper({
						index: e + l.length,
						subIndex: t + o.length,
						changes: a,
						lastSubLetter: l,
						consecutiveSubCount: r === l ? i + 1 : 1
					}), this.buffer.pop(), this.finalPasswords.length >= this.limit) return;
				}
			}
		}
		if (!o) {
			let a = this.substr.charAt(e);
			this.buffer.push(a), this.helper({
				index: e + 1,
				subIndex: t + 1,
				changes: n,
				lastSubLetter: r,
				consecutiveSubCount: i
			}), this.buffer.pop();
		}
	}
	getAll() {
		return this.helper({
			index: 0,
			subIndex: 0,
			changes: [],
			lastSubLetter: void 0,
			consecutiveSubCount: 0
		}), this.finalPasswords;
	}
}, Ce = (e, t, n) => new Se({
	substr: e,
	limit: t,
	trieRoot: n
}).getAll(), we = 1e5, Te = (e) => {
	let t = [], n = [], r = /* @__PURE__ */ new Set();
	return e.forEach(({ letter: e, substitution: i }) => {
		let a = `${e}-${i}`;
		r.has(a) || (r.add(a), t.push({
			letter: e,
			substitution: i
		}), n.push(`${i} -> ${e}`));
	}), {
		subs: t,
		subDisplay: n.join(", ")
	};
}, Ee = class {
	constructor(e) {
		this.changes = [], this.rangesByDepth = [], this.start = 0, this.substitutionsAt = [], this.lastSubstitution = -1, this.narrowCount = 0, this.narrowLimit = 0, this.stopped = !1, this.largestShare = 0, this.options = e, this.password = e.password, this.passwordLower = s(e.password);
		for (let e = 0; e < this.password.length; e += 1) {
			let t = this.getSubstitutionsAt(e);
			this.substitutionsAt.push(t), t.length > 0 && (this.lastSubstitution = e);
		}
	}
	run() {
		this.ensureRanges(0);
		let e = this.walkEveryStart();
		for (; e.length > 0 && this.narrowCount < this.options.budget;) this.largestShare *= 2, e = e.filter((e) => this.walkStart(e, this.largestShare));
	}
	walkEveryStart() {
		let e = [];
		for (let t = 0; t <= this.lastSubstitution; t += 1) {
			let n = this.lastSubstitution - t + 1, r = Math.max(0, this.options.budget - this.narrowCount), i = Math.ceil(r / n);
			this.largestShare = Math.max(this.largestShare, i), this.walkStart(t, i) && e.push(t);
		}
		return e;
	}
	walkStart(e, t) {
		return this.start = e, this.rangesByDepth[0].reset(), this.narrowLimit = Math.min(this.narrowCount + t, this.options.budget), this.stopped = !1, this.walk(e, 0), this.stopped;
	}
	hasBudget() {
		return this.narrowCount >= this.narrowLimit ? (this.stopped = !0, !1) : !0;
	}
	ensureRanges(e) {
		let { wordIndex: t, userInputsWordIndex: n } = this.options;
		for (let r = this.rangesByDepth.length; r <= e; r += 1) this.rangesByDepth.push(new C(t, n));
	}
	narrow(e, t) {
		this.ensureRanges(e + t.length);
		let n = this.rangesByDepth[e + t.length];
		n.copy(this.rangesByDepth[e]);
		for (let r = 0; r < t.length; r += 1) if (this.narrowCount += n.narrow(e + r, t.charCodeAt(r)), n.isEmpty()) return !1;
		return !0;
	}
	emit(e, t) {
		let { wordIndex: n, onWord: r } = this.options, i = this.rangesByDepth[t], a = i.getWord(t), o = i.getUserInputsRank(t);
		(a !== -1 || o !== void 0) && r({
			i: this.start,
			j: e - 1,
			matchedWord: a === -1 ? i.getUserInput() : n.words[a],
			word: a,
			userInputsRank: o,
			changes: this.changes
		});
	}
	getSubstitutionsAt(e) {
		let { substitutions: t } = this.options, n = this.passwordLower.charAt(e), r = this.password.charAt(e), i = (t.get(n) || []).filter(({ substitution: t }) => this.passwordLower.startsWith(t, e) || this.password.startsWith(t, e));
		return r !== n && (t.get(r) || []).forEach((t) => {
			this.password.startsWith(t.substitution, e) && i.push(t);
		}), i;
	}
	walk(e, t) {
		if (t > 0 && this.changes.length > 0 && this.emit(e, t), !(e === this.password.length || this.changes.length === 0 && e > this.lastSubstitution)) {
			for (let { substitution: n, letters: r, lettersLower: i } of this.substitutionsAt[e]) for (let a = 0; a < r.length; a += 1) {
				let o = i[a];
				this.hasBudget() && this.narrow(t, o) && (this.changes.push({
					i: e,
					letter: r[a],
					substitution: n
				}), this.walk(e + n.length, t + o.length), this.changes.pop());
			}
			this.hasBudget() && this.narrow(t, this.passwordLower.charAt(e)) && this.walk(e + 1, t + 1);
		}
	}
}, De = class extends O {
	constructor() {
		super(...arguments), this.narrowBudget = we;
	}
	match({ password: e, userInputsOptions: t }) {
		let n = [], r = /* @__PURE__ */ new Set(), { wordIndex: i } = this.options, o = t?.wordIndex, c = ({ i: t, j: i, matchedWord: o, changes: c }, l, u) => {
			let d = `${t}\u0000${i}\u0000${o}`;
			if (u.has(d)) return;
			u.add(d);
			let f = e.slice(t, i + 1);
			if (s(f) === o || a(f) <= 1) return;
			let p;
			l().forEach(({ dictionaryName: e, rank: a, ...s }) => {
				let l = `${d}\u0000${e}`;
				r.has(l) || (r.add(l), p ??= Te(c), n.push({
					pattern: "dictionary",
					i: t,
					j: i,
					token: f,
					matchedWord: o,
					rank: a,
					dictionaryName: e,
					reversed: !1,
					l33t: !0,
					...s,
					...p
				}));
			});
		};
		if (this.options.useLevenshteinDistance) {
			let t = /* @__PURE__ */ new Set();
			Ce(e, this.options.l33tMaxSubstitutions, this.options.trieNodeRoot).forEach(({ password: n, changes: r }) => {
				if (r.length === 0) return;
				let i = s(n);
				c({
					i: 0,
					j: e.length - 1,
					matchedWord: i,
					changes: r
				}, () => this.getLevenshteinHits(i, o), t);
			});
		}
		let l = T(i), u = /* @__PURE__ */ new Set();
		return new Ee({
			password: e,
			substitutions: this.options.l33tSubstitutions,
			wordIndex: i,
			userInputsWordIndex: o,
			budget: this.narrowBudget,
			onWord: (e) => {
				c(e, () => this.getHits(e.word, e.userInputsRank, l), u);
			}
		}).run(), n;
	}
}, Oe = class extends O {
	match(e) {
		let t = Array.from(e.password).reverse().join("");
		return super.match({
			...e,
			password: t
		}).map((t) => ({
			...t,
			token: Array.from(t.token).reverse().join(""),
			reversed: !0,
			i: e.password.length - 1 - t.j,
			j: e.password.length - 1 - t.i
		}));
	}
}, ke = class extends y {
	match({ password: e }) {
		let t = [];
		return Object.keys(g).forEach((n) => {
			let r = g[n];
			r.lastIndex = 0;
			let i;
			for (; i = r.exec(e);) {
				let e = i[0];
				t.push({
					pattern: "regex",
					token: e,
					i: i.index,
					j: i.index + i[0].length - 1,
					regexName: n,
					regexMatch: i
				});
			}
		}), t;
	}
}, Ae = Math.log(10), k = [1], A = {
	nCk(e, t) {
		let n = e;
		if (t > n) return 0;
		if (t === 0) return 1;
		let r = 1;
		for (let e = 1; e <= t; e += 1) r *= n, r /= e, --n;
		return r;
	},
	factorial(e) {
		for (let t = k.length; t <= e; t += 1) k[t] = k[t - 1] * t;
		return k[e];
	},
	log10(e) {
		return e === 0 ? 0 : Math.log(e) / Ae;
	}
}, j = (e) => {
	let t = 10 ** e;
	t === Infinity && (t = Number.MAX_VALUE);
	let n;
	return n = e === 1 ? 11 : 51, Math.max(t, n);
}, je = ({ token: e }) => j(a(e)), Me = ({ year: e, separator: t }) => {
	let n = Math.max(Math.abs(e - h), 21) * 365;
	return t && (n *= 4), n;
}, Ne = (e) => {
	let t = e.split(""), n = t.filter((e) => e.match(ne)).length, r = t.filter((e) => e.match(te)).length, i = 0, a = Math.min(n, r);
	for (let e = 1; e <= a; e += 1) i += A.nCk(n + r, e);
	return i;
}, Pe = (e) => {
	let t = e.replace(re, "");
	if (t.match(ee) || t.toLowerCase() === t) return 1;
	let n = [
		u,
		d,
		p
	], r = n.length;
	for (let e = 0; e < r; e += 1) {
		let r = n[e];
		if (t.match(r)) return 2;
	}
	return Ne(t);
}, M = (e, t) => {
	let n = 0, r = e.indexOf(t);
	for (; r >= 0;) n += 1, r = e.indexOf(t, r + t.length);
	return n;
}, Fe = ({ sub: e, token: t }) => {
	let n = t.toLowerCase();
	return {
		subbedCount: M(n, e.substitution),
		unsubbedCount: M(n, e.letter)
	};
}, Ie = ({ l33t: e, subs: t, token: n }) => {
	if (!e) return 1;
	let r = 1;
	return t.forEach((e) => {
		let { subbedCount: t, unsubbedCount: i } = Fe({
			sub: e,
			token: n
		});
		if (t === 0 || i === 0) r *= 2;
		else {
			let e = Math.min(i, t), n = 0;
			for (let r = 1; r <= e; r += 1) n += A.nCk(i + t, r);
			r *= n;
		}
	}), r;
}, Le = ({ rank: e, reversed: t, l33t: n, subs: r, token: i, dictionaryName: a }) => {
	let s = e, c = Pe(i), l = Ie({
		l33t: n,
		subs: r,
		token: i
	}), u = t && 2 || 1, d;
	return d = o(a, "diceware") ? 3888 : s * c * l * u, {
		baseGuesses: s,
		uppercaseVariations: c,
		l33tVariations: l,
		calculation: d
	};
}, Re = ({ regexName: e, regexMatch: t, token: n }) => {
	let r = {
		alphaLower: 26,
		alphaUpper: 26,
		alpha: 52,
		alphanumeric: 62,
		digits: 10,
		symbols: 33
	};
	return e in r ? r[e] ** n.length : e === "recentYear" ? Math.max(Math.abs(parseInt(t[0], 10) - h), 21) : 0;
}, ze = ({ baseGuesses: e, repeatCount: t }) => e * t, Be = ({ token: e, ascending: t }) => {
	let n = e.charAt(0), r;
	return r = [
		"a",
		"A",
		"z",
		"Z",
		"0",
		"1",
		"9"
	].includes(n) ? 4 : /\d/.exec(n) ? 10 : 26, t || (r *= 2), r * a(e);
}, Ve = (e) => {
	let t = 0;
	return Object.keys(e).forEach((n) => {
		let r = e[n];
		t += r.filter((e) => !!e).length;
	}), t /= Object.entries(e).length, t;
}, He = (e, { token: t, turns: n }) => {
	let r = Object.keys(e).length, i = Ve(e), a = 0, o = t.length;
	for (let e = 2; e <= o; e += 1) {
		let t = Math.min(n, e - 1);
		for (let n = 1; n <= t; n += 1) a += A.nCk(e - 1, n - 1) * r * i ** n;
	}
	return a;
}, Ue = ({ graph: e, token: t, shiftedCount: n, turns: r }, i) => {
	let a = He(i.graphs[e], {
		token: t,
		turns: r
	});
	if (n) {
		let e = t.length - n;
		if (n === 0 || e === 0) a *= 2;
		else {
			let t = 0;
			for (let r = 1; r <= Math.min(n, e); r += 1) t += A.nCk(n + e, r);
			a *= t;
		}
	}
	return Math.round(a);
}, We = () => ae, N = (e) => e.reduce((e, t) => e * t, 1), P = (e) => v.has(e[0]) ? v.size : 26, F = (e) => new Set(e).size === 1 ? P(e) * e.length : P(e) ** e.length, Ge = (e = []) => {
	let t = e.filter((e) => e !== "");
	if (t.length === 0) return 1;
	let n = t.length === e.length ? 1 : 2 ** e.length;
	return new Set(t).size === 1 ? n * F(t[0]) : new Set(t.join("")).size === 1 ? n * P(t[0]) * N(t.map((e) => e.length)) : n * N(t.map((e) => F(e)));
}, Ke = (e) => e.pattern === "wordSequence" ? A.factorial(e.wordCount) * 2 ** (e.wordCount - 2) * Ge(e.separators) : 0, I = (e, t) => {
	let n = 1;
	return e.token.length < t.length && (n = e.token.length <= 2 && a(e.token) === 1 ? 10 : 50), n;
}, L = {
	bruteforce: je,
	date: Me,
	dictionary: Le,
	regex: Re,
	repeat: ze,
	sequence: Be,
	spatial: Ue,
	separator: We,
	wordSequence: Ke
}, qe = (e, t, n) => L[t] ? L[t](n, e) : e.matchers[t] && "scoring" in e.matchers[t] ? e.matchers[t].scoring(n, e) : 0, R = /* @__PURE__ */ new WeakMap(), Je = (e, t) => {
	let n = qe(e, t.pattern, t);
	return typeof n == "number" ? n : t.pattern === "dictionary" ? (t.baseGuesses = n.baseGuesses, t.uppercaseVariations = n.uppercaseVariations, t.l33tVariations = n.l33tVariations, n.calculation) : 0;
}, z = (e, t, n) => {
	if ("guesses" in t && t.guesses != null) {
		let e = t.guesses > 50 ? void 0 : R.get(t);
		if (e === void 0 || e === I(t, n)) return t;
	}
	let r = I(t, n), i = t, a = Math.max(Je(e, i), r);
	return i.guesses = a, a <= 50 && R.set(i, r), i.guessesLog10 = A.log10(a), i;
}, Ye = (e) => typeof e == "number" || e.pattern === "bruteforce", Xe = 1e-9, B = class {
	constructor(e) {
		this.options = e, this.password = "", this.state = {
			bestMatches: [],
			guessesProduct: [],
			totalGuesses: []
		}, this.excludeAdditive = !1, this.factorials = [1], this.additivePenalties = [1], this.bestUpTo = /* @__PURE__ */ new Float64Array(1), this.endIndex = 0, this.characterCounts = /* @__PURE__ */ new Int32Array(1), this.bruteforceGuessesByLength = [], this.startBounds = /* @__PURE__ */ new Float64Array(1), this.startLengths = [];
	}
	makeBruteforceMatch(e, t) {
		return {
			pattern: "bruteforce",
			token: this.password.slice(e, t + 1),
			i: e,
			j: t
		};
	}
	prepare(e) {
		let t = e.length;
		this.factorials = [1], this.additivePenalties = [1], this.bruteforceGuessesByLength = [j(0)];
		for (let e = 1; e <= t + 1; e += 1) this.factorials[e] = A.factorial(e), this.additivePenalties[e] = l ** (e - 1), this.bruteforceGuessesByLength[e] = j(e);
		this.bestUpTo = new Float64Array(t + 2), this.prepareCharacterCounts(e), this.startBounds = new Float64Array(t), this.startLengths = [], this.state = {
			bestMatches: Array.from({ length: t }, () => []),
			guessesProduct: Array.from({ length: t }, () => []),
			totalGuesses: Array.from({ length: t }, () => [])
		};
	}
	prepareCharacterCounts(e) {
		let t = e.length;
		this.characterCounts = new Int32Array(t + 1);
		for (let n = 0; n < t; n += 1) {
			let t = n > 0 && i(e, n - 1);
			this.characterCounts[n + 1] = this.characterCounts[n] + +!t;
		}
	}
	countTokenCharacters(e, t) {
		let n = this.characterCounts, r = n[t + 1] - n[e];
		return n[e + 1] === n[e] && (r += 1), r;
	}
	update(e, t, n) {
		let { endIndex: r } = this, i = t;
		if (n > 1) {
			let t = typeof e == "number" ? e : e.i;
			i *= this.state.guessesProduct[t - 1][n - 1];
		}
		let a = this.factorials[n] * i;
		this.excludeAdditive || (a += this.additivePenalties[n]);
		let o = this.state.totalGuesses[r], { bestUpTo: s } = this;
		if (a === Infinity) {
			let e = Math.min(n, o.length - 1);
			for (let t = 1; t <= e; t += 1) if (o[t] !== void 0) return;
		} else if (s[n] <= a) return;
		for (let e = n; e <= r + 1 && s[e] > a; e += 1) s[e] = a;
		o[n] = a, this.state.bestMatches[r][n] = e, this.state.guessesProduct[r][n] = i;
	}
	boundStart(e) {
		let t = this.state.bestMatches[e - 1], n = this.state.guessesProduct[e - 1], r = [], i = Infinity;
		for (let e = 1; e < t.length; e += 1) {
			let a = t[e];
			a !== void 0 && !Ye(a) && (r.push(e), i = Math.min(i, Math.log10(this.factorials[e + 1] * n[e])));
		}
		this.startBounds[e] = i - this.characterCounts[e], this.startLengths[e] = r;
	}
	bruteforceUpdate(e) {
		this.update(0, this.bruteforceGuessesByLength[this.countTokenCharacters(0, e)], 1);
		let t = Math.log10(this.bestUpTo[2]) - this.characterCounts[e + 1] + Xe;
		for (let n = 1; n <= e; n += 1) {
			if (this.startBounds[n] >= t) continue;
			let r = this.startLengths[n], i = this.bruteforceGuessesByLength[this.countTokenCharacters(n, e)];
			for (let e of r) this.update(n, i, e + 1);
		}
	}
	step(e, t) {
		this.endIndex = e, this.bestUpTo.fill(Infinity, 0, e + 2), t.forEach((e) => {
			let t = z(this.options, e, this.password), { i: n, guesses: r } = t;
			if (n > 0) {
				let e = this.state.bestMatches[n - 1];
				for (let n = 1; n < e.length; n += 1) e[n] !== void 0 && this.update(t, r, n + 1);
			} else this.update(t, r, 1);
		}), this.bruteforceUpdate(e), e + 1 < this.password.length && this.boundStart(e + 1);
	}
	getBestSequenceLength(e) {
		let t = 0, n = Infinity, r = this.state.totalGuesses[e - 1];
		if (r) for (let e = 1; e < r.length; e += 1) {
			let i = r[e];
			i !== void 0 && i < n && (t = e, n = i);
		}
		return t;
	}
	unwind(e) {
		let t = [], n = e - 1, r = this.getBestSequenceLength(e);
		for (; n >= 0;) {
			let e = this.state.bestMatches[n][r], i = typeof e == "number" ? z(this.options, this.makeBruteforceMatch(e, n), this.password) : e;
			t.unshift(i), n = i.i - 1, --r;
		}
		return t;
	}
	mostGuessableMatchSequence(e, t, n = !1) {
		this.password = e, this.excludeAdditive = n;
		let r = e.length, i = Array.from({ length: r }, () => []);
		t.forEach((e) => {
			i[e.j].push(e);
		}), i.forEach((e) => e.sort((e, t) => e.i - t.i)), this.prepare(e);
		for (let e = 0; e < r; e += 1) this.step(e, i[e]);
		let a = this.unwind(r), o = a.length, s = this.getGuesses(e, o);
		return {
			password: e,
			guesses: s,
			guessesLog10: A.log10(s),
			sequence: a
		};
	}
	getGuesses(e, t) {
		let n = e.length;
		return e.length === 0 ? 1 : this.state.totalGuesses[n - 1][t];
	}
}, V = class e extends y {
	constructor(e) {
		super(e), this.scoring = new B(e);
	}
	match(e) {
		let { password: t } = e, n = /* @__PURE__ */ new Map(), r = [], i = 0;
		for (; i < t.length;) {
			let a = this.getGreedyMatch(t, i), o = this.getLazyMatch(t, i);
			if (a == null) break;
			let { match: s, baseToken: c } = this.setMatchToken(a, o);
			if (s) {
				let t = s.index + s[0].length - 1, a = this.getBaseGuesses(c, e, n);
				r.push(this.normalizeMatch(c, t, s, a)), i = t + 1;
			}
		}
		return r.some((e) => e instanceof Promise) ? Promise.all(r) : r;
	}
	normalizeMatch(e, t, n, r) {
		let i = {
			pattern: "repeat",
			i: n.index,
			j: t,
			token: n[0],
			baseToken: e,
			baseGuesses: 0,
			repeatCount: n[0].length / e.length
		};
		return r instanceof Promise ? r.then((e) => ({
			...i,
			baseGuesses: e
		})) : {
			...i,
			baseGuesses: r
		};
	}
	getGreedyMatch(t, n) {
		return e.GREEDY.lastIndex = n, e.GREEDY.exec(t);
	}
	getLazyMatch(t, n) {
		return e.LAZY.lastIndex = n, e.LAZY.exec(t);
	}
	setMatchToken(t, n) {
		let r, i = "";
		if (n && t[0].length > n[0].length) {
			r = t;
			let n = e.LAZY_ANCHORED.exec(r[0]);
			n && (i = n[1]);
		} else r = n, r && (i = r[1]);
		return {
			match: r,
			baseToken: i
		};
	}
	getBaseGuesses(e, { omniMatch: t, userInputsOptions: n }, r) {
		if (r.has(e)) return r.get(e);
		let i = t.match(e, n), a;
		return a = i instanceof Promise ? i.then((t) => this.scoring.mostGuessableMatchSequence(e, t).guesses) : this.scoring.mostGuessableMatchSequence(e, i).guesses, r.set(e, a), a;
	}
};
V.GREEDY = /(.+)\1+/gu, V.LAZY = /(.+?)\1+/gu, V.LAZY_ANCHORED = /^(.+?)\1+$/u;
// node_modules/@zxcvbn-ts/core/dist/matcher/sequence/matching.mjs
var Ze = class extends y {
	constructor() {
		super(...arguments), this.MAX_DELTA = 5;
	}
	match({ password: e }) {
		let t = [], n = Array.from(e);
		if (n.length <= 1) return [];
		let r = [], i = 0;
		n.forEach((e) => {
			r.push(i), i += e.length;
		});
		let a = (e) => r[e] + n[e].length - 1, o = 0, s = null, c = n.length;
		for (let i = 1; i < c; i += 1) {
			let c = n[i].codePointAt(0) - n[i - 1].codePointAt(0);
			if (s === null && (s = c), c !== s) {
				let n = i - 1;
				this.update({
					i: r[o],
					j: a(n),
					characterCount: n - o + 1,
					delta: s,
					password: e,
					result: t
				}), o = n, s = c;
			}
		}
		return this.update({
			i: r[o],
			j: a(c - 1),
			characterCount: c - o,
			delta: s,
			password: e,
			result: t
		}), t;
	}
	update({ i: e, j: t, characterCount: n, delta: r, password: i, result: a }) {
		if (n > 2 || Math.abs(r) === 1) {
			let n = Math.abs(r);
			if (n > 0 && n <= this.MAX_DELTA) {
				let n = i.slice(e, t + 1), { sequenceName: o, sequenceSpace: s } = this.getSequence(n);
				return a.push({
					pattern: "sequence",
					i: e,
					j: t,
					token: n,
					sequenceName: o,
					sequenceSpace: s,
					ascending: r > 0
				});
			}
		}
		return null;
	}
	getSequence(e) {
		let t = "unicode", n = 26;
		return m.test(e) ? (t = "lower", n = 26) : f.test(e) ? (t = "upper", n = 26) : ie.test(e) && (t = "digits", n = 10), {
			sequenceName: t,
			sequenceSpace: n
		};
	}
}, H = class t extends y {
	match({ password: t }) {
		let n = [];
		return Object.keys(this.options.graphs).forEach((r) => {
			let i = this.options.graphs[r];
			e(n, this.helper(t, i, r));
		}), n;
	}
	checkIfShifted(e, n, r) {
		return !e.includes("keypad") && t.SHIFTED_RX.test(n.charAt(r)) ? 1 : 0;
	}
	helper(e, t, n) {
		let r, i = [], a = 0, o = e.length;
		for (; a < o - 1;) {
			let s = a + 1, c = null, l = 0;
			r = this.checkIfShifted(n, e, a);
			let u = t[e.charAt(a)] || [];
			for (;;) {
				let d = !1, f = -1;
				if (s < o) {
					let t = e.charAt(s), n = u.length;
					for (let e = 0; e < n; e += 1) {
						let n = u[e];
						if (f += 1, n) {
							let e = n.indexOf(t);
							if (e !== -1) {
								d = !0, e === 1 && (r += 1);
								let t = f;
								c !== t && (l += 1, c = t);
								break;
							}
						}
					}
				}
				if (d) u = t[e.charAt(s)] || [], s += 1;
				else {
					s - a > 2 && i.push({
						pattern: "spatial",
						i: a,
						j: s - 1,
						token: e.slice(a, s),
						graph: n,
						turns: l,
						shiftedCount: r
					}), a = s;
					break;
				}
			}
		}
		return i;
	}
};
H.SHIFTED_RX = /[~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?]/;
// node_modules/@zxcvbn-ts/core/dist/matcher/separator/matching.mjs
var Qe = new Set(_), $e = class e extends y {
	static getMostUsedSeparatorChar(e) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) Qe.has(n) && t.set(n, (t.get(n) || 0) + 1);
		let n, r = 0;
		for (let [e, i] of t.entries()) i > r && (r = i, n = e);
		if (!(r < 2)) return n;
	}
	static getSeparatorRegex(e) {
		let t = e.replace(oe, "\\$&");
		return RegExp(`([^${t}\n])(${t})(?!${t})`, "g");
	}
	match({ password: t }) {
		let n = [];
		if (t.length === 0) return n;
		let r = e.getMostUsedSeparatorChar(t);
		if (r === void 0) return n;
		let i = e.getSeparatorRegex(r);
		for (let e of t.matchAll(i)) {
			let t = e.index + 1;
			n.push({
				pattern: "separator",
				token: r,
				i: t,
				j: t
			});
		}
		return n;
	}
}, et = (e) => {
	for (let t of e) if (!v.has(t)) return !1;
	return !0;
}, tt = class extends y {
	match(e) {
		let { password: t, matches: n = [] } = e, r = n.filter((e) => e.pattern === "dictionary" && this.options.isWordSequence(e.dictionaryName)), i = this.filterDictionaryMatches(r);
		return this.findWordSequences(i, t);
	}
	filterDictionaryMatches(e) {
		return e.sort((e, t) => e.i === t.i ? e.j === t.j ? e.reversed === t.reversed ? e.l33t === t.l33t ? e.rank - t.rank : e.l33t ? 1 : -1 : e.reversed ? 1 : -1 : e.j - t.j : e.i - t.i).reduce((e, t) => {
			let n = e[e.length - 1];
			return (!n || t.i > n.j) && e.push(t), e;
		}, []);
	}
	findWordSequences(e, t) {
		let n = [];
		if (e.length === 0) return n;
		for (let r = 0; r < e.length; r += 1) {
			let i = this.findSequencesFromStart(e, r, t);
			n.push(...i);
		}
		return n;
	}
	findSequencesFromStart(e, t, n) {
		let r = [], i = [e[t]];
		for (let a = t + 1; a < e.length; a += 1) {
			let t = e[a];
			if (!this.isValidWordSequence(i, t, n)) break;
			let o = i[i.length - 1];
			i.length > 1 && t.i - o.j > 2 && r.push(this.createWordSequenceMatch(i, n)), i.push(t);
		}
		return i.length > 1 && r.push(this.createWordSequenceMatch(i, n)), r;
	}
	isValidWordSequence(e, t, n) {
		let r = e[e.length - 1], i = n.slice(r.j + 1, t.i), a = et(i), o = i.length === 1 && i === i.toUpperCase() && i !== i.toLowerCase();
		return a || o;
	}
	createWordSequenceMatch(e, t) {
		let n = e[0], r = e[e.length - 1], i = e.map((e) => e.matchedWord), a = e.slice(1).map((n, r) => t.slice(e[r].j + 1, n.i)), o = e.map((e) => e.rank), s = o.every((e, t) => t === 0 || e >= o[t - 1]), c = e.map((e) => e.dictionaryName), l = this.getMostCommon(c) || n.dictionaryName;
		return {
			pattern: "wordSequence",
			i: n.i,
			j: r.j,
			token: t.slice(n.i, r.j + 1),
			words: i,
			wordCount: i.length,
			dictionaryName: l,
			ascending: s,
			separators: a
		};
	}
	getMostCommon(e) {
		if (e.length === 0) return null;
		let t = /* @__PURE__ */ new Map(), n = 0, r = null;
		return e.forEach((e) => {
			let i = (t.get(e) || 0) + 1;
			t.set(e, i), i > n && (n = i, r = e);
		}), r;
	}
}, U = 24, nt = (e) => {
	let t = 0;
	e.forEach(({ words: e }) => {
		t += e.length;
	});
	let n = {
		words: Array(t),
		dictionaries: new Uint16Array(t),
		ranks: new Int32Array(t)
	}, r = 0;
	return e.forEach(({ words: e }, t) => {
		for (let i = 0; i < e.length; i += 1) n.words[r] = String(e[i]), n.dictionaries[r] = t, n.ranks[r] = i + 1, r += 1;
	}), n;
}, rt = (e) => {
	let t = /* @__PURE__ */ new Uint32Array(65536);
	e.forEach((e) => {
		for (let n = 0; n < e.length; n += 1) t[e.charCodeAt(n)] = 1;
	});
	let n = 0;
	for (let e = 0; e < t.length; e += 1) t[e] !== 0 && (n += 1, t[e] = n);
	return {
		ids: t,
		count: n
	};
}, it = class {
	constructor(e) {
		this.words = e, this.keys = /* @__PURE__ */ new Uint16Array(), this.ids = /* @__PURE__ */ new Uint32Array(), this.idCount = 0, this.countsByDepth = [], this.idsByDepth = [], this.order = new Int32Array(e.length);
		for (let t = 0; t < e.length; t += 1) this.order[t] = t;
		this.buffer = new Int32Array(e.length);
	}
	sort() {
		if (this.words.length >= U) {
			let { ids: e, count: t } = rt(this.words);
			this.ids = e, this.idCount = t, this.keys = t < 65536 ? new Uint16Array(this.words.length) : new Uint32Array(this.words.length);
		}
		return this.sortRange(0, this.words.length, 0), this.order;
	}
	getId(e, t) {
		return t < e.length ? this.ids[e.charCodeAt(t)] : 0;
	}
	getState(e) {
		return this.countsByDepth[e] || (this.countsByDepth[e] = new Int32Array(this.idCount + 1), this.idsByDepth[e] = new Int32Array(this.idCount + 1)), {
			counts: this.countsByDepth[e],
			idsInRange: this.idsByDepth[e]
		};
	}
	sortRange(e, t, n) {
		if (t - e < U) {
			this.insertionSort(e, t, n);
			return;
		}
		let { order: r, buffer: i, keys: a, words: o } = this, { counts: s, idsInRange: c } = this.getState(n), l = 0;
		for (let i = e; i < t; i += 1) {
			let e = this.getId(o[r[i]], n);
			a[i] = e, s[e] === 0 && (c[l] = e, l += 1), s[e] += 1;
		}
		let u = c.subarray(0, l).sort(), d = e;
		u.forEach((e) => {
			let t = s[e];
			s[e] = d, d += t;
		});
		for (let n = e; n < t; n += 1) {
			let e = a[n];
			i[s[e]] = r[n], s[e] += 1;
		}
		r.set(i.subarray(e, t), e), d = e, u.forEach((e) => {
			let t = s[e];
			e !== 0 && t - d > 1 && this.sortRange(d, t, n + 1), d = t, s[e] = 0;
		});
	}
	compare(e, t, n) {
		let r = n;
		for (; r < e.length && r < t.length && e.charCodeAt(r) === t.charCodeAt(r);) r += 1;
		return (r < e.length ? e.charCodeAt(r) : -1) - (r < t.length ? t.charCodeAt(r) : -1);
	}
	insertionSort(e, t, n) {
		let { order: r, words: i } = this;
		for (let a = e + 1; a < t; a += 1) {
			let t = r[a], o = a;
			for (; o > e && this.compare(i[r[o - 1]], i[t], n) > 0;) r[o] = r[o - 1], --o;
			r[o] = t;
		}
	}
}, W = class {
	constructor(e = []) {
		this.findRange = /* @__PURE__ */ new Int32Array(2), this.firstCharacters = /* @__PURE__ */ new Map(), this.levenshteinDictionaries = [], this.listSizes = e.map(({ words: e }) => e.length), this.dictionaryNames = e.map(({ name: e }) => e);
		let t = nt(e), n = new it(t.words).sort(), r = [], i = new Int32Array(n.length + 1), a = e.length <= 256 ? new Uint8Array(n.length) : new Uint16Array(n.length), o = new Int32Array(n.length), s = 0, c;
		n.forEach((e) => {
			let n = t.words[e], l = t.dictionaries[e];
			if (n !== c) i[r.length] = s, r.push(n), c = n;
			else if (a[s - 1] === l) {
				o[s - 1] = t.ranks[e];
				return;
			}
			a[s] = l, o[s] = t.ranks[e], s += 1;
		}), i[r.length] = s, this.words = r, this.hitStart = i.slice(0, r.length + 1), this.hitDictionary = a.slice(0, s), this.hitRank = o.slice(0, s), this.firstCharacterStarts = this.getFirstCharacterStarts();
	}
	getFirstCharacterStarts() {
		let e = [];
		return this.words.forEach((t, n) => {
			if (t.length === 0) return;
			let r = t.charCodeAt(0);
			this.firstCharacters.has(r) || (this.firstCharacters.set(r, e.length), e.push(n));
		}), e.push(this.words.length), Int32Array.from(e);
	}
	findFirst(e, t, n, r) {
		let i = e, a = t;
		for (; i < a;) {
			let e = i + a >>> 1, t = this.words[e];
			(n < t.length ? t.charCodeAt(n) : -1) < r ? i = e + 1 : a = e;
		}
		return i;
	}
	narrow(e, t, n) {
		if (t === 0 && e[0] === 0 && e[1] === this.words.length) {
			let t = this.firstCharacters.get(n);
			t === void 0 ? e[0] = e[1] : (e[0] = this.firstCharacterStarts[t], e[1] = this.firstCharacterStarts[t + 1]);
			return;
		}
		let r = this.findFirst(e[0], e[1], t, n);
		e[1] = this.findFirst(r, e[1], t, n + 1), e[0] = r;
	}
	find(e) {
		let t = this.findRange;
		t[0] = 0, t[1] = this.words.length;
		for (let n = 0; n < e.length && t[0] < t[1]; n += 1) this.narrow(t, n, e.charCodeAt(n));
		return t[0] < t[1] && this.words[t[0]].length === e.length ? t[0] : -1;
	}
	getLevenshteinDictionary(e) {
		let t = this.levenshteinDictionaries[e];
		return t || (t = {
			getEntries: () => this.getEntries(e),
			getRank: (t) => this.getRank(this.find(t), e)
		}, this.levenshteinDictionaries[e] = t), t;
	}
	getWordsByRank(e) {
		if (!this.wordsByRank) {
			let e = this.listSizes.map((e) => new Int32Array(e));
			for (let t = 0; t < this.words.length; t += 1) for (let n = this.hitStart[t]; n < this.hitStart[t + 1]; n += 1) e[this.hitDictionary[n]][this.hitRank[n] - 1] = t + 1;
			this.wordsByRank = e;
		}
		return this.wordsByRank[e];
	}
	getEntries(e) {
		let t = [], n = [];
		return this.getWordsByRank(e).forEach((e, r) => {
			e > 0 && (t.push(this.words[e - 1]), n.push(r + 1));
		}), {
			entries: t,
			ranks: n
		};
	}
	getRank(e, t) {
		if (!(e < 0)) {
			for (let n = this.hitStart[e]; n < this.hitStart[e + 1]; n += 1) if (this.hitDictionary[n] === t) return this.hitRank[n];
		}
	}
}, at = (e) => {
	if (!e || e.wordIndex) return e;
	let t = Object.entries(e.rankedDictionary).sort((e, t) => e[1] - t[1]).map(([e]) => e);
	return {
		...e,
		wordIndex: new W([{
			name: "userInputs",
			words: t
		}])
	};
}, ot = class {
	constructor(e) {
		this.options = e, this.matchers = {}, this.matchers = {
			date: new se(this.options),
			dictionary: new O(this.options),
			dictionaryL33t: new De(this.options),
			dictionaryReverse: new Oe(this.options),
			regex: new ke(this.options),
			repeat: new V(this.options),
			sequence: new Ze(this.options),
			spatial: new H(this.options),
			separator: new $e(this.options),
			wordSequence: new tt(this.options)
		}, Object.entries(this.options.matchers).forEach(([e, t]) => {
			this.matchers[e] = new t.Matching(this.options);
		});
	}
	match(t, n) {
		let r = at(n), i = [], a = [], { wordSequence: o, ...s } = this.matchers, c = (t, n) => {
			e(i, t in this.options.matchers ? n.map((e) => ({ ...e })) : n);
		};
		Object.entries(s).forEach(([e, n]) => {
			let i = n.match({
				password: t,
				omniMatch: this,
				userInputsOptions: r
			});
			i instanceof Promise ? a.push(i.then((t) => (c(e, t), t))) : c(e, i);
		});
		let l = () => {
			if (!o) return i;
			let e = o.match({
				password: t,
				omniMatch: this,
				userInputsOptions: r,
				matches: i.slice()
			});
			return e instanceof Promise ? e.then((e) => (c("wordSequence", e), i)) : (c("wordSequence", e), i);
		};
		return a.length > 0 ? Promise.all(a).then(l) : l();
	}
}, st = 1, ct = 60, G = 3600, K = G * 24, q = K * 31, J = q * 12, Y = {
	second: st,
	minute: ct,
	hour: G,
	day: K,
	month: q,
	year: J,
	century: J * 100
}, X = {
	scoring: {
		0: 1e3,
		1: 1e6,
		2: 1e8,
		3: 1e10
	},
	attackTime: {
		onlineThrottlingXPerHour: 100,
		onlineNoThrottlingXPerSecond: 10,
		offlineSlowHashingXPerSecond: 1e4,
		offlineFastHashingXPerSecond: 1e10
	}
}, lt = class {
	constructor(e) {
		this.options = e;
	}
	estimateAttackTimes(e) {
		let t = this.calculateCrackTimesSeconds(e), n = {};
		return Object.keys(t).forEach((e) => {
			let r = e, i = t[r], { base: a, displayStr: o } = this.displayTime(i);
			n[r] = {
				base: a,
				seconds: i,
				display: this.translate(o, a)
			};
		}), {
			crackTimes: n,
			score: this.guessesToScore(e)
		};
	}
	calculateCrackTimesSeconds(e) {
		let t = this.options.timeEstimationValues.attackTime;
		return {
			onlineThrottlingXPerHour: e / (t.onlineThrottlingXPerHour / 3600),
			onlineNoThrottlingXPerSecond: e / t.onlineNoThrottlingXPerSecond,
			offlineSlowHashingXPerSecond: e / t.offlineSlowHashingXPerSecond,
			offlineFastHashingXPerSecond: e / t.offlineFastHashingXPerSecond
		};
	}
	guessesToScore(e) {
		let t = this.options.timeEstimationValues.scoring;
		return e < t[0] + 5 ? 0 : e < t[1] + 5 ? 1 : e < t[2] + 5 ? 2 : e < t[3] + 5 ? 3 : 4;
	}
	displayTime(e) {
		let t = "centuries", n = null, r = Object.keys(Y), i = r.findIndex((t) => e < Y[t]);
		return i > -1 && (t = r[i - 1], i === 0 ? t = "ltSecond" : n = Math.round(e / Y[t])), {
			base: n,
			displayStr: t
		};
	}
	translate(e, t) {
		let n = e;
		t !== null && t !== 1 && (n += "s");
		let { timeEstimation: r } = this.options.translations, i = r[n];
		return typeof i == "function" ? i(t) : i.replace("{base}", `${t}`);
	}
}, ut = () => null, dt = (e) => ({
	warning: e.translations.warnings.dates,
	suggestions: [e.translations.suggestions.dates]
}), ft = (e, t, n) => {
	let r = null;
	return n && !t.l33t && !t.reversed ? r = t.rank <= 10 ? e.translations.warnings.topTen : t.rank <= 100 ? e.translations.warnings.topHundred : e.translations.warnings.common : t.guessesLog10 <= 4 && (r = e.translations.warnings.similarToCommon), r;
}, pt = (e, t, n) => {
	let r = null;
	return n && (r = e.translations.warnings.wordByItself), r;
}, mt = (e, t, n) => n ? e.translations.warnings.namesByThemselves : e.translations.warnings.commonNames, ht = (e, t, n) => {
	let r = t.dictionaryName, i = r.toLowerCase().includes("lastnames") || r.toLowerCase().includes("firstnames") || r.toLowerCase().includes("names");
	return r.includes("passwords") ? ft(e, t, n) : r.includes("wikipedia") ? pt(e, t, n) : i ? mt(e, t, n) : r.includes("userInputs") ? e.translations.warnings.userInputs : null;
}, gt = (e, t, n) => {
	let r = ht(e, t, n), i = [], o = t.token;
	return o.match(u) ? i.push(e.translations.suggestions.capitalization) : o.match(p) && o.toLowerCase() !== o && i.push(e.translations.suggestions.allUppercase), t.reversed && a(t.token) >= 4 && i.push(e.translations.suggestions.reverseWords), t.l33t && i.push(e.translations.suggestions.l33t), {
		warning: r,
		suggestions: i
	};
}, _t = (e, t) => t.regexName === "recentYear" ? {
	warning: e.translations.warnings.recentYears,
	suggestions: [e.translations.suggestions.recentYears, e.translations.suggestions.associatedYears]
} : {
	warning: null,
	suggestions: []
}, vt = (e, t) => {
	let n = e.translations.warnings.extendedRepeat;
	return a(t.baseToken) === 1 && (n = e.translations.warnings.simpleRepeat), {
		warning: n,
		suggestions: [e.translations.suggestions.repeated]
	};
}, yt = (e) => ({
	warning: e.translations.warnings.sequences,
	suggestions: [e.translations.suggestions.sequences]
}), bt = (e, t) => {
	let n = e.translations.warnings.keyPattern;
	return t.turns === 1 && (n = e.translations.warnings.straightRow), {
		warning: n,
		suggestions: [e.translations.suggestions.longerKeyboardPattern]
	};
}, xt = () => null, St = (e, t) => {
	if (t.pattern !== "wordSequence") return null;
	if (t.dictionaryName === "userInputs") return {
		warning: e.translations.warnings.userInputs,
		suggestions: [e.translations.suggestions.useWords]
	};
	let n = null, r = [];
	return t.wordCount >= 3 && (n = e.translations.warnings.sequences), t.ascending ? r.push(e.translations.suggestions.sequences) : r.push(e.translations.suggestions.anotherWord), t.wordCount > 2 && r.push(e.translations.suggestions.useWords), {
		warning: n,
		suggestions: r
	};
}, Z = (e) => ({
	warning: null,
	suggestions: e ?? []
}), Ct = class {
	constructor(e) {
		this.options = e, this.matchers = {}, this.matchers = {
			bruteforce: ut,
			date: dt,
			dictionary: gt,
			regex: _t,
			repeat: vt,
			sequence: yt,
			spatial: bt,
			separator: xt,
			wordSequence: St
		}, Object.entries(this.options.matchers).forEach(([e, t]) => {
			t.feedback && (this.matchers[e] = t.feedback);
		});
	}
	getFeedback(e, t) {
		if (t.length === 0) return Z([this.options.translations.suggestions.useWords, this.options.translations.suggestions.noNeed]);
		if (e > 2) return Z();
		let n = this.options.translations.suggestions.anotherWord, r = this.getLongestMatch(t), i = this.getMatchFeedback(r, t.length === 1);
		return i == null ? i = Z([n]) : i.suggestions.unshift(n), i;
	}
	getLongestMatch(e) {
		let t = e[0], n = a(t.token);
		for (let r = 1; r < e.length; r += 1) {
			let i = e[r], o = a(i.token);
			o > n && (t = i, n = o);
		}
		return t;
	}
	getMatchFeedback(e, t) {
		return this.matchers[e.pattern] ? this.matchers[e.pattern](this.options, e, t) : Z();
	}
}, Q = {
	a: ["4", "@"],
	b: ["8"],
	c: [
		"(",
		"{",
		"[",
		"<"
	],
	d: ["6", "|)"],
	e: ["3"],
	f: ["#"],
	g: [
		"6",
		"9",
		"&"
	],
	h: ["#", "|-|"],
	i: [
		"1",
		"!",
		"|"
	],
	k: ["<", "|<"],
	l: [
		"!",
		"1",
		"|",
		"7"
	],
	m: [
		"^^",
		"nn",
		"2n",
		"/\\\\/\\\\"
	],
	n: ["//"],
	o: ["0", "()"],
	q: ["9"],
	u: ["|_|"],
	s: ["$", "5"],
	t: ["+", "7"],
	v: [
		"<",
		">",
		"/"
	],
	w: [
		"^/",
		"uu",
		"vv",
		"2u",
		"2v",
		"\\\\/\\\\/"
	],
	x: ["%", "><"],
	z: ["2"]
}, $ = {
	warnings: {
		straightRow: "straightRow",
		keyPattern: "keyPattern",
		simpleRepeat: "simpleRepeat",
		extendedRepeat: "extendedRepeat",
		sequences: "sequences",
		recentYears: "recentYears",
		dates: "dates",
		topTen: "topTen",
		topHundred: "topHundred",
		common: "common",
		similarToCommon: "similarToCommon",
		wordByItself: "wordByItself",
		namesByThemselves: "namesByThemselves",
		commonNames: "commonNames",
		userInputs: "userInputs",
		pwned: "pwned"
	},
	suggestions: {
		l33t: "l33t",
		reverseWords: "reverseWords",
		allUppercase: "allUppercase",
		capitalization: "capitalization",
		dates: "dates",
		recentYears: "recentYears",
		associatedYears: "associatedYears",
		sequences: "sequences",
		repeated: "repeated",
		longerKeyboardPattern: "longerKeyboardPattern",
		anotherWord: "anotherWord",
		useWords: "useWords",
		noNeed: "noNeed",
		pwned: "pwned"
	},
	timeEstimation: {
		ltSecond: "ltSecond",
		second: "second",
		seconds: "seconds",
		minute: "minute",
		minutes: "minutes",
		hour: "hour",
		hours: "hours",
		day: "day",
		days: "days",
		month: "month",
		months: "months",
		year: "year",
		years: "years",
		centuries: "centuries"
	}
}, wt = class e {
	constructor(e = []) {
		this.parents = e, this.children = /* @__PURE__ */ new Map();
	}
	addSub(t, ...n) {
		let r = t.charAt(0);
		this.children.has(r) || this.children.set(r, new e([...this.parents, r]));
		let i = this.children.get(r);
		for (let e = 1; e < t.length; e += 1) {
			let n = t.charAt(e);
			i.hasChild(n) || i.addChild(n), i = i.getChild(n);
		}
		return i.subs = (i.subs || []).concat(n), this;
	}
	getChild(e) {
		return this.children.get(e);
	}
	isTerminal() {
		return !!this.subs;
	}
	addChild(t) {
		this.hasChild(t) || this.children.set(t, new e([...this.parents, t]));
	}
	hasChild(e) {
		return this.children.has(e);
	}
}, Tt = (e) => {
	let t = {};
	return e.forEach((e, n) => {
		t[e] = n + 1;
	}), t;
}, Et = (e) => e.reduce((e, t) => Math.max(e, t.toString().length), 0), Dt = (e) => {
	let t = [];
	return e.forEach((e) => {
		let n = typeof e;
		(n === "string" || n === "number" || n === "boolean") && t.push(s(e.toString()));
	}), t;
}, Ot = (e) => {
	let t = e ? Dt(e) : [], n = e ? Et(e) : 0, r;
	return {
		wordIndex: new W([{
			name: "userInputs",
			words: t
		}]),
		get rankedDictionary() {
			return r ??= Tt(t), r;
		},
		rankedDictionaryMaxWordSize: n
	};
}, kt = (e, t) => (Object.entries(e).forEach(([e, n]) => {
	n.forEach((n) => {
		t.addSub(n, e);
	});
}), t), At = (e) => {
	let t = /* @__PURE__ */ new Map();
	Object.entries(e).forEach(([e, n]) => {
		n.forEach((n) => {
			if (n === "") return;
			let r = t.get(n);
			r || (r = {
				substitution: n,
				letters: [],
				lettersLower: []
			}, t.set(n, r)), r.letters.includes(e) || (r.letters.push(e), r.lettersLower.push(s(e)));
		});
	});
	let n = /* @__PURE__ */ new Map();
	return t.forEach((e) => {
		let t = e.substitution.charAt(0), r = n.get(t) || [];
		r.push(e), n.set(t, r);
	}), n.forEach((e) => e.sort((e, t) => t.substitution.length - e.substitution.length)), n;
}, jt = (e) => {
	if (typeof e != "object" || !e) throw Error("l33tTable must be an object");
	Object.values(e).forEach((e) => {
		if (!Array.isArray(e)) throw Error("l33tTable substitutions must be an array");
		e.forEach((e) => {
			if (typeof e != "string") throw Error("l33tTable substitutions must be strings");
		});
	});
}, Mt = (e) => {
	if (typeof e != "object" || !e) throw Error("dictionary must be an object");
	Object.values(e).forEach((e) => {
		if (!Array.isArray(e)) throw Error("dictionary list must be an array");
		e.forEach((e) => {
			if (typeof e != "string" && typeof e != "number") throw Error("dictionary entries must be strings or numbers");
		});
	});
}, Nt = (e) => {
	if (typeof e != "object" || !e) throw Error("graphs must be an object");
	Object.values(e).forEach((e) => {
		if (typeof e != "object" || !e) throw Error("graph must be an object");
		Object.values(e).forEach((e) => {
			if (!Array.isArray(e)) throw Error("graph adjacencies must be an array");
			e.forEach((e) => {
				if (typeof e != "string" && e !== null) throw Error("graph adjacency must be a string or null");
			});
		});
	});
}, Pt = (e) => {
	if (typeof e != "boolean") throw Error("useLevenshteinDistance must be a boolean");
}, Ft = (e) => {
	if (typeof e != "number" || e < 0) throw Error("levenshteinThreshold must be a non-negative number");
}, It = (e) => {
	if (typeof e != "number" || e < 0) throw Error("l33tMaxSubstitutions must be a non-negative number");
}, Lt = (e) => {
	if (typeof e != "number" || e < 0) throw Error("maxLength must be a non-negative number");
}, Rt = (e, t) => {
	if (typeof e != "string") throw Error("matcher name must be a string");
	if (typeof t != "object" || !t) throw Error(`matcher ${e} must be an object`);
	if (typeof t.feedback != "function") throw Error(`matcher ${e}.feedback must be a function`);
	if (typeof t.scoring != "function") throw Error(`matcher ${e}.scoring must be a function`);
	if (typeof t.Matching != "function") throw Error(`matcher ${e}.Matching must be a constructor`);
}, zt = (e) => {
	if (typeof e != "object" || !e) throw Error("customMatchers must be an object");
}, Bt = (e) => {
	let t = [];
	return Object.keys($).forEach((n) => {
		if (n in e) {
			let r = n;
			Object.keys($[r]).forEach((i) => {
				let a = e[r][i];
				typeof a != "string" && typeof a != "function" && t.push(`${n}.${i}`);
			});
		} else t.push(n);
	}), t;
}, Vt = (e) => {
	if (typeof e != "object" || !e) throw Error("timeEstimationValues must be an object");
	Object.keys(X).forEach((t) => {
		if (!(t in e)) throw Error(`timeEstimationValues.${t} is required`);
		let n = e[t];
		if (typeof n != "object" || !n) throw Error(`timeEstimationValues.${t} must be an object`);
		Object.keys(X[t]).forEach((e) => {
			if (!(e in n)) throw Error(`timeEstimationValues.${t}.${e} is required`);
			let r = n[e];
			if (typeof r != "number") throw Error(`timeEstimationValues.${t}.${e} must be a number`);
			if (r < X[t][e]) throw Error("Time estimation values are not to be allowed to be less than default");
		});
	});
}, Ht = class {
	constructor(e = {}, t = {}) {
		this.matchers = {}, this.l33tTable = Q, this.trieNodeRoot = new wt(), this.l33tSubstitutions = At(Q), this.dictionary = { userInputs: [] }, this.wordIndex = new W(), this.dictionaryMaxWordSizes = {}, this.translations = $, this.graphs = {}, this.useLevenshteinDistance = !1, this.levenshteinThreshold = 2, this.l33tMaxSubstitutions = 100, this.maxLength = 256, this.wordSequenceNames = [
			"cardinalNumbers",
			"ordinalNumbers",
			"daysOfWeek",
			"months",
			"seasons",
			"timePeriods",
			"rainbowColors",
			"directions",
			"intermediateDirections",
			"sizeProgression",
			"militaryAlphabet",
			"planets",
			"zodiacSigns",
			"chineseZodiac",
			"userInputs"
		], this.timeEstimationValues = {
			scoring: { ...X.scoring },
			attackTime: { ...X.attackTime }
		}, zt(t), this.setOptions(e), Object.entries(t).forEach(([e, t]) => {
			Rt(e, t), this.addMatcher(e, t);
		});
	}
	get rankedDictionaries() {
		if (this.cachedRankedDictionaries === void 0) {
			let e = {};
			Object.keys(this.dictionary).forEach((t) => {
				e[t] = Tt(this.dictionary[t]);
			}), this.cachedRankedDictionaries = e;
		}
		return this.cachedRankedDictionaries;
	}
	get rankedDictionariesMaxWordSize() {
		return this.dictionaryMaxWordSizes;
	}
	isWordSequence(e) {
		return this.wordSequenceNames.some((t) => o(e, t));
	}
	setOptions(e = {}) {
		e.l33tTable && (jt(e.l33tTable), this.l33tTable = e.l33tTable, this.l33tSubstitutions = At(e.l33tTable)), e.dictionary && (Mt(e.dictionary), this.dictionary = e.dictionary, this.setWordIndex()), e.translations && this.setTranslations(e.translations), e.graphs && (Nt(e.graphs), this.graphs = e.graphs), e.useLevenshteinDistance !== void 0 && (Pt(e.useLevenshteinDistance), this.useLevenshteinDistance = e.useLevenshteinDistance), this.useLevenshteinDistance && (this.trieNodeRoot = kt(this.l33tTable, new wt())), e.levenshteinThreshold !== void 0 && (Ft(e.levenshteinThreshold), this.levenshteinThreshold = e.levenshteinThreshold), e.l33tMaxSubstitutions !== void 0 && (It(e.l33tMaxSubstitutions), this.l33tMaxSubstitutions = e.l33tMaxSubstitutions), e.maxLength !== void 0 && (Lt(e.maxLength), this.maxLength = e.maxLength), e.timeEstimationValues !== void 0 && (Vt(e.timeEstimationValues), this.timeEstimationValues = {
			scoring: { ...e.timeEstimationValues.scoring },
			attackTime: { ...e.timeEstimationValues.attackTime }
		});
	}
	setTranslations(e) {
		let t = Bt(e);
		if (t.length > 0) throw Error(`Invalid translations object, missing or invalid keys: ${t.join(", ")}`);
		this.translations = e;
	}
	setWordIndex() {
		let e = {}, t = Object.keys(this.dictionary);
		t.forEach((t) => {
			e[t] = Et(this.dictionary[t]);
		}), this.wordIndex = new W(t.map((e) => ({
			name: e,
			words: this.dictionary[e]
		}))), this.dictionaryMaxWordSizes = e;
	}
	getUserInputsOptions(e) {
		let { cachedUserInputs: t } = this;
		if (this.cachedUserInputsOptions !== void 0 && (e === void 0 ? t === void 0 : t?.length === e.length && t.every((t, n) => t === e[n]))) return this.cachedUserInputsOptions;
		let n = Ot(e);
		return this.cachedUserInputs = e ? [...e] : void 0, this.cachedUserInputsOptions = n, n;
	}
	addMatcher(e, t) {
		this.matchers[e] ? console.info(`Matcher ${e} already exists`) : this.matchers[e] = t;
	}
}, Ut = (e, t, n) => {
	let r;
	return function(...i) {
		let a = this, o = () => {
			r = void 0, n || e.apply(a, i);
		}, s = n && !r;
		r !== void 0 && clearTimeout(r), r = setTimeout(o, t), s && e.apply(a, i);
	};
}, Wt = () => (/* @__PURE__ */ new Date()).getTime(), Gt = class {
	constructor(e = {}, t = {}) {
		this.options = new Ht(e, t), this.scoring = new B(this.options), this.matching = new ot(this.options), this.feedback = new Ct(this.options), this.timeEstimates = new lt(this.options);
	}
	estimateAttackTimes(e) {
		return this.timeEstimates.estimateAttackTimes(e);
	}
	getFeedback(e, t) {
		return this.feedback.getFeedback(e, t);
	}
	createReturnValue(e, t, n) {
		let r = this.scoring.mostGuessableMatchSequence(t, e), i = Wt() - n, a = this.estimateAttackTimes(r.guesses);
		return {
			calcTime: i,
			...r,
			...a,
			feedback: this.getFeedback(a.score, r.sequence)
		};
	}
	getMatches(e, t) {
		let n = this.options.getUserInputsOptions(t);
		return this.matching.match(e, n);
	}
	check(e, t) {
		let { reducedPassword: n, start: r } = this.prepareCheck(e), i = this.getMatches(n, t);
		if (i instanceof Promise) throw Error("You are using a Promised matcher, please use `checkAsync` for it.");
		return this.createReturnValue(i, n, r);
	}
	async checkAsync(e, t) {
		let { reducedPassword: n, start: r } = this.prepareCheck(e), i = await this.getMatches(n, t);
		return this.createReturnValue(i, n, r);
	}
	prepareCheck(e) {
		let t = this.options.maxLength;
		return i(e, t - 1) && --t, {
			reducedPassword: e.substring(0, t),
			start: Wt()
		};
	}
};
export { y as MatcherBaseClass, Ht as Options, Gt as ZxcvbnFactory, Ut as debounce };

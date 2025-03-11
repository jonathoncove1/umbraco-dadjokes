var q = Object.defineProperty;
var W = (e, t, r) => t in e ? q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _ = (e, t, r) => W(e, typeof t != "symbol" ? t + "" : t, r);
import { html as k, state as D, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as P } from "@umbraco-cms/backoffice/modal";
var I = /\{[^{}]+\}/g, y = ({ allowReserved: e, name: t, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${t}=${e ? r : encodeURIComponent(r)}`;
}, J = (e) => {
  switch (e) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, H = (e) => {
  switch (e) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, N = (e) => {
  switch (e) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, x = ({ allowReserved: e, explode: t, name: r, style: o, value: n }) => {
  if (!t) {
    let s = (e ? n : n.map((i) => encodeURIComponent(i))).join(H(o));
    switch (o) {
      case "label":
        return `.${s}`;
      case "matrix":
        return `;${r}=${s}`;
      case "simple":
        return s;
      default:
        return `${r}=${s}`;
    }
  }
  let l = J(o), a = n.map((s) => o === "label" || o === "simple" ? e ? s : encodeURIComponent(s) : y({ allowReserved: e, name: r, value: s })).join(l);
  return o === "label" || o === "matrix" ? l + a : a;
}, O = ({ allowReserved: e, explode: t, name: r, style: o, value: n }) => {
  if (n instanceof Date) return `${r}=${n.toISOString()}`;
  if (o !== "deepObject" && !t) {
    let s = [];
    Object.entries(n).forEach(([f, c]) => {
      s = [...s, f, e ? c : encodeURIComponent(c)];
    });
    let i = s.join(",");
    switch (o) {
      case "form":
        return `${r}=${i}`;
      case "label":
        return `.${i}`;
      case "matrix":
        return `;${r}=${i}`;
      default:
        return i;
    }
  }
  let l = N(o), a = Object.entries(n).map(([s, i]) => y({ allowReserved: e, name: o === "deepObject" ? `${r}[${s}]` : s, value: i })).join(l);
  return o === "label" || o === "matrix" ? l + a : a;
}, M = ({ path: e, url: t }) => {
  let r = t, o = t.match(I);
  if (o) for (let n of o) {
    let l = !1, a = n.substring(1, n.length - 1), s = "simple";
    a.endsWith("*") && (l = !0, a = a.substring(0, a.length - 1)), a.startsWith(".") ? (a = a.substring(1), s = "label") : a.startsWith(";") && (a = a.substring(1), s = "matrix");
    let i = e[a];
    if (i == null) continue;
    if (Array.isArray(i)) {
      r = r.replace(n, x({ explode: l, name: a, style: s, value: i }));
      continue;
    }
    if (typeof i == "object") {
      r = r.replace(n, O({ explode: l, name: a, style: s, value: i }));
      continue;
    }
    if (s === "matrix") {
      r = r.replace(n, `;${y({ name: a, value: i })}`);
      continue;
    }
    let f = encodeURIComponent(s === "label" ? `.${i}` : i);
    r = r.replace(n, f);
  }
  return r;
}, $ = ({ allowReserved: e, array: t, object: r } = {}) => (o) => {
  let n = [];
  if (o && typeof o == "object") for (let l in o) {
    let a = o[l];
    if (a != null) {
      if (Array.isArray(a)) {
        n = [...n, x({ allowReserved: e, explode: !0, name: l, style: "form", value: a, ...t })];
        continue;
      }
      if (typeof a == "object") {
        n = [...n, O({ allowReserved: e, explode: !0, name: l, style: "deepObject", value: a, ...r })];
        continue;
      }
      n = [...n, y({ allowReserved: e, name: l, value: a })];
    }
  }
  return n.join("&");
}, B = (e) => {
  if (!e) return;
  let t = e.split(";")[0].trim();
  if (t.startsWith("application/json") || t.endsWith("+json")) return "json";
  if (t === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((r) => t.startsWith(r))) return "blob";
  if (t.startsWith("text/")) return "text";
}, L = ({ baseUrl: e, path: t, query: r, querySerializer: o, url: n }) => {
  let l = n.startsWith("/") ? n : `/${n}`, a = e + l;
  t && (a = M({ path: t, url: a }));
  let s = r ? o(r) : "";
  return s.startsWith("?") && (s = s.substring(1)), s && (a += `?${s}`), a;
}, C = (e, t) => {
  var o;
  let r = { ...e, ...t };
  return (o = r.baseUrl) != null && o.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = S(e.headers, t.headers), r;
}, S = (...e) => {
  let t = new Headers();
  for (let r of e) {
    if (!r || typeof r != "object") continue;
    let o = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [n, l] of o) if (l === null) t.delete(n);
    else if (Array.isArray(l)) for (let a of l) t.append(n, a);
    else l !== void 0 && t.set(n, typeof l == "object" ? JSON.stringify(l) : l);
  }
  return t;
}, v = class {
  constructor() {
    _(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(e) {
    return this._fns.indexOf(e) !== -1;
  }
  eject(e) {
    let t = this._fns.indexOf(e);
    t !== -1 && (this._fns = [...this._fns.slice(0, t), ...this._fns.slice(t + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}, G = () => ({ error: new v(), request: new v(), response: new v() }), F = { bodySerializer: (e) => JSON.stringify(e) }, K = $({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), Q = { "Content-Type": "application/json" }, g = (e = {}) => ({ ...F, baseUrl: "", fetch: globalThis.fetch, headers: Q, parseAs: "auto", querySerializer: K, ...e }), A = (e = {}) => {
  let t = C(g(), e), r = () => ({ ...t }), o = (a) => (t = C(t, a), r()), n = G(), l = async (a) => {
    let s = { ...t, ...a, headers: S(t.headers, a.headers) };
    s.body && s.bodySerializer && (s.body = s.bodySerializer(s.body)), s.body || s.headers.delete("Content-Type");
    let i = L({ baseUrl: s.baseUrl ?? "", path: s.path, query: s.query, querySerializer: typeof s.querySerializer == "function" ? s.querySerializer : $(s.querySerializer), url: s.url }), f = { redirect: "follow", ...s }, c = new Request(i, f);
    for (let d of n.request._fns) c = await d(c, s);
    let U = s.fetch, u = await U(c);
    for (let d of n.response._fns) u = await d(u, c, s);
    let h = { request: c, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return { data: {}, ...h };
      if (s.parseAs === "stream") return { data: u.body, ...h };
      let d = (s.parseAs === "auto" ? B(u.headers.get("Content-Type")) : s.parseAs) ?? "json", b = await u[d]();
      return d === "json" && s.responseTransformer && (b = await s.responseTransformer(b)), { data: b, ...h };
    }
    let m = await u.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let p = m;
    for (let d of n.error._fns) p = await d(m, u, c, s);
    if (p = p || {}, s.throwOnError) throw p;
    return { error: p, ...h };
  };
  return { connect: (a) => l({ ...a, method: "CONNECT" }), delete: (a) => l({ ...a, method: "DELETE" }), get: (a) => l({ ...a, method: "GET" }), getConfig: r, head: (a) => l({ ...a, method: "HEAD" }), interceptors: n, options: (a) => l({ ...a, method: "OPTIONS" }), patch: (a) => l({ ...a, method: "PATCH" }), post: (a) => l({ ...a, method: "POST" }), put: (a) => l({ ...a, method: "PUT" }), request: l, setConfig: o, trace: (a) => l({ ...a, method: "TRACE" }) };
};
A(g());
const V = g({
  baseUrl: "https://icanhazdadjoke.com",
  headers: {
    Accept: "application/json"
  }
}), X = A(V);
class Y {
  static getAJoke(t) {
    return X.get({
      ...t,
      url: "/"
    });
  }
}
var Z = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, R = (e) => {
  throw TypeError(e);
}, T = (e, t, r, o) => {
  for (var n = o > 1 ? void 0 : o ? ee(t, r) : t, l = e.length - 1, a; l >= 0; l--)
    (a = e[l]) && (n = (o ? a(t, r, n) : a(n)) || n);
  return o && n && Z(t, r, n), n;
}, te = (e, t, r) => t.has(e) || R("Cannot " + r), re = (e, t, r) => t.has(e) ? R("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), ae = (e, t, r) => (te(e, t, "access private method"), r), w, E;
let j = class extends P {
  constructor() {
    super(...arguments), re(this, w);
  }
  async connectedCallback() {
    super.connectedCallback();
    try {
      const { data: e, error: t } = await Y.getAJoke();
      t || (this.joke = e == null ? void 0 : e.joke);
    } catch {
    }
  }
  render() {
    return k`
            <uui-dialog-layout class="uui-text"
                headline="Dad says:">
                <p>${this.joke}</p> 

                <uui-button slot="actions" id="close" label="Close"
                    look='primary'  color='danger'
                     @click="${ae(this, w, E)}">Close</uui-button>

            </uui-dialog-layout>
        `;
  }
};
w = /* @__PURE__ */ new WeakSet();
E = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
T([
  D()
], j.prototype, "joke", 2);
j = T([
  z("dadjoke-header-modal")
], j);
export {
  j as default
};
//# sourceMappingURL=modal.element-DnK99m2i.js.map

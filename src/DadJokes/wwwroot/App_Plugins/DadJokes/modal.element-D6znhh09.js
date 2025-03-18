var W = Object.defineProperty;
var D = (e, t, r) => t in e ? W(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var g = (e, t, r) => D(e, typeof t != "symbol" ? t + "" : t, r);
import { html as z, state as P, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as J } from "@umbraco-cms/backoffice/modal";
var H = /\{[^{}]+\}/g, b = ({ allowReserved: e, name: t, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${t}=${e ? r : encodeURIComponent(r)}`;
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
}, M = (e) => {
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
}, B = (e) => {
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
}, $ = ({ allowReserved: e, explode: t, name: r, style: o, value: n }) => {
  if (!t) {
    let s = (e ? n : n.map((i) => encodeURIComponent(i))).join(M(o));
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
  let l = N(o), a = n.map((s) => o === "label" || o === "simple" ? e ? s : encodeURIComponent(s) : b({ allowReserved: e, name: r, value: s })).join(l);
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
  let l = B(o), a = Object.entries(n).map(([s, i]) => b({ allowReserved: e, name: o === "deepObject" ? `${r}[${s}]` : s, value: i })).join(l);
  return o === "label" || o === "matrix" ? l + a : a;
}, L = ({ path: e, url: t }) => {
  let r = t, o = t.match(H);
  if (o) for (let n of o) {
    let l = !1, a = n.substring(1, n.length - 1), s = "simple";
    a.endsWith("*") && (l = !0, a = a.substring(0, a.length - 1)), a.startsWith(".") ? (a = a.substring(1), s = "label") : a.startsWith(";") && (a = a.substring(1), s = "matrix");
    let i = e[a];
    if (i == null) continue;
    if (Array.isArray(i)) {
      r = r.replace(n, $({ explode: l, name: a, style: s, value: i }));
      continue;
    }
    if (typeof i == "object") {
      r = r.replace(n, O({ explode: l, name: a, style: s, value: i }));
      continue;
    }
    if (s === "matrix") {
      r = r.replace(n, `;${b({ name: a, value: i })}`);
      continue;
    }
    let f = encodeURIComponent(s === "label" ? `.${i}` : i);
    r = r.replace(n, f);
  }
  return r;
}, S = ({ allowReserved: e, array: t, object: r } = {}) => (o) => {
  let n = [];
  if (o && typeof o == "object") for (let l in o) {
    let a = o[l];
    if (a != null) {
      if (Array.isArray(a)) {
        n = [...n, $({ allowReserved: e, explode: !0, name: l, style: "form", value: a, ...t })];
        continue;
      }
      if (typeof a == "object") {
        n = [...n, O({ allowReserved: e, explode: !0, name: l, style: "deepObject", value: a, ...r })];
        continue;
      }
      n = [...n, b({ allowReserved: e, name: l, value: a })];
    }
  }
  return n.join("&");
}, G = (e) => {
  if (!e) return;
  let t = e.split(";")[0].trim();
  if (t.startsWith("application/json") || t.endsWith("+json")) return "json";
  if (t === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((r) => t.startsWith(r))) return "blob";
  if (t.startsWith("text/")) return "text";
}, F = ({ baseUrl: e, path: t, query: r, querySerializer: o, url: n }) => {
  let l = n.startsWith("/") ? n : `/${n}`, a = e + l;
  t && (a = L({ path: t, url: a }));
  let s = r ? o(r) : "";
  return s.startsWith("?") && (s = s.substring(1)), s && (a += `?${s}`), a;
}, C = (e, t) => {
  var o;
  let r = { ...e, ...t };
  return (o = r.baseUrl) != null && o.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = R(e.headers, t.headers), r;
}, R = (...e) => {
  let t = new Headers();
  for (let r of e) {
    if (!r || typeof r != "object") continue;
    let o = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [n, l] of o) if (l === null) t.delete(n);
    else if (Array.isArray(l)) for (let a of l) t.append(n, a);
    else l !== void 0 && t.set(n, typeof l == "object" ? JSON.stringify(l) : l);
  }
  return t;
}, w = class {
  constructor() {
    g(this, "_fns");
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
}, K = () => ({ error: new w(), request: new w(), response: new w() }), Q = { bodySerializer: (e) => JSON.stringify(e) }, V = S({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), X = { "Content-Type": "application/json" }, _ = (e = {}) => ({ ...Q, baseUrl: "", fetch: globalThis.fetch, headers: X, parseAs: "auto", querySerializer: V, ...e }), A = (e = {}) => {
  let t = C(_(), e), r = () => ({ ...t }), o = (a) => (t = C(t, a), r()), n = K(), l = async (a) => {
    let s = { ...t, ...a, headers: R(t.headers, a.headers) };
    s.body && s.bodySerializer && (s.body = s.bodySerializer(s.body)), s.body || s.headers.delete("Content-Type");
    let i = F({ baseUrl: s.baseUrl ?? "", path: s.path, query: s.query, querySerializer: typeof s.querySerializer == "function" ? s.querySerializer : S(s.querySerializer), url: s.url }), f = { redirect: "follow", ...s }, c = new Request(i, f);
    for (let d of n.request._fns) c = await d(c, s);
    let q = s.fetch, u = await q(c);
    for (let d of n.response._fns) u = await d(u, c, s);
    let h = { request: c, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return { data: {}, ...h };
      if (s.parseAs === "stream") return { data: u.body, ...h };
      let d = (s.parseAs === "auto" ? G(u.headers.get("Content-Type")) : s.parseAs) ?? "json", v = await u[d]();
      return d === "json" && s.responseTransformer && (v = await s.responseTransformer(v)), { data: v, ...h };
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
A(_());
const Y = _({
  baseUrl: "https://icanhazdadjoke.com",
  headers: {
    Accept: "application/json"
  }
}), Z = A(Y);
class ee {
  static getAJoke(t) {
    return Z.get({
      ...t,
      url: "/"
    });
  }
}
var te = Object.defineProperty, re = Object.getOwnPropertyDescriptor, T = (e) => {
  throw TypeError(e);
}, E = (e, t, r, o) => {
  for (var n = o > 1 ? void 0 : o ? re(t, r) : t, l = e.length - 1, a; l >= 0; l--)
    (a = e[l]) && (n = (o ? a(t, r, n) : a(n)) || n);
  return o && n && te(t, r, n), n;
}, ae = (e, t, r) => t.has(e) || T("Cannot " + r), se = (e, t, r) => t.has(e) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), x = (e, t, r) => (ae(e, t, "access private method"), r), y, U, k;
let j = class extends J {
  constructor() {
    super(...arguments), se(this, y);
  }
  async connectedCallback() {
    super.connectedCallback();
    try {
      const { data: e, error: t } = await ee.getAJoke();
      t || (this.joke = e == null ? void 0 : e.joke);
    } catch {
    }
  }
  render() {
    return z`
            <uui-dialog-layout class="uui-text"
                headline="Dad says:">
                <p>${this.joke}</p>

                 <uui-button slot="actions" id="close" label="Close"
                    look='secondary'  color='default'
                     @click="${x(this, y, k)}">Refresh</uui-button>

                <uui-button slot="actions" id="close" label="Close"
                    look='primary'  color='danger'
                     @click="${x(this, y, U)}">Close</uui-button>

            </uui-dialog-layout>
        `;
  }
};
y = /* @__PURE__ */ new WeakSet();
U = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
k = function() {
  this.connectedCallback();
};
E([
  P()
], j.prototype, "joke", 2);
j = E([
  I("dadjoke-header-modal")
], j);
export {
  j as default
};
//# sourceMappingURL=modal.element-D6znhh09.js.map

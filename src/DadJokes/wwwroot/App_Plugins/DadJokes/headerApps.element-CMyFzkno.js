import { LitElement as c, html as d, css as l, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT as v } from "@umbraco-cms/backoffice/modal";
var f = Object.getOwnPropertyDescriptor, u = (t) => {
  throw TypeError(t);
}, g = (t, e, r, i) => {
  for (var a = i > 1 ? void 0 : i ? f(e, r) : e, n = t.length - 1, m; n >= 0; n--)
    (m = t[n]) && (a = m(a) || a);
  return a;
}, E = (t, e, r) => e.has(t) || u("Cannot " + r), k = (t, e, r) => e.has(t) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), A = (t, e, r) => (E(t, e, "access private method"), r), o, p;
let s = class extends _(c) {
  constructor() {
    super(...arguments), k(this, o);
  }
  render() {
    return d`
            <uui-button @click=${A(this, o, p)}
                look="primary"
                label="time"
                compact>
                <img src="/images/dad.png" alt="Avatar">
            </uui-button>
        `;
  }
};
o = /* @__PURE__ */ new WeakSet();
p = function() {
  this.consumeContext(v, (t) => {
    t.open(this, "dadjoke.header.modal", {});
  });
};
s.styles = l`
        uui-button {
            font-size: 18pt;
            --uui-button-background-color: transparent;
        }
        uui-button img {
          width:2.25rem;
          transition: transform 0.3s ease;
        }
        uui-button img:hover {
          transform: rotate(-15deg);
        }
    `;
s = g([
  h("dadjoke-header-app")
], s);
export {
  s as default
};
//# sourceMappingURL=headerApps.element-CMyFzkno.js.map

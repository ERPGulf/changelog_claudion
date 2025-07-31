import { createElementBlock as a, openBlock as c, createElementVNode as o, toDisplayString as r, unref as i, createVNode as m, createApp as u } from "vue";
function s(e) {
  return `${e.toFixed(2)} SAR`;
}
const d = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, p] of n)
    t[l] = p;
  return t;
}, _ = { class: "item-card" }, g = {
  __name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return (n, t) => (c(), a("div", _, [
      o("h4", null, r(e.item.name), 1),
      t[0] || (t[0] = o("p", null, "Hello test", -1)),
      o("p", null, r(i(s)(e.item.price)), 1)
    ]));
  }
}, f = /* @__PURE__ */ d(g, [["__scopeId", "data-v-3e383d0a"]]), h = {
  __name: "Home",
  setup(e) {
    return (n, t) => (c(), a("div", null, [
      t[0] || (t[0] = o("h2", null, "Welcome to Changelog Claudion", -1)),
      m(f, { item: { name: "Auto Sync", price: 0 } })
    ]));
  }
};
frappe.pages.changelog.on_page_load = function(e) {
  const n = document.createElement("div");
  n.id = "changelog-app", e.appendChild(n), u(h).mount("#changelog-app");
};

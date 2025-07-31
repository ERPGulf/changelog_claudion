import { createElementBlock as a, openBlock as c, createElementVNode as o, toDisplayString as r, unref as u, createVNode as i, createApp as m } from "vue";
function s(t) {
  return `${t.toFixed(2)} SAR`;
}
const d = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [l, p] of n)
    e[l] = p;
  return e;
}, g = { class: "item-card" }, _ = {
  __name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (n, e) => (c(), a("div", g, [
      o("h4", null, r(t.item.name), 1),
      e[0] || (e[0] = o("p", null, "Hello test", -1)),
      o("p", null, r(u(s)(t.item.price)), 1)
    ]));
  }
}, f = /* @__PURE__ */ d(_, [["__scopeId", "data-v-3e383d0a"]]), h = {
  __name: "Home",
  setup(t) {
    return (n, e) => (c(), a("div", null, [
      e[0] || (e[0] = o("h2", null, "Welcome to Changelog Claudion", -1)),
      i(f, { item: { name: "Auto Sync", price: 0 } })
    ]));
  }
};
function v(t) {
  console.log("changelog page loaded");
  const n = frappe.ui.make_app_page({
    parent: t,
    title: "Change Log",
    single_column: !0
  }), e = document.createElement("div");
  e.id = "changelog-app", n.wrapper.appendChild(e), m(h).mount("#changelog-app");
}
export {
  v as mountChangelog
};

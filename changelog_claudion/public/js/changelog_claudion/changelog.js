// import { createApp } from 'vue'
// import Home from './Home.vue'

// frappe.pages['changelog'].on_page_load = function(wrapper) {
//   console.log("✅ changelog page loaded");

//   // Create the standard Frappe Desk page container
//   const page = frappe.ui.make_app_page({
//     parent: wrapper,
//     title: 'Change Log',
//     single_column: true
//   });

//   // Inject a div for Vue to mount into
//   const el = document.createElement('div');
//   el.id = 'changelog-app';
//   page.wrapper.appendChild(el);

//   // Mount Vue 3 App
//   createApp(Home).mount('#changelog-app');
// }
// changelog.js

// import { createApp } from "vue";
// import Home from "./Home.vue";

// export function mountChangelog(wrapper) {
//   console.log("changelog page loaded");

//   const page = frappe.ui.make_app_page({
//     parent: wrapper,
//     title: "ChangeLog",
//     single_column: true,
//   });

//   const el = document.createElement("div");
//   el.id = "changelog-app";
//   page.wrapper.appendChild(el);

//   createApp(Home).mount("#changelog-app");
// }
import { createApp } from "vue";
import Home from "./Home.vue";

frappe.pages["changelog"].on_page_load = function (wrapper) {
  const el = document.createElement("div");
  el.id = "changelog";
  wrapper.appendChild(el);

  createApp(Home).mount("#changelog");
};

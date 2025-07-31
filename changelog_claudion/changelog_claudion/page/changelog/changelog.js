// // frappe.pages['changelog'].on_page_load = function(wrapper) {
// // 	var page = frappe.ui.make_app_page({
// // 		parent: wrapper,
// // 		title: 'Change Log',
// // 		single_column: true
// // 	});
// // }


// frappe.ready(() => {
//   if (!frappe.pages['changelog']) {
//     frappe.pages['changelog'] = {};
//   }

//   frappe.pages['changelog'].on_page_load = function (wrapper) {
//     if (window.ChangelogApp?.mountChangelog) {
//       window.ChangelogApp.mountChangelog(wrapper);
//     } else {
//       console.error('❌ mountChangelog not available on window.ChangelogApp');
//     }
//   };
// });


frappe.ready(() => {
  if (!frappe.pages['changelog']) {
    frappe.pages['changelog'] = {};
  }

  frappe.pages['changelog'].on_page_load = function (wrapper) {
    console.log("🧩 Frappe page on_page_load triggered"); // Add this
    if (window.ChangelogApp?.mountChangelog) {
      window.ChangelogApp.mountChangelog(wrapper);
    } else {
      console.error('❌ mountChangelog not available on window.ChangelogApp');
    }
  };
});

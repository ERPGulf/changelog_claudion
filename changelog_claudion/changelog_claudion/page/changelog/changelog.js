frappe.pages['changelog'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Change Log',
		single_column: true
	});
}
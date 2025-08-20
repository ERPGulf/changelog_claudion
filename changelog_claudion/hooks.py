app_name = "changelog_claudion"
app_title = "changelog_claudion"
app_publisher = "erpgulf"
app_description = "changelog_claudion"
app_email = "asithara@htsqatar"
app_license = "mit"

website_route_rules = [
    {"from_route": "/logger", "to_route": "logger"},
]


# app_include_js = [
#   "public/js/changelog.js"
# ]

# app_include_js = [
#     "public/js/changelog_claudion/changelog.js"
# ]


# app_include_js = [
#   "public/js/changelog_claudion/changelog.js",
# ]
# app_include_js = [
#     "changelog_claudion.bundle.js",
# ]
# app_include_js = "/assets/changelog_claudion/js/changelog_claudion/changelog.js"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "changelog_claudion",
# 		"logo": "/assets/changelog_claudion/logo.png",
# 		"title": "changelog_claudion",
# 		"route": "/changelog_claudion",
# 		"has_permission": "changelog_claudion.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/changelog_claudion/css/changelog_claudion.css"
# app_include_js = "/assets/changelog_claudion/js/changelog_claudion.js"

# include js, css files in header of web template
# web_include_css = "/assets/changelog_claudion/css/changelog_claudion.css"
# web_include_js = "/assets/changelog_claudion/js/changelog_claudion.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "changelog_claudion/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}
# page_js = {
#     "changelog": "public/js/changelog_claudion/changelog.js"
# }

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "changelog_claudion/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "changelog_claudion.utils.jinja_methods",
# 	"filters": "changelog_claudion.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "changelog_claudion.install.before_install"
# after_install = "changelog_claudion.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "changelog_claudion.uninstall.before_uninstall"
# after_uninstall = "changelog_claudion.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "changelog_claudion.utils.before_app_install"
# after_app_install = "changelog_claudion.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "changelog_claudion.utils.before_app_uninstall"
# after_app_uninstall = "changelog_claudion.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "changelog_claudion.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"changelog_claudion.tasks.all"
# 	],
# 	"daily": [
# 		"changelog_claudion.tasks.daily"
# 	],
# 	"hourly": [
# 		"changelog_claudion.tasks.hourly"
# 	],
# 	"weekly": [
# 		"changelog_claudion.tasks.weekly"
# 	],
# 	"monthly": [
# 		"changelog_claudion.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "changelog_claudion.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "changelog_claudion.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "changelog_claudion.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["changelog_claudion.utils.before_request"]
# after_request = ["changelog_claudion.utils.after_request"]

# Job Events
# ----------
# before_job = ["changelog_claudion.utils.before_job"]
# after_job = ["changelog_claudion.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"changelog_claudion.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

fixtures = [
    {"dt": "Custom Field", "filters": {"module": "changelog_claudion"}},
]

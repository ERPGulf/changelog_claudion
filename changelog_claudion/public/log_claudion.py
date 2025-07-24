import frappe
import base64
from werkzeug.wrappers import Response, Request
import json


@frappe.whitelist(allow_guest=True)  # pylint: disable=no-member
def changelog_claudion(category=None):
    """
    Returns changelog entries grouped under a single 'Claudion' message.
    """

    logs = frappe.get_all(
        "Changelog",
        fields=[
            "name",
            "title",
            "date",
            "description",
            "image",
            "video",
            "custom_category",
        ],
        filters={"custom_category": category} if category else None,
    )

    data = []

    # Use first log's category for global info like title, logo, etc.
    category_doc = None

    for log in logs:
        try:
            log_id = int(log.name)
        except ValueError:
            log_id = log.name

        # Get tags
        tags = frappe.get_all(
            "log claudion child table",
            filters={"parent": log.name, "parenttype": "changelog"},
            fields=["tags"],
        )

        # Get category doc (only once)
        if not category_doc:
            category_doc = frappe.get_doc("Blog Category", log.custom_category)

        data.append(
            {
                "id": log_id,
                "title": log.title,
                "date": str(log.date),
                "description": log.description,
                "image": "https://io.claudion.com/" + log.image if log.image else "",
                "video": log.video,
                "tags": [t["tags"] for t in tags],
                "category": log.custom_category,
            }
        )

    message = {
        "title": category_doc.title if category_doc else "Claudion",
        "link": category_doc.description if category_doc else "www.claudion.com",
        "logo": (
            "https://io.claudion.com" + category_doc.preview_image
            if category_doc
            else ""
        ),
        "data": data,
    }

    return Response(
        json.dumps({"message": message}), status=200, mimetype="application/json"
    )

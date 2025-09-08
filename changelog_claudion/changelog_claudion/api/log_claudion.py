import frappe
import base64
from werkzeug.wrappers import Response, Request
import json

from urllib.parse import urlparse, urlunparse



@frappe.whitelist(allow_guest=True)
def changelog_claudion(category=None):
    """
    API endpoint to fetch changelog entries, optionally filtered by category.

    Args:
        category (str, optional): Category to filter changelog entries. Defaults to None.

    Returns:
        werkzeug.wrappers.Response: JSON response containing changelog entries and category information.
    """

    parsed_url = frappe.local.conf.host_name

    filters = {}
    if category:
        filters["category"] = category
    else:
        filters["category"] = None

    logs = frappe.get_all(
        "Changelogs",
        fields=[
            "name",
            "title",
            "date",
            "changelog_url",
            "description",
            "image",
            "video",
            "category",
            "published",
            "contributer"
        ],
        filters=filters,
        order_by="date DESC",
    )

    data = []
    category_doc = None

    if category:
        category_docs = frappe.get_all(
            "Changelog Settings",
            fields=["title", "logo", "description", "email", "link", "category", "display_contributer"],
            filters={"category": category},
        )
        category_doc = category_docs[0] if category_docs else None
    else:
        category_docs = frappe.get_all(
            "Changelog Settings",
            fields=["title", "logo", "description", "email", "link", "category", "display_contributer"],
        )
        category_doc = category_docs[0] if category_docs else None

        message = {
            "category" : category_docs
        }

        return Response(json.dumps({"message": message}), status=200,mimetype="application/json")


    for log in logs:
        try:
            log_id = int(log.name)
        except ValueError:
            log_id = log.name

        tags = frappe.get_all(
            "log claudion child table",
            filters={"parent": log["name"], "parenttype": "Changelogs"},
            fields=["tags"],
        )

        data.append(
            {
                "id": log_id,
                "title": log.title,
                "date": str(log.date),
                "url": log.changelog_url,
                "description": log.description,
                "image": parsed_url + log.image if log.image else "",
                "video": parsed_url + log.video if log.video else "",
                "tags": [t["tags"] for t in tags],
                "category": log.category,
                "published": bool(log.published),
                "contributer": log.contributer if log.contributer else ""
            }
        )

    message = {
        "title": category_doc.get("title", "") if category_doc else "",
        "description": category_doc.get("description", "") if category_doc else "",
        "logo": parsed_url + category_doc.get("logo", "") if category_doc and category_doc.get("logo") else "",
        "link": category_doc.get("link", "") if category_doc else "",
        "email": category_doc.get("email", "") if category_doc else "",
        "display_contributer": bool( category_doc.get("display_contributer", "")) if category_doc else "",
        "data": data,
    }

    return Response(json.dumps({"message": message}), status=200,mimetype="application/json")
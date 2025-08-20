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

    parsed_url = urlparse(frappe.utils.get_url())
    clean_base_url = urlunparse((parsed_url.scheme, parsed_url.hostname, "", "", "", ""))

    filters = {}
    if category:
        filters["custom_category"] = category
    else:
        filters["custom_category"] = None

    logs = frappe.get_all(
        "Changelog",
        fields=[
            "name",
            "title",
            "date",
            "custom_url",
            "custom_description_1",
            "image",
            "video",
            "custom_category",
        ],
        filters=filters,
        order_by="date DESC",
    )

    data = []
    category_doc = None

    if category:
        category_docs = frappe.get_all(
            "Changelog Settings",
            fields=["name as title", "logo", "custom_description_1", "email", "link", "category"],
            filters={"category": category},
        )
        category_doc = category_docs[0] if category_docs else None
    else:
         category_docs = frappe.get_all(
            "Changelog Settings",
            fields=["name as title", "logo", "custom_description_1", "email", "link", "category"],
            filters={"category":None},
        )
         category_doc = category_docs[0] if category_docs else None


    for log in logs:
        try:
            log_id = int(log.name)
        except ValueError:
            log_id = log.name

        tags = frappe.get_all(
            "log claudion child table",
            filters={"parent": log["name"], "parenttype": "Changelog"},
            fields=["tags"],
        )

        data.append(
            {
                "id": log_id,
                "title": log.title,
                "date": str(log.date),
                "url": log.custom_url,
                "description": log.custom_description_1,
                "image": clean_base_url + log.image if log.image else "",
                "video": clean_base_url + log.video if log.video else "",
                "tags": [t["tags"] for t in tags],
                "category": log.custom_category,
            }
        )

    message = {
        "title": category_doc.get("title", "") if category_doc else "",
        "description": category_doc.get("custom_description_1", "") if category_doc else "",
        "logo": clean_base_url + category_doc.get("logo", "") if category_doc and category_doc.get("logo") else "",
        "link": category_doc.get("link", "") if category_doc else "",
        "email": category_doc.get("email", "") if category_doc else "",
        "data": data,
    }

    return Response(json.dumps({"message": message}), status=200,mimetype="application/json")
import frappe
import base64
from werkzeug.wrappers import Response, Request
import json


@frappe.whitelist(allow_guest=False)  # pylint: disable=no-member
def log_claudion():
    """
    Logs a message and returns all log entries with their tag details.
    """

    logs = frappe.get_all(  # pylint: disable=no-member
        "log claudion",
        fields=["name", "title", "date", "description", "image", "video"],
    )

    result = []
    for log in logs:

        try:
            log_id = int(log.name)
        except ValueError:
            log_id = log.name

        tags = frappe.get_all(  # pylint: disable=no-member
            "log claudion child table",
            filters={"parent": log.name, "parenttype": "log claudion"},
            fields=["tags"],
        )

        result.append(
            {
                "id": log_id,
                "title": log.title,
                "date": str(log.date),
                "description": log.description,
                "image": log.image,
                "video": log.video,
                "tags": [t["tags"] for t in tags],
            }
        )

    return Response(
        json.dumps({"data": result}), status=200, mimetype="application/json"
    )

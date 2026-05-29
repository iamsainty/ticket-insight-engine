import re

COLUMNS_TO_MASK = [
    "Short description",
    "Description",
    "Close notes",
    "Additional comments (User View)"
]

def mask_pii(text):

    try:

        if not isinstance(text, str):
            return text

        text = re.sub(
            r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
            '[EMAIL]',
            text
        )

        text = re.sub(
            r'\b\d{10}\b',
            '[PHONE]',
            text
        )

        text = re.sub(
            r'\b(INC|TASK|RITM|SER)\d+\b',
            '[TICKET_ID]',
            text
        )

        return text

    except Exception as e:
        return "PII Data removal erro"


def sanitize_rows(rows):

    try:
        sanitized_rows = []

        for row in rows:

            updated_row = row.copy()

            for field in COLUMNS_TO_MASK:
                if field in updated_row:
                    updated_row[field] = mask_pii(updated_row[field])

            sanitized_rows.append(updated_row)

        return {
            "success": True,
            "message": "PII data removed successfully",
            "sanitized_rows": sanitized_rows
        }

    except Exception as e:
        return {
            "success": False,
            "message": "Error in PII Data"
        }
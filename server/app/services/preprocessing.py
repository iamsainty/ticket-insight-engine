import re
import pandas as pd

COLUMNS_TO_PREPROCESS = [
    "Short description",
    "Description",
    "Close notes",
    "Additional comments (User View)"
]

def preprocess_row(text):

    try:

        if pd.isna(text):
            return ""

        text = str(text)

        # Mask email addresses
        text = re.sub(
            r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
            '[EMAIL]',
            text
        )

        # Mask phone numbers
        text = re.sub(
            r'\b\d{10}\b',
            '[PHONE]',
            text
        )

        # Mask ticket ids
        text = re.sub(
            r'\b(INC|TASK|RITM|SER)\d+\b',
            '[TICKET_ID]',
            text,
            flags=re.IGNORECASE
        )

        # Mask Microsoft Teams meeting links
        text = re.sub(
            r'https:\/\/teams\.microsoft\.com\/[^\s]+',
            '[TEAMS_LINK]',
            text
        )

        # Remove greetings like Hi Team, Hello Team etc
        text = re.sub(
            r'\b(hi team|hello team|hi|hello|thanks|regards)\b[:,]?',
            '',
            text,
            flags=re.IGNORECASE
        )

        # Remove multiple new lines
        text = re.sub(
            r'\n+',
            ' ',
            text
        )

        # Remove multiple spaces
        text = re.sub(
            r'\s+',
            ' ',
            text
        )

        text = text.strip()

        return text

    except Exception:
        return text


def preprocess_data(rows):

    try:

        processed_rows = []

        for row in rows:

            updated_row = row.copy()

            for field in COLUMNS_TO_PREPROCESS:

                if field in updated_row:
                    updated_row[field] = preprocess_row(updated_row[field])

            processed_rows.append(updated_row)

        return {
            "success": True,
            "message": "Data preprocessed successfully",
            "processed_rows": processed_rows
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error preprocessing data: {str(e)}"
        }
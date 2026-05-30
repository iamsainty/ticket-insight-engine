REQUIRED_COLUMNS = [
    "Assignment group",
    "Service",
    "Sub-service",
    "Short description",
    "Description",
    "Close notes",
    "Additional comments (User View)",
]


def validate_file(columns):

    try:

        missing_columns = []

        for required_column in REQUIRED_COLUMNS:

            if required_column not in columns:
                missing_columns.append(required_column)

        if len(missing_columns) > 0:

            return {
                "success": False,
                "message": "Missing required columns",
                "data": missing_columns,
            }

        return {"success": True, "message": "File validated successfully", "data": None}

    except Exception as e:

        return {
            "success": False,
            "message": f"Error validating file: {str(e)}",
            "data": None,
        }

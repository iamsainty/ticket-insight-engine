REQUIRED_COLUMNS = [
    "Assignment group",
    "Service",
    "Sub-service",
    "Short description",
    "Description",
    "Close notes",
    "Additional comments (User View)"
]

def validate_file(columns):
    try:
        for required_column in REQUIRED_COLUMNS:
            if required_column not in columns:
                return {
                    "success": False,
                    "message": f"Missing required columns"
                }
        
        return {
            "success": True,
            "message": "File validated successfully"
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Error validating file: {str(e)}"
        }


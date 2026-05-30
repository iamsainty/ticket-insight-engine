import os
import uuid

ALLOWED_EXTENSIONS = [".xls", ".xlsx"]


def validate_file_extension(filename):

    try:

        if not filename:

            return {"success": False, "message": "Filename is required", "data": None}

        file_extension = os.path.splitext(filename)[1].lower()

        if file_extension not in ALLOWED_EXTENSIONS:

            return {"success": False, "message": "Invalid file extension", "data": None}

        return {
            "success": True,
            "message": "Valid file extension",
            "data": file_extension,
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error validating file extension: {str(e)}",
            "data": None,
        }


def generate_unique_filename(filename):

    try:

        if not filename:

            return {"success": False, "message": "Filename is required", "data": None}

        unique_filename = f"{uuid.uuid4()}_{filename}"

        return {
            "success": True,
            "message": "Unique filename generated successfully",
            "data": unique_filename,
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error generating unique filename: {str(e)}",
            "data": None,
        }

import pandas as pd

from app.services.validate_file import validate_file
from app.services.pii_masker import sanitize_rows


def parse_excel_file(file_path):

    try:

        df = pd.read_excel(file_path)

        df = df.dropna(how="all")

        df = df.where(pd.notnull(df), None)

        if df.empty:

            return {
                "success": False,
                "message": "No data found in the file",
                "data": None
            }

        validated_file = validate_file(df.columns)

        if not validated_file["success"]:

            return {
                "success": False,
                "message": validated_file["message"],
                "data": validated_file.get("missing_columns", [])
            }

        rows = df.to_dict(orient="records")

        sanitized_result = sanitize_rows(rows)

        if not sanitized_result["success"]:

            return {
                "success": False,
                "message": sanitized_result["message"],
                "data": None
            }

        return {
            "success": True,
            "message": "File parsed successfully",
            "data": sanitized_result["sanitized_rows"]
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error parsing file: {str(e)}",
            "data": None
        }
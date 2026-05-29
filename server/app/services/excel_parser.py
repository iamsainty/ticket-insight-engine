import pandas as pd

from app.services.validate_file import validate_file
from app.services.preprocessing import preprocess_data

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

        rows = df.fillna("").to_dict(orient="records")

        processed_result = preprocess_data(rows)

        if not processed_result["success"]:

            return {
                "success": False,
                "message": processed_result["message"],
                "data": None
            }

        return {
            "success": True,
            "message": "File parsed successfully",
            "data": processed_result["processed_rows"]
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error parsing file: {str(e)}",
            "data": None
        }
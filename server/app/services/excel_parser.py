import pandas as pd


def parse_excel_file(file_path):

    try:

        df = pd.read_excel(file_path)
        df = df.dropna(how="all")
        df = df.where(pd.notnull(df), None)

        if df.empty:

            return {
                "success": False,
                "message": "No data found in the file",
                "data": None,
            }

        rows = df.fillna("").to_dict(orient="records")

        return {
            "success": True,
            "message": "File parsed successfully",
            "data": {"columns": list(df.columns), "rows": rows},
        }

    except Exception as e:

        return {
            "success": False,
            "message": f"Error parsing file: {str(e)}",
            "data": None,
        }

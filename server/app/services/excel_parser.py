import pandas as pd

def parse_excel_file(file_path):
    try:

        df = pd.read_excel(file_path)

        df = df.dropna(how="all")

        if(df.empty):
            return {
                "success": False,
                "message": "No data found in the file"
            }

        rows = df.to_dict(orient="records")

        return {
            "success": True,
            "message": "File parsed successfully",
            "data": rows
        }
    
    except Exception as e:
        return {
            "success": False,
            "message": f"Error parsing file: {str(e)}"
        }
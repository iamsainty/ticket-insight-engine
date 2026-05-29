from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
from app.utils.file_utils import (
    validate_file_extension,
    generate_unique_filename
)
from app.services.excel_parser import parse_excel_file

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    try:

        if not validate_file_extension(file.filename):

            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "message": "Invalid file extension",
                    "data": None
                }
            )

        unique_filename = generate_unique_filename(file.filename)

        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as fileBuffer:

            file_content = await file.read()
            fileBuffer.write(file_content)

        parsed_data = parse_excel_file(file_path)

        if not parsed_data["success"]:
            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "message": parsed_data["message"],
                    "data": None
                }
            )

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "File parsed successfully",
                "data": parsed_data.get("data", [])
            }
        )

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": f"Internal server error: {str(e)}",
                "data": None
            }
        )
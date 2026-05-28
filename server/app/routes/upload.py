from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from app.utils.file_utils import validate_file_extension, generate_unique_filename
from app.services.excel_parser import parse_excel_file

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    if not validate_file_extension(file.filename):
        raise HTTPException(status_code=400, detail="Invalid file extension")

    unique_filename = generate_unique_filename(file.filename)

    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as fileBuffer:
        file_content = await file.read()
        fileBuffer.write(file_content)

    parsed_data = parse_excel_file(file_path)

    if not parsed_data["success"]:
        raise HTTPException(status_code=400, detail=parsed_data["message"])

    return {
        "success": True,
        "message": "File parsed successfully",
        "file_path": file_path,
        "data": parsed_data.get("data", [])
    }
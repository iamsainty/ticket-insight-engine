from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from app.utils.file_utils import validate_file_extension, generate_unique_filename

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

    return {
        "success": True,
        "message": "File uploaded successfully",
        "file_path": file_path
    }
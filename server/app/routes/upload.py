from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXT = [".csv", ".xls", ".xlsx"]

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_ext = os.path.splitext(file.filename)[1]

    if file_ext.lower() not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Invalid file extension")

    unique_filename = f"{uuid.uuid4()}_{file.filename}"

    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as fileBuffer:
        file_content = await file.read()
        fileBuffer.write(file_content)

    return {
        "success": True,
        "message": "File uploaded successfully",
        "file_path": file_path
    }
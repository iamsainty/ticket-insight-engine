from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
from app.services.excel_parser import parse_excel_file
from app.services.preprocessing import preprocess_data
from app.services.validate_file import validate_file
from app.utils.file_utils import (
    generate_unique_filename,
    validate_file_extension,
)
from app.services.ai.analyzer import analyze_tickets

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    try:

        validation_result = validate_file_extension(file.filename)

        if not validation_result["success"]:
            return JSONResponse(status_code=400, content=validation_result)

        filename_result = generate_unique_filename(file.filename)

        if not filename_result["success"]:
            return JSONResponse(status_code=400, content=filename_result)

        unique_filename = filename_result["data"]

        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as file_buffer:
            file_content = await file.read()
            file_buffer.write(file_content)

        parsed_result = parse_excel_file(file_path)

        if not parsed_result["success"]:
            return JSONResponse(status_code=400, content=parsed_result)

        file_validation_result = validate_file(parsed_result["data"]["columns"])

        if not file_validation_result["success"]:
            return JSONResponse(status_code=400, content=file_validation_result)

        preprocess_result = preprocess_data(parsed_result["data"]["rows"])

        if not preprocess_result["success"]:
            return JSONResponse(status_code=400, content=preprocess_result)

        gpt_result = analyze_tickets(preprocess_result["data"])

        if not gpt_result["success"]:
            return JSONResponse(status_code=400, content=gpt_result)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "File uploaded and processed successfully",
                "data": gpt_result["data"],
            },
        )

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": f"Internal server error: {str(e)}",
                "data": None,
            },
        )

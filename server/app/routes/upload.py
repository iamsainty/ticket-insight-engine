import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    BackgroundTasks
)
from fastapi.responses import (
    JSONResponse,
    FileResponse
)

from app.utils.file_utils import (
    generate_unique_filename,
    validate_file_extension,
)

from app.services.excel_parser import parse_excel_file
from app.services.validate_file import validate_file
from app.services.preprocessing import preprocess_data

from app.services.ai.analyzer import analyze_tickets
from app.services.ai.test.test_gpt_response import (
    GPT_RESULT
)

from app.services.embeddings.embedding_service import (
    generate_ticket_embeddings
)

from app.services.clustering.ticket_clustering_service import (
    create_ticket_clusters
)

from app.services.report_generation_service import (
    generate_excel_report
)

router = APIRouter()

UPLOAD_DIR = "uploads"
REPORT_DIR = "report"

def delete_file(path):
    if os.path.exists(path):
        os.remove(path)

@router.post("/upload")
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):

    try:
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        os.makedirs(REPORT_DIR, exist_ok=True)

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
        # gpt_result = GPT_RESULT

        if not gpt_result["success"]:
            return JSONResponse(status_code=400, content=gpt_result)

        embedding_result = generate_ticket_embeddings(gpt_result["data"])

        if not embedding_result["success"]:
            return JSONResponse(status_code=400, content=embedding_result)

        clustering_result = create_ticket_clusters(embedding_result["data"])

        if not clustering_result["success"]:
            return JSONResponse(status_code=400, content=clustering_result)

        report_result = generate_excel_report(
            preprocess_result["data"],
            clustering_result["data"]["tickets"],
            unique_filename
        )

        if not report_result["success"]:
            return JSONResponse(
                status_code=400,
                content=report_result
            )

        report_path = report_result["data"][
            "report_path"
        ]

        background_tasks.add_task(
            delete_file,
            file_path
        )

        background_tasks.add_task(
            delete_file,
            report_path
        )

        return FileResponse(
            path=report_path,
            filename=report_result["data"][
                "report_filename"
            ],
            media_type=(
                "application/vnd.openxmlformats-"
                "officedocument.spreadsheetml.sheet"
            )
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
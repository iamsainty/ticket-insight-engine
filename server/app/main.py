from fastapi import FastAPI
from app.routes.upload import router as upload_router

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI server is running"}

app.include_router(upload_router)
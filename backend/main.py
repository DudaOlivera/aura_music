import os
import shutil
import joblib
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai.features import extract_features

UPLOAD_DIR = "temp_uploads"
ORGANIZED_DIR = "organized_music"
MODEL_PATH = "ai/model.joblib"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ORGANIZED_DIR, exist_ok=True)

model = joblib.load(MODEL_PATH)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class OrganizeRequest(BaseModel):
    filename: str
    genre: str
    temp_path: str

@app.post("/analyze")
async def analyze_music(file: UploadFile = File(...)):
    path = os.path.join(UPLOAD_DIR, file.filename)

    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    features = extract_features(path)
    genre = model.predict([features])[0]

    return {
        "filename": file.filename,
        "genre": genre,
        "temp_path": os.path.abspath(path)
    }

@app.post("/organize")
async def organize_music(req: OrganizeRequest):
    dest = os.path.join(ORGANIZED_DIR, req.genre)
    os.makedirs(dest, exist_ok=True)

    shutil.move(req.temp_path, os.path.join(dest, req.filename))
    return {"status": "ok"}

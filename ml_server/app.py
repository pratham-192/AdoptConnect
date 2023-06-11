from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import get_children, get_text, get_clean_text
from model import get_prediction

app = FastAPI()

# CORS
origins = ["https://adopt-connect.vercel.app", "http://localhost"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def index():
    return { "message": "Hello World!" }

@app.post("/children/flag")
def flag_children():
    children = get_children()
    texts = { child["childId"] : get_text(child) for child in children}
    clean_texts = { childId: get_clean_text(text) for childId, text in texts.items() }
    predictions = { childId: get_prediction(text) for childId, text in clean_texts.items() }
    output = { childId: prediction == "Prompt" for childId, prediction in predictions.items() }
    return output
from fastapi.middleware.cors import CORSMiddleware
from model import Graph, add_sentence_node
from fastapi import FastAPI, Form, HTTPException, File, UploadFile
from scribe import transcribe_audio
import nltk

app = FastAPI()

graph = Graph()

origins = ["http://localhost:3000", "http://localhost:8080"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/hello")
def hello_view(name: str = "Pepals"):
    return {"message": f"Hello there, {name}!"}


def add_sentence(sentence: str):
    if sentence == "":
        raise HTTPException(status_code=404, detail="Sentence cannot be null.")
    add_sentence_node(sentence, graph)
    return graph.to_json()

@app.get("/chunk")
def process_sentence_chunk(chunk: str):
    sentences = nltk.sent_tokenize(chunk)
    for sentence in sentences:
        add_sentence(sentence)
    return graph.to_json()

@app.post("/scribe")
async def scribe(audio: UploadFile = File(...)):
    content = await audio.read()
    transcript = transcribe_audio(content)
    print(transcript)
    return transcript

@app.get("/get-graph")
def get_graph():
    print(graph.to_json())
    return graph.to_json()

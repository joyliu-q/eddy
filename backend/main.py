from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Graph, add_sentence_node

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


@app.get("/add-sentence")
def add_sentence(sentence: str):
    if sentence == "":
        raise HTTPException(status_code=404, detail="Sentence cannot be null.")
    add_sentence_node(sentence, graph)
    return graph.to_json()


# ~~ STUBWITH # TODO: complete me

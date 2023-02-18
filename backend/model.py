import json
from numpy.linalg import norm
from numpy import dot
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

# Text processing helper functions
def cosine_similarity(a, b):
    if a is None or b is None:
        return 0
    # TODO: idk if we should do this when the shape doenst match
    if len(a) != len(b):
        return 0
    return dot(a, b) / (norm(a) * norm(b))


def get_embedding(text, model="text-embedding-ada-002"):
    text = text.replace("\n", " ")
    return openai.Embedding.create(input=[text], model=model)["data"][0]["embedding"]


def get_node_distance_from_similarity(similarity: float) -> tuple[int, int]:
    max_dist = 50
    min_dist = 10
    # scale a number from 0 to 1 to 50 to 10
    distance = round(
        (max_dist - min_dist) * similarity + min_dist
    )  # TODO: maybe better distance instead of x = y
    return (distance, distance)


# Node as json { keyword: string, position: {x: int, y: int}, data: { sentence: string } }
class Node:
    def __init__(
        self, keyword: str, position: dict, sentences: list[str], embedding: list
    ):
        self.keyword = keyword
        self.position = position
        self.data = {"sentences": sentences, "embedding": embedding}

    def to_json(self):  # omit data.embedding
        data = {"sentences": self.data["sentences"]}
        return {"keyword": self.keyword, "position": self.position, "data": data}

    def get_similarity(self, keyword_embedding):
        return cosine_similarity(self.data["embedding"], keyword_embedding)


# Edge as json { id: int, source: string (nodeId), target: string (nodeId), data: { strength: int } }
class Edge:
    def __init__(self, id: int, source: str, target: str, data: dict):
        self.id = id
        self.source = source
        self.target = target
        self.data = data

    def to_json(self):
        return {
            "id": self.id,
            "source": self.source,
            "target": self.target,
            "data": self.data,
        }


class Graph:
    def __init__(self):
        self.nodes = set()
        self.edges = set()
        self.add_node(Node("root", {"x": 0, "y": 0}, [], []))  # add root node

    def add_node(self, node: Node):
        self.nodes.add(node)

    def add_edge(self, edge: Edge):
        self.edges.add(edge)

    def get_nodes(self):
        return self.nodes

    def get_edges(self):
        return self.edges

    def debug(self):
        print("nodes: ", len(self.nodes))
        for node in self.nodes:
            print(node.to_json())
        print("edges: ", len(self.edges))
        for edge in self.edges:
            print(edge)

    def to_json(self):
        return {
            "nodes": [node.to_json() for node in self.nodes],
            "edges": [edge.to_json() for edge in self.edges],
        }


CREATION_THRESHOLD = 0.5  # Threshold for adding a new node
COLLAPSE_THRESHOLD = 0.8  # Threshold for collapsing two nodes


def add_sentence_node(sentence: str, graph: Graph):
    sentence_embedding = get_embedding(sentence)

    for node in graph.get_nodes():
        if node.get_similarity(sentence_embedding) > COLLAPSE_THRESHOLD:
            print("keyword already exists, merging")
            node.data["sentences"].append(sentence)
            return

    keyword = openai.Completion.create(
        model="text-davinci-003",
        prompt="\
            Extract the most descriptive keyword (one to four words total) that represents the core idea of this sentence:\n\n\
            For example:\n\
            Sentence: Black-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico.\n\
            Keyword: Puebloan Pottery\n\
            Sentence: "
        + sentence
        + "\n\nKeyword:\n-",
        temperature=0.5,
        max_tokens=10,
        top_p=1.0,
        frequency_penalty=0.8,
        presence_penalty=0.0,
    )["choices"][0]["text"]
    print("keyword: ", keyword)

    keyword_embedding = get_embedding(keyword)
    max_similarity = 0
    max_node = None
    for node in graph.get_nodes():
        similarity = node.get_similarity(keyword_embedding)
        if similarity > max_similarity:
            max_similarity = similarity
            max_node = node

    (delta_x, delta_y) = get_node_distance_from_similarity(max_similarity)
    if max_similarity < CREATION_THRESHOLD or max_node is None:
        print("new node to root")
        (x, y) = (delta_x, delta_y)
        edge = Edge(0, "root", keyword, {"strength": 1})
    else:
        print("new node to ", max_node.keyword, " with similarity ", max_similarity)
        (x, y) = (max_node.position["x"] + delta_x, max_node.position["y"] + delta_y)
        edge = Edge(0, max_node.keyword, keyword, {"strength": max_similarity})

    node = Node(keyword, {"x": x, "y": y}, [sentence], keyword_embedding)
    graph.add_node(node)
    graph.add_edge(edge)


# graph = Graph()
# test_sentences = [
#     "Today, I want to go to the store",
#     "At the store, I want to buy some milk",
#     "I want to buy some milk because I am hungry",
#     "Cats are cool",
# ]
# for s in test_sentences:
#     add_sentence_node(s, graph)
# graph.debug()

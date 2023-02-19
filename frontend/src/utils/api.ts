const API_URL = "http://localhost:8000";
export async function addSentenceChunk(chunk: string) {
  return fetch(`${API_URL}/chunk?chunk=` + chunk, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());
}

export async function getGraph() {
  return fetch(`${API_URL}/get-graph`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());
}

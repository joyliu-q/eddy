const API_URL = "http://localhost:8000";
export async function addSentenceChunk(chunk: string) {
  return fetch(`${API_URL}/process-sentence-chunk?chunk=` + chunk, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());
}

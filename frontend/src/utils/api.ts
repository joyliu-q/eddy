const API_URL = "http://localhost:8000";
export async function addSentence(sentence: string) {
  return fetch(`${API_URL}/add-sentence?sentence=` + sentence, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());
}

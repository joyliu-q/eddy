import { mutation } from "../_generated/server";

export default mutation(async ({ db, args }) => {
  const { keyword, position, sentences, embedding } = args;
  const node = await db.create("Nodes", {
    keyword,
    position,
    sentences,
    embedding,
  });
  return node;
});
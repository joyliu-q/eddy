import { mutation } from "../_generated/server";

export default mutation(async ({ db, args }) => {
  const { from, to } = args;
  const edge = await db.create("Edges", {
    from,
    to,
  });
  return edge;
});
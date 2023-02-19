import { mutation } from "../_generated/server";

export default mutation(async ({ db }, id, transcript) => {
  await db.replace("Transcript", {
    id,
    value: transcript
  });
});
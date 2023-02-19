import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  Edges: defineTable({
    data: s.object({ strength: s.number() }),
    source: s.string(),
    target: s.string(),
  }),
  Graph: defineTable({
    embedding: s.array(s.number()),
    keyword: s.string(),
    position: s.object({ x: s.number(), y: s.number() }),
    sentences: s.array(s.string()),
  }),
});
import { z } from "zod";

export const dictWordSchema = z.object({
  word_uuid: z.string(),
  surface: z.string(),
  pronunciation: z.string(),
  accent_type: z.number(),
  word_type: z
    .enum(["PROPER_NOUN", "COMMON_NOUN", "VERB", "ADJECTIVE", "SUFFIX"])
    .or(z.null()),
  priority: z.number(),
});

export const dictWordToTuple = (row: DictWord) => {
  return [
    row.word_uuid,
    row.surface,
    row.pronunciation,
    row.accent_type,
    row.word_type,
    row.priority,
  ];
};

export type DictWord = z.infer<typeof dictWordSchema>;

export const requestSchema = z.union([
  z.object({
    event: z.literal("apply_word"),
    properties: dictWordSchema,
  }),
  z.object({
    event: z.literal("rewrite_word"),
    properties: dictWordSchema,
  }),
  z.object({
    event: z.literal("delete_word"),
    properties: z.object({
      word_uuid: z.string(),
    }),
  }),
]);

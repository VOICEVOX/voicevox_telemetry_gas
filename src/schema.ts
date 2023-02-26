import { z } from "zod";

export const dictWordSchema = z.object({
  word_uuid: z.string(),
  surface: z.string(),
  pronunciation: z.string(),
  accent_type: z.number(),
  word_type: z
    .enum(["PROPER_NOUN", "COMMON_NOUN", "VERB", "ADJECTIVE", "SUFFIX", ""])
    .or(z.null())
    .transform((v) => (v === "" ? null : v)),
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

export const dictWordFromTuple = (row: string[]) => {
  return dictWordSchema.parse({
    word_uuid: row[0],
    surface: row[1],
    pronunciation: row[2],
    accent_type: parseInt(row[3]),
    word_type: row[4] as unknown as DictWord["word_type"],
    priority: parseInt(row[5]),
  });
};

export type DictWord = z.infer<typeof dictWordSchema>;

export const requestType = {
  apply_word: dictWordSchema,
  rewrite_word: dictWordSchema,
  delete_word: z.object({
    word_uuid: z.string(),
  }),
};

export const requestSchema = z.union(
  // @ts-expect-error 謎のエラー
  Object.entries(requestType).map(([key, value]) => {
    return z.object({
      event: z.literal(key),
      properties: value,
    });
  })
);

import { z } from "zod";

export const addWordValidator = z.object({
  word: z.string(),
});

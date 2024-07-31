import { z } from "zod";

// We're keeping a simple non-relational schema here.
export const rowSchema = z.object({
  id: z.number(),
  videoUrl: z.string(),
  provider: z.string(),
  profileId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type TableRowType = z.infer<typeof rowSchema>;

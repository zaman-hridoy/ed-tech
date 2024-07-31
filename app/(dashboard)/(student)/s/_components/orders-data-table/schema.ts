import { z } from "zod";

// We're keeping a simple non-relational schema here.
export const rowSchema = z.object({
  id: z.number(),
  company: z.object({
    id: z.number(),
    company: z.string(),
  }),
  note: z.string(),
  costcenter: z.string(),
  fincostcenter: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  updated_at: z.string(),
  updated_by: z.string(),
});
export type TableRowType = z.infer<typeof rowSchema>;

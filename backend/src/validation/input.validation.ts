import zod from "zod";

export const InputSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string(),
  code: zod.string(),
  unitPrice: zod.number(),
  measurementUnit: zod.string(),
  group: zod.string(),
  grammage: zod.number(),
});

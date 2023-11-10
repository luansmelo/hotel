import zod from "zod";

export interface InputDTO {
  id?: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  group: string;
  grammage: number;
}

export const InputSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string(),
  code: zod.string(),
  unitPrice: zod.number(),
  measurementUnit: zod.string(),
  group: zod.string(),
  grammage: zod.number(),
});

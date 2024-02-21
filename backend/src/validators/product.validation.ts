import zod from "zod";
import { InputToProductSchema } from "./input.validation";

export const ProductSchema = zod.object({
  name: zod
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(3, "O nome deve terpelo menos 3 caracteres"),
  description: zod
    .string({
      required_error: "A descrição é obrigatória",
    })
    .min(3, "A descrição deve ter pelo menos 3 caracteres"),
});

export const AddInputToProductSchema = zod.object({
  productId: zod
    .string({
      invalid_type_error: "O id do produto é obrigatório",
    })
    .uuid(),
  input: zod.array(InputToProductSchema),
});

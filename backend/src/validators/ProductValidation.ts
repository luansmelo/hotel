import zod from "zod";
import { InputToProductSchema } from "./InputValidation";

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

  resource: zod.string({
    required_error: "O recurso é obrigatório",
    invalid_type_error: "O recurso deve ser uma string",
  }),
  preparationTime: zod.number({
    required_error: "O tempo de preparação é obrigatório",
    invalid_type_error: "O tempo de preparação deve ser um number",
  }),
});

export const AddInputToProductSchema = zod.object({
  id: zod
    .string({
      invalid_type_error: "O id do produto é obrigatório",
    })
    .uuid(),
  inputs: zod.array(InputToProductSchema),
});

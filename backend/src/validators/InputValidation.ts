import zod from "zod";

export const InputToProductSchema = zod.object({
  id: zod.string().optional(),
  measurementUnit: zod.string({
    required_error: "A unidade de medida do item é obrigatório",
    invalid_type_error: "A unidade de medida do item deve ser uma string",
  }),
  grammage: zod.number({
    required_error: "O valor unitário do item é obrigatório",
    invalid_type_error: "O valor unitário do item deve ser um number",
  }),
});

export const InputSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string({
    required_error: "O nome do item é obrigatório",
    invalid_type_error: "O nome do item deve ser uma string",
  }),
  code: zod.string({
    required_error: "O código do item é obrigatório",
    invalid_type_error: "O código do item deve ser uma string",
  }),
  unitPrice: zod.number({
    required_error: "O valor unitário do item é obrigatório",
    invalid_type_error: "O valor unitário do item deve ser um number",
  }),
  measurementUnitId: zod.string({
    required_error: "O id da unidade de medida do item é obrigatório",
    invalid_type_error: "A unidade de medida do item deve ser uma string",
  }),
  groups: zod.array(
    zod.string({
      required_error: "O id do grupo do item é obrigatório",
      invalid_type_error: "O grupo do item deve ser uma string",
    })
  ),
});

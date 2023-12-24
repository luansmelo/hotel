import zod from "zod";

export const GroupSchema = zod.object({
  name: zod.string({
    required_error: "O nome do grupo é obrigatório",
    invalid_type_error: "O nome do grupo precisa ser uma string",
  }),
});

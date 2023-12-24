import zod from "zod";

export const MeasurementUnitSchema = zod.object({
  name: zod.string({
    required_error: "O nome da unidade de medida é obrigatória",
    invalid_type_error: "O nome da unidade de medida precisa ser uma string",
  }),
});

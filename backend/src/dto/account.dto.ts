import zod from "zod";

export interface AccountDTO {
  name: string;
  email: string;
  password: string;
}

export const AccountSchema = zod.object({
  name: zod.string(),
  email: zod
    .string({
      required_error: "Email obrigatório",
      invalid_type_error: "Email inválido",
    })
    .email()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: zod.string({
    required_error: "Senha obrigatória",
  }),
});

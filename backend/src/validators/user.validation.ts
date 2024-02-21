import zod from "zod";

export const UserSchema = zod.object({
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

export const UserLoginSchema = zod.object({
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

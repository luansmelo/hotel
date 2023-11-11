import zod from "zod";

export interface AuthDTO {
  email: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
}

export const AuthSchema = zod.object({
  email: zod.string({
    required_error: "O e-mail é obrigatório",
    invalid_type_error: "O e-mail deve ser uma string",
  }),
  password: zod.string({
    required_error: "A senha é obrigatória",
    invalid_type_error: "A senha deve ser uma string",
  }),
});

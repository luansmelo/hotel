import { InvalidParamError } from '@/presentation/errors/InvalidParamError';
import { FieldValidatorProtocol } from '@/validation/protocols';
import { z, ZodError } from 'zod';

const schemas = {
  email: z.string({
    required_error: 'O email é obrigatório',
  }).min(3).max(50),
  password: z.string({
    required_error: 'A senha é obrigatória'
  })
};

export class FieldValidatorAdapter implements FieldValidatorProtocol {
  validate(field: string, value: unknown): Error | void {
    let schema = schemas[field] || z.string().min(1);

    try {
      schema.parse(value);
    } catch (error) {
      let errorMessage: string;
      if (error instanceof ZodError) {
        errorMessage = error.errors.map((err) => err.message).join(', ');
      } else {
        errorMessage = 'Erro desconhecido ao validar o campo';
      }
      throw new InvalidParamError(errorMessage);
    }
  }
}

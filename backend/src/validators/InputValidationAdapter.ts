import { InvalidParamError } from '@/utils/errors/InvalidParamError';
import { z, ZodError } from 'zod';
import { FieldValidatorProtocol } from './FieldValidator';

const schemas = {
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
  code: z.string().min(2, { message: "O código deve ter pelo menos 2 caracteres" }).max(50),
  unitPrice: z.number().min(0.01),
  measurementUnitId: z.string(),
  groups: z.array(z.string()),
};

export class InputFieldValidatorAdapter implements FieldValidatorProtocol {
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

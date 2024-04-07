import { InvalidParamError } from '@/presentation/errors/InvalidParamError';
import { z, ZodError } from 'zod';
import { FieldValidatorProtocol } from './FieldValidator';

const schemas = {
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  preparationTime: z.string(),
  resource: z.string().min(3).max(50),
  accession: z.number()
};

export class ProductFieldValidatorAdapter implements FieldValidatorProtocol {
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

import { InvalidParamError } from '@/utils/errors/InvalidParamError';
import { z } from 'zod';
import { FieldValidatorProtocol } from './sort/FieldValidator';

export class FieldValidatorAdapter implements FieldValidatorProtocol {
  validate(field: string, value: unknown): Error | void {
    let schema: z.ZodType<any, any>;

    switch (field) {
      case 'name':
        schema = z.string().min(3).max(50).regex(
          /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/,
          'O nome deve conter apenas letras e espaços'
        ).min(1);
        break;
      default:
        schema = z.string().min(1);
    }

    try {
      schema.parse(value);
    } catch (error) {
      // Transformando o erro em uma mensagem de texto
      let errorMessage: string;
      if (error.errors && error.errors.length > 0) {
        errorMessage = error.errors.map((err: any) => err.message).join(', ');
      } else {
        errorMessage = 'Erro desconhecido ao validar o campo';
      }

      throw new InvalidParamError(errorMessage);
    }
  }
}

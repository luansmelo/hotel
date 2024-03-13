import { InvalidParamError } from "@/utils/errors/InvalidParamError";

export interface Validation {
  validate(input: unknown): void | Error;
}

export class SortInputValidator implements Validation {
  validate(input: unknown): void | Error {
    const { sort } = input as { sort: string };
    const sortEnum: string[] = [
      "name",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ];
    if (sort && !sortEnum.includes(sort)) {
      throw new InvalidParamError("Valor inválido para ordenação");
    }
  }
}

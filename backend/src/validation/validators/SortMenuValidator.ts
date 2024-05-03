import { InvalidParamError } from "@/presentation/errors/InvalidParamError";
import { Validation } from "./SortInputValidator";

export class SortMenuValidator implements Validation {
  validate(input: unknown): void | Error {
    const { sort } = input as { sort: string };
    const sortEnum: string[] = [
      "name",
      "createdAt",
      "updatedAt",
    ];
    if (sort && !sortEnum.includes(sort)) {
      throw new InvalidParamError("Valor inválido para ordenação");
    }
  }
}

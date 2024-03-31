import { Validation } from "@/presentation/protocols/validator/ValidationProtocol";
import { InvalidParamError } from "@/presentation/errors/InvalidParamError";

export class SortGroupValidator implements Validation {
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

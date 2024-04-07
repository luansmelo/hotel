import { InvalidParamError } from "@/presentation/errors/InvalidParamError";
import { Validation } from "./SortInputValidator";

export class SortProductValidator implements Validation {
  validate(input: unknown): void | Error {
    const { sort } = input as { sort: string };
    const sortEnum: string[] = [
      "name",
      "description",
      "resource",
      "accession",
      "preparationTime",
      "createdAt",
      "updatedAt",
    ];
    if (sort && !sortEnum.includes(sort)) {
      throw new InvalidParamError("Valor inválido para ordenação");
    }
  }
}

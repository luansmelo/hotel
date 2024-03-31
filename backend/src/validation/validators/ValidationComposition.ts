import { Validation } from "./SortInputValidator";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}
  validate(input: unknown): void | Error {
    for (const validation of this.validations) {
      validation.validate(input);
    }
  }
}

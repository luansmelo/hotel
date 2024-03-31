import { MissingParamError } from "@/presentation/errors/MissingParamError";
import { Validation } from "./sort/SortInputValidator";

export class RequiredFieldValitation implements Validation {
    constructor(private readonly field: string) { }
    validate(input: unknown): void | Error {
        if (!(input as Record<string, unknown>)[this.field]) {
            throw new MissingParamError(this.field);
        }
    }
}
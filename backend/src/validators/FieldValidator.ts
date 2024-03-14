import { Validation } from "./sort/SortInputValidator";

export interface FieldValidatorProtocol {
    validate: (field: string, value: unknown) => Error | void;
}

export class FieldValidator implements Validation {
    constructor(
        private readonly validator: FieldValidatorProtocol
    ) { }

    validate(input: unknown): Error | void {

        for (const field of Object.keys((input as Record<string, string>))) {
            const error = this.validator.validate(field, (input as Record<string, string>)[field]);
            if (error) {
                return error;
            }
        }
    }
}


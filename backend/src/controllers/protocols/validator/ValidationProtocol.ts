export interface Validation {
    validate(input: unknown): void | Error;
}
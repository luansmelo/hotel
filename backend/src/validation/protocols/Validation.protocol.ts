export interface Validation {
    validate(input: unknown): Error | void;
}
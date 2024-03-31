export interface FieldValidatorProtocol {
    validate: (field: string, value: unknown) => Error | void;
}
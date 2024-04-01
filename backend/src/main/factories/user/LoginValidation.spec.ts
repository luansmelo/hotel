import { Validation } from "@/validation/protocols";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { makeLoginValidationFactory } from "./LoginValidationFactory";

jest.mock('../../../validation/validators/ValidationComposition');


const makeFieldValidator = () => {
    class FieldValidatorStub {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(field: string, value: unknown): Error | void {
            return undefined;
        }
    }
    return new FieldValidatorStub();
};


describe('Login Validation Factory', () => {
    it('should call ValidationComposite with all validations', () => {
        makeLoginValidationFactory();

        const validations: Validation[] = [];
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValitation(field));
        }
        const fieldValidatorAdapter = makeFieldValidator();
        validations.push(new FieldValidator(fieldValidatorAdapter));

        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
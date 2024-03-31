import { Validation } from "@/validation/protocols";
import { makeCreateAccountValidationFactory } from "./CreateUserValidationFactory";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";
import { FieldValidator, ValidationComposite } from "@/validation/validators";

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


describe('Create Account Validation Factory', () => {
	it('should call ValidationComposite with all validations', () => {
		makeCreateAccountValidationFactory();

		const validations: Validation[] = []; 
		for (const field of ['name', 'email', 'password', 'role']) {
			validations.push(new RequiredFieldValitation(field));
		}
		const fieldValidatorAdapter = makeFieldValidator();
		validations.push(new FieldValidator(fieldValidatorAdapter));

		expect(ValidationComposite).toHaveBeenCalledWith(validations);
	});
});
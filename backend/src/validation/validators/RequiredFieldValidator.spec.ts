import { MissingParamError } from "@/presentation/errors/MissingParamError";
import { RequiredFieldValitation } from "./RequiredFieldValidation";

describe('Required Field Validator ', () => {
	it('should throw error if required field is not provided', () => {
		const sut = new RequiredFieldValitation('any_field');
		expect(() => sut.validate({})).toThrow(new MissingParamError('any_field'));
	});

	it('should not return if required field is provided', () => {
		const sut = new RequiredFieldValitation('any_field');
		const error = sut.validate({ any_field: 'any_value' });
		expect(error).toBeFalsy();
	});
});
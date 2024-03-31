
import { InvalidParamError } from "@/presentation/errors/InvalidParamError";
import { Validation } from "../protocols";
import { FieldValidator } from "./FieldValidator";

const makeFieldValidator = () => {
	class FieldValidatorStub implements Validation {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		validate(input: unknown): Error | void {
			return undefined;
		}
	}
	return new FieldValidatorStub();
};

const makeSut = () => {
	const fieldValidatorStub = makeFieldValidator();
	const sut = new FieldValidator(fieldValidatorStub);
	return {
		sut,
		fieldValidatorStub,
	};
};

describe('fieldValidator', () => {
	it('should return an error if fieldValidator returns an error', async () => {
		const { sut, fieldValidatorStub } = makeSut();
		jest.spyOn(fieldValidatorStub, 'validate').mockImplementationOnce(() => {
			return new InvalidParamError('any_field');
		});
		const error = sut.validate({ any_field: 'any_value' });
		expect(error).toEqual(new InvalidParamError('any_field'));
	});

	it('should call fieldValidator with correct values', async () => {
		const { sut, fieldValidatorStub } = makeSut();
		const validateSpy = jest.spyOn(fieldValidatorStub, 'validate');
		sut.validate({ any_field: 'any_value' });
		expect(validateSpy).toHaveBeenCalledWith('any_field', 'any_value');
	});

	it('should throws if fieldValidator throws', async () => {
		const { sut, fieldValidatorStub } = makeSut();
		jest.spyOn(fieldValidatorStub, 'validate').mockImplementationOnce(() => {
			throw new Error();
		});

		expect(sut.validate).toThrow();
		
	});
});
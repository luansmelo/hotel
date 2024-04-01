import { FieldValidatorAdapter } from "@/infra/validator/FieldValidatorAdapter";
import { Validation } from "@/validation/protocols";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";

export const makeLoginValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValitation(field));
    }
    validations.push(new FieldValidator(new FieldValidatorAdapter()));
    return new ValidationComposite(validations);
};
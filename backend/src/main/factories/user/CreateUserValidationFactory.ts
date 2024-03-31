import { Validation } from "@/validation/protocols";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { GroupFieldValidatorAdapter } from "@/validation/validators/GroupValidationAdapter";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";

export const makeCreateAccountValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'role']) {
        validations.push(new RequiredFieldValitation(field));
    }
    validations.push(new FieldValidator(new GroupFieldValidatorAdapter()));
    return new ValidationComposite(validations);
};
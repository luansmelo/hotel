import { Validation } from "@/validation/protocols";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { InputFieldValidatorAdapter } from "@/validation/validators/InputValidationAdapter";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";

export const makeInputValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields = [
        'name',
        'code',
        'unitPrice',
        'measurementUnitId',
        'groups',
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValitation(field));
    }

    const groupValidator = new FieldValidator(new InputFieldValidatorAdapter());

    validations.push(groupValidator);

    return new ValidationComposite(validations);
};

import { FieldValidator } from "@/validators/FieldValidator";
import { RequiredFieldValitation } from "@/validators/RequiredFieldValidation";
import { Validation } from "@/validators/sort/SortInputValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";
import { InputFieldValidatorAdapter } from "@/validators/InputValidationAdapter";

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

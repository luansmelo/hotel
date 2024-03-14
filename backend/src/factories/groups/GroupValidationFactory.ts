import { FieldValidatorAdapter } from "@/validators/GroupValidationAdapter";
import { FieldValidator } from "@/validators/sort/FieldValidator";
import { RequiredFieldValitation } from "@/validators/sort/RequiredFieldValidation";
import { Validation } from "@/validators/sort/SortInputValidator";
import { ValidationComposite } from "@/validators/sort/ValidationComposition";

export const makeGroupValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields = [
        'name'
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValitation(field));
    }

    const groupValidator = new FieldValidator(new FieldValidatorAdapter());

    validations.push(groupValidator);

    return new ValidationComposite(validations);
};

import { GroupFieldValidatorAdapter } from "@/validators/GroupValidationAdapter";
import { FieldValidator } from "@/validators/FieldValidator";
import { RequiredFieldValitation } from "@/validators/RequiredFieldValidation";
import { Validation } from "@/validators/sort/SortInputValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export const makeGroupValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields = [
        'name'
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValitation(field));
    }

    const groupValidator = new FieldValidator(new GroupFieldValidatorAdapter());

    validations.push(groupValidator);

    return new ValidationComposite(validations);
};

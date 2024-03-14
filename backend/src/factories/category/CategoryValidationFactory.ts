import { GroupFieldValidatorAdapter } from "@/validators/GroupValidationAdapter";
import { FieldValidator } from "@/validators/FieldValidator";
import { RequiredFieldValitation } from "@/validators/RequiredFieldValidation";
import { Validation } from "@/validators/sort/SortInputValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export const makeCategoryValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields = [
        'name'
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValitation(field));
    }

    const categoryValidator = new FieldValidator(new GroupFieldValidatorAdapter());

    validations.push(categoryValidator);

    return new ValidationComposite(validations);
};

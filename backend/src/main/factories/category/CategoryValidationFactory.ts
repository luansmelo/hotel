import { Validation } from "@/validation/protocols";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { GroupFieldValidatorAdapter } from "@/validation/validators/GroupValidationAdapter";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";

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

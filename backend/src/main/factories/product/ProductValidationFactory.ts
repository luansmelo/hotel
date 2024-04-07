import { Validation } from "@/validation/protocols";
import { FieldValidator, ValidationComposite } from "@/validation/validators";
import { ProductFieldValidatorAdapter } from "@/validation/validators/ProductValidationAdapter";
import { RequiredFieldValitation } from "@/validation/validators/RequiredFieldValidation";

export const makeProductValidationFactory = (): ValidationComposite => {
    const validations: Validation[] = [];
    const requiredFields = [
        'name',
        'description',
        'preparationTime',
        'resource',
        'accession'
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValitation(field));
    }

    const productValidator = new FieldValidator(new ProductFieldValidatorAdapter());

    validations.push(productValidator);

    return new ValidationComposite(validations);
};
